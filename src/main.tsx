import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register service worker for PWA functionality
const updateSW = registerSW({
  onNeedRefresh(): void {
    if (confirm('New version available! Click OK to update.')) {
      updateSW(true);
    }
  },
  onOfflineReady(): void {
    console.log('App ready to work offline');
  },
  onRegistered(registration: ServiceWorkerRegistration | undefined): void {
    console.log('Service Worker registered:', registration);
  },
  onRegisterError(error: unknown): void {
    console.error('Service Worker registration error:', error);
  },
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
