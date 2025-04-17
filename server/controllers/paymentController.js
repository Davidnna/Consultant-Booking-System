const Booking = require('../models/Booking');

exports.submitVerificationCode = async (req, res) => {
  const { bookingId, code } = req.body;

  const booking = await Booking.findById(bookingId);
  if (!booking || String(booking.userId) !== req.user.id)
    return res.status(403).json({ error: 'Invalid booking' });

  booking.verificationCode = code;
  await booking.save();

  res.json({ message: 'Verification code submitted. Awaiting admin confirmation.' });
};

exports.adminVerifyPayment = async (req, res) => {
  const { bookingId } = req.params;
  const booking = await Booking.findById(bookingId);
  if (!booking) return res.status(404).json({ error: 'Not found' });

  booking.status = 'confirmed';
  await booking.save();

  res.json({ message: 'Booking confirmed and marked as paid.' });
};
