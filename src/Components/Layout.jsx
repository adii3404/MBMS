import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get user from local storage
  const user = JSON.parse(localStorage.getItem('user'));

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Helper to check active link for styling
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>MediCare</h2>
        <nav>
          {/* Admin Links */}
          {user && user.role === 'admin' && (
            <Link to="/admin-dashboard" className={isActive('/admin-dashboard')}>
              Admin Dashboard
            </Link>
          )}
          {/* Admin Links */}
          {user && user.role === 'admin' && (
            <Link to="/billing-dashboard" className={isActive('/billing-dashboard')}>
              Billing Dashboard
            </Link>
          )}

          {/* Staff Links */}
          {user && user.role === 'staff' && (
            <Link to="/staff-dashboard" className={isActive('/staff-dashboard')}>
              Staff Dashboard
            </Link>
          )}

          {user && user.role === 'staff' && (
            <Link to="/billing-dashboard" className={isActive('/billing-dashboard')}>
              Billing Dashboard
            </Link>
          )}

          {user && user.role === 'admin' && (
            <Link to="/medicines" className={isActive('/medicines')}>
              Medicines
            </Link>
          )}

          {user && user.role === 'admin' && (
            <Link to="/customers" className={isActive('/customers')}>
              Customers
            </Link>
          )}

          {user && user.role === 'admin' && (
            <Link to="/purchase" className={isActive('/purchase')}>
              Purchase
            </Link>
          )}

          {user && user.role === 'admin' && (
            <Link to="/reports" className={isActive('/reports')}>
              Reports
            </Link>
          )}

          {user && user.role === 'admin' && (
            <Link to="/dealers" className={isActive('/dealers')}>
              Dealers
            </Link>
          )}

          {user && user.role === 'admin' && (
            <Link to="/settings" className={isActive('/settings')}>
              Settings
            </Link>
          )}

          {/* Common Links */}
          <Link to="/profile" className={isActive('/profile')}>
            My Profile
          </Link>
          <Link to="/change-password" className={isActive('/change-password')}>
            Change Password
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <h3>MEDICARE</h3>
          <div className="user-info">
            <span className="user-email">{user ? user.email : 'Guest'}</span>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="dashboard-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;