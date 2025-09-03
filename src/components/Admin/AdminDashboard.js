import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { mockStudents, mockSupervisors, mockTopics, mockAllocations } from '../../mockData';

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [students, setStudents] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [topics, setTopics] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({
    type: 'student',
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    department: 'Computer Science',
    registrationNumber: '',
    staffId: ''
  });
  const [newTopic, setNewTopic] = useState({
    title: '',
    description: '',
    department: 'Computer Science'
  });
  const [systemSettings, setSystemSettings] = useState({
    systemName: 'Project Allocation System',
    academicYear: '2024/2025',
    allocationDeadline: '2025-05-15',
    enableEmailNotifications: true
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setStudents(mockStudents);
      setSupervisors(mockSupervisors);
      setTopics(mockTopics);
      setAllocations(mockAllocations);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEditStudent = (studentId) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      alert(`Edit student: ${student.firstName} ${student.lastName}\nEdit form would open here.`);
    }
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
      setStudents(students.filter(student => student.id !== studentId));
      setMessage('Student deleted successfully!');
    }
  };

  const handleEditSupervisor = (supervisorId) => {
    const supervisor = supervisors.find(s => s.id === supervisorId);
    if (supervisor) {
      alert(`Edit supervisor: ${supervisor.firstName} ${supervisor.lastName}\nEdit form would open here.`);
    }
  };

  const handleDeleteSupervisor = (supervisorId) => {
    if (window.confirm('Are you sure you want to delete this supervisor? This action cannot be undone.')) {
      setSupervisors(supervisors.filter(supervisor => supervisor.id !== supervisorId));
      setMessage('Supervisor deleted successfully!');
    }
  };

  const handleViewSupervisor = (supervisorId) => {
    const supervisor = supervisors.find(s => s.id === supervisorId);
    if (supervisor) {
      alert(`Supervisor Details:\nName: ${supervisor.firstName} ${supervisor.lastName}\nEmail: ${supervisor.email}\nDepartment: ${supervisor.department}\nStaff ID: ${supervisor.staffId}`);
    }
  };

  const handleEditTopic = (topicId) => {
    const topic = topics.find(t => t.id === topicId);
    if (topic) {
      alert(`Edit topic: ${topic.title}\nEdit form would open here.`);
    }
  };

  const handleDeleteTopic = (topicId) => {
    if (window.confirm('Are you sure you want to delete this topic? This action cannot be undone.')) {
      const topicToDelete = topics.find(t => t.id === topicId);
      const updatedAllocations = allocations.filter(allocation =>
        allocation.topic !== topicToDelete?.title
      );
      setAllocations(updatedAllocations);
      setTopics(topics.filter(topic => topic.id !== topicId));
      setMessage('Topic deleted successfully!');
    }
  };

  const handleViewAllocation = (allocationId) => {
    const allocation = allocations.find(a => a.id === allocationId);
    if (allocation) {
      const student = students.find(s => s.id === allocation.studentId);
      const supervisor = supervisors.find(s => s.id === allocation.supervisorId);
      alert(`Viewing allocation details:\nStudent: ${student?.firstName} ${student?.lastName}\nTopic: ${allocation.topic}\nSupervisor: ${supervisor?.firstName} ${supervisor?.lastName}`);
    }
  };

  const handleReallocate = (allocationId) => {
    if (window.confirm('Reallocate this topic to a different student?')) {
      const updatedAllocations = allocations.filter(allocation => allocation.id !== allocationId);
      setAllocations(updatedAllocations);
      setMessage('Topic available for reallocation. Run Auto Allocation again.');
    }
  };

  const handleRunAllocation = () => {
    setLoading(true);
    setTimeout(() => {
      const availableTopics = topics.filter(topic => topic.status === 'available');
      const unallocatedStudents = students.filter(student =>
        !allocations.some(allocation => allocation.studentId === student.id)
      );
      const newAllocations = [];
      const updatedTopics = [...topics];
      unallocatedStudents.forEach(student => {
        const matchingTopic = availableTopics.find(topic =>
          topic.department === student.department &&
          !newAllocations.some(a => a.topicId === topic.id)
        );
        if (matchingTopic) {
          const departmentSupervisor = supervisors.find(supervisor =>
            supervisor.department === student.department
          ) || supervisors[0];
          newAllocations.push({
            id: Math.max(...allocations.map(a => a.id), 0) + newAllocations.length + 1,
            studentId: student.id,
            student: student.username,
            supervisorId: departmentSupervisor.id,
            supervisor: departmentSupervisor.username,
            topic: matchingTopic.title,
            topicId: matchingTopic.id,
            status: 'accepted',
            allocatedDate: new Date().toISOString().split('T')[0],
            deadline: '2025-05-15'
          });
          const topicIndex = updatedTopics.findIndex(t => t.id === matchingTopic.id);
          if (topicIndex !== -1) {
            updatedTopics[topicIndex] = {
              ...updatedTopics[topicIndex],
              status: 'allocated',
              studentId: student.id
            };
          }
        }
      });
      if (newAllocations.length > 0) {
        setAllocations([...allocations, ...newAllocations]);
        setTopics(updatedTopics);
        setMessage(`Auto allocation completed! ${newAllocations.length} students allocated to topics automatically.`);
      } else {
        setMessage('No available topics matching unallocated students\' departments.');
      }
      setLoading(false);
    }, 1500);
  };

  const handleExportReport = () => {
    const csvContent = [
      ['Student ID', 'Student Name', 'Registration Number', 'Topic', 'Supervisor', 'Status', 'Allocation Date', 'Deadline'],
      ...allocations.map(allocation => {
        const student = students.find(s => s.id === allocation.studentId);
        const supervisor = supervisors.find(s => s.id === allocation.supervisorId);
        return [
          allocation.studentId,
          student ? `${student.firstName} ${student.lastName}` : allocation.student,
          student?.registrationNumber || 'N/A',
          allocation.topic,
          supervisor ? `${supervisor.firstName} ${supervisor.lastName}` : allocation.supervisor,
          allocation.status,
          allocation.allocatedDate,
          allocation.deadline
        ];
      })
    ].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `allocations-report-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    setMessage('Report exported successfully as CSV file!');
  };

  const handleAddUser = () => {
    setLoading(true);
    setError('');
    if (!newUser.username || !newUser.password || !newUser.email) {
      setError('Username, password, and email are required');
      setLoading(false);
      return;
    }
    const users = newUser.type === 'student' ? students : supervisors;
    const duplicate = users.find(u =>
      u.username === newUser.username || u.email === newUser.email
    );
    if (duplicate) {
      setError(`${newUser.type} with this username or email already exists`);
      setLoading(false);
      return;
    }
    setTimeout(() => {
      if (newUser.type === 'student') {
        const newStudent = {
          id: Math.max(...students.map(s => s.id), 0) + 1,
          username: newUser.username,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          registrationNumber: newUser.registrationNumber,
          department: newUser.department,
          status: 'active',
          yearOfStudy: 4,
          phone: '+234-800-000-0000'
        };
        setStudents([...students, newStudent]);
        setMessage('Student added successfully!');
      } else {
        const newSupervisor = {
          id: Math.max(...supervisors.map(s => s.id), 0) + 1,
          username: newUser.username,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          staffId: newUser.staffId,
          department: newUser.department,
          status: 'active',
          capacity: 5,
          position: 'Lecturer',
          expertise: ['General Supervision'],
          rating: 4.5,
          office: 'Block A, Room 101',
          officeHours: 'Monday-Friday: 9AM-5PM',
          phone: '+234-800-000-0000'
        };
        setSupervisors([...supervisors, newSupervisor]);
        setMessage('Supervisor added successfully!');
      }
      setNewUser({
        type: 'student',
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        department: 'Computer Science',
        registrationNumber: '',
        staffId: ''
      });
      setLoading(false);
    }, 500);
  };

  const handleAddTopic = () => {
    setLoading(true);
    setError('');
    if (!newTopic.title) {
      setError('Topic title is required');
      setLoading(false);
      return;
    }
    const duplicate = topics.find(t =>
      t.title.toLowerCase() === newTopic.title.toLowerCase()
    );
    if (duplicate) {
      setError('Topic with this title already exists');
      setLoading(false);
      return;
    }
    setTimeout(() => {
      const newTopicObj = {
        id: Math.max(...topics.map(t => t.id), 0) + 1,
        title: newTopic.title,
        description: newTopic.description,
        department: newTopic.department,
        status: 'available',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setTopics([...topics, newTopicObj]);
      setMessage('Topic added successfully! It will be available for auto-allocation.');
      setNewTopic({ title: '', description: '', department: 'Computer Science' });
      setLoading(false);
    }, 500);
  };

  const handleSaveSettings = () => {
    setLoading(true);
    setTimeout(() => {
      setMessage('System settings saved successfully!');
      setLoading(false);
    }, 500);
  };

  const handleSettingsChange = (field, value) => {
    setSystemSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const checkDuplicateTopic = (title) => {
    return topics.some(topic =>
      topic.title.toLowerCase().trim() === title.toLowerCase().trim()
    );
  };

  if (loading) {
    return (
      <div className="admin-dashboard-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-user-shield me-2"></i>
                Admin Dashboard
              </h1>
              <p className="welcome-text">
                System Administrator: <strong>{user.username}</strong>
              </p>
            </div>
            <div className="col-md-6 text-end">
              <div className="header-stats">
                <span className="badge bg-info me-2">
                  {students.length} Students
                </span>
                <span className="badge bg-success me-2">
                  {supervisors.length} Supervisors
                </span>
                <span className="badge bg-warning me-2">
                  {topics.length} Topics
                </span>
                <button className="btn btn-outline-danger btn-sm" onClick={onLogout}>
                  <i className="fas fa-sign-out-alt me-1"></i>Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className="admin-nav">
        <div className="container">
          <div className="nav nav-tabs">
            <button className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
              <i className="fas fa-tachometer-alt me-1"></i>Overview
            </button>
            <button className={`nav-link ${activeTab === 'students' ? 'active' : ''}`} onClick={() => setActiveTab('students')}>
              <i className="fas fa-user-graduate me-1"></i>Students
            </button>
            <button className={`nav-link ${activeTab === 'supervisors' ? 'active' : ''}`} onClick={() => setActiveTab('supervisors')}>
              <i className="fas fa-chalkboard-teacher me-1"></i>Supervisors
            </button>
            <button className={`nav-link ${activeTab === 'topics' ? 'active' : ''}`} onClick={() => setActiveTab('topics')}>
              <i className="fas fa-tasks me-1"></i>Topics
            </button>
            <button className={`nav-link ${activeTab === 'allocation' ? 'active' : ''}`} onClick={() => setActiveTab('allocation')}>
              <i className="fas fa-project-diagram me-1"></i>Allocation
            </button>
            <button className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
              <i className="fas fa-cog me-1"></i>Settings
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setError('')}></button>
          </div>
        )}

        {message && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {message}
            <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="row">
            <div className="col-md-3">
              <div className="card stat-card">
                <div className="card-body text-center">
                  <i className="fas fa-user-graduate text-primary stat-icon"></i>
                  <h3>{students.length}</h3>
                  <p>Total Students</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card stat-card">
                <div className="card-body text-center">
                  <i className="fas fa-chalkboard-teacher text-success stat-icon"></i>
                  <h3>{supervisors.length}</h3>
                  <p>Total Supervisors</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card stat-card">
                <div className="card-body text-center">
                  <i className="fas fa-tasks text-warning stat-icon"></i>
                  <h3>{topics.length}</h3>
                  <p>Project Topics</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card stat-card">
                <div className="card-body text-center">
                  <i className="fas fa-check-circle text-info stat-icon"></i>
                  <h3>{allocations.filter(a => a.status === 'accepted').length}</h3>
                  <p>Completed Allocations</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'allocation' && (
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5>Topic Allocation Management</h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Student</th>
                          <th>Supervisor</th>
                          <th>Project Topic</th>
                          <th>Status</th>
                          <th>Allocated Date</th>
                          <th>Deadline</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allocations.map(allocation => {
                          const student = students.find(s => s.id === allocation.studentId);
                          const supervisor = supervisors.find(s => s.id === allocation.supervisorId);
                          const topic = topics.find(t => t.id === allocation.topicId);

                          return (
                            <tr key={allocation.id}>
                              <td>
                                {student ? `${student.firstName} ${student.lastName}` : 'N/A'}
                                <br />
                                <small className="text-muted">{student?.registrationNumber || 'N/A'}</small>
                              </td>
                              <td>
                                {supervisor ? `Dr. ${supervisor.firstName} ${supervisor.lastName}` : 'N/A'}
                              </td>
                              <td>
                                {topic?.title || 'N/A'}
                              </td>
                              <td>
                                <span className={`badge ${allocation.status === 'accepted' ? 'bg-success' : 'bg-warning'}`}>
                                  {allocation.status}
                                </span>
                              </td>
                              <td>{allocation.allocatedDate}</td>
                              <td>{allocation.deadline}</td>
                              <td>
                                <div className="btn-group">
                                  <button
                                    className="btn btn-outline-info btn-sm"
                                    onClick={() => handleViewAllocation(allocation.id)}
                                    title="View Allocation"
                                  >
                                    <i className="fas fa-eye"></i>
                                  </button>
                                  <button
                                    className="btn btn-outline-warning btn-sm"
                                    onClick={() => handleReallocate(allocation.id)}
                                    title="Reallocate"
                                  >
                                    <i className="fas fa-sync"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-primary me-2" onClick={handleRunAllocation} disabled={loading}>
                      {loading ? 'Allocating...' : 'Run Auto Allocation'}
                    </button>
                    <button className="btn btn-outline-secondary" onClick={handleExportReport}>
                      <i className="fas fa-download me-1"></i>Export Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs (students, supervisors, topics, settings) remain the same as before */}
        {/* ... [rest of your existing code for other tabs] ... */}
        
      </div>
    </div>
  );
};

export default AdminDashboard;