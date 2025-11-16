/**
 * Application-wide constants
 *
 * This file centralizes all magic strings, configuration values, and constants
 * used throughout the application. Import these values instead of hardcoding
 * strings to ensure consistency and easier maintenance.
 */

// =============================================================================
// Application Info
// =============================================================================

/**
 * Application version - update this when releasing new versions
 * IMPORTANT: Keep in sync with package.json version
 */
export const APP_VERSION = '2.4.0';

export const APP_NAME = 'AoE2 Troop Calculator';
export const APP_DISPLAY_NAME = 'Age of Empires II Army Calculator';

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
};

// =============================================================================
// Game Ages
// =============================================================================

/**
 * Age of Empires II game ages in progression order
 */
export const AGES = ['dark', 'feudal', 'castle', 'imperial'];

/**
 * Display names for each age
 */
export const AGE_DISPLAY_NAMES = {
  dark: 'Dark Age',
  feudal: 'Feudal Age',
  castle: 'Castle Age',
  imperial: 'Imperial Age',
};

/**
 * Order mapping for age comparison (higher number = later age)
 */
export const AGE_ORDER = {
  dark: 0,
  feudal: 1,
  castle: 2,
  imperial: 3,
};

// =============================================================================
// Resource Types
// =============================================================================

/**
 * Resource types in Age of Empires II
 */
export const RESOURCES = ['food', 'wood', 'gold', 'stone'];

/**
 * Display names for resources
 */
export const RESOURCE_DISPLAY_NAMES = {
  food: 'Food',
  wood: 'Wood',
  gold: 'Gold',
  stone: 'Stone',
};

/**
 * Default resource limits per resource
 */
export const DEFAULT_RESOURCE_LIMITS = {
  food: 8000,
  wood: 8000,
  gold: 4000,
  stone: 0,
};

/**
 * Default total resource limit
 */
export const DEFAULT_TOTAL_RESOURCE_LIMIT = 20000;

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
];

// =============================================================================
// Display Modes
// =============================================================================

/**
 * Available display modes for the calculator
 */
export const DISPLAY_MODES = {
  UNITS: 'units',
  FORTIFICATIONS: 'fortifications',
  BOTH: 'both',
};

/**
 * Display names for display modes
 */
export const DISPLAY_MODE_NAMES = {
  [DISPLAY_MODES.UNITS]: 'Units Only',
  [DISPLAY_MODES.FORTIFICATIONS]: 'Fortifications Only',
  [DISPLAY_MODES.BOTH]: 'Both',
};

// =============================================================================
// Resource Limit Modes
// =============================================================================

/**
 * Resource limit calculation modes
 */
export const RESOURCE_LIMIT_MODES = {
  TOTAL: 'total',
  INDIVIDUAL: 'individual',
};

// =============================================================================
// Default Configuration
// =============================================================================

/**
 * Default configuration for new army compositions
 */
export const DEFAULT_CONFIG = {
  resourceLimitMode: RESOURCE_LIMIT_MODES.TOTAL,
  resourceLimits: { ...DEFAULT_RESOURCE_LIMITS },
  totalResourceLimit: DEFAULT_TOTAL_RESOURCE_LIMIT,
  populationCap: 200,
  selectedAge: 'imperial',
  selectedCiv: 'generic',
  previewCiv: 'generic',
  displayMode: DISPLAY_MODES.UNITS,
};

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
};

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
};

// =============================================================================
// Civilization Constants
// =============================================================================

/**
 * Special civilization ID for generic (no civ bonuses)
 */
export const GENERIC_CIV_ID = 'generic';

// =============================================================================
// UI Constants
// =============================================================================

/**
 * Toast message display duration in milliseconds
 */
export const TOAST_DURATION_MS = 3000;

/**
 * Debounce delay for search inputs in milliseconds
 */
export const SEARCH_DEBOUNCE_MS = 300;

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
};
