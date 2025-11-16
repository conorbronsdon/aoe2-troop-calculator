/**
 * Storage Service
 * Handles saving and loading army compositions to browser localStorage
 */

import { logger } from '../utils/errorHandler';
import { STORAGE_KEYS, MAX_IMPORT_HISTORY } from '../constants';

const STORAGE_KEY = 'aoe2_army_compositions';
const IMPORT_HISTORY_KEY = STORAGE_KEYS.IMPORT_HISTORY;

export const StorageService = {
  /**
   * Save a composition to localStorage
   * @param {string} name - Name for the composition
   * @param {Object} composition - Army composition
   * @param {Object} config - Configuration
   * @returns {Object} Saved composition with metadata
   */
  save(name, composition, config) {
    const saved = this.getAll();
    const newComposition = {
      id: Date.now().toString(),
      name,
      composition,
      config,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saved.push(newComposition);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    return newComposition;
  },

  /**
   * Get all saved compositions
   * @returns {Array} Array of saved compositions
   */
  getAll() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      logger.error('Failed to load compositions from storage', error);
      return [];
    }
  },

  /**
   * Get composition by ID
   * @param {string} id - Composition ID
   * @returns {Object|null} Composition or null if not found
   */
  getById(id) {
    const all = this.getAll();
    return all.find((c) => c.id === id) || null;
  },

  /**
   * Update an existing composition
   * @param {string} id - Composition ID
   * @param {Object} updates - Updates to apply
   * @returns {Object|null} Updated composition or null if not found
   */
  update(id, updates) {
    const all = this.getAll();
    const index = all.findIndex((c) => c.id === id);

    if (index === -1) {
      return null;
    }

    all[index] = {
      ...all[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return all[index];
  },

  /**
   * Delete a composition
   * @param {string} id - Composition ID
   * @returns {boolean} Success status
   */
  delete(id) {
    const all = this.getAll();
    const filtered = all.filter((c) => c.id !== id);

    if (filtered.length === all.length) {
      return false;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  /**
   * Delete all compositions
   * @returns {boolean} Success status
   */
  deleteAll() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      logger.error('Failed to clear storage', error);
      return false;
    }
  },

  /**
   * Check if localStorage is available
   * @returns {boolean} Availability status
   */
  isAvailable() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      return false;
    }
  },

  // =========================================================================
  // Import History Management
  // =========================================================================

  /**
   * Add an entry to the import history
   * @param {Object} entry - Import history entry
   * @returns {Object} The saved entry
   */
  addImportHistory(entry) {
    try {
      const history = this.getImportHistory();
      history.unshift(entry); // Add to beginning (most recent first)

      // Keep only the most recent entries
      const trimmedHistory = history.slice(0, MAX_IMPORT_HISTORY);

      localStorage.setItem(IMPORT_HISTORY_KEY, JSON.stringify(trimmedHistory));
      return entry;
    } catch (error) {
      logger.error('Failed to save import history', error);
      return entry;
    }
  },

  /**
   * Get all import history entries
   * @returns {Array} Array of import history entries
   */
  getImportHistory() {
    try {
      const data = localStorage.getItem(IMPORT_HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      logger.error('Failed to load import history', error);
      return [];
    }
  },

  /**
   * Clear all import history
   * @returns {boolean} Success status
   */
  clearImportHistory() {
    try {
      localStorage.removeItem(IMPORT_HISTORY_KEY);
      return true;
    } catch (error) {
      logger.error('Failed to clear import history', error);
      return false;
    }
  },

  /**
   * Get import statistics
   * @returns {Object} Statistics about imports
   */
  getImportStats() {
    const history = this.getImportHistory();
    const successful = history.filter((entry) => entry.success).length;
    const failed = history.length - successful;

    const sourceBreakdown = history.reduce(
      (acc, entry) => {
        if (entry.source) {
          acc[entry.source] = (acc[entry.source] || 0) + 1;
        }
        return acc;
      },
      { file: 0, paste: 0, url: 0 }
    );

    return {
      total: history.length,
      successful,
      failed,
      bySource: sourceBreakdown,
      lastImport: history[0] || null,
    };
  },
};
