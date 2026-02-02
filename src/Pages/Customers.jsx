import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout.jsx";


function CustomerAdd() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("customers");
    if (saved) {
      setCustomers(JSON.parse(saved));
    } else {
      setCustomers([]);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  // CREATE
  const addCustomer = () => {
    if (!form.name || !form.phone)
      return alert("Enter name and phone");

    const newCustomer = {
      id: Date.now(),
      name: form.name,
      phone: form.phone,
      address: form.address,
    };

    setCustomers([newCustomer, ...customers]);
    setForm({ name: "", phone: "", address: "" });
  };

  // DELETE
  const deleteCustomer = (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  // EDIT start
  const startEdit = (c) => {
    setEditingId(c.id);
    setForm({
      name: c.name,
      phone: c.phone,
      address: c.address || "",
    });
  };

  // UPDATE
  const updateCustomer = () => {
    if (!form.name || !form.phone)
      return alert("Enter name and phone");

    setCustomers(
      customers.map((c) =>
        c.id === editingId ? { ...c, ...form } : c
      )
    );

    setEditingId(null);
    setForm({ name: "", phone: "", address: "" });
  };

  // CLEAR ALL
  const clearAll = () => {
    localStorage.removeItem("customers");
    setCustomers([]);
    setEditingId(null);
    setForm({ name: "", phone: "", address: "" });
  };

  return (
    <Layout>
      <div className="customer-page">
        <h2 className="customer-title">Customer Management</h2>

        <div className="customer-form">
          <input
            type="text"
            placeholder="Customer Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="customer-input"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            className="customer-input"
          />

          <input
            type="text"
            placeholder="Address (optional)"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
            className="customer-input address-input"
          />

          {editingId ? (
            <>
              <button
                onClick={updateCustomer}
                className="btn btn-update"
              >
                Update
              </button>
              <button
                onClick={() => {
                  setEditingId(null);
                  setForm({
                    name: "",
                    phone: "",
                    address: "",
                  });
                }}
                className="btn btn-cancel"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={addCustomer}
              className="btn btn-add"
            >
              Add
            </button>
          )}

          <button
            onClick={clearAll}
            className="btn btn-clear"
          >
            Clear All
          </button>
        </div>

        <table className="customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-row">
                  No customers found
                </td>
              </tr>
            ) : (
              customers.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.phone}</td>
                  <td>{c.address || "-"}</td>
                  <td>
                    <button
                      onClick={() => startEdit(c)}
                      className="btn btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCustomer(c.id)}
                      className="btn btn-delete"
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
}

export default CustomerAdd;
