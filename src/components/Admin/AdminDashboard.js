import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

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

  // Load mock data - will work without backend API
  useEffect(() => {
    setTimeout(() => {
      setStudents([
        { 
          id: 1, 
          username: 'student1', 
          email: 'student1@university.edu', 
          firstName: 'John',
          lastName: 'Doe',
          registrationNumber: 'STU2024001', 
          department: 'Computer Science',
          status: 'active',
          yearOfStudy: 4
        },
        { 
          id: 2, 
          username: 'student2', 
          email: 'student2@university.edu', 
          firstName: 'Jane',
          lastName: 'Smith',
          registrationNumber: 'STU2024002', 
          department: 'Electrical Engineering',
          status: 'active',
          yearOfStudy: 3
        },
        { 
          id: 3, 
          username: 'student3', 
          email: 'student3@university.edu', 
          firstName: 'Chinedu',
          lastName: 'Okoro',
          registrationNumber: 'STU2024003', 
          department: 'Computer Science',
          status: 'inactive',
          yearOfStudy: 4
        }
      ]);
      
      setSupervisors([
        { 
          id: 101, 
          username: 'drsmith', 
          email: 'drsmith@university.edu', 
          firstName: 'Sarah',
          lastName: 'Johnson',
          staffId: 'LEC2024001',
          department: 'Computer Science', 
          status: 'active', 
          capacity: 5,
          position: 'Associate Professor',
          expertise: ['Artificial Intelligence', 'Machine Learning']
        },
        { 
          id: 102, 
          username: 'profjohnson', 
          email: 'profjohnson@university.edu', 
          firstName: 'Michael',
          lastName: 'Johnson',
          staffId: 'LEC2024002',
          department: 'Electrical Engineering', 
          status: 'active', 
          capacity: 4,
          position: 'Professor',
          expertise: ['Internet of Things', 'Embedded Systems']
        },
        { 
          id: 103, 
          username: 'drwilliams', 
          email: 'drwilliams@university.edu', 
          firstName: 'Elizabeth',
          lastName: 'Williams',
          staffId: 'LEC2024003',
          department: 'Mechanical Engineering', 
          status: 'inactive', 
          capacity: 0,
          position: 'Senior Lecturer',
          expertise: ['Thermodynamics', 'Fluid Mechanics']
        }
      ]);
      
      setTopics([
        { 
          id: 1, 
          title: 'AI-Based Project Topic Duplication Detection', 
          description: 'Machine learning system for detecting duplicate project topics', 
          department: 'Computer Science', 
          status: 'available', 
          createdBy: 'System',
          createdAt: '2024-01-10'
        },
        { 
          id: 2, 
          title: 'Blockchain-based Secure Voting System', 
          description: 'Secure voting system using blockchain technology', 
          department: 'Computer Science', 
          status: 'allocated', 
          createdBy: 'drsmith',
          createdAt: '2024-01-12',
          studentId: 1
        },
        { 
          id: 3, 
          title: 'IoT-based Smart Classroom Monitoring', 
          description: 'Real-time classroom monitoring using IoT sensors', 
          department: 'Electrical Engineering', 
          status: 'available', 
          createdBy: 'profjohnson',
          createdAt: '2024-01-15'
        }
      ]);
      
      setAllocations([
        { 
          id: 1, 
          studentId: 1,
          student: 'student1', 
          supervisorId: 101,
          supervisor: 'drsmith', 
          topic: 'Blockchain-based Secure Voting System', 
          status: 'accepted', 
          allocatedDate: '2024-01-10',
          deadline: '2024-05-15'
        },
        { 
          id: 2, 
          studentId: 2,
          student: 'student2', 
          supervisorId: 101,
          supervisor: 'drsmith', 
          topic: 'AI-Based Project Topic Duplication Detection', 
          status: 'pending', 
          allocatedDate: '2024-01-12',
          deadline: '2024-05-15'
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddUser = () => {
    setLoading(true);
    setError('');
    
    // Validate inputs
    if (!newUser.username || !newUser.password || !newUser.email) {
      setError('Username, password, and email are required');
      setLoading(false);
      return;
    }
    
    // Check for duplicates
    const users = newUser.type === 'student' ? students : supervisors;
    const duplicate = users.find(u => 
      u.username === newUser.username || u.email === newUser.email
    );
    
    if (duplicate) {
      setError(`${newUser.type} with this username or email already exists`);
      setLoading(false);
      return;
    }
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Create new user object
      const newUserObj = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        username: newUser.username,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        department: newUser.department,
        status: 'active'
      };
      
      // Add type-specific fields
      if (newUser.type === 'student') {
        newUserObj.registrationNumber = newUser.registrationNumber;
        newUserObj.yearOfStudy = 4;
        setStudents([...students, newUserObj]);
      } else {
        newUserObj.staffId = newUser.staffId;
        newUserObj.capacity = 5;
        newUserObj.position = 'Lecturer';
        setSupervisors([...supervisors, newUserObj]);
      }
      
      setMessage(`${newUser.type.charAt(0).toUpperCase() + newUser.type.slice(1)} added successfully!`);
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
    
    // Validate inputs
    if (!newTopic.title) {
      setError('Topic title is required');
      setLoading(false);
      return;
    }
    
    // Check for duplicates
    const duplicate = topics.find(t => 
      t.title.toLowerCase() === newTopic.title.toLowerCase()
    );
    
    if (duplicate) {
      setError('Topic with this title already exists');
      setLoading(false);
      return;
    }
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Create new topic object
      const newTopicObj = {
        id: Math.max(...topics.map(t => t.id), 0) + 1,
        title: newTopic.title,
        description: newTopic.description,
        department: newTopic.department,
        status: 'available',
        createdBy: 'admin',
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setTopics([...topics, newTopicObj]);
      setMessage('Topic added successfully!');
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

  // Check for duplicate topics
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
      {/* Header */}
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

      {/* Navigation Tabs */}
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

      {/* Main Content */}
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

        {/* Overview Tab */}
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
                  <h5>Recent Activity</h5>
                </div>
                <div className="card-body">
                  <div className="activity-list">
                    <div className="activity-item">
                      <i className="fas fa-user-plus text-success"></i>
                      <span>New student registered: student3</span>
                      <small className="text-muted">2 hours ago</small>
                    </div>
                    <div className="activity-item">
                      <i className="fas fa-tasks text-primary"></i>
                      <span>New topic added: IoT-based Smart Classroom Monitoring</span>
                      <small className="text-muted">5 hours ago</small>
                    </div>
                    <div className="activity-item">
                      <i className="fas fa-check-circle text-info"></i>
                      <span>Topic allocation accepted by student1</span>
                      <small className="text-muted">1 day ago</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Students Tab */}
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
                                <button className="btn btn-outline-primary btn-sm">
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button className="btn btn-outline-danger btn-sm">
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

        {/* Supervisors Tab */}
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
                    onClick={() => {
                      setNewUser({...newUser, type: 'supervisor'});
                      handleAddUser();
                    }} 
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
                                <button className="btn btn-outline-primary btn-sm">
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button className="btn btn-outline-info btn-sm">
                                  <i className="fas fa-eye"></i>
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

        {/* Topics Tab with Duplication Check */}
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
                        <i className="fas fa-exclamation-triangle me-1"></i>
                        Topic with this title already exists!
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
                          <th>Created By</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topics.map(topic => (
                          <tr key={topic.id}>
                            <td>
                              <strong>{topic.title}</strong>
                            </td>
                            <td>
                              <small className="text-muted">{topic.description}</small>
                            </td>
                            <td>{topic.department}</td>
                            <td>
                              <span className={`badge ${topic.status === 'available' ? 'bg-success' : 'bg-info'}`}>
                                {topic.status}
                              </span>
                            </td>
                            <td>{topic.createdBy}</td>
                            <td>
                              <div className="btn-group">
                                <button className="btn btn-outline-primary btn-sm">
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button className="btn btn-outline-danger btn-sm">
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

        {/* Allocation Tab */}
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
                        {allocations.map(allocation => (
                          <tr key={allocation.id}>
                            <td>{allocation.student}</td>
                            <td>{allocation.supervisor}</td>
                            <td>{allocation.topic}</td>
                            <td>
                              <span className={`badge ${allocation.status === 'accepted' ? 'bg-success' : 'bg-warning'}`}>
                                {allocation.status}
                              </span>
                            </td>
                            <td>{allocation.allocatedDate}</td>
                            <td>{allocation.deadline}</td>
                            <td>
                              <div className="btn-group">
                                <button className="btn btn-outline-info btn-sm">
                                  <i className="fas fa-eye"></i>
                                </button>
                                <button className="btn btn-outline-warning btn-sm">
                                  <i className="fas fa-sync"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-primary me-2">
                      <i className="fas fa-cogs me-1"></i>Run Auto Allocation
                    </button>
                    <button className="btn btn-outline-secondary">
                      <i className="fas fa-download me-1"></i>Export Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab - Updated with 2024/2025 and May 15, 2025 */}
        {activeTab === 'settings' && (
          <div className="row">
            <div className="col-md-6">
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
                  <button className="btn btn-primary" onClick={handleSaveSettings} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5>System Information</h5>
                </div>
                <div className="card-body">
                  <div className="system-info">
                    <p><strong>Version:</strong> 1.0.0</p>
                    <p><strong>Database:</strong> PostgreSQL 15</p>
                    <p><strong>Backend:</strong> Node.js + Express</p>
                    <p><strong>Frontend:</strong> React.js</p>
                    <p><strong>Academic Year:</strong> {systemSettings.academicYear}</p>
                    <p><strong>Allocation Deadline:</strong> {systemSettings.allocationDeadline}</p>
                    <p><strong>Last Backup:</strong> 2024-01-14 08:30:45</p>
                    <p><strong>System Status:</strong> <span className="text-success">Operational</span></p>
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-outline-info btn-sm me-2">
                      <i className="fas fa-database me-1"></i>Backup Database
                    </button>
                    <button className="btn btn-outline-warning btn-sm">
                      <i className="fas fa-sync me-1"></i>Clear Cache
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