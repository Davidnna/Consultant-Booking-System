const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  consultantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultant' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: String,           // e.g. '2025-04-20'
  startTime: String,      // e.g. '10:00'
  endTime: String,        // e.g. '11:30'
  durationMins: Number,   // 30, 60, 90, 120, etc
  method: String,         // 'Zoom' | 'Google Meet' | 'Skype'
  status: { type: String, default: 'pending' },
  verificationCode: String
});

module.exports = mongoose.model('Booking', bookingSchema);
