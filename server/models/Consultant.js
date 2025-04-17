const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  day: { type: String }, // e.g. 'Monday'
  startTime: String,     // '08:00'
  endTime: String,       // '19:00'
});

const consultantSchema = new mongoose.Schema({
  name: String,
  bio: String,
  specialty: [String],
  pricing: {
    halfHour: Number,
    oneHour: Number,
    ninetyMins: Number,
    twoHours: Number,
    threeHours: Number,
  },
  consultationMethods: [String], // ['Zoom', 'Google Meet', 'Skype']
  availability: [timeSlotSchema],
  calendarSync: {
    google: Boolean,
    microsoft: Boolean,
  },
  googleTokens: Object,
  microsoftAccessToken: String
});

module.exports = mongoose.model('Consultant', consultantSchema);
