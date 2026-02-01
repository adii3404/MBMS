import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout.jsx';


function ProductAdd() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      setProducts([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = () => {
    if (!form.name || !form.price) return alert("Enter name and Price");

    const newProduct = {
      id: Date.now(),
      name: form.name,
      price: Number(form.price),
    };

    setProducts([newProduct, ...products]);
    setForm({ name: "", price: "" });
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({ name: p.name, price: p.price });
  };

  const updateProduct = () => {
    if (!form.name || !form.price) return alert("Enter name and price");

    setProducts(
      products.map((p) =>
        p.id === editingId
          ? { ...p, name: form.name, price: Number(form.price) }
          : p
      )
    );

    setEditingId(null);
    setForm({ name: "", price: "" });
  };

  const clearAll = () => {
    localStorage.removeItem("products");
    setProducts([]);
    setEditingId(null);
    setForm({ name: "", price: "" });
  };

  return (
    <Layout>
      <div className="medicine-page">
        <h2 className="medicine-title">Medicine Management</h2>

        <div className="medicine-form">
          <input
            type="text"
            placeholder="Medicine name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="medicine-input"
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="medicine-input"
          />

          {editingId ? (
            <>
              <button onClick={updateProduct} className="btn btn-update">
                Update
              </button>
              <button
                onClick={() => {
                  setEditingId(null);
                  setForm({ name: "", price: "" });
                }}
                className="btn btn-cancel"
              >
                Cancel
              </button>
            </>
          ) : (
            <button onClick={addProduct} className="btn btn-add">
              Add
            </button>
          )}

          <button onClick={clearAll} className="btn btn-clear">
            Clear All
          </button>
        </div>

        <table className="medicine-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty-row">
                  No medicines found
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>
                    <button
                      onClick={() => startEdit(p)}
                      className="btn btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
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

export default ProductAdd;
