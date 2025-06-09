import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LanguageProvider } from './contexts/LanguageContext'
import './styles/index.css'

// Imposta uno stile temporaneo per prevenire lo scroll durante il caricamento iniziale
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
  
  // Rimuove lo stile dopo il caricamento completo
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
