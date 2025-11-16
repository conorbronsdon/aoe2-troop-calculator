/**
 * Import Service
 * Handles importing army compositions from JSON files, pasted content, and URLs
 */

import { getUnitById } from '../data/units';
import { getCivilizationById } from '../data/civilizations';
import { ShareService } from './share.service';
import { logger } from '../utils/errorHandler';
import { APP_VERSION, LIMITS, AGES, RESOURCE_LIMIT_MODES } from '../constants';

/**
 * Import validation result
 * @typedef {Object} ImportResult
 * @property {boolean} success - Whether import was successful
 * @property {Object|null} data - Imported composition and config
 * @property {string[]} errors - List of validation errors
 * @property {string[]} warnings - List of validation warnings
 */

/**
 * Import history entry
 * @typedef {Object} ImportHistoryEntry
 * @property {string} id - Unique identifier
 * @property {string} source - Source type: 'file', 'paste', 'url'
 * @property {string} filename - Original filename (if file import)
 * @property {Date} importedAt - Timestamp of import
 * @property {string} version - Version of imported data
 * @property {number} unitCount - Number of units in imported composition
 * @property {boolean} success - Whether import succeeded
 */

export const ImportService = {
  /**
   * Validate the structure of imported JSON data
   * @param {Object} data - Parsed JSON data
   * @returns {ImportResult} Validation result
   */
  validateImportData(data) {
    const errors = [];
    const warnings = [];

    // Check basic structure
    if (!data || typeof data !== 'object') {
      errors.push('Invalid data format: expected a JSON object');
      return { success: false, data: null, errors, warnings };
    }

    // Check for meta section
    if (!data.meta) {
      errors.push('Missing required "meta" section');
    } else {
      // Validate version
      if (!data.meta.version) {
        warnings.push('No version information found. Data may be from an older export.');
      } else if (data.meta.version !== APP_VERSION) {
        const [major, minor] = APP_VERSION.split('.').map(Number);
        const [importMajor, importMinor] = data.meta.version.split('.').map(Number);

        if (importMajor > major || (importMajor === major && importMinor > minor)) {
          warnings.push(`Import version (${data.meta.version}) is newer than app version (${APP_VERSION}). Some features may not work.`);
        } else {
          warnings.push(`Import version (${data.meta.version}) differs from app version (${APP_VERSION}). Data will be migrated.`);
        }
      }

      // Validate age
      if (data.meta.age && !AGES.includes(data.meta.age)) {
        errors.push(`Invalid age "${data.meta.age}". Must be one of: ${AGES.join(', ')}`);
      }

      // Validate civilization
      if (data.meta.civilizationId) {
        const civ = getCivilizationById(data.meta.civilizationId);
        if (!civ && data.meta.civilizationId !== 'generic') {
          warnings.push(`Unknown civilization ID "${data.meta.civilizationId}". Defaulting to generic.`);
        }
      }

      // Validate population cap
      if (data.meta.populationCap !== undefined) {
        if (typeof data.meta.populationCap !== 'number' || data.meta.populationCap < 1) {
          errors.push('Population cap must be a positive number');
        } else if (data.meta.populationCap > LIMITS.MAX_POPULATION_CAP) {
          errors.push(`Population cap exceeds maximum allowed value (${LIMITS.MAX_POPULATION_CAP})`);
        }
      }
    }

    // Check for units array
    if (!data.units) {
      errors.push('Missing required "units" section');
    } else if (!Array.isArray(data.units)) {
      errors.push('"units" must be an array');
    } else {
      // Validate each unit
      data.units.forEach((unit, index) => {
        if (!unit.id) {
          errors.push(`Unit at index ${index} is missing required "id" field`);
        } else {
          const unitData = getUnitById(unit.id);
          if (!unitData) {
            warnings.push(`Unknown unit ID "${unit.id}" at index ${index}. This unit will be skipped.`);
          }
        }

        if (unit.quantity === undefined) {
          errors.push(`Unit "${unit.id || index}" is missing required "quantity" field`);
        } else if (typeof unit.quantity !== 'number' || unit.quantity < 0) {
          errors.push(`Unit "${unit.id || index}" has invalid quantity. Must be a non-negative number.`);
        } else if (unit.quantity > LIMITS.MAX_UNIT_QUANTITY) {
          errors.push(`Unit "${unit.id || index}" quantity exceeds maximum (${LIMITS.MAX_UNIT_QUANTITY})`);
        }
      });
    }

    return {
      success: errors.length === 0,
      data: errors.length === 0 ? data : null,
      errors,
      warnings,
    };
  },

  /**
   * Parse JSON string to object
   * @param {string} jsonString - JSON string to parse
   * @returns {ImportResult} Parse result
   */
  parseJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      return this.validateImportData(data);
    } catch (error) {
      logger.error('Failed to parse JSON', error);
      return {
        success: false,
        data: null,
        errors: [`Invalid JSON syntax: ${error.message}`],
        warnings: [],
      };
    }
  },

  /**
   * Convert validated import data to composition format
   * @param {Object} validatedData - Validated import data
   * @returns {Object} Composition and config object
   */
  toComposition(validatedData) {
    const composition = {};

    // Build composition from units array
    validatedData.units.forEach((unit) => {
      if (unit.quantity > 0) {
        const unitData = getUnitById(unit.id);
        if (unitData) {
          composition[unit.id] = unit.quantity;
        }
      }
    });

    // Build config from meta
    const config = {
      selectedAge: validatedData.meta.age || 'imperial',
      selectedCiv: validatedData.meta.civilizationId || 'generic',
      previewCiv: validatedData.meta.civilizationId || 'generic',
      populationCap: validatedData.meta.populationCap || 200,
    };

    return { composition, config };
  },

  /**
   * Import composition from JSON string
   * @param {string} jsonString - JSON string containing composition
   * @returns {ImportResult} Import result with composition data
   */
  fromJSON(jsonString) {
    const parseResult = this.parseJSON(jsonString);

    if (!parseResult.success) {
      return parseResult;
    }

    const { composition, config } = this.toComposition(parseResult.data);

    return {
      success: true,
      data: { composition, config },
      errors: parseResult.errors,
      warnings: parseResult.warnings,
    };
  },

  /**
   * Import composition from URL parameters
   * @param {string} url - URL containing army parameter
   * @returns {ImportResult} Import result
   */
  fromURL(url) {
    const errors = [];
    const warnings = [];

    try {
      const urlObj = new URL(url);
      const armyParam = urlObj.searchParams.get('army');

      if (!armyParam) {
        errors.push('URL does not contain an "army" parameter');
        return { success: false, data: null, errors, warnings };
      }

      const decoded = ShareService.decode(armyParam);

      if (!decoded) {
        errors.push('Failed to decode army data from URL. The link may be corrupted or from an incompatible version.');
        return { success: false, data: null, errors, warnings };
      }

      // Validate the decoded composition
      const { composition, config } = decoded;

      // Validate units exist
      const unknownUnits = [];
      Object.keys(composition).forEach((unitId) => {
        const unit = getUnitById(unitId);
        if (!unit) {
          unknownUnits.push(unitId);
          delete composition[unitId];
        }
      });

      if (unknownUnits.length > 0) {
        warnings.push(`Unknown unit IDs were skipped: ${unknownUnits.join(', ')}`);
      }

      // Validate config values
      if (config.selectedAge && !AGES.includes(config.selectedAge)) {
        warnings.push(`Invalid age "${config.selectedAge}". Defaulting to imperial.`);
        config.selectedAge = 'imperial';
      }

      if (config.selectedCiv) {
        const civ = getCivilizationById(config.selectedCiv);
        if (!civ && config.selectedCiv !== 'generic') {
          warnings.push(`Unknown civilization "${config.selectedCiv}". Defaulting to generic.`);
          config.selectedCiv = 'generic';
        }
      }

      return {
        success: true,
        data: { composition, config },
        errors,
        warnings,
      };
    } catch (error) {
      logger.error('Failed to parse URL', error);
      errors.push(`Invalid URL format: ${error.message}`);
      return { success: false, data: null, errors, warnings };
    }
  },

  /**
   * Read file and return contents as string
   * @param {File} file - File object to read
   * @returns {Promise<string>} File contents
   */
  async readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsText(file);
    });
  },

  /**
   * Import composition from file
   * @param {File} file - File object
   * @returns {Promise<ImportResult>} Import result
   */
  async fromFile(file) {
    const errors = [];
    const warnings = [];

    // Validate file type
    if (!file.name.endsWith('.json')) {
      errors.push('File must be a JSON file (.json extension)');
      return { success: false, data: null, errors, warnings };
    }

    // Validate file size (max 1MB)
    const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
    if (file.size > MAX_FILE_SIZE) {
      errors.push('File size exceeds maximum allowed (1MB)');
      return { success: false, data: null, errors, warnings };
    }

    try {
      const content = await this.readFile(file);
      return this.fromJSON(content);
    } catch (error) {
      logger.error('Failed to read file', error);
      errors.push(`Failed to read file: ${error.message}`);
      return { success: false, data: null, errors, warnings };
    }
  },

  /**
   * Sanitize imported data to prevent XSS or injection attacks
   * @param {Object} data - Import result data
   * @returns {Object} Sanitized data
   */
  sanitizeData(data) {
    if (!data) return data;

    const { composition, config } = data;

    // Sanitize composition - only allow valid unit IDs and numeric quantities
    const sanitizedComposition = {};
    Object.entries(composition).forEach(([unitId, quantity]) => {
      // Ensure unitId is a string and doesn't contain special characters
      const cleanId = String(unitId).replace(/[^a-zA-Z0-9_-]/g, '');
      const cleanQuantity = Math.min(
        Math.max(0, Math.floor(Number(quantity) || 0)),
        LIMITS.MAX_UNIT_QUANTITY
      );

      if (cleanId && cleanQuantity > 0) {
        sanitizedComposition[cleanId] = cleanQuantity;
      }
    });

    // Sanitize config
    const sanitizedConfig = {
      ...config,
      selectedAge: AGES.includes(config.selectedAge) ? config.selectedAge : 'imperial',
      selectedCiv: String(config.selectedCiv || 'generic').replace(/[^a-zA-Z0-9_-]/g, ''),
      previewCiv: String(config.previewCiv || config.selectedCiv || 'generic').replace(/[^a-zA-Z0-9_-]/g, ''),
      populationCap: Math.min(
        Math.max(1, Math.floor(Number(config.populationCap) || 200)),
        LIMITS.MAX_POPULATION_CAP
      ),
    };

    // Preserve resource limits if present
    if (config.resourceLimitMode) {
      sanitizedConfig.resourceLimitMode =
        Object.values(RESOURCE_LIMIT_MODES).includes(config.resourceLimitMode)
          ? config.resourceLimitMode
          : RESOURCE_LIMIT_MODES.TOTAL;
    }

    if (config.resourceLimits) {
      sanitizedConfig.resourceLimits = {};
      ['food', 'wood', 'gold', 'stone'].forEach((resource) => {
        sanitizedConfig.resourceLimits[resource] = Math.min(
          Math.max(0, Math.floor(Number(config.resourceLimits[resource]) || 0)),
          LIMITS.MAX_RESOURCE_VALUE
        );
      });
    }

    if (config.totalResourceLimit !== undefined) {
      sanitizedConfig.totalResourceLimit = Math.min(
        Math.max(0, Math.floor(Number(config.totalResourceLimit) || 20000)),
        LIMITS.MAX_RESOURCE_VALUE
      );
    }

    return {
      composition: sanitizedComposition,
      config: sanitizedConfig,
    };
  },

  /**
   * Create an import history entry
   * @param {string} source - Source type ('file', 'paste', 'url')
   * @param {string} filename - Filename if file import
   * @param {Object} importResult - Import result object
   * @returns {ImportHistoryEntry} History entry
   */
  createHistoryEntry(source, filename, importResult) {
    const unitCount = importResult.success && importResult.data
      ? Object.keys(importResult.data.composition).length
      : 0;

    return {
      id: `import_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      source,
      filename: filename || null,
      importedAt: new Date().toISOString(),
      version: importResult.data?.config?.version || APP_VERSION,
      unitCount,
      success: importResult.success,
    };
  },

  /**
   * Auto-detect import source and process accordingly
   * @param {string} input - Input string (could be JSON or URL)
   * @returns {ImportResult} Import result
   */
  autoDetect(input) {
    const trimmed = input.trim();

    // Check if it's a URL
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return this.fromURL(trimmed);
    }

    // Try to parse as JSON
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      return this.fromJSON(trimmed);
    }

    // Could be just the encoded army parameter
    if (trimmed.length > 0 && !trimmed.includes(' ')) {
      try {
        const decoded = ShareService.decode(trimmed);
        if (decoded) {
          return {
            success: true,
            data: decoded,
            errors: [],
            warnings: ['Detected as encoded army data (base64)'],
          };
        }
      } catch {
        // Not base64 encoded data
      }
    }

    return {
      success: false,
      data: null,
      errors: ['Unable to detect input format. Please provide valid JSON, a URL, or an encoded army string.'],
      warnings: [],
    };
  },
};
