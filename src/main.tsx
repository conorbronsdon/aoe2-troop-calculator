import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { registerSW } from 'virtual:pwa-register';
import { logger } from './utils/errorHandler';

// Register service worker for PWA functionality
const updateSW = registerSW({
  onNeedRefresh(): void {
    if (confirm('New version available! Click OK to update.')) {
      updateSW(true);
    }
  },
  onOfflineReady(): void {
    logger.info('App ready to work offline');
  },
  onRegistered(registration: ServiceWorkerRegistration | undefined): void {
    logger.info('Service Worker registered', registration);
  },
  onRegisterError(error: unknown): void {
    logger.error('Service Worker registration error', error);
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
