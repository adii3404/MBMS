import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";

const Reports = () => {
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    setSales(JSON.parse(localStorage.getItem("sales")) || []);
    setPurchases(JSON.parse(localStorage.getItem("purchases")) || []);
    setMedicines(JSON.parse(localStorage.getItem("medicines")) || []);
  }, []);

  // Filter by selected date
  const filteredSales = selectedDate
    ? sales.filter(
        s =>
          new Date(s.date).toLocaleDateString() ===
          new Date(selectedDate).toLocaleDateString()
      )
    : [];

  const filteredPurchases = selectedDate
    ? purchases.filter(
        p =>
          new Date(p.date).toLocaleDateString() ===
          new Date(selectedDate).toLocaleDateString()
      )
    : [];

  const totalSales = filteredSales.reduce(
    (sum, s) => sum + s.grandTotal,
    0
  );

  const totalPurchases = filteredPurchases.reduce(
    (sum, p) => sum + p.grandTotal,
    0
  );

  const profit = totalSales - totalPurchases;

  const lowStock = medicines.filter(m => m.stock < 10);

  // Graph heights (simple visual bars)
  const maxValue = Math.max(totalSales, totalPurchases, 1);
  const salesHeight = (totalSales / maxValue) * 150;
  const purchaseHeight = (totalPurchases / maxValue) * 150;

  return (
    <Layout>
      <div className="reports-page">
        <h2 className="reports-title">Reports Dashboard</h2>

        {/* DATE FILTER */}
        <div className="report-filter">
          <label>Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
          />
        </div>

        {!selectedDate ? (
          <p className="empty-row">Please select a date</p>
        ) : (
          <>
            {/* SUMMARY CARDS */}
            <div className="report-cards">
              <div className="report-card summary">
                <h4>Total Sales</h4>
                <p>₹ {totalSales}</p>
              </div>

              <div className="report-card summary">
                <h4>Total Purchases</h4>
                <p>₹ {totalPurchases}</p>
              </div>

              <div className="report-card summary">
                <h4>Profit</h4>
                <p
                  className={
                    profit >= 0 ? "profit" : "loss"
                  }
                >
                  ₹ {profit}
                </p>
              </div>
            </div>

            {/* GRAPH */}
            <div className="graph-section">
              <h3>Sales vs Purchases</h3>
              <div className="bar-graph">
                <div className="bar">
                  <div
                    className="bar-fill sales"
                    style={{ height: salesHeight }}
                  ></div>
                  <span>Sales</span>
                </div>

                <div className="bar">
                  <div
                    className="bar-fill purchase"
                    style={{ height: purchaseHeight }}
                  ></div>
                  <span>Purchase</span>
                </div>
              </div>
            </div>

            {/* SALES TABLE */}
            <div className="report-card">
              <h3>Sales Details</h3>
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Invoice</th>
                    <th>Customer</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSales.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="empty-row">
                        No sales found
                      </td>
                    </tr>
                  ) : (
                    filteredSales.map(s => (
                      <tr key={s.invoiceNo}>
                        <td>{s.invoiceNo}</td>
                        <td>{s.customer}</td>
                        <td>₹ {s.grandTotal}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* LOW STOCK */}
            <div className="report-card">
              <h3>Low Stock Medicines</h3>
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Medicine</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStock.length === 0 ? (
                    <tr>
                      <td colSpan="2" className="empty-row">
                        Stock is healthy
                      </td>
                    </tr>
                  ) : (
                    lowStock.map(m => (
                      <tr key={m.id}>
                        <td>{m.name}</td>
                        <td className="low-stock">
                          {m.stock}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Reports;
