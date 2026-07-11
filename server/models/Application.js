
const mongoose = require('mongoose');
const applicationSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['applied', 'interview', 'offer', 'rejected'],
    default: 'applied'
  },
  dateApplied: { type: String, default: () => new Date().toISOString().split('T')[0] }
});

module.exports = mongoose.model('Application', applicationSchema);