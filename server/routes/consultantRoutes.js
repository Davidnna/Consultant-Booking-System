const express = require('express');
const {
  createConsultant,
  getAllConsultants,
  getConsultantById,
  updateConsultant
} = require('../controllers/consultantController');

const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', auth, createConsultant); // only authenticated
router.get('/', getAllConsultants);
router.get('/:id', getConsultantById);
router.put('/:id', auth, updateConsultant);

module.exports = router;
