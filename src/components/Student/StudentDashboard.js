import React, { useState, useEffect } from 'react';
import './StudentDashboard.css';
import { mockStudents, mockTopics, mockAllocations, mockSupervisors } from '../../mockData';

const StudentDashboard = ({ user, onLogout }) => {
  const [projectTopic, setProjectTopic] = useState(null);
  const [supervisor, setSupervisor] = useState(null);
  const [coStudents, setCoStudents] = useState([]);
  const [guidelines, setGuidelines] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchStudentData = () => {
      try {
        const currentStudent = mockStudents.find(s => s.registrationNumber === user.username);
        
        if (currentStudent) {
          const allocation = mockAllocations.find(a => a.studentId === currentStudent.id);
          const topic = mockTopics.find(t => t.id === allocation?.topicId);
          const supervisorData = mockSupervisors.find(s => s.id === allocation?.supervisorId);
          const coStudentsData = mockStudents.filter(s => {
            const studentAllocation = mockAllocations.find(a => a.studentId === s.id);
            return studentAllocation?.supervisorId === allocation?.supervisorId && s.id !== currentStudent.id;
          }).map(s => {
            const studentAlloc = mockAllocations.find(a => a.studentId === s.id);
            const studentTopic = mockTopics.find(t => t.id === studentAlloc?.topicId);
            return {
              id: s.id,
              name: `${s.firstName} ${s.lastName}`,
              regNo: s.registrationNumber,
              email: s.email,
              projectTitle: studentTopic?.title || "No topic assigned",
              status: studentAlloc?.status || "pending"
            };
          });

          setProjectTopic(topic ? {
            id: topic.id,
            title: topic.title,
            description: topic.description || "No description available.",
            status: allocation?.status || "pending",
            assignedDate: allocation?.allocatedDate || "2025-01-15"
          } : null);

          setSupervisor(supervisorData ? {
            id: supervisorData.id,
            name: `Dr. ${supervisorData.firstName} ${supervisorData.lastName}`,
            email: supervisorData.email,
            phone: supervisorData.phone || "+234-800-000-0000",
            department: supervisorData.department,
            office: supervisorData.office || "Block A, Room 101",
            officeHours: supervisorData.officeHours || "Monday-Friday: 9AM-5PM",
            expertise: supervisorData.expertise || ["General Supervision"],
            rating: supervisorData.rating || 4.5
          } : null);

          setCoStudents(coStudentsData);
        }

        setGuidelines(`
        PROJECT GUIDELINES AND REGULATIONS

        1. TOPIC ACCEPTANCE POLICY
           - Students must accept or decline assigned topics within 7 days of assignment
           - Failure to respond will result in automatic topic acceptance
           - Only one topic change request is allowed per student

        2. SUPERVISION MEETINGS
           - Minimum of 4 meetings per semester with supervisor
           - Maintain meeting records in provided logbook
           - Submit progress reports bi-weekly

        3. PROJECT TIMELINE
           - Proposal Submission: Week 4
           - Chapter 1-3: Week 8  
           - Complete Draft: Week 12
           - Final Submission: Week 14

        4. ORIGINALITY REQUIREMENTS
           - Maximum 20% similarity index allowed
           - Proper citation and referencing mandatory
           - plagiarism results in automatic failure

        5. TECHNICAL REQUIREMENTS
           - Source code must be version controlled (Git)
           - Database backup must be submitted
           - Complete documentation required

        6. ASSESSMENT CRITERIA
           - Originality: 25%
           - Technical Complexity: 30%
           - Documentation: 20%
           - Defense Performance: 25%
        `);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setLoading(false);
      }
    };

    setTimeout(fetchStudentData, 1000);
  }, [user.username]);

  const handleTopicAction = async (action) => {
    setLoading(true);
    try {
      setTimeout(() => {
        setProjectTopic(prev => ({ ...prev, status: action }));
        
        if (action === 'accepted') {
          setMessage('🎉 Topic accepted successfully! You can now begin your project work.');
        } else {
          setMessage('Topic declined. Administrator will assign a new topic within 48 hours.');
        }
        
        setLoading(false);
        setTimeout(() => setMessage(''), 5000);
      }, 500);
    } catch (error) {
      setMessage('Error processing your request. Please try again.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="student-dashboard-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading your student dashboard...</p>
      </div>
    );
  }

  return (
    <div className="student-dashboard">
      <header className="dashboard-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img 
                    src="/unizik-logo.png" 
                    alt="UNIZIK Logo" 
                    style={{ width: '45px', marginRight: '15px' }} 
                  />
                  <div>
                    <h1 style={{ margin: 0, fontSize: '1.8rem' }}>
                      <i className="fas fa-user-graduate me-2"></i>
                      Student Dashboard
                    </h1>
                    <p className="welcome-text" style={{ margin: 0 }}>
                      Nnamdi Azikiwe University, Awka
                    </p>
                  </div>
                </div>
              </div>

            <div className="col-md-6 text-end">
              <div className="header-actions">
                <span className="last-login me-3">
                  Last login: {new Date().toLocaleDateString()}
                </span>
                <button className="btn btn-outline-danger btn-sm" onClick={onLogout}>
                  <i className="fas fa-sign-out-alt me-1"></i>Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mt-4">
        {message && (
          <div className={`alert ${message.includes('accepted') ? 'alert-success' : 'alert-info'} alert-dismissible fade show`} role="alert">
            {message}
            <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
          </div>
        )}

        <div className="row">
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
                    <h6 className="text-primary topic-title">{projectTopic.title}</h6>
                    <p className="text-muted topic-description">{projectTopic.description}</p>
                    
                    <div className="topic-meta">
                      <div className="d-flex justify-content-between">
                        <small className="text-muted">
                          <i className="fas fa-calendar me-1"></i>
                          Assigned: {projectTopic.assignedDate}
                        </small>
                        <span className={`status-badge ${projectTopic.status}`}>
                          {projectTopic.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {projectTopic.status === 'pending' && (
                      <div className="topic-actions mt-4">
                        <div className="alert alert-warning">
                          <i className="fas fa-exclamation-circle me-2"></i>
                          Please accept or decline your topic
                        </div>
                        <div className="d-grid gap-2">
                          <button
                            className="btn btn-success btn-lg"
                            onClick={() => handleTopicAction('accepted')}
                            disabled={loading}
                          >
                            <i className="fas fa-check-circle me-2"></i>
                            {loading ? 'Processing...' : 'Accept Topic'}
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleTopicAction('declined')}
                            disabled={loading}
                          >
                            <i className="fas fa-times-circle me-2"></i>
                            Decline Topic
                          </button>
                        </div>
                      </div>
                    )}

                    {projectTopic.status === 'accepted' && (
                      <div className="alert alert-success mt-3">
                        <i className="fas fa-check-circle me-2"></i>
                        Topic accepted. You may now begin your project work.
                      </div>
                    )}

                    {projectTopic.status === 'declined' && (
                      <div className="alert alert-info mt-3">
                        <i className="fas fa-info-circle me-2"></i>
                        Topic declined. Waiting for administrator to assign a new topic.
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-muted">No project topic assigned yet.</p>
                )}
              </div>
            </div>

            <div className="card guidelines-card mt-4">
              <div className="card-header bg-info text-white">
                <h5 className="mb-0">
                  <i className="fas fa-book me-2"></i>
                  Project Guidelines & Regulations
                </h5>
              </div>
              <div className="card-body">
                <div className="guidelines-content">
                  {guidelines.split('\n').map((line, index) => (
                    line.trim() && (
                      <p
                        key={index}
                        className={`guideline-item ${line.trim().match(/^[0-9]\./) ? 'guideline-heading' : 'guideline-subitem'}`}
                      >
                        {line.trim()}
                      </p>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
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
                    <div className="supervisor-header">
                      <h6 className="text-success">{supervisor.name}</h6>
                      <span className="department-badge">{supervisor.department}</span>
                      <div className="rating">
                        <span className="stars">★★★★★</span>
                        <small className="text-muted">({supervisor.rating})</small>
                      </div>
                    </div>
                    <div className="contact-info">
                      <div className="contact-item">
                        <i className="fas fa-envelope"></i>
                        <span>{supervisor.email}</span>
                      </div>
                      <div className="contact-item">
                        <i className="fas fa-phone"></i>
                        <span>{supervisor.phone}</span>
                      </div>
                      <div className="contact-item">
                        <i className="fas fa-building"></i>
                        <span>{supervisor.office}</span>
                      </div>
                      <div className="contact-item">
                        <i className="fas fa-clock"></i>
                        <span>{supervisor.officeHours}</span>
                      </div>
                    </div>
                    <div className="expertise-section mt-3">
                      <h6>Areas of Expertise:</h6>
                      <div className="expertise-tags">
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

            <div className="card costudents-card mt-4">
              <div className="card-header bg-warning text-dark">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <i className="fas fa-users me-2"></i>
                    Co-Students
                  </h5>
                  <span className="badge bg-dark">{coStudents.length} students</span>
                </div>
              </div>
              <div className="card-body">
                {coStudents.length > 0 ? (
                  <div className="co-students-list">
                    {coStudents.map(student => (
                      <div key={student.id} className="co-student-item">
                        <div className="student-avatar">
                          <i className="fas fa-user-circle"></i>
                        </div>
                        <div className="student-info">
                          <h6 className="mb-1">{student.name}</h6>
                          <p className="text-muted mb-0">{student.regNo}</p>
                          <small className="text-primary">{student.email}</small>
                          {student.projectTitle && (
                            <div className="project-info">
                              <small className="text-muted">Project: {student.projectTitle}</small>
                              <span className={`status-badge ${student.status}`}>
                                {student.status.replace('_', ' ')}
                              </span>
                            </div>
                          )}
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