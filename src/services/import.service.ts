/**
 * Import Service
 * Handles importing army compositions from JSON files, pasted content, and URLs
 */

import { getUnitById } from '../data/units';
import { getCivilizationById } from '../data/civilizations';
import { ShareService } from './share.service';
import { logger } from '../utils/errorHandler';
import { APP_VERSION, LIMITS, AGES, RESOURCE_LIMIT_MODES } from '../constants';
import { Age, ResourceLimitMode, ResourceLimits } from '../types';

// Types for import service
interface ImportResultData {
  composition: Record<string, number>;
  config: ImportConfig;
}

interface ImportResult {
  success: boolean;
  data: ImportResultData | null;
  errors: string[];
  warnings: string[];
}

interface ImportConfig {
  selectedAge: Age;
  selectedCiv: string;
  previewCiv: string;
  populationCap: number;
  resourceLimitMode?: ResourceLimitMode;
  resourceLimits?: ResourceLimits;
  totalResourceLimit?: number;
  version?: string;
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

interface ImportUnitData {
  id: string;
  name?: string;
  quantity: number;
  [key: string]: unknown;
}

interface ImportMetaData {
  version?: string;
  age?: string;
  civilizationId?: string;
  populationCap?: number;
  [key: string]: unknown;
}

interface ImportDataStructure {
  meta?: ImportMetaData;
  units?: ImportUnitData[];
  [key: string]: unknown;
}

interface ImportServiceInterface {
  validateImportData(data: unknown): ImportResult;
  parseJSON(jsonString: string): ImportResult;
  toComposition(validatedData: ImportDataStructure): ImportResultData;
  fromJSON(jsonString: string): ImportResult;
  fromURL(url: string): ImportResult;
  readFile(file: File): Promise<string>;
  fromFile(file: File): Promise<ImportResult>;
  sanitizeData(data: ImportResultData | null): ImportResultData | null;
  createHistoryEntry(source: 'file' | 'paste' | 'url', filename: string | null, importResult: ImportResult): ImportHistoryEntry;
  autoDetect(input: string): ImportResult;
}

export const ImportService: ImportServiceInterface = {
  /**
   * Validate the structure of imported JSON data
   * @param data - Parsed JSON data
   * @returns Validation result
   */
  validateImportData(data: unknown): ImportResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check basic structure
    if (!data || typeof data !== 'object') {
      errors.push('Invalid data format: expected a JSON object');
      return { success: false, data: null, errors, warnings };
    }

    const importData = data as ImportDataStructure;

    // Check for meta section
    if (!importData.meta) {
      errors.push('Missing required "meta" section');
    } else {
      // Validate version
      if (!importData.meta.version) {
        warnings.push('No version information found. Data may be from an older export.');
      } else if (importData.meta.version !== APP_VERSION) {
        const [major, minor] = APP_VERSION.split('.').map(Number);
        const [importMajor, importMinor] = importData.meta.version.split('.').map(Number);

        if (importMajor > major || (importMajor === major && importMinor > minor)) {
          warnings.push(`Import version (${importData.meta.version}) is newer than app version (${APP_VERSION}). Some features may not work.`);
        } else {
          warnings.push(`Import version (${importData.meta.version}) differs from app version (${APP_VERSION}). Data will be migrated.`);
        }
      }

      // Validate age
      if (importData.meta.age && !AGES.includes(importData.meta.age as Age)) {
        errors.push(`Invalid age "${importData.meta.age}". Must be one of: ${AGES.join(', ')}`);
      }

      // Validate civilization
      if (importData.meta.civilizationId) {
        const civ = getCivilizationById(importData.meta.civilizationId);
        if (!civ && importData.meta.civilizationId !== 'generic') {
          warnings.push(`Unknown civilization ID "${importData.meta.civilizationId}". Defaulting to generic.`);
        }
      }

      // Validate population cap
      if (importData.meta.populationCap !== undefined) {
        if (typeof importData.meta.populationCap !== 'number' || importData.meta.populationCap < 1) {
          errors.push('Population cap must be a positive number');
        } else if (importData.meta.populationCap > LIMITS.MAX_POPULATION_CAP) {
          errors.push(`Population cap exceeds maximum allowed value (${LIMITS.MAX_POPULATION_CAP})`);
        }
      }
    }

    // Check for units array
    if (!importData.units) {
      errors.push('Missing required "units" section');
    } else if (!Array.isArray(importData.units)) {
      errors.push('"units" must be an array');
    } else {
      // Validate each unit
      importData.units.forEach((unit, index) => {
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
      data: errors.length === 0 ? (importData as unknown as ImportResultData) : null,
      errors,
      warnings,
    };
  },

  /**
   * Parse JSON string to object
   * @param jsonString - JSON string to parse
   * @returns Parse result
   */
  parseJSON(jsonString: string): ImportResult {
    try {
      const data = JSON.parse(jsonString);
      return this.validateImportData(data);
    } catch (error) {
      logger.error('Failed to parse JSON', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        data: null,
        errors: [`Invalid JSON syntax: ${errorMessage}`],
        warnings: [],
      };
    }
  },

  /**
   * Convert validated import data to composition format
   * @param validatedData - Validated import data
   * @returns Composition and config object
   */
  toComposition(validatedData: ImportDataStructure): ImportResultData {
    const composition: Record<string, number> = {};

    // Build composition from units array
    if (validatedData.units) {
      validatedData.units.forEach((unit) => {
        if (unit.quantity > 0) {
          const unitData = getUnitById(unit.id);
          if (unitData) {
            composition[unit.id] = unit.quantity;
          }
        }
      });
    }

    // Build config from meta
    const config: ImportConfig = {
      selectedAge: (validatedData.meta?.age as Age) || 'imperial',
      selectedCiv: validatedData.meta?.civilizationId || 'generic',
      previewCiv: validatedData.meta?.civilizationId || 'generic',
      populationCap: validatedData.meta?.populationCap || 200,
    };

    return { composition, config };
  },

  /**
   * Import composition from JSON string
   * @param jsonString - JSON string containing composition
   * @returns Import result with composition data
   */
  fromJSON(jsonString: string): ImportResult {
    const parseResult = this.parseJSON(jsonString);

    if (!parseResult.success) {
      return parseResult;
    }

    // Type assertion: parseResult.data is valid since success is true
    const validatedData = parseResult.data as unknown as ImportDataStructure;
    const { composition, config } = this.toComposition(validatedData);

    return {
      success: true,
      data: { composition, config },
      errors: parseResult.errors,
      warnings: parseResult.warnings,
    };
  },

  /**
   * Import composition from URL parameters
   * @param url - URL containing army parameter
   * @returns Import result
   */
  fromURL(url: string): ImportResult {
    const errors: string[] = [];
    const warnings: string[] = [];

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
      const unknownUnits: string[] = [];
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

      // Convert ShareService config to ImportConfig
      const importConfig: ImportConfig = {
        selectedAge: config.selectedAge,
        selectedCiv: config.selectedCiv,
        previewCiv: config.selectedCiv,
        populationCap: config.populationCap,
        resourceLimitMode: config.resourceLimitMode,
        resourceLimits: config.resourceLimits,
        totalResourceLimit: config.totalResourceLimit,
      };

      return {
        success: true,
        data: { composition, config: importConfig },
        errors,
        warnings,
      };
    } catch (error) {
      logger.error('Failed to parse URL', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      errors.push(`Invalid URL format: ${errorMessage}`);
      return { success: false, data: null, errors, warnings };
    }
  },

  /**
   * Read file and return contents as string
   * @param file - File object to read
   * @returns File contents
   */
  async readFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        resolve(event.target?.result as string);
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsText(file);
    });
  },

  /**
   * Import composition from file
   * @param file - File object
   * @returns Import result
   */
  async fromFile(file: File): Promise<ImportResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

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
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      errors.push(`Failed to read file: ${errorMessage}`);
      return { success: false, data: null, errors, warnings };
    }
  },

  /**
   * Sanitize imported data to prevent XSS or injection attacks
   * @param data - Import result data
   * @returns Sanitized data
   */
  sanitizeData(data: ImportResultData | null): ImportResultData | null {
    if (!data) {
      return data;
    }

    const { composition, config } = data;

    // Sanitize composition - only allow valid unit IDs and numeric quantities
    const sanitizedComposition: Record<string, number> = {};
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
    const sanitizedConfig: ImportConfig = {
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
          : RESOURCE_LIMIT_MODES.TOTAL as ResourceLimitMode;
    }

    if (config.resourceLimits) {
      sanitizedConfig.resourceLimits = {
        food: Math.min(
          Math.max(0, Math.floor(Number(config.resourceLimits.food) || 0)),
          LIMITS.MAX_RESOURCE_VALUE
        ),
        wood: Math.min(
          Math.max(0, Math.floor(Number(config.resourceLimits.wood) || 0)),
          LIMITS.MAX_RESOURCE_VALUE
        ),
        gold: Math.min(
          Math.max(0, Math.floor(Number(config.resourceLimits.gold) || 0)),
          LIMITS.MAX_RESOURCE_VALUE
        ),
        stone: Math.min(
          Math.max(0, Math.floor(Number(config.resourceLimits.stone) || 0)),
          LIMITS.MAX_RESOURCE_VALUE
        ),
      };
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
   * @param source - Source type ('file', 'paste', 'url')
   * @param filename - Filename if file import
   * @param importResult - Import result object
   * @returns History entry
   */
  createHistoryEntry(source: 'file' | 'paste' | 'url', filename: string | null, importResult: ImportResult): ImportHistoryEntry {
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
   * @param input - Input string (could be JSON or URL)
   * @returns Import result
   */
  autoDetect(input: string): ImportResult {
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
          const importConfig: ImportConfig = {
            selectedAge: decoded.config.selectedAge,
            selectedCiv: decoded.config.selectedCiv,
            previewCiv: decoded.config.selectedCiv,
            populationCap: decoded.config.populationCap,
            resourceLimitMode: decoded.config.resourceLimitMode,
            resourceLimits: decoded.config.resourceLimits,
            totalResourceLimit: decoded.config.totalResourceLimit,
          };

          return {
            success: true,
            data: {
              composition: decoded.composition,
              config: importConfig,
            },
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
