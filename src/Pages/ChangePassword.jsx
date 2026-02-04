import React from 'react';
import Layout from '../Components/Layout.jsx';


const ChangePassword = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Password changed successfully (Mock)!');
  };

  return (
    <Layout>
      <div className="change-password-page">
        <h2 className="change-password-title">Change Password</h2>

        <div className="change-password-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Current Password</label>
              <input type="password" required />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input type="password" required />
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input type="password" required />
            </div>

            <button type="submit" className="btn-primary">
              Update Password
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ChangePassword;
