import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { TOAST_DURATION_MS } from '../constants';
import { ToastType } from '../types';

// =============================================================================
// Type Definitions
// =============================================================================

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export interface ToastContextValue {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType, duration?: number) => number;
  removeToast: (id: number) => void;
  clearAllToasts: () => void;
}

export interface ToastProviderProps {
  children: React.ReactNode;
}

// =============================================================================
// Constants
// =============================================================================

export const TOAST_TYPES = {
  SUCCESS: 'success' as ToastType,
  ERROR: 'error' as ToastType,
  WARNING: 'warning' as ToastType,
  INFO: 'info' as ToastType,
};

// =============================================================================
// Context Creation
// =============================================================================

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

// =============================================================================
// Provider Component
// =============================================================================

export function ToastProvider({ children }: ToastProviderProps): React.ReactElement {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastIdRef = useRef(0);

  const removeToast = useCallback((id: number): void => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (
      message: string,
      type: ToastType = TOAST_TYPES.SUCCESS,
      duration: number = TOAST_DURATION_MS
    ): number => {
      const id = toastIdRef.current++;
      const newToast: Toast = { id, message, type };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [removeToast]
  );

  const clearAllToasts = useCallback((): void => {
    setToasts([]);
  }, []);

  const value: ToastContextValue = {
    toasts,
    showToast,
    removeToast,
    clearAllToasts,
  };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

// =============================================================================
// Custom Hook
// =============================================================================

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// =============================================================================
// Toast Container Component
// =============================================================================

export function ToastContainer(): React.ReactElement | null {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  const getToastStyles = (type: ToastType): string => {
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

  const getToastIcon = (type: ToastType): string => {
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
