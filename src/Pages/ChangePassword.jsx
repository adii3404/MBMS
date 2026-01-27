import React from 'react';
import Layout from '../Components/Layout.jsx';

const ChangePassword = () => {
  return (
    <Layout>
      <h2>Change Password</h2>
      <div className="card" style={{maxWidth: '500px'}}>
        <form onSubmit={(e) => { e.preventDefault(); alert("Password changed successfully (Mock)!"); }}>
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
          <button type="submit" className="btn btn-primary">Update Password</button>
        </form>
      </div>
    </Layout>
  );
};

export default ChangePassword;