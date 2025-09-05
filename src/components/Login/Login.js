import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Form, FormGroup, Label, Input, Button, Alert, Spinner } from 'reactstrap';
import classnames from 'classnames';
import './Login.css';

const Login = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState('student');
  const [formData, setFormData] = useState({
    student: { username: '', password: '' },
    supervisor: { username: '', password: '' },
    admin: { username: '', password: '' }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      setError('');
    }
  };

  const handleInputChange = (tab, field, value) => {
    setFormData(prev => ({
      ...prev,
      [tab]: { ...prev[tab], [field]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const credentials = formData[activeTab];
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
          role: activeTab
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user, activeTab);
      } else {
        setError(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Network error. Please check if server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* UNIZIK Logo and Header - ADDED CODE */}
      <div style={{ textAlign: 'center', marginBottom: '70px' }}>
        <img 
          src="/unizik-logo.png" 
          alt="UNIZIK Logo" 
          style={{ width: '70px' }} 
        />
        <h5 style={{ margin: '10px 0 0 0', fontWeight: 'bold' }}>Nnamdi Azikiwe University, Awka</h5>
        <p style={{ margin: 0, color: 'black' }}>Project Topic Allocation System</p>
      </div>

      <div className="login-card">
        <div className="login-header">
          <h2><i className="fas fa-graduation-cap"></i> ProjectAlloc</h2>
          <p>Student Project Topic Allocation System for Monitoring Duplication</p>
        </div>
        
        <Nav tabs className="login-tabs">
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === 'student' })}
              onClick={() => toggleTab('student')}
            >
              <i className="fas fa-user-graduate"></i> Student
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === 'supervisor' })}
              onClick={() => toggleTab('supervisor')}
            >
              <i className="fas fa-chalkboard-teacher"></i> Supervisor
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === 'admin' })}
              onClick={() => toggleTab('admin')}
            >
              <i className="fas fa-user-shield"></i> Admin
            </NavLink>
          </NavItem>
        </Nav>
        
        <TabContent activeTab={activeTab} className="p-3">
          <TabPane tabId="student">
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="student-username">Registration Number</Label>
                <Input
                  type="text"
                  id="student-username"
                  value={formData.student.username}
                  onChange={(e) => handleInputChange('student', 'username', e.target.value)}
                  placeholder="Enter your registration number"
                  required
                  disabled={loading}
                />
              </FormGroup>
              <FormGroup>
                <Label for="student-password">Password</Label>
                <Input
                  type="password"
                  id="student-password"
                  value={formData.student.password}
                  onChange={(e) => handleInputChange('student', 'password', e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
              </FormGroup>
              <Button color="primary" block disabled={loading}>
                {loading ? <Spinner size="sm" /> : 'Login as Student'}
              </Button>
            </Form>
          </TabPane>
          
          <TabPane tabId="supervisor">
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="supervisor-username">Staff ID</Label>
                <Input
                  type="text"
                  id="supervisor-username"
                  value={formData.supervisor.username}
                  onChange={(e) => handleInputChange('supervisor', 'username', e.target.value)}
                  placeholder="Enter your staff ID"
                  required
                  disabled={loading}
                />
              </FormGroup>
              <FormGroup>
                <Label for="supervisor-password">Password</Label>
                <Input
                  type="password"
                  id="supervisor-password"
                  value={formData.supervisor.password}
                  onChange={(e) => handleInputChange('supervisor', 'password', e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
              </FormGroup>
              <Button color="primary" block disabled={loading}>
                {loading ? <Spinner size="sm" /> : 'Login as Supervisor'}
              </Button>
            </Form>
          </TabPane>
          
          <TabPane tabId="admin">
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="admin-username">Admin ID</Label>
                <Input
                  type="text"
                  id="admin-username"
                  value={formData.admin.username}
                  onChange={(e) => handleInputChange('admin', 'username', e.target.value)}
                  placeholder="Enter your admin ID"
                  required
                  disabled={loading}
                />
              </FormGroup>
              <FormGroup>
                <Label for="admin-password">Password</Label>
                <Input
                  type="password"
                  id="admin-password"
                  value={formData.admin.password}
                  onChange={(e) => handleInputChange('admin', 'password', e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
              </FormGroup>
              <Button color="primary" block disabled={loading}>
                {loading ? <Spinner size="sm" /> : 'Login as Administrator'} {/* FIXED THIS LINE */}
              </Button>
            </Form>
          </TabPane>
        </TabContent>
        
        {error && <Alert color="danger" className="mt-3">{error}</Alert>}
        
        <div className="login-footer">
          <p className="text-center mb-0">
            <small>Demo: Use your username and password</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;