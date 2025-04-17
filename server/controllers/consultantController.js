const Consultant = require('../models/Consultant');

exports.createConsultant = async (req, res) => {
  try {
    const consultant = await Consultant.create(req.body);
    res.status(201).json(consultant);
  } catch (err) {
    res.status(400).json({ error: 'Error creating consultant' });
  }
};

exports.getAllConsultants = async (req, res) => {
  const consultants = await Consultant.find();
  res.json(consultants);
};

exports.getConsultantById = async (req, res) => {
  const consultant = await Consultant.findById(req.params.id);
  if (!consultant) return res.status(404).json({ error: 'Not found' });
  res.json(consultant);
};

exports.updateConsultant = async (req, res) => {
  try {
    const updated = await Consultant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch {
    res.status(400).json({ error: 'Update failed' });
  }
};
