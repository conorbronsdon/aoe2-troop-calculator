import { createContext, useContext, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { TOAST_DURATION_MS } from '../constants';

const ToastContext = createContext(null);

/**
 * Toast types for different visual styles
 */
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

/**
 * Provider for global toast notifications
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const toastIdRef = useRef(0);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = TOAST_TYPES.SUCCESS, duration = TOAST_DURATION_MS) => {
      const id = toastIdRef.current++;
      const newToast = { id, message, type };

      setToasts((prev) => [...prev, newToast]);

      // Auto-dismiss after duration
      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [removeToast]
  );

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const value = {
    toasts,
    showToast,
    removeToast,
    clearAllToasts,
  };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Hook to access toast functionality
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

/**
 * Toast container component that renders all active toasts
 */
export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  const getToastStyles = (type) => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return 'bg-green-100 border-green-400 text-green-800 dark:bg-green-900 dark:border-green-600 dark:text-green-200';
      case TOAST_TYPES.ERROR:
        return 'bg-red-100 border-red-400 text-red-800 dark:bg-red-900 dark:border-red-600 dark:text-red-200';
      case TOAST_TYPES.WARNING:
        return 'bg-yellow-100 border-yellow-400 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-600 dark:text-yellow-200';
      case TOAST_TYPES.INFO:
        return 'bg-blue-100 border-blue-400 text-blue-800 dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200';
      default:
        return 'bg-gray-100 border-gray-400 text-gray-800 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-200';
    }
  };

  const getToastIcon = (type) => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return '✓';
      case TOAST_TYPES.ERROR:
        return '✗';
      case TOAST_TYPES.WARNING:
        return '⚠';
      case TOAST_TYPES.INFO:
        return 'ℹ';
      default:
        return '';
    }
  };

  return (
    <div
      className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm"
      role="region"
      aria-label="Notifications"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            flex items-center gap-2 px-4 py-3 rounded-lg border shadow-lg
            animate-fade-in transition-all duration-300
            ${getToastStyles(toast.type)}
          `}
          role="alert"
        >
          <span className="font-bold text-lg" aria-hidden="true">
            {getToastIcon(toast.type)}
          </span>
          <span className="flex-1 text-sm font-medium">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
