import React from 'react';
import Layout from '../Components/Layout.jsx';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Layout>
      <h2>My Profile</h2>
      <div className="card" style={{maxWidth: '500px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px'}}>
          <div style={{width: '60px', height: '60px', borderRadius: '50%', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: 'white'}}>
            {user?.name.charAt(0)}
          </div>
          <div>
            <h3>{user?.name}</h3>
            <span style={{background: '#eee', padding: '2px 8px', borderRadius: '10px', fontSize: '12px'}}>
              {user?.role.toUpperCase()}
            </span>
          </div>
        </div>
        
        <div className="form-group">
          <label>Email Address</label>
          <input type="text" value={user?.email} disabled />
        </div>
        <div className="form-group">
          <label>Role</label>
          <input type="text" value={user?.role} disabled />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;