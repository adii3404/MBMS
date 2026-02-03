import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Components/Layout";

const SalesHistory = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    setSales(JSON.parse(localStorage.getItem("sales")) || []);
  }, []);

  return (
    <Layout>
      <div className="medicine-page">
        <h2 className="medicine-title">Sales History</h2>

        <table className="medicine-table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Date</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sales.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty-row">
                  No sales found
                </td>
              </tr>
            ) : (
              sales.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.date}</td>
                  <td>₹ {s.total}</td>
                  <td>
                    <Link to={`/bill-preview/${s.id}`}>View</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default SalesHistory;
