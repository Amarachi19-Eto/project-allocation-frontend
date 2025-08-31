import React, { useState, useEffect } from 'react';
import './StudentDashboard.css';

const StudentDashboard = ({ user, onLogout }) => {
  const [projectTopic, setProjectTopic] = useState(null);
  const [supervisor, setSupervisor] = useState(null);
  const [coStudents, setCoStudents] = useState([]);
  const [guidelines, setGuidelines] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Mock data - In real app, this would come from API
  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setProjectTopic({
        id: 1,
        title: "AI-Based Duplication Detection System for Academic Projects",
        description: "Develop a machine learning system to detect duplicate project topics using natural language processing",
        status: "pending", // pending, accepted, declined
        assignedDate: "2024-01-15"
      });

      setSupervisor({
        id: 101,
        name: "Dr. Sarah Johnson",
        email: "sarah.johnson@university.edu",
        phone: "+234-801-234-5678",
        department: "Computer Science",
        office: "Block C, Room 305",
        photo: "/api/placeholder/100/100",
        expertise: ["Artificial Intelligence", "Machine Learning", "NLP"]
      });

      setCoStudents([
        { id: 2, name: "Chinedu Okoro", regNo: "STU2024002", email: "chinedu@student.university.edu" },
        { id: 3, name: "Amina Mohammed", regNo: "STU2024003", email: "amina@student.university.edu" },
        { id: 4, name: "Tunde Adeyemi", regNo: "STU2024004", email: "tunde@student.university.edu" }
      ]);

      setGuidelines(`
      1. Students must accept or decline assigned topics within 7 days
      2. Once accepted, topic changes require departmental approval
      3. All projects must include originality reports
      4. Regular meetings with supervisors are mandatory
      5. Final submission must include complete documentation
      6. Duplicate topics will be automatically rejected by the system
      `);

      setLoading(false);
    }, 1000);
  }, []);

  const handleTopicAction = (action) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setProjectTopic(prev => ({ ...prev, status: action }));
      setMessage(`Topic ${action} successfully!`);
      setLoading(false);
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    }, 500);
  };

  if (loading) {
    return (
      <div className="student-dashboard-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="student-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-graduation-cap me-2"></i>
                Student Dashboard
              </h1>
              <p className="welcome-text">Welcome back, {user.username}!</p>
            </div>
            <div className="col-md-6 text-end">
              <button className="btn btn-outline-danger btn-sm" onClick={onLogout}>
                <i className="fas fa-sign-out-alt me-1"></i>Logout
              </button>
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
          {/* Project Topic Section */}
          <div className="col-lg-6">
            <div className="card topic-card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  <i className="fas fa-tasks me-2"></i>
                  Assigned Project Topic
                </h5>
              </div>
              <div className="card-body">
                {projectTopic ? (
                  <>
                    <h6 className="text-primary">{projectTopic.title}</h6>
                    <p className="text-muted">{projectTopic.description}</p>
                    
                    <div className="topic-meta">
                      <small className="text-muted">
                        <i className="fas fa-calendar me-1"></i>
                        Assigned: {projectTopic.assignedDate}
                      </small>
                      <br />
                      <small className={`status-badge ${projectTopic.status}`}>
                        Status: {projectTopic.status.toUpperCase()}
                      </small>
                    </div>

                    {projectTopic.status === 'pending' && (
                      <div className="topic-actions mt-3">
                        <button 
                          className="btn btn-success me-2"
                          onClick={() => handleTopicAction('accepted')}
                          disabled={loading}
                        >
                          <i className="fas fa-check me-1"></i>Accept Topic
                        </button>
                        <button 
                          className="btn btn-danger"
                          onClick={() => handleTopicAction('declined')}
                          disabled={loading}
                        >
                          <i className="fas fa-times me-1"></i>Decline Topic
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-muted">No project topic assigned yet.</p>
                )}
              </div>
            </div>

            {/* Guidelines Section */}
            <div className="card guidelines-card mt-4">
              <div className="card-header bg-info text-white">
                <h5 className="mb-0">
                  <i className="fas fa-book me-2"></i>
                  Project Guidelines
                </h5>
              </div>
              <div className="card-body">
                <div className="guidelines-content">
                  {guidelines.split('\n').map((line, index) => (
                    line.trim() && <p key={index} className="guideline-item">📌 {line.trim()}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Supervisor & Co-Students Section */}
          <div className="col-lg-6">
            {/* Supervisor Details */}
            <div className="card supervisor-card">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">
                  <i className="fas fa-chalkboard-teacher me-2"></i>
                  Supervisor Details
                </h5>
              </div>
              <div className="card-body">
                {supervisor ? (
                  <>
                    <div className="supervisor-info">
                      <h6 className="text-success">{supervisor.name}</h6>
                      <p className="department-badge">{supervisor.department}</p>
                      
                      <div className="contact-info">
                        <p>
                          <i className="fas fa-envelope me-2"></i>
                          {supervisor.email}
                        </p>
                        <p>
                          <i className="fas fa-phone me-2"></i>
                          {supervisor.phone}
                        </p>
                        <p>
                          <i className="fas fa-building me-2"></i>
                          {supervisor.office}
                        </p>
                      </div>

                      <div className="expertise-tags mt-3">
                        <h6>Areas of Expertise:</h6>
                        {supervisor.expertise.map((skill, index) => (
                          <span key={index} className="badge bg-secondary me-1 mb-1">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-muted">No supervisor assigned yet.</p>
                )}
              </div>
            </div>

            {/* Co-Students Section */}
            <div className="card costudents-card mt-4">
              <div className="card-header bg-warning text-dark">
                <h5 className="mb-0">
                  <i className="fas fa-users me-2"></i>
                  Co-Students ({coStudents.length})
                </h5>
              </div>
              <div className="card-body">
                {coStudents.length > 0 ? (
                  <div className="co-students-list">
                    {coStudents.map(student => (
                      <div key={student.id} className="co-student-item">
                        <div className="student-info">
                          <h6 className="mb-1">{student.name}</h6>
                          <p className="text-muted mb-0">{student.regNo}</p>
                          <small className="text-primary">{student.email}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">No other students assigned to your supervisor yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;