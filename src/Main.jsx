import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import './app.css' // We will put all styles in one file for simplicity

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)