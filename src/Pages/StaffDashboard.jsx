import React from 'react';
import Layout from '../Components/Layout.jsx';

const StaffDashboard = () => {
  // Mock Data
  const todaySales = [
    { id: 101, med: 'Aspirin', time: '10:30 AM', amount: '₹50' },
    { id: 102, med: 'Bandages', time: '11:15 AM', amount: '₹120' },
    { id: 103, med: 'Syrup', time: '12:00 PM', amount: '₹85' },
  ];

  return (
    <Layout>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h2>Billing Staff Dashboard</h2>
        <button className="btn btn-primary" onClick={() => alert("This opens the New Bill Modal (UI Only)")}>
          + Create New Bill
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Today's Sales</h3>
          <p>₹ 255</p>
        </div>
        <div className="stat-card">
          <h3>Bills Created</h3>
          <p>3</p>
        </div>
      </div>

      <div className="card">
        <h3>Today's Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Bill ID</th>
              <th>Items</th>
              <th>Time</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {todaySales.map((sale) => (
              <tr key={sale.id}>
                <td>#{sale.id}</td>
                <td>{sale.med}</td>
                <td>{sale.time}</td>
                <td>{sale.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default StaffDashboard;