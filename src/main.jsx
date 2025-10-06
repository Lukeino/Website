/**
 * Main Entry Point
 * Author: Luca Iantosco
 * Description: React application entry with language context and CSS imports
 * Date: January 2025
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LanguageProvider } from './contexts/LanguageContext'
import './styles/index.css' // Main CSS entry point with all modular imports

// Temporary style to prevent scroll during initial load
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    html, body {
      overflow: hidden !important;
      scroll-behavior: auto !important;
    }
  `;
  style.id = 'initial-no-scroll';
  document.head.appendChild(style);
  
  // Remove style after complete load
  window.addEventListener('load', () => {
    setTimeout(() => {
      const styleElem = document.getElementById('initial-no-scroll');
      if (styleElem) {
        styleElem.remove();
      }
    }, 500);
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
)