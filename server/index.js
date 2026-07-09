const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let applications = [
  { id: 1, company: 'Google', role: 'Frontend Developer', status: 'applied', dateApplied: '2026-07-01' },
  { id: 2, company: 'Meta', role: 'Full Stack Developer', status: 'interview', dateApplied: '2026-06-28' }
];

app.get('/api/applications', (req, res) => {
  res.json(applications);
});
// POST - add a new application
app.post('/api/applications', (req, res) => {
  const newApp = {
    id: applications.length + 1,
    company: req.body.company,
    role: req.body.role,
    status: req.body.status || 'applied',
    dateApplied: req.body.dateApplied || new Date().toISOString().split('T')[0]
  };

  applications.push(newApp);
  res.status(201).json(newApp);
});

app.listen(5000, () => console.log('Server running on port 5000'));