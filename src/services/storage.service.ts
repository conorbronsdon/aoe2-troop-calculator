/**
 * Storage Service
 * Handles saving and loading army compositions to browser localStorage
 */

import { logger } from '../utils/errorHandler';
import { STORAGE_KEYS, MAX_IMPORT_HISTORY } from '../constants';
import { ResourceLimits, Age, ResourceLimitMode } from '../types';

const STORAGE_KEY = 'aoe2_army_compositions';
const IMPORT_HISTORY_KEY = STORAGE_KEYS.IMPORT_HISTORY;

// Types for storage service
interface StoredCompositionConfig {
  resourceLimitMode?: ResourceLimitMode;
  resourceLimits?: ResourceLimits;
  totalResourceLimit?: number;
  populationCap?: number;
  selectedAge?: Age;
  selectedCiv?: string;
  previewCiv?: string;
  alliedCivs?: string[];
  displayMode?: string;
  showTechPanel?: boolean;
  showUnitCardStats?: boolean;
}

interface StoredComposition {
  id: string;
  name: string;
  composition: Record<string, number>;
  config: StoredCompositionConfig;
  createdAt: string;
  updatedAt: string;
}

interface StoredCompositionUpdates {
  name?: string;
  composition?: Record<string, number>;
  config?: StoredCompositionConfig;
}

interface ImportHistoryEntry {
  id: string;
  source: 'file' | 'paste' | 'url';
  filename: string | null;
  importedAt: string;
  version: string;
  unitCount: number;
  success: boolean;
}

interface ImportStats {
  total: number;
  successful: number;
  failed: number;
  bySource: {
    file: number;
    paste: number;
    url: number;
  };
  lastImport: ImportHistoryEntry | null;
}

interface StorageServiceInterface {
  save(name: string, composition: Record<string, number>, config: StoredCompositionConfig): StoredComposition;
  getAll(): StoredComposition[];
  getById(id: string): StoredComposition | null;
  update(id: string, updates: StoredCompositionUpdates): StoredComposition | null;
  delete(id: string): boolean;
  deleteAll(): boolean;
  isAvailable(): boolean;
  addImportHistory(entry: ImportHistoryEntry): ImportHistoryEntry;
  getImportHistory(): ImportHistoryEntry[];
  clearImportHistory(): boolean;
  getImportStats(): ImportStats;
}

export const StorageService: StorageServiceInterface = {
  /**
   * Save a composition to localStorage
   * @param name - Name for the composition
   * @param composition - Army composition
   * @param config - Configuration
   * @returns Saved composition with metadata
   */
  save(name: string, composition: Record<string, number>, config: StoredCompositionConfig): StoredComposition {
    const saved = this.getAll();
    const newComposition: StoredComposition = {
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
   * @returns Array of saved compositions
   */
  getAll(): StoredComposition[] {
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
   * @param id - Composition ID
   * @returns Composition or null if not found
   */
  getById(id: string): StoredComposition | null {
    const all = this.getAll();
    return all.find((c) => c.id === id) || null;
  },

  /**
   * Update an existing composition
   * @param id - Composition ID
   * @param updates - Updates to apply
   * @returns Updated composition or null if not found
   */
  update(id: string, updates: StoredCompositionUpdates): StoredComposition | null {
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
   * @param id - Composition ID
   * @returns Success status
   */
  delete(id: string): boolean {
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
   * @returns Success status
   */
  deleteAll(): boolean {
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
   * @returns Availability status
   */
  isAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  },

  // =========================================================================
  // Import History Management
  // =========================================================================

  /**
   * Add an entry to the import history
   * @param entry - Import history entry
   * @returns The saved entry
   */
  addImportHistory(entry: ImportHistoryEntry): ImportHistoryEntry {
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
   * @returns Array of import history entries
   */
  getImportHistory(): ImportHistoryEntry[] {
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
   * @returns Success status
   */
  clearImportHistory(): boolean {
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
   * @returns Statistics about imports
   */
  getImportStats(): ImportStats {
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
      { file: 0, paste: 0, url: 0 } as { file: number; paste: number; url: number }
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
