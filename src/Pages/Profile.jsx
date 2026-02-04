import React from 'react';
import Layout from '../Components/Layout.jsx';


const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Layout>
      <div className="profile-page">
        <h2 className="profile-title">My Profile</h2>

        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user?.name?.charAt(0)}
            </div>

            <div className="profile-info">
              <h3>{user?.name}</h3>
              <span className="profile-role">
                {user?.role?.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="profile-field">
            <label>Email Address</label>
            <input type="text" value={user?.email || ''} disabled />
          </div>

          <div className="profile-field">
            <label>Role</label>
            <input type="text" value={user?.role || ''} disabled />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
