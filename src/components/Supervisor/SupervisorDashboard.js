import React, { useState, useEffect } from 'react';
import './SupervisorDashboard.css';

const SupervisorDashboard = ({ user, onLogout }) => {
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Mock data - In real app, this would come from API
  useEffect(() => {
    setTimeout(() => {
      setAssignedStudents([
        {
          id: 1,
          name: "Chinedu Okoro",
          regNo: "STU2024001",
          email: "chinedu@university.edu",
          projectTopic: "AI-Based Project Topic Duplication Detection System",
          topicStatus: "accepted",
          progress: 40,
          lastMeeting: "2024-01-10",
          nextMeeting: "2024-01-17",
          contact: "+234-803-456-7890"
        },
        {
          id: 2,
          name: "Amina Mohammed",
          regNo: "STU2024002", 
          email: "amina@university.edu",
          projectTopic: "Blockchain-based Secure Voting System",
          topicStatus: "pending",
          progress: 20,
          lastMeeting: "2024-01-08",
          nextMeeting: "2024-01-15",
          contact: "+234-802-345-6789"
        },
        {
          id: 3,
          name: "Tunde Adeyemi",
          regNo: "STU2024003",
          email: "tunde@university.edu", 
          projectTopic: "IoT-based Smart Classroom Monitoring",
          topicStatus: "accepted",
          progress: 60,
          lastMeeting: "2024-01-12",
          nextMeeting: "2024-01-19",
          contact: "+234-805-678-9012"
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const handleFeedbackSubmit = (studentId) => {
    setLoading(true);
    setTimeout(() => {
      setMessage(`Feedback sent to ${assignedStudents.find(s => s.id === studentId)?.name}`);
      setFeedback('');
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }, 500);
  };

  const handleMeetingSchedule = (studentId, date) => {
    setLoading(true);
    setTimeout(() => {
      setMessage(`Meeting scheduled with ${assignedStudents.find(s => s.id === studentId)?.name}`);
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }, 500);
  };

  if (loading) {
    return (
      <div className="supervisor-dashboard-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading your supervisor dashboard...</p>
      </div>
    );
  }

  return (
    <div className="supervisor-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-chalkboard-teacher me-2"></i>
                Supervisor Dashboard
              </h1>
              <p className="welcome-text">
                Welcome, <strong>Dr. {user.username}</strong>
              </p>
            </div>
            <div className="col-md-6 text-end">
              <div className="header-stats">
                <span className="badge bg-info me-2">
                  {assignedStudents.length} Students
                </span>
                <span className="badge bg-success me-2">
                  {assignedStudents.filter(s => s.topicStatus === 'accepted').length} Active
                </span>
                <button className="btn btn-outline-danger btn-sm" onClick={onLogout}>
                  <i className="fas fa-sign-out-alt me-1"></i>Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mt-4">
        {message && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {message}
            <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
          </div>
        )}

        <div className="row">
          {/* Students List */}
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  <i className="fas fa-users me-2"></i>
                  Assigned Students ({assignedStudents.length})
                </h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Project Topic</th>
                        <th>Status</th>
                        <th>Progress</th>
                        <th>Last Meeting</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignedStudents.map(student => (
                        <tr key={student.id} className={selectedStudent?.id === student.id ? 'table-active' : ''}>
                          <td>
                            <div className="student-info">
                              <strong>{student.name}</strong>
                              <br />
                              <small className="text-muted">{student.regNo}</small>
                              <br />
                              <small className="text-primary">{student.email}</small>
                            </div>
                          </td>
                          <td>
                            <div className="topic-info">
                              <strong>{student.projectTopic}</strong>
                            </div>
                          </td>
                          <td>
                            <span className={`status-badge ${student.topicStatus}`}>
                              {student.topicStatus.toUpperCase()}
                            </span>
                          </td>
                          <td>
                            <div className="progress" style={{ height: '8px' }}>
                              <div 
                                className={`progress-bar ${student.progress < 30 ? 'bg-warning' : 'bg-success'}`}
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <small>{student.progress}% Complete</small>
                          </td>
                          <td>
                            <small>{student.lastMeeting}</small>
                            <br />
                            <small className="text-info">Next: {student.nextMeeting}</small>
                          </td>
                          <td>
                            <div className="btn-group">
                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => setSelectedStudent(selectedStudent?.id === student.id ? null : student)}
                              >
                                <i className="fas fa-comment"></i> Feedback
                              </button>
                              <button className="btn btn-outline-success btn-sm">
                                <i className="fas fa-calendar"></i> Meeting
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        {selectedStudent && (
          <div className="row mt-4">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header bg-info text-white">
                  <h5 className="mb-0">
                    <i className="fas fa-comments me-2"></i>
                    Feedback for {selectedStudent.name}
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <textarea
                        className="form-control"
                        rows="4"
                        placeholder="Enter your feedback for this student..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                      <div className="mt-2">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleFeedbackSubmit(selectedStudent.id)}
                          disabled={!feedback.trim() || loading}
                        >
                          <i className="fas fa-paper-plane me-1"></i>
                          Send Feedback
                        </button>
                        <button
                          className="btn btn-outline-secondary ms-2"
                          onClick={() => setSelectedStudent(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="student-details">
                        <h6>Student Details:</h6>
                        <p><strong>Project:</strong> {selectedStudent.projectTopic}</p>
                        <p><strong>Progress:</strong> {selectedStudent.progress}%</p>
                        <p><strong>Contact:</strong> {selectedStudent.contact}</p>
                        <p><strong>Email:</strong> {selectedStudent.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Guidelines Section */}
        <div className="row mt-4">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header bg-warning text-dark">
                <h5 className="mb-0">
                  <i className="fas fa-book me-2"></i>
                  Supervision Guidelines
                </h5>
              </div>
              <div className="card-body">
                <div className="guidelines-content">
                  <h6>SUPERVISION PROTOCOL</h6>
                  <ol>
                    <li><strong>Weekly Meetings:</strong> Minimum one meeting per week with each student</li>
                    <li><strong>Progress Monitoring:</strong> Track student progress through milestones</li>
                    <li><strong>Feedback:</strong> Provide constructive feedback within 48 hours of submission</li>
                    <li><strong>Documentation:</strong> Maintain supervision records and meeting minutes</li>
                    <li><strong>Assessment:</strong> Evaluate students based on:
                      <ul>
                        <li>Technical competence (30%)</li>
                        <li>Research quality (25%)</li>
                        <li>Timeliness (20%)</li>
                        <li>Originality (25%)</li>
                      </ul>
                    </li>
                    <li><strong>Communication:</strong> Respond to student inquiries within 24 hours</li>
                    <li><strong>Ethics:</strong> Ensure academic integrity and plagiarism checks</li>
                  </ol>
                  
                  <h6>PROJECT TIMELINE</h6>
                  <ul>
                    <li>Week 1-4: Proposal Development</li>
                    <li>Week 5-8: Literature Review & Design</li>
                    <li>Week 9-12: Implementation</li>
                    <li>Week 13-14: Testing & Documentation</li>
                    <li>Week 15: Final Submission</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboard;