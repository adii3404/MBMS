import React from "react";
import Layout from '../Components/Layout.jsx';

function AdminDashboard() {
  // Read data from LocalStorage safely
  const medicines = JSON.parse(localStorage.getItem("medicines")) || [];
  const sales = JSON.parse(localStorage.getItem("sales")) || [];
  const purchases = JSON.parse(localStorage.getItem("purchases")) || [];

  // Calculations
  const totalMedicines = medicines.length;

  const totalSales = sales.reduce(
    (sum, sale) => sum + (sale.total || 0),
    0
  );

  const totalPurchases = purchases.reduce(
    (sum, purchase) => sum + (purchase.total || 0),
    0
  );

  const lowStockMedicines = medicines.filter(
    (m) => m.stock !== undefined && m.stock < 10
  );

  const recentSales = [...sales]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <Layout>
      <div className="dashboard-page">
        <h2>Admin Dashboard</h2>

        {/* TOP SUMMARY CARDS */}
        <div className="dashboard-cards">
          <div className="card">
            <h4>Total Medicines</h4>
            <p>{totalMedicines}</p>
          </div>

          <div className="card">
            <h4>Total Sales (₹)</h4>
            <p>₹ {totalSales}</p>
          </div>

          <div className="card">
            <h4>Total Purchases (₹)</h4>
            <p>₹ {totalPurchases}</p>
          </div>

          <div className="card warning">
            <h4>Low Stock Medicines</h4>
            <p>{lowStockMedicines.length}</p>
          </div>
        </div>

        {/* RECENT SALES */}
        <div className="dashboard-section">
          <h3>Recent Sales</h3>

          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Invoice No</th>
                <th>Date</th>
                <th>Total (₹)</th>
              </tr>
            </thead>

            <tbody>
              {recentSales.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    No sales found
                  </td>
                </tr>
              ) : (
                recentSales.map((sale) => (
                  <tr key={sale.id}>
                    <td>{sale.invoiceNo}</td>
                    <td>{sale.date}</td>
                    <td>₹ {sale.total}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
