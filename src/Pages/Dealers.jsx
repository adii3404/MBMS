import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";

const Dealers = () => {
  const [dealers, setDealers] = useState([]);
  const [form, setForm] = useState({
    dealerName: "",
    companyName: "",
    phone: "",
    email: "",
    address: "",
    gstNumber: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Load dealers from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("dealers")) || [];
    setDealers(saved);
  }, []);

  // Save dealers to localStorage
  useEffect(() => {
    localStorage.setItem("dealers", JSON.stringify(dealers));
  }, [dealers]);

  // Add dealer
  const addDealer = () => {
    if (!form.dealerName || !form.phone) {
      alert("Dealer name and phone are required");
      return;
    }

    const newDealer = {
      id: Date.now(),
      ...form,
    };

    setDealers([newDealer, ...dealers]);
    resetForm();
  };

  // Start edit
  const startEdit = (dealer) => {
    setEditingId(dealer.id);
    setForm(dealer);
  };

  // Update dealer
  const updateDealer = () => {
    setDealers(
      dealers.map((d) =>
        d.id === editingId ? { ...form, id: editingId } : d
      )
    );
    resetForm();
  };

  // Delete dealer
  const deleteDealer = (id) => {
    if (window.confirm("Delete this dealer?")) {
      setDealers(dealers.filter((d) => d.id !== id));
    }
  };

  // Reset form
  const resetForm = () => {
    setForm({
      dealerName: "",
      companyName: "",
      phone: "",
      email: "",
      address: "",
      gstNumber: "",
    });
    setEditingId(null);
  };

  return (
    <Layout>
      <div className="dealer-page">
        <h2 className="dealer-title">Dealers</h2>

        {/* Dealer Form */}
        <div className="dealer-form">
          <input
            className="dealer-input"
            placeholder="Dealer Name"
            value={form.dealerName}
            onChange={(e) =>
              setForm({ ...form, dealerName: e.target.value })
            }
          />
          <input
            className="dealer-input"
            placeholder="Company Name"
            value={form.companyName}
            onChange={(e) =>
              setForm({ ...form, companyName: e.target.value })
            }
          />
          <input
            className="dealer-input"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />
          <input
            className="dealer-input"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          <input
            className="dealer-input dealer-address"
            placeholder="Address"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />
          <input
            className="dealer-input"
            placeholder="GST Number"
            value={form.gstNumber}
            onChange={(e) =>
              setForm({ ...form, gstNumber: e.target.value })
            }
          />

          {editingId ? (
            <>
              <button
                className="btn btn-update"
                onClick={updateDealer}
              >
                Update
              </button>
              <button
                className="btn btn-cancel"
                onClick={resetForm}
              >
                Cancel
              </button>
            </>
          ) : (
            <button className="btn btn-add" onClick={addDealer}>
              Add Dealer
            </button>
          )}
        </div>

        {/* Dealer Table */}
        <table className="dealer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Phone</th>
              <th>GST</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {dealers.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-row">
                  No dealers found
                </td>
              </tr>
            ) : (
              dealers.map((d) => (
                <tr key={d.id}>
                  <td>{d.dealerName}</td>
                  <td>{d.companyName}</td>
                  <td>{d.phone}</td>
                  <td>{d.gstNumber}</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => startEdit(d)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => deleteDealer(d.id)}
                    >
                      Delete
                    </button>
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

export default Dealers;
