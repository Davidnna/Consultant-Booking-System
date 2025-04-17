const express = require('express');
const auth = require('../middlewares/authMiddleware');
const {
  submitVerificationCode,
  adminVerifyPayment
} = require('../controllers/paymentController');

const router = express.Router();

router.post('/submit-code', auth, submitVerificationCode);
router.post('/admin/verify/:bookingId', auth, adminVerifyPayment); // admin only

module.exports = router;
