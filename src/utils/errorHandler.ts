/**
 * Custom error classes and logging utilities
 */

/**
 * Game data error class
 */
export class GameDataError extends Error {
  data: unknown;

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
 * Logger utility for consistent logging
 */
export const logger: Logger = {
  error(message: string, data?: unknown): void {
    console.error(`[AoE2 Calculator Error] ${message}`, data || '');
  },

  warn(message: string, data?: unknown): void {
    console.warn(`[AoE2 Calculator Warning] ${message}`, data || '');
  },

  info(message: string, data?: unknown): void {
    console.info(`[AoE2 Calculator] ${message}`, data || '');
  },

  debug(message: string, data?: unknown): void {
    if (import.meta.env.DEV) {
      console.debug(`[AoE2 Calculator Debug] ${message}`, data || '');
    }
  },
};
