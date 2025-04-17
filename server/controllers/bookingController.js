const Booking = require('../models/Booking');
const Consultant = require('../models/Consultant');
const { sendConfirmationEmail } = require('../utils/mailer');
const { addToGoogleCalendar, addToMicrosoftCalendar } = require('../utils/calendar');

const getTimeInMins = (str) => {
  const [h, m] = str.split(':').map(Number);
  return h * 60 + m;
};

exports.bookAppointment = async (req, res) => {
  const { consultantId, date, startTime, durationMins, method } = req.body;
  const endTimeMins = getTimeInMins(startTime) + durationMins;
  const endTime = `${String(Math.floor(endTimeMins / 60)).padStart(2, '0')}:${String(endTimeMins % 60).padStart(2, '0')}`;

  const existing = await Booking.findOne({ consultantId, date, startTime });
  if (existing) return res.status(400).json({ error: 'Slot already taken' });

  const consultant = await Consultant.findById(consultantId);
  const available = consultant.availability.some(a => {
    return (
      a.day.toLowerCase() === new Date(date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() &&
      getTimeInMins(a.startTime) <= getTimeInMins(startTime) &&
      getTimeInMins(a.endTime) >= endTimeMins
    );
  });

  if (!available) return res.status(400).json({ error: 'Time not available for this consultant' });

  const booking = await Booking.create({
    consultantId,
    userId: req.user.id,
    date,
    startTime,
    endTime,
    durationMins,
    method,
    status: 'pending'
  });
  
  await sendConfirmationEmail(req.user.email, booking);

  if (consultant.calendarSync.google && consultant.googleTokens) {
    await addToGoogleCalendar(consultant.googleTokens, booking);
  }
  if (consultant.calendarSync.microsoft && consultant.microsoftAccessToken) {
    await addToMicrosoftCalendar(consultant.microsoftAccessToken, booking);
  }

  res.status(201).json({ message: 'Booking created', booking });
};

exports.getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id }).populate('consultantId');
  res.json(bookings);
};

exports.getConsultantBookings = async (req, res) => {
  const { consultantId } = req.params;
  const bookings = await Booking.find({ consultantId }).populate('userId');
  res.json(bookings);
};
