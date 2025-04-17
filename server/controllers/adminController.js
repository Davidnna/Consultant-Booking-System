const User = require('../models/User');
const Consultant = require('../models/Consultant');
const Booking = require('../models/Booking');

// List all users
exports.getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

// List all consultants
exports.getConsultants = async (req, res) => {
  const consultants = await Consultant.find();
  res.json(consultants);
};

// List all bookings
exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate('userId', 'name email')
    .populate('consultantId', 'name specialty');
  res.json(bookings);
};

// Analytics
exports.getAnalytics = async (req, res) => {
  const totalBookings = await Booking.countDocuments();
  const totalUsers = await User.countDocuments();
  const incomeEstimate = await Booking.aggregate([
    {
      $lookup: {
        from: 'consultants',
        localField: 'consultantId',
        foreignField: '_id',
        as: 'consultant',
      },
    },
    { $unwind: '$consultant' },
    {
      $group: {
        _id: null,
        income: { $sum: { $multiply: ['$durationMins', 1] } }, // Assume 1 unit = $1/min
      },
    },
  ]);

  res.json({
    totalUsers,
    totalBookings,
    incomeEstimate: incomeEstimate[0]?.income || 0,
  });
};
