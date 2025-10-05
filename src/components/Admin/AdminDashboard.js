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
    // Use mock data instead of API calls
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

  const handleAddSupervisor = () => {
    setLoading(true);
    setError('');

    // Validation for Supervisor
    if (!newUser.username || !newUser.password || !newUser.email || !newUser.staffId) {
      setError('Username, password, email, and Staff ID are required');
      setLoading(false);
      return;
    }

    // Check for duplicate supervisor
    const duplicate = supervisors.find(u =>
      u.username === newUser.username || u.email === newUser.email 
    );

    if (duplicate) {
      setError('A supervisor with this username or email already exists');
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
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

      // Reset the form
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
            status: 'pending',
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

  // Enhanced duplicate topic detection
  const checkDuplicateTopic = (title) => {
    return topics.some(topic =>
      topic.title.toLowerCase().trim() === title.toLowerCase().trim()
    );
  };

  const handleAddTopic = () => {
    setLoading(true);
    setError('');
    
    if (!newTopic.title) {
      setError('Topic title is required');
      setLoading(false);
      return;
    }
    
    // Enhanced duplicate detection
    const duplicate = topics.find(t =>
      t.title.toLowerCase().trim() === newTopic.title.toLowerCase().trim()
    );
    
    if (duplicate) {
      setError(`Topic "${newTopic.title}" already exists! Please choose a different title.`);
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
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src="/unizik-logo.png"
                  alt="UNIZIK Logo"
                  style={{ width: '45px', marginRight: '15px' }}
                />
                <div>
                  <h1 style={{ margin: 0, fontSize: '1.8rem'}}>
                    <i className="fas fa-user-shield me-2"></i>
                    Admin Dashboard
                  </h1>
                  <p className="welcome-text" style={{ margin: 0}}>
                    Nnamdi Azikiwe University, Awka
                  </p>
                  <p style={{ margin: '5px 0 0 0', color: '#6c757d', fontSize: '14px' }}>
                    System Administrator: <strong>{user.username}</strong>
                  </p>
                </div>
              </div>
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

            <div className="col-12 mt-4">
              <div className="card">
                <div className="card-header">
                  <h5>Quick Actions</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <button className="btn btn-primary w-100" onClick={handleRunAllocation}>
                        <i className="fas fa-robot me-2"></i>
                        Run Auto Allocation
                      </button>
                    </div>
                    <div className="col-md-4 mb-3">
                      <button className="btn btn-success w-100" onClick={handleExportReport}>
                        <i className="fas fa-file-export me-2"></i>
                        Export Report
                      </button>
                    </div>
                    <div className="col-md-4 mb-3">
                      <button className="btn btn-info w-100" onClick={() => setActiveTab('settings')}>
                        <i className="fas fa-cog me-2"></i>
                        System Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h5>Add New Student</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Username*</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.username}
                      onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                      placeholder="Enter username"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password*</label>
                    <input
                      type="password"
                      className="form-control"
                      value={newUser.password}
                      onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                      placeholder="Enter password"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email*</label>
                    <input
                      type="email"
                      className="form-control"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.firstName}
                      onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.lastName}
                      onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                      placeholder="Enter last name"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Registration Number*</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.registrationNumber}
                      onChange={(e) => setNewUser({...newUser, registrationNumber: e.target.value})}
                      placeholder="e.g., STU2024001"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Department</label>
                    <select
                      className="form-select"
                      value={newUser.department}
                      onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Electrical Engineering">Electrical Engineering</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                    </select>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={handleAddUser}
                    disabled={loading || !newUser.username || !newUser.password || !newUser.email || !newUser.registrationNumber}
                  >
                    {loading ? 'Adding...' : 'Add Student'}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <h5>Manage Students ({students.length})</h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Username</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Reg No</th>
                          <th>Department</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map(student => (
                          <tr key={student.id}>
                            <td>{student.username}</td>
                            <td>{student.firstName} {student.lastName}</td>
                            <td>{student.email}</td>
                            <td>{student.registrationNumber}</td>
                            <td>{student.department}</td>
                            <td>
                              <span className={`badge ${student.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                                {student.status}
                              </span>
                            </td>
                            <td>
                              <div className="btn-group">
                                <button
                                  className="btn btn-outline-primary btn-sm"
                                  onClick={() => handleEditStudent(student.id)}
                                  title="Edit Student"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={() => handleDeleteStudent(student.id)}
                                  title="Delete Student"
                                >
                                  <i className="fas fa-trash"></i>
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
        )}

        {activeTab === 'supervisors' && (
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h5>Add New Supervisor</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Username*</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.username}
                      onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                      placeholder="Enter username"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password*</label>
                    <input
                      type="password"
                      className="form-control"
                      value={newUser.password}
                      onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                      placeholder="Enter password"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email*</label>
                    <input
                      type="email"
                      className="form-control"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.firstName}
                      onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.lastName}
                      onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                      placeholder="Enter last name"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Staff ID*</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.staffId}
                      onChange={(e) => setNewUser({...newUser, staffId: e.target.value})}
                      placeholder="e.g., LEC2024001"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Department</label>
                    <select
                      className="form-select"
                      value={newUser.department}
                      onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Electrical Engineering">Electrical Engineering</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                    </select>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={handleAddSupervisor}
                    disabled={loading || !newUser.username || !newUser.password || !newUser.email || !newUser.staffId}
                  >
                    {loading ? 'Adding...' : 'Add Supervisor'}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <h5>Manage Supervisors ({supervisors.length})</h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Username</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Staff ID</th>
                          <th>Department</th>
                          <th>Capacity</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {supervisors.map(supervisor => (
                          <tr key={supervisor.id}>
                            <td>{supervisor.username}</td>
                            <td>{supervisor.firstName} {supervisor.lastName}</td>
                            <td>{supervisor.email}</td>
                            <td>{supervisor.staffId}</td>
                            <td>{supervisor.department}</td>
                            <td>{supervisor.capacity} students</td>
                            <td>
                              <span className={`badge ${supervisor.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                                {supervisor.status}
                              </span>
                            </td>
                            <td>
                              <div className="btn-group">
                                <button
                                  className="btn btn-outline-primary btn-sm"
                                  onClick={() => handleEditSupervisor(supervisor.id)}
                                  title="Edit Supervisor"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button
                                  className="btn btn-outline-info btn-sm"
                                  onClick={() => handleViewSupervisor(supervisor.id)}
                                  title="View Supervisor"
                                >
                                  <i className="fas fa-eye"></i>
                                </button>
                                <button
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={() => handleDeleteSupervisor(supervisor.id)}
                                  title="Delete Supervisor"
                                >
                                  <i className="fas fa-trash"></i>
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
        )}

        {activeTab === 'topics' && (
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h5>Add New Topic</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Topic Title*</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newTopic.title}
                      onChange={(e) => setNewTopic({...newTopic, title: e.target.value})}
                      placeholder="Enter topic title"
                    />
                    {newTopic.title && checkDuplicateTopic(newTopic.title) && (
                      <div className="text-danger mt-1">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        Topic with the title already exists
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={newTopic.description}
                      onChange={(e) => setNewTopic({...newTopic, description: e.target.value})}
                      placeholder="Enter topic description"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Department</label>
                    <select
                      className="form-select"
                      value={newTopic.department}
                      onChange={(e) => setNewTopic({...newTopic, department: e.target.value})}
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Electrical Engineering">Electrical Engineering</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                    </select>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={handleAddTopic}
                    disabled={loading || !newTopic.title || checkDuplicateTopic(newTopic.title)}
                  >
                    {loading ? 'Adding...' : 'Add Topic'}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <h5>Manage Topics ({topics.length})</h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Department</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topics.map(topic => (
                          <tr key={topic.id}>
                            <td><strong>{topic.title}</strong></td>
                            <td><small className="text-muted">{topic.description}</small></td>
                            <td>{topic.department}</td>
                            <td>
                              <span className={`badge ${topic.status === 'available' ? 'bg-success' : 'bg-info'}`}>
                                {topic.status}
                              </span>
                            </td>
                            <td>
                              <div className="btn-group">
                                <button
                                  className="btn btn-outline-primary btn-sm"
                                  onClick={() => handleEditTopic(topic.id)}
                                  title="Edit Topic"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={() => handleDeleteTopic(topic.id)}
                                  title="Delete Topic"
                                >
                                  <i className="fas fa-trash"></i>
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
        )}

        {activeTab === 'allocation' && (
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5>Topic Allocation Management</h5>
                  <div>
                    <button className="btn btn-primary me-2" onClick={handleRunAllocation}>
                      <i className="fas fa-robot me-1"></i>
                      Run Auto Allocation
                    </button>
                    <button className="btn btn-success" onClick={handleExportReport}>
                      <i className="fas fa-file-export me-1"></i>
                      Export Report
                    </button>
                  </div>
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
                                <span className={`badge ${allocation.status === 'accepted' ? 'bg-success' : allocation.status === 'pending' ? 'bg-warning' : 'bg-danger'}`}>
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
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <h5>System Settings</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">System Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={systemSettings.systemName}
                      onChange={(e) => handleSettingsChange('systemName', e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Academic Year</label>
                    <input
                      type="text"
                      className="form-control"
                      value={systemSettings.academicYear}
                      onChange={(e) => handleSettingsChange('academicYear', e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Allocation Deadline</label>
                    <input
                      type="date"
                      className="form-control"
                      value={systemSettings.allocationDeadline}
                      onChange={(e) => handleSettingsChange('allocationDeadline', e.target.value)}
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={systemSettings.enableEmailNotifications}
                      onChange={(e) => handleSettingsChange('enableEmailNotifications', e.target.checked)}
                    />
                    <label className="form-check-label">Enable Email Notifications</label>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={handleSaveSettings}
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h5>System Information</h5>
                </div>
                <div className="card-body">
                  <p><strong>Version:</strong> 1.0.0</p>
                  <p><strong>Last Backup:</strong> Today, 10:30 AM</p>
                  <p><strong>Active Users:</strong> {students.length + supervisors.length + 1}</p>
                  <p><strong>Database:</strong> Mock Data</p>
                  <div className="mt-3">
                    <button className="btn btn-outline-secondary btn-sm me-2">
                      <i className="fas fa-database me-1"></i>
                      Backup Data
                    </button>
                    <button className="btn btn-outline-info btn-sm">
                      <i className="fas fa-chart-bar me-1"></i>
                      View Logs
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;