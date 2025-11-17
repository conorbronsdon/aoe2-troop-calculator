/**
 * Application-wide constants
 *
 * This file centralizes all magic strings, configuration values, and constants
 * used throughout the application. Import these values instead of hardcoding
 * strings to ensure consistency and easier maintenance.
 */

import type { Age, ResourceLimits, ResourceLimitMode, DisplayMode } from './types';

// =============================================================================
// Application Info
// =============================================================================

/**
 * Application version - update this when releasing new versions
 * IMPORTANT: Keep in sync with package.json version
 */
export const APP_VERSION = '3.0.0' as const;

export const APP_NAME = 'AoE2 Troop Calculator' as const;
export const APP_DISPLAY_NAME = 'Age of Empires II Army Calculator' as const;

// =============================================================================
// Local Storage Keys
// =============================================================================

/**
 * Keys for localStorage persistence
 * These keys should never change to maintain backwards compatibility
 */
export const STORAGE_KEYS = {
  /** Saved army compositions */
  ARMY_COMPOSITIONS: 'aoe2_army_compositions',
  /** User's theme preference (light/dark) */
  THEME: 'aoe2-calculator-theme',
  /** Import history tracking */
  IMPORT_HISTORY: 'aoe2_import_history',
} as const;

// =============================================================================
// Game Ages
// =============================================================================

/**
 * Age of Empires II game ages in progression order
 */
export const AGES: readonly Age[] = ['dark', 'feudal', 'castle', 'imperial'] as const;

/**
 * Display names for each age
 */
export const AGE_DISPLAY_NAMES: Record<Age, string> = {
  dark: 'Dark Age',
  feudal: 'Feudal Age',
  castle: 'Castle Age',
  imperial: 'Imperial Age',
} as const;

/**
 * Order mapping for age comparison (higher number = later age)
 */
export const AGE_ORDER: Record<Age, number> = {
  dark: 0,
  feudal: 1,
  castle: 2,
  imperial: 3,
} as const;

// =============================================================================
// Resource Types
// =============================================================================

/**
 * Resource types in Age of Empires II
 */
export const RESOURCES = ['food', 'wood', 'gold', 'stone'] as const;

export type ResourceType = (typeof RESOURCES)[number];

/**
 * Display names for resources
 */
export const RESOURCE_DISPLAY_NAMES: Record<ResourceType, string> = {
  food: 'Food',
  wood: 'Wood',
  gold: 'Gold',
  stone: 'Stone',
} as const;

/**
 * Default resource limits per resource
 */
export const DEFAULT_RESOURCE_LIMITS: ResourceLimits = {
  food: 8000,
  wood: 8000,
  gold: 4000,
  stone: 0,
} as const;

/**
 * Default total resource limit
 */
export const DEFAULT_TOTAL_RESOURCE_LIMIT = 20000 as const;

// =============================================================================
// Unit Categories
// =============================================================================

/**
 * Unit categories for filtering and organization
 */
export const UNIT_CATEGORIES = [
  'Infantry',
  'Cavalry',
  'Archer',
  'Siege',
  'Naval',
  'Monk',
  'Unique',
  'Other',
] as const;

export type UnitCategory = (typeof UNIT_CATEGORIES)[number];

// =============================================================================
// Display Modes
// =============================================================================

/**
 * Available display modes for the calculator
 */
export const DISPLAY_MODES: Record<string, DisplayMode> = {
  UNITS: 'units',
  FORTIFICATIONS: 'fortifications',
  BOTH: 'both',
} as const;

/**
 * Display names for display modes
 */
export const DISPLAY_MODE_NAMES: Record<DisplayMode, string> = {
  units: 'Units Only',
  fortifications: 'Fortifications Only',
  both: 'Both',
} as const;

// =============================================================================
// Resource Limit Modes
// =============================================================================

/**
 * Resource limit calculation modes
 */
export const RESOURCE_LIMIT_MODES: Record<string, ResourceLimitMode> = {
  TOTAL: 'total',
  INDIVIDUAL: 'individual',
} as const;

// =============================================================================
// Default Configuration
// =============================================================================

interface DefaultConfig {
  resourceLimitMode: ResourceLimitMode;
  resourceLimits: ResourceLimits;
  totalResourceLimit: number;
  populationCap: number;
  selectedAge: Age;
  selectedCiv: string;
  previewCiv: string;
  displayMode: DisplayMode;
}

/**
 * Default configuration for new army compositions
 */
export const DEFAULT_CONFIG: DefaultConfig = {
  resourceLimitMode: RESOURCE_LIMIT_MODES.TOTAL,
  resourceLimits: { ...DEFAULT_RESOURCE_LIMITS },
  totalResourceLimit: DEFAULT_TOTAL_RESOURCE_LIMIT,
  populationCap: 200,
  selectedAge: 'imperial',
  selectedCiv: 'generic',
  previewCiv: 'generic',
  displayMode: DISPLAY_MODES.UNITS,
} as const;

// =============================================================================
// Validation Limits
// =============================================================================

/**
 * Application limits for validation
 */
export const LIMITS = {
  /** Maximum length for saved composition names */
  MAX_COMPOSITION_NAME_LENGTH: 50,
  /** Maximum number of saved compositions */
  MAX_SAVED_COMPOSITIONS: 100,
  /** Maximum resource value that can be set */
  MAX_RESOURCE_VALUE: 999999,
  /** Maximum population cap */
  MAX_POPULATION_CAP: 10000,
  /** Maximum quantity for a single unit type */
  MAX_UNIT_QUANTITY: 9999,
} as const;

// =============================================================================
// Export Formats
// =============================================================================

/**
 * Supported export formats
 */
export const EXPORT_FORMATS = {
  CSV: 'csv',
  JSON: 'json',
  TEXT: 'text',
} as const;

export type ExportFormat = (typeof EXPORT_FORMATS)[keyof typeof EXPORT_FORMATS];

// =============================================================================
// Import Constants
// =============================================================================

/**
 * Import source types
 */
export const IMPORT_SOURCES = {
  FILE: 'file',
  PASTE: 'paste',
  URL: 'url',
} as const;

export type ImportSource = (typeof IMPORT_SOURCES)[keyof typeof IMPORT_SOURCES];

/**
 * Import mode options
 */
export const IMPORT_MODES = {
  REPLACE: 'replace',
  MERGE: 'merge',
} as const;

export type ImportMode = (typeof IMPORT_MODES)[keyof typeof IMPORT_MODES];

/**
 * Maximum file size for import (1MB)
 */
export const MAX_IMPORT_FILE_SIZE = 1048576 as const;

/**
 * Local storage key for import history
 */
export const IMPORT_HISTORY_KEY = 'aoe2_import_history' as const;

/**
 * Maximum number of import history entries to keep
 */
export const MAX_IMPORT_HISTORY = 50 as const;

// =============================================================================
// Civilization Constants
// =============================================================================

/**
 * Special civilization ID for generic (no civ bonuses)
 */
export const GENERIC_CIV_ID = 'generic' as const;

// =============================================================================
// UI Constants
// =============================================================================

/**
 * Toast message display duration in milliseconds
 */
export const TOAST_DURATION_MS = 3000 as const;

/**
 * Debounce delay for search inputs in milliseconds
 */
export const SEARCH_DEBOUNCE_MS = 300 as const;

// =============================================================================
// Analytics Constants
// =============================================================================

/**
 * Google Analytics event categories
 */
export const ANALYTICS_CATEGORIES = {
  COMPOSITION: 'composition',
  EXPORT: 'export',
  SHARE: 'share',
  CONFIGURATION: 'configuration',
} as const;

export type AnalyticsCategory = (typeof ANALYTICS_CATEGORIES)[keyof typeof ANALYTICS_CATEGORIES];
