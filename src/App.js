import React, { useState, useEffect } from 'react';
import Login from './components/Login/Login';
import StudentDashboard from './components/Student/StudentDashboard';
import SupervisorDashboard from './components/Supervisor/SupervisorDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setCurrentUser(user);
        setUserRole(user.role);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData, role) => {
    setCurrentUser(userData);
    setUserRole(role);
    console.log('User logged in:', userData, 'Role:', role);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setUserRole('');
  };

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading application...</p>
      </div>
    );
  }

  if (currentUser) {
    // Render the appropriate dashboard based on user role
    if (currentUser.role === 'student') {
      return <StudentDashboard user={currentUser} onLogout={handleLogout} />;
    } else if (currentUser.role === 'supervisor') {
      return <SupervisorDashboard user={currentUser} onLogout={handleLogout} />;
    } else if (currentUser.role === 'admin') {
      return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
    } else {
      // Show simple dashboard for other roles
      return (
        <div className="app-container">
          <nav className="navbar navbar-dark bg-primary">
            <div className="container">
              <span className="navbar-brand mb-0 h1">
                <i className="fas fa-graduation-cap me-2"></i>
                ProjectAlloc - {currentUser.role} Dashboard
              </span>
              <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt me-1"></i>Logout
              </button>
            </div>
          </nav>
          <div className="container mt-4">
            <div className="row">
              <div className="col-md-8 mx-auto">
                <div className="card">
                  <div className="card-body text-center">
                    <h3>🎉 Welcome to Your Dashboard!</h3>
                    <p className="text-muted">You are logged in as a {currentUser.role}</p>
                    <div className="mt-4">
                      <pre className="text-start">
                        {JSON.stringify(currentUser, null, 2)}
                      </pre>
                    </div>
                    <button className="btn btn-primary mt-3" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="App">
      <Login onLogin={handleLogin} />
    </div>
  );
}

export default App;