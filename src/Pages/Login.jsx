import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Stop page refresh

    // Hardcoded Admin
    if (email === 'admin@gmail.com' && password === '1234') {
      const userData = { email, role: 'admin', name: 'Super Admin' };
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/admin-dashboard');
    } 
    // Hardcoded Staff
    else if (email === 'staff@gmail.com' && password === '5678') {
      const userData = { email, role: 'staff', name: 'John Doe' };
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/staff-dashboard');
    } 
    // Invalid
    else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1  style={{color: '#50c127'}}>MediCare Login</h1>
        <p style={{marginBottom: '20px', color: '#666'}}>Please sign in to continue</p>
        
        {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
        
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
            Login
          </button>
        </form>
        
        <div style={{marginTop: '20px', fontSize: '12px', color: '#888', textAlign: 'left'}}>
          <p><strong>Demo Credentials:</strong></p>
          <p>Admin: admin@gmail.com / 1234</p>
          <p>Staff: staff@gmail.com / 5678</p>
        </div>
      </div>
    </div>
  );
};

export default Login;