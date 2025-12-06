import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from '@/components/shared';
// Import CSS in correct order: variables first, then global styles, then cross-browser fixes
import '@/styles/variables.css';
import '@/styles/global.css';
import '@/styles/cross-browser.css';
import './index.css';

// Clean up any corrupted localStorage entries before React mounts
try {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      // Rimuovi tutte le chiavi potenzialmente corrotte
      const keysToRemove = ['app-theme'];
      keysToRemove.forEach(key => {
        try {
          window.localStorage.removeItem(key);
        } catch (e) {
          // Ignora errori individuali
        }
      });
    } catch (e) {
      // Ignora errori nella pulizia
    }
  }
} catch (e) {
  // Ignora errori nella pulizia
}

// Wrapper per catturare errori durante il rendering
try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
} catch (error) {
  console.error('Fatal error during app initialization:', error);
  // Fallback: mostra un messaggio di errore diretto nel DOM
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 2rem;
        text-align: center;
        background-color: #0f172a;
        color: #f1f5f9;
      ">
        <h1 style="font-size: 2rem; margin-bottom: 1rem;">Errore Critico</h1>
        <p style="margin-bottom: 2rem; color: #cbd5e1;">Impossibile inizializzare l'applicazione</p>
        <button 
          onclick="window.location.reload()"
          style="
            padding: 0.75rem 1.5rem;
            background-color: #2563eb;
            color: #ffffff;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 500;
          "
        >
          Ricarica la pagina
        </button>
      </div>
    `;
  }
}

