import React, { useState } from "react";
import Layout from '../Components/Layout.jsx';

const Settings = () => {
  const [form, setForm] = useState({
    storeName: "",
    address: "",
    gstNumber: "",
    invoicePrefix: "INV-",
    defaultGst: "18",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saved Settings:", form);
    alert("Settings saved successfully!");
  };

  return (
    <Layout>
    <div className="settings-page">
      <h2>Store Settings</h2>

      <form className="settings-form" onSubmit={handleSave}>
        
        <div className="form-group">
          <label>Store Name</label>
          <input
            type="text"
            name="storeName"
            value={form.storeName}
            onChange={handleChange}
            placeholder="Enter store name"
            required
          />
        </div>

        <div className="form-group">
          <label>Store Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter full address"
            required
          />
        </div>

        <div className="form-group">
          <label>GST Number</label>
          <input
            type="text"
            name="gstNumber"
            value={form.gstNumber}
            onChange={handleChange}
            placeholder="Enter GST number"
          />
        </div>

        <div className="form-group">
          <label>Invoice Prefix</label>
          <input
            type="text"
            name="invoicePrefix"
            value={form.invoicePrefix}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Default GST %</label>
          <input
            type="number"
            name="defaultGst"
            value={form.defaultGst}
            onChange={handleChange}
            min="0"
            max="100"
          />
        </div>

        <button type="submit" className="save-btn">
          Save Settings
        </button>

      </form>
    </div>
    </Layout>
  );
};

export default Settings;
