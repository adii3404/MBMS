import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../Components/Layout";

const BillPreview = () => {
  const { id } = useParams();
  const sales = JSON.parse(localStorage.getItem("sales")) || [];
  const sale = sales.find((s) => String(s.id) === id);

  if (!sale) {
    return (
      <Layout>
        <p>Bill not found</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="medicine-page">
        <h2 className="medicine-title">Bill Preview</h2>

        <p>Invoice No: {sale.id}</p>
        <p>Date: {sale.date}</p>

        <table className="medicine-table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {sale.items.map((i, idx) => (
              <tr key={idx}>
                <td>{i.name}</td>
                <td>{i.qty}</td>
                <td>₹ {i.sellingPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Total: ₹ {sale.total}</h3>

        <button className="btn btn-primary" onClick={() => window.print()}>
          Print Bill
        </button>
      </div>
    </Layout>
  );
};

export default BillPreview;
