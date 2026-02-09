import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";

const Settings = () => {
  const [settings, setSettings] = useState({
    storeName: "",
    storeAddress: "",
    gstNumber: "",
    invoicePrefix: "INV",
    defaultGst: 0,
  });

  // Load settings
  useEffect(() => {
    const savedSettings = JSON.parse(
      localStorage.getItem("settings")
    );
    if (savedSettings) {
      setSettings(savedSettings);
    }

    // Initialize invoiceCounter if not exists
    if (!localStorage.getItem("invoiceCounter")) {
      localStorage.setItem("invoiceCounter", "0");
    }
  }, []);

  // Save settings
  const saveSettings = () => {
    localStorage.setItem(
      "settings",
      JSON.stringify(settings)
    );
    alert("Settings saved successfully");
  };

  return (
    <Layout>
      <div className="settings-page">
        <h2 className="settings-title">Settings</h2>

        <div className="settings-card">
          <div className="form-group">
            <label>Store Name</label>
            <input
              type="text"
              value={settings.storeName}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  storeName: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Store Address</label>
            <input
              type="text"
              value={settings.storeAddress}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  storeAddress: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>GST Number</label>
            <input
              type="text"
              value={settings.gstNumber}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  gstNumber: e.target.value,
                })
              }
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Invoice Prefix</label>
              <input
                type="text"
                value={settings.invoicePrefix}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    invoicePrefix: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Default GST (%)</label>
              <input
                type="number"
                value={settings.defaultGst}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    defaultGst: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={saveSettings}
          >
            Save Settings
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
