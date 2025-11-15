/**
 * Custom error classes and logging utilities
 */

/**
 * Game data error class
 */
export class GameDataError extends Error {
  constructor(message, data) {
    super(message);
    this.name = 'GameDataError';
    this.data = data;
  }
}

/**
 * Logger utility for consistent logging
 */
export const logger = {
  error(message, data) {
    console.error(`[AoE2 Calculator Error] ${message}`, data || '');
  },

  warn(message, data) {
    console.warn(`[AoE2 Calculator Warning] ${message}`, data || '');
  },

  info(message, data) {
    console.info(`[AoE2 Calculator] ${message}`, data || '');
  },

  debug(message, data) {
    if (import.meta.env.DEV) {
      console.debug(`[AoE2 Calculator Debug] ${message}`, data || '');
    }
  }
};
