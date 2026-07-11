import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [applications, setApplications] = useState([]);
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('applied');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = () => {
    axios.get('http://localhost:5000/api/applications')
      .then(res => setApplications(res.data))
      .catch(err => console.error('Error fetching applications:', err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/applications', { company, role, status })
      .then(() => {
        fetchApplications();
        setCompany('');
        setRole('');
        setStatus('applied');
      })
      .catch(err => console.error('Error adding application:', err));
  };

  const handleStatusChange = (id, newStatus) => {
    axios.put(`http://localhost:5000/api/applications/${id}`, { status: newStatus })
      .then(() => fetchApplications())
      .catch(err => console.error('Error updating application:', err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/applications/${id}`)
      .then(() => fetchApplications())
      .catch(err => console.error('Error deleting application:', err));
  };

  const statusColors = {
    applied: 'bg-blue-100 text-blue-700',
    interview: 'bg-yellow-100 text-yellow-700',
    offer: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent transition-all duration-300 hover:tracking-wide cursor-default">
          Job Application Tracker
        </h1>
        <p className="text-slate-500 mb-8 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"></span>
          From applied to offer — all in one place.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div className="flex items-center gap-4">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg transition-colors"
            >
              Add Application
            </button>
          </div>
        </form>

        {/* List */}
        {applications.length === 0 ? (
          <p className="text-slate-400 text-center">No applications yet.</p>
        ) : (
          <div className="space-y-3">
            {applications.map(app => (
              <div
                key={app._id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-slate-800">{app.company}</p>
                  <p className="text-slate-500 text-sm">{app.role}</p>
                  <p className="text-slate-400 text-xs mt-1">Applied: {app.dateApplied}</p>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app._id, e.target.value)}
                    className={`text-xs font-medium px-3 py-1 rounded-full capitalize border-none focus:outline-none ${statusColors[app.status]}`}
                  >
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>

                  <button
                    onClick={() => handleDelete(app._id)}
                    className="text-slate-400 hover:text-red-500 transition-colors text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default App;