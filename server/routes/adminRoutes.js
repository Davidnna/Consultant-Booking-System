const express = require('express');
const {
  getUsers,
  getConsultants,
  getAllBookings,
  getAnalytics,
} = require('../controllers/adminController');

const auth = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/users', auth, isAdmin, getUsers);
router.get('/consultants', auth, isAdmin, getConsultants);
router.get('/bookings', auth, isAdmin, getAllBookings);
router.get('/analytics', auth, isAdmin, getAnalytics);

module.exports = router;
