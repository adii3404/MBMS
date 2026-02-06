import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";

const NewSale = () => {
  const [customers, setCustomers] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState("");
  const [gst, setGst] = useState("");

  const [cart, setCart] = useState([]);

  // Load customers & medicines
  useEffect(() => {
    setCustomers(JSON.parse(localStorage.getItem("customers")) || []);
    setMedicines(JSON.parse(localStorage.getItem("medicines")) || []);
  }, []);

  // ===============================
  // ADD MEDICINE TO CART
  // ===============================
  const addToCart = () => {
    if (!medicineName || qty <= 0 || price <= 0) {
      alert("Enter medicine name, quantity and price");
      return;
    }

    let meds = [...medicines];

    // Find medicine
    let med = meds.find(
      (m) => m.name.toLowerCase() === medicineName.toLowerCase()
    );

    // Auto add medicine if not found
    if (!med) {
      med = {
        id: Date.now(),
        name: medicineName,
        sellingPrice: Number(price),
        gst: Number(gst) || 0,
        stock: 0,
      };
      meds.push(med);
      localStorage.setItem("medicines", JSON.stringify(meds));
      setMedicines(meds);
    }

    // Prevent duplicate in cart
    if (cart.find((c) => c.id === med.id)) {
      alert("Medicine already added");
      return;
    }

    setCart([
      ...cart,
      {
        id: med.id,
        name: med.name,
        qty: Number(qty),
        price: Number(price),
        gst: Number(gst) || 0,
      },
    ]);

    // Reset inputs
    setMedicineName("");
    setQty(1);
    setPrice("");
    setGst("");
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
    if (!customerName || cart.length === 0) {
      alert("Enter customer and add medicines");
      return;
    }

    const sales = JSON.parse(localStorage.getItem("sales")) || [];

    sales.push({
      invoiceNo: "INV-" + Date.now(),
      customer: customerName,
      items: cart,
      subTotal,
      gstTotal,
      grandTotal,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem("sales", JSON.stringify(sales));

    alert("Bill saved successfully");

    setCart([]);
    setCustomerName("");
  };

  const printBill = () => window.print();

  return (
    <Layout>
      <div className="sale-page">
        <h2 className="sale-title">New Sale</h2>

        {/* CUSTOMER */}
        <input
          className="sale-input"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          list="customerList"
        />
        <datalist id="customerList">
          {customers.map((c) => (
            <option key={c.id} value={c.name} />
          ))}
        </datalist>

        {/* MEDICINE SECTION */}
        <h4>Add Medicine</h4>

        <input
          className="sale-input"
          placeholder="Medicine Name"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
        />

        <input
          type="number"
          className="sale-input small"
          placeholder="Qty"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />

        <input
          type="number"
          className="sale-input small"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          className="sale-input small"
          placeholder="GST %"
          value={gst}
          onChange={(e) => setGst(e.target.value)}
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
