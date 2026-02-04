import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";

const NewSale = () => {
  const [customers, setCustomers] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [qty, setQty] = useState(1);

  const [cart, setCart] = useState([]);

  // Load customers & medicines
  useEffect(() => {
    setCustomers(JSON.parse(localStorage.getItem("customers")) || []);
    setMedicines(JSON.parse(localStorage.getItem("medicines")) || []);
  }, []);

  // ===============================
  // ADD MEDICINE TO CART (AUTO ADD)
  // ===============================
  const addToCart = () => {
    if (!medicineName.trim() || qty <= 0) {
      alert("Enter medicine name and quantity");
      return;
    }

    let meds = [...medicines];

    // Try to find medicine
    let med = meds.find(m =>
      m.name.toLowerCase() === medicineName.toLowerCase()
    );

    // ❗ If medicine NOT FOUND → auto add to inventory
    if (!med) {
      med = {
        id: Date.now(),
        name: medicineName,
        sellingPrice: 0,
        gst: 0,
        stock: 0
      };

      meds.push(med);
      localStorage.setItem("medicines", JSON.stringify(meds));
      setMedicines(meds);
    }

    // Prevent duplicate in cart
    const exists = cart.find(c => c.id === med.id);
    if (exists) {
      alert("Medicine already added to cart");
      return;
    }

    // Add to cart
    setCart([
      ...cart,
      {
        id: med.id,
        name: med.name,
        qty,
        price: med.sellingPrice,
        gst: med.gst
      }
    ]);

    setMedicineName("");
    setQty(1);
  };

  // ===============================
  // TOTALS
  // ===============================
  const subTotal = cart.reduce((s, i) => s + i.qty * i.price, 0);
  const gstTotal = cart.reduce(
    (s, i) => s + (i.qty * i.price * i.gst) / 100,
    0
  );
  const grandTotal = subTotal + gstTotal;

  // ===============================
  // SAVE BILL
  // ===============================
  const saveBill = () => {
    if (!customerName.trim() || cart.length === 0) {
      alert("Enter customer and add medicines");
      return;
    }

    const sales = JSON.parse(localStorage.getItem("sales")) || [];

    const bill = {
      invoiceNo: "INV-" + Date.now(),
      customer: customerName,
      items: cart,
      subTotal,
      gstTotal,
      grandTotal,
      date: new Date().toLocaleString()
    };

    sales.push(bill);
    localStorage.setItem("sales", JSON.stringify(sales));

    alert("Bill saved successfully");

    setCart([]);
    setCustomerName("");
  };

  const printBill = () => {
    window.print();
  };

  return (
    <Layout>
      <div className="sale-page">
        <h2 className="sale-title">New Sale</h2>

        {/* CUSTOMER */}
        <input
          className="sale-input"
          placeholder="Enter Customer Name"
          value={customerName}
          onChange={e => setCustomerName(e.target.value)}
          list="customerList"
        />
        <datalist id="customerList">
          {customers.map(c => (
            <option key={c.id} value={c.name} />
          ))}
        </datalist>

        {/* MEDICINE */}
        <h4>Add Medicine</h4>
        <input
          className="sale-input"
          placeholder="Medicine name"
          value={medicineName}
          onChange={e => setMedicineName(e.target.value)}
        />

        <input
          type="number"
          className="sale-input small"
          value={qty}
          onChange={e => setQty(Number(e.target.value))}
        />

        <button className="btn-add" onClick={addToCart}>
          Add Medicine
        </button>

        {/* CART */}
        <h4>Cart</h4>
        <table className="sale-table">
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
              cart.map(c => (
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

        {/* TOTALS */}
        <div className="sale-totals">
          <p>Sub Total: ₹ {subTotal}</p>
          <p>GST Total: ₹ {gstTotal}</p>
          <h3>Grand Total: ₹ {grandTotal}</h3>
        </div>

        {/* ACTIONS */}
        <div className="sale-actions">
          <button className="btn-primary" onClick={saveBill}>
            Save Bill
          </button>
          <button className="btn-print" onClick={printBill}>
            Print Bill
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NewSale;
