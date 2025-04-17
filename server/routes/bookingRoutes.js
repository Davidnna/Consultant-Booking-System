const express = require('express');
const auth = require('../middlewares/authMiddleware');
const {
  bookAppointment,
  getUserBookings,
  getConsultantBookings
} = require('../controllers/bookingController');

const router = express.Router();

router.post('/', auth, bookAppointment);
router.get('/user', auth, getUserBookings);
router.get('/consultant/:consultantId', getConsultantBookings);

module.exports = router;
