import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";

const Purchase = () => {
  const [dealers, setDealers] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [dealerId, setDealerId] = useState("");
  const [cart, setCart] = useState([]);

  // Load dealers and medicines
  useEffect(() => {
    const d = JSON.parse(localStorage.getItem("dealers")) || [];
    const m = JSON.parse(localStorage.getItem("medicines")) || [];
    setDealers(d);
    setMedicines(m);
  }, []);

  // Add medicine to cart
  const addToCart = (med) => {
    const exists = cart.find((item) => item.id === med.id);
    if (exists) return;

    setCart([
      ...cart,
      {
        id: med.id,
        name: med.name,
        qty: 1,
        purchasePrice: med.purchasePrice || 0,
        gst: med.gst || 0,
      },
    ]);
  };

  // Update cart values
  const updateCart = (id, field, value) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, [field]: Number(value) }
          : item
      )
    );
  };

  // Calculate totals
  const calculateTotals = () => {
    let subTotal = 0;
    let gstTotal = 0;

    cart.forEach((item) => {
      const itemTotal = item.qty * item.purchasePrice;
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

  // Save purchase
  const savePurchase = () => {
    if (!dealerId || cart.length === 0) {
      alert("Select dealer and add medicines");
      return;
    }

    const purchases =
      JSON.parse(localStorage.getItem("purchases")) || [];
    const medicinesData =
      JSON.parse(localStorage.getItem("medicines")) || [];

    const totals = calculateTotals();

    const newPurchase = {
      id: Date.now(),
      dealerId,
      items: cart,
      subTotal: totals.subTotal,
      gstTotal: totals.gstTotal,
      grandTotal: totals.grandTotal,
      date: new Date().toLocaleString(),
    };

    // Increase stock
    const updatedMedicines = medicinesData.map((m) => {
      const bought = cart.find((i) => i.id === m.id);
      return bought
        ? { ...m, stock: Number(m.stock) + Number(bought.qty) }
        : m;
    });

    localStorage.setItem(
      "purchases",
      JSON.stringify([newPurchase, ...purchases])
    );
    localStorage.setItem(
      "medicines",
      JSON.stringify(updatedMedicines)
    );

    alert("Purchase saved successfully");

    setCart([]);
    setDealerId("");
  };

  const totals = calculateTotals();

  return (
    <Layout>
      <div className="purchase-page">
        <h2 className="purchase-title">New Purchase</h2>

        {/* Dealer Select */}
        <select
          className="purchase-input"
          value={dealerId}
          onChange={(e) => setDealerId(e.target.value)}
        >
          <option value="">Select Dealer</option>
          {dealers.map((d) => (
            <option key={d.id} value={d.id}>
              {d.dealerName}
            </option>
          ))}
        </select>

        {/* Medicines */}
        <h4>Medicines</h4>
        {medicines.length === 0 && (
          <p style={{ color: "#64748b" }}>
            No medicines available
          </p>
        )}

        {medicines.map((m) => (
          <button
            key={m.id}
            className="btn btn-add"
            onClick={() => addToCart(m)}
            style={{ marginRight: 8, marginBottom: 8 }}
          >
            {m.name}
          </button>
        ))}

        {/* Cart */}
        <h4>Purchase Cart</h4>
        <table className="purchase-table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Qty</th>
              <th>Purchase Price</th>
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
              cart.map((item) => {
                const itemTotal =
                  item.qty * item.purchasePrice;
                const gstAmount =
                  (itemTotal * item.gst) / 100;

                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) =>
                          updateCart(
                            item.id,
                            "qty",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.purchasePrice}
                        onChange={(e) =>
                          updateCart(
                            item.id,
                            "purchasePrice",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.gst}
                        onChange={(e) =>
                          updateCart(
                            item.id,
                            "gst",
                            e.target.value
                          )
                        }
                      />
                    </td>
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
        <div className="purchase-totals">
          <p>Sub Total: ₹ {totals.subTotal}</p>
          <p>GST Total: ₹ {totals.gstTotal}</p>
          <h3>Grand Total: ₹ {totals.grandTotal}</h3>
        </div>

        <button
          className="btn btn-primary"
          onClick={savePurchase}
        >
          Save Purchase
        </button>
      </div>
    </Layout>
  );
};

export default Purchase;
