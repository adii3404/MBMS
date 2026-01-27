import React from 'react';
import Layout from '../Components/Layout.jsx';

const AdminDashboard = () => {
  // Mock Data
  const recentSales = [
    { id: 1, med: 'Paracetamol', qty: 20, total: '₹100', date: '2023-10-01' },
    { id: 2, med: 'Amoxicillin', qty: 5, total: '₹250', date: '2023-10-02' },
    { id: 3, med: 'Cough Syrup', qty: 10, total: '₹500', date: '2023-10-03' },
    { id: 4, med: 'Vitamin C', qty: 50, total: '₹200', date: '2023-10-03' },
  ];

  return (
    <Layout>
      <h2>Admin Dashboard</h2>
      <p style={{marginBottom: '20px', color: '#666'}}>Overview of the pharmacy performance.</p>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Medicines</h3>
          <p>1,240</p>
        </div>
        <div className="stat-card">
          <h3>Total Sales</h3>
          <p>₹ 45,200</p>
        </div>
        <div className="stat-card">
          <h3>Total Purchases</h3>
          <p>₹ 30,000</p>
        </div>
        <div className="stat-card" style={{borderLeftColor: '#dc3545'}}>
          <h3>Low Stock Items</h3>
          <p style={{color: '#dc3545'}}>12</p>
        </div>
      </div>

      {/* Recent Sales Table */}
      <div className="card">
        <h3>Recent Sales Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Medicine Name</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentSales.map((sale) => (
              <tr key={sale.id}>
                <td>#{sale.id}</td>
                <td>{sale.med}</td>
                <td>{sale.qty}</td>
                <td>{sale.total}</td>
                <td>{sale.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default AdminDashboard;