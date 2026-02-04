import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";

const Purchases = () => {
  const [dealers, setDealers] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [dealerId, setDealerId] = useState("");
  const [medicineInput, setMedicineInput] = useState("");
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState([]);

  // Load data
  useEffect(() => {
    setDealers(JSON.parse(localStorage.getItem("dealers")) || []);
    setMedicines(JSON.parse(localStorage.getItem("medicines")) || []);
  }, []);

  // Add medicine to cart
  const addToCart = () => {
    if (!medicineInput || qty <= 0) {
      alert("Enter medicine and quantity");
      return;
    }

    const med = medicines.find(
      (m) => m.name.toLowerCase() === medicineInput.toLowerCase()
    );

    if (!med) {
      alert("Medicine not found");
      return;
    }

    const exists = cart.find((c) => c.id === med.id);
    if (exists) {
      alert("Medicine already added");
      return;
    }

    setCart([
      ...cart,
      {
        id: med.id,
        name: med.name,
        qty,
        price: med.purchasePrice || 0,
        gst: med.gst || 0,
      },
    ]);

    setMedicineInput("");
    setQty(1);
  };

  // Totals
  const subTotal = cart.reduce((s, i) => s + i.qty * i.price, 0);
  const gstTotal = cart.reduce(
    (s, i) => s + (i.qty * i.price * i.gst) / 100,
    0
  );
  const grandTotal = subTotal + gstTotal;

  // Save purchase
  const savePurchase = () => {
    if (!dealerId || cart.length === 0) {
      alert("Select dealer and add medicines");
      return;
    }

    const purchases = JSON.parse(localStorage.getItem("purchases")) || [];

    purchases.push({
      id: Date.now(),
      dealerId,
      items: cart,
      subTotal,
      gstTotal,
      grandTotal,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem("purchases", JSON.stringify(purchases));

    // Increase stock
    const updatedMeds = medicines.map((m) => {
      const item = cart.find((c) => c.id === m.id);
      return item ? { ...m, stock: (m.stock || 0) + item.qty } : m;
    });

    localStorage.setItem("medicines", JSON.stringify(updatedMeds));

    alert("Purchase saved successfully");

    setCart([]);
    setDealerId("");
  };

  return (
    <Layout>
      <div className="purchase-page">
        <h2 className="purchase-title">New Purchase</h2>

        {/* Dealer */}
        <select
          className="purchase-input"
          value={dealerId}
          onChange={(e) => setDealerId(e.target.value)}
        >
          <option value="">Select Dealer</option>
          {dealers.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Add Medicine */}
        <h4>Add Medicine</h4>
        <input
          className="purchase-input"
          placeholder="Medicine name"
          value={medicineInput}
          onChange={(e) => setMedicineInput(e.target.value)}
        />

        <input
          type="number"
          className="purchase-input"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />

        <button className="btn-add" onClick={addToCart}>
          Add to Cart
        </button>

        {/* Cart */}
        <h4>Purchase Cart</h4>
        <table className="purchase-table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Qty</th>
              <th>Price</th>
              <th>GST %</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-row">
                  No items added
                </td>
              </tr>
            ) : (
              cart.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.qty}</td>
                  <td>₹ {c.price}</td>
                  <td>{c.gst}%</td>
                  <td>
                    ₹ {c.qty * c.price + (c.qty * c.price * c.gst) / 100}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Totals */}
        <div className="purchase-totals">
          <p>Sub Total: ₹ {subTotal}</p>
          <p>GST Total: ₹ {gstTotal}</p>
          <h3>Grand Total: ₹ {grandTotal}</h3>
        </div>

        <button className="btn-primary" onClick={savePurchase}>
          Save Purchase
        </button>
      </div>
    </Layout>
  );
};

export default Purchases;
