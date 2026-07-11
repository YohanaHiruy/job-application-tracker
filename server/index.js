require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const Application = require('./models/Application');
const app = express();
app.use(cors());
app.use(express.json());
 mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/api/applications', async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/applications', async (req, res) => {
  try {
    const newApp = new Application({
      company: req.body.company,
      role: req.body.role,
      status: req.body.status
    });
    const saved = await newApp.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// PUT - update an application (e.g. change status)
app.put('/api/applications/:id', async (req, res) => {
  try {
    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Application not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - remove an application
app.delete('/api/applications/:id', async (req, res) => {
  try {
    const deleted = await Application.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Application not found' });
    res.json({ message: 'Application deleted', deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.listen(5000, () => console.log('Server running on port 5000'));