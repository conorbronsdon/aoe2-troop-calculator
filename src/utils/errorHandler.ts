/**
 * Custom error classes and logging utilities
 */

/**
 * Game data error class for handling errors related to game data loading and validation
 *
 * @example
 * ```typescript
 * throw new GameDataError('Invalid unit data', { unitId: 'invalid-id' });
 * ```
 */
export class GameDataError extends Error {
  data: unknown;

  /**
   * Creates a new GameDataError
   * @param message - Error message describing what went wrong
   * @param data - Optional additional data about the error context
   */
  constructor(message: string, data?: unknown) {
    super(message);
    this.name = 'GameDataError';
    this.data = data;
  }
}

interface Logger {
  error: (message: string, data?: unknown) => void;
  warn: (message: string, data?: unknown) => void;
  info: (message: string, data?: unknown) => void;
  debug: (message: string, data?: unknown) => void;
}

/**
 * Logger utility for consistent logging across the application
 * Provides prefixed logging methods for better log filtering and debugging
 *
 * @example
 * ```typescript
 * logger.info('User selected civilization', { civId: 'britons' });
 * logger.error('Failed to load unit data', error);
 * logger.debug('Calculation step', { step: 1, value: 100 });
 * ```
 */
export const logger: Logger = {
  /**
   * Log an error message with optional data
   * Always displayed in all environments
   * @param message - Error message to log
   * @param data - Optional additional error data
   */
  error(message: string, data?: unknown): void {
    console.error(`[AoE2 Calculator Error] ${message}`, data || '');
  },

  /**
   * Log a warning message with optional data
   * Always displayed in all environments
   * @param message - Warning message to log
   * @param data - Optional additional warning data
   */
  warn(message: string, data?: unknown): void {
    console.warn(`[AoE2 Calculator Warning] ${message}`, data || '');
  },

  /**
   * Log an informational message with optional data
   * Always displayed in all environments
   * @param message - Info message to log
   * @param data - Optional additional info data
   */
  info(message: string, data?: unknown): void {
    console.info(`[AoE2 Calculator] ${message}`, data || '');
  },

  /**
   * Log a debug message with optional data
   * Only displayed in development mode (import.meta.env.DEV)
   * @param message - Debug message to log
   * @param data - Optional additional debug data
   */
  debug(message: string, data?: unknown): void {
    if (import.meta.env.DEV) {
      console.debug(`[AoE2 Calculator Debug] ${message}`, data || '');
    }
  },
};
