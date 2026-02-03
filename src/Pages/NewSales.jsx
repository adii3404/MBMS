import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";

const NewSale = () => {
  const [customers, setCustomers] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState([]);
  const [customerId, setCustomerId] = useState("");

  // Load customers & medicines
  useEffect(() => {
    setCustomers(JSON.parse(localStorage.getItem("customers")) || []);
    setMedicines(JSON.parse(localStorage.getItem("medicines")) || []);
  }, []);

  // Add medicine to cart
  const addToCart = (med) => {
    const exists = cart.find((i) => i.id === med.id);
    if (exists) {
      setCart(
        cart.map((i) =>
          i.id === med.id ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...med, qty: 1 }]);
    }
  };

  // Calculate totals
  const calculateTotals = () => {
    let subTotal = 0;
    let gstTotal = 0;

    cart.forEach((item) => {
      const itemTotal = item.qty * item.sellingPrice;
      const gstAmount = (itemTotal * item.gst) / 100;

      subTotal += itemTotal;
      gstTotal += gstAmount;
    });

    return {
      subTotal,
      gstTotal,
      grandTotal: subTotal + gstTotal,
    };
  };

  // Save sale
  const saveSale = () => {
    if (!customerId || cart.length === 0) {
      alert("Select customer and add medicines");
      return;
    }

    const sales = JSON.parse(localStorage.getItem("sales")) || [];
    const medicinesData =
      JSON.parse(localStorage.getItem("medicines")) || [];

    const invoiceCounter =
      Number(localStorage.getItem("invoiceCounter")) || 1;

    const totals = calculateTotals();

    const newSale = {
      invoiceNo: invoiceCounter,
      customerId,
      items: cart,
      ...totals,
      date: new Date().toLocaleString(),
    };

    // Reduce stock
    const updatedMedicines = medicinesData.map((med) => {
      const soldItem = cart.find((i) => i.id === med.id);
      return soldItem
        ? { ...med, stock: med.stock - soldItem.qty }
        : med;
    });

    // Save to LocalStorage
    localStorage.setItem(
      "sales",
      JSON.stringify([newSale, ...sales])
    );
    localStorage.setItem(
      "medicines",
      JSON.stringify(updatedMedicines)
    );
    localStorage.setItem(
      "invoiceCounter",
      invoiceCounter + 1
    );

    alert("Sale completed successfully");
    setCart([]);
    setCustomerId("");
  };

  const totals = calculateTotals();

  return (
    <Layout>
      <div className="medicine-page">
        <h2 className="medicine-title">New Sale</h2>

        {/* Select Customer */}
        <select
          className="medicine-input"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Medicines List */}
        <h4 style={{ marginTop: 20 }}>Medicines</h4>
        {medicines.map((m) => (
          <button
            key={m.id}
            className="btn btn-add"
            style={{ marginRight: 8, marginBottom: 8 }}
            onClick={() => addToCart(m)}
            disabled={m.stock <= 0}
          >
            {m.name} (Stock: {m.stock})
          </button>
        ))}

        {/* Cart */}
        <h4 style={{ marginTop: 20 }}>Cart</h4>
        <table className="medicine-table">
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
              cart.map((i) => {
                const itemTotal = i.qty * i.sellingPrice;
                const gstAmount =
                  (itemTotal * i.gst) / 100;

                return (
                  <tr key={i.id}>
                    <td>{i.name}</td>
                    <td>{i.qty}</td>
                    <td>₹ {i.sellingPrice}</td>
                    <td>{i.gst}%</td>
                    <td>
                      ₹ {itemTotal + gstAmount}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Totals */}
        <div style={{ marginTop: 20 }}>
          <p>Sub Total: ₹ {totals.subTotal}</p>
          <p>GST Total: ₹ {totals.gstTotal}</p>
          <h3>Grand Total: ₹ {totals.grandTotal}</h3>
        </div>

        <button
          className="btn btn-primary"
          style={{ marginTop: 15 }}
          onClick={saveSale}
        >
          Save Sale
        </button>
      </div>
    </Layout>
  );
};

export default NewSale;
