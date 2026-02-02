import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Billing menu state (FIX)
  const [billingOpen, setBillingOpen] = useState(false);

  // Get user from local storage
  const user = JSON.parse(localStorage.getItem('user'));

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Helper to check active link
  const isActive = (path) =>
    location.pathname === path ? 'active' : '';

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>MediCare</h2>
        <nav>

          {/* Admin Dashboard */}
          {user && user.role === 'admin' && (
            <Link
              to="/admin-dashboard"
              className={isActive('/admin-dashboard')}
            >
              Admin Dashboard
            </Link>
          )}

          {/* ✅ Billing Dashboard (Parent) */}
          {user && (user.role === 'admin' || user.role === 'staff') && (
            <>
              <div
                className={`sidebar-parent ${
                  isActive('/new-sale') || isActive('/sales-history')
                    ? 'active'
                    : ''
                }`}
                onClick={() => setBillingOpen(!billingOpen)}
              >
                Billing Dashboard
              </div>

              {billingOpen && (
                <div className="sidebar-children">
                  <Link
                    to="/new-sale"
                    className={isActive('/new-sale')}
                  >
                    New Sale
                  </Link>

                  <Link
                    to="/sales-history"
                    className={isActive('/sales-history')}
                  >
                    Sales History
                  </Link>
                </div>
              )}
            </>
          )}

          {/* Staff Dashboard */}
          {user && user.role === 'staff' && (
            <Link
              to="/staff-dashboard"
              className={isActive('/staff-dashboard')}
            >
              Staff Dashboard
            </Link>
          )}

          {/* Admin Modules */}
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

          <Link
            to="/change-password"
            className={isActive('/change-password')}
          >
            Change Password
          </Link>

        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h3>MEDICARE</h3>
          <div className="user-info">
            <span className="user-email">
              {user ? user.email : 'Guest'}
            </span>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
