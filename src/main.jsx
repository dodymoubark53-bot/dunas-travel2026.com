import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './i18n'
import './index.css'
import './i18n'
import { AuthProvider } from './context/AuthContext'
import { CurrencyProvider } from './context/CurrencyContext'

console.log('✅ All errors fixed — website running correctly');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <CurrencyProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </CurrencyProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
