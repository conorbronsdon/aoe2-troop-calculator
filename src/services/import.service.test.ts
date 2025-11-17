import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ImportService } from './import.service';
import { APP_VERSION } from '../constants';
import { ResourceLimitMode, Age } from '../types';

interface MockUnit {
  id: string;
  name: string;
  category: string;
  population: number;
}

interface MockCiv {
  id: string;
  name: string;
}

interface ImportData {
  meta: {
    exportedAt?: string;
    civilization?: string;
    civilizationId?: string;
    age?: string;
    populationCap?: number;
    version?: string;
  };
  units: Array<{
    id?: string;
    quantity?: number;
  }>;
  totals?: {
    units: number;
    food: number;
    wood: number;
    gold: number;
    stone: number;
    population: number;
  };
}

// Mock the dependencies
vi.mock('../data/units', () => ({
  getUnitById: vi.fn((id: string): MockUnit | null => {
    const units: Record<string, MockUnit> = {
      militia: { id: 'militia', name: 'Militia', category: 'Infantry', population: 1 },
      archer: { id: 'archer', name: 'Archer', category: 'Archer', population: 1 },
      knight: { id: 'knight', name: 'Knight', category: 'Cavalry', population: 2 },
    };
    return units[id] || null;
  }),
}));

vi.mock('../data/civilizations', () => ({
  getCivilizationById: vi.fn((id: string): MockCiv | null => {
    const civs: Record<string, MockCiv> = {
      generic: { id: 'generic', name: 'Generic' },
      britons: { id: 'britons', name: 'Britons' },
      franks: { id: 'franks', name: 'Franks' },
    };
    return civs[id] || null;
  }),
}));

vi.mock('./share.service', () => ({
  ShareService: {
    decode: vi.fn((encoded: string) => {
      if (encoded === 'valid_encoded') {
        return {
          composition: { militia: 10, archer: 5 },
          config: {
            resourceLimitMode: 'total',
            resourceLimits: { food: 8000, wood: 8000, gold: 4000, stone: 0 },
            totalResourceLimit: 20000,
            populationCap: 200,
            selectedAge: 'imperial',
            selectedCiv: 'britons',
          },
        };
      }
      return null;
    }),
  },
}));

describe('ImportService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('validateImportData', () => {
    it('should validate correct import data', () => {
      const validData: ImportData = {
        meta: {
          exportedAt: '2024-01-01T00:00:00.000Z',
          civilization: 'Britons',
          civilizationId: 'britons',
          age: 'imperial',
          populationCap: 200,
          version: APP_VERSION,
        },
        units: [
          { id: 'militia', quantity: 10 },
          { id: 'archer', quantity: 5 },
        ],
        totals: {
          units: 15,
          food: 600,
          wood: 125,
          gold: 225,
          stone: 0,
          population: 15,
        },
      };

      const result = ImportService.validateImportData(validData);
      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.data).toBe(validData);
    });

    it('should reject invalid data format', () => {
      const result = ImportService.validateImportData(null);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Invalid data format: expected a JSON object');
    });

    it('should reject data without meta section', () => {
      const result = ImportService.validateImportData({
        units: [{ id: 'militia', quantity: 10 }],
      });
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Missing required "meta" section');
    });

    it('should reject data without units section', () => {
      const result = ImportService.validateImportData({
        meta: { version: APP_VERSION },
      });
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Missing required "units" section');
    });

    it('should warn about version mismatch', () => {
      const result = ImportService.validateImportData({
        meta: { version: '1.0.0', age: 'imperial' },
        units: [],
      });
      expect(result.success).toBe(true);
      expect(result.warnings.some((w: string) => w.includes('version'))).toBe(true);
    });

    it('should reject invalid age', () => {
      const result = ImportService.validateImportData({
        meta: { version: APP_VERSION, age: 'invalid_age' },
        units: [],
      });
      expect(result.success).toBe(false);
      expect(result.errors.some((e: string) => e.includes('Invalid age'))).toBe(true);
    });

    it('should warn about unknown civilization', () => {
      const result = ImportService.validateImportData({
        meta: { version: APP_VERSION, age: 'imperial', civilizationId: 'unknown_civ' },
        units: [],
      });
      expect(result.success).toBe(true);
      expect(result.warnings.some((w: string) => w.includes('Unknown civilization'))).toBe(true);
    });

    it('should reject invalid population cap', () => {
      const result = ImportService.validateImportData({
        meta: { version: APP_VERSION, age: 'imperial', populationCap: -10 },
        units: [],
      });
      expect(result.success).toBe(false);
      expect(result.errors.some((e: string) => e.includes('Population cap'))).toBe(true);
    });

    it('should reject units without id', () => {
      const result = ImportService.validateImportData({
        meta: { version: APP_VERSION, age: 'imperial' },
        units: [{ quantity: 10 }],
      });
      expect(result.success).toBe(false);
      expect(result.errors.some((e: string) => e.includes('missing required "id" field'))).toBe(
        true
      );
    });

    it('should reject units without quantity', () => {
      const result = ImportService.validateImportData({
        meta: { version: APP_VERSION, age: 'imperial' },
        units: [{ id: 'militia' }],
      });
      expect(result.success).toBe(false);
      expect(
        result.errors.some((e: string) => e.includes('missing required "quantity" field'))
      ).toBe(true);
    });

    it('should warn about unknown unit IDs', () => {
      const result = ImportService.validateImportData({
        meta: { version: APP_VERSION, age: 'imperial' },
        units: [{ id: 'unknown_unit', quantity: 10 }],
      });
      expect(result.success).toBe(true);
      expect(result.warnings.some((w: string) => w.includes('Unknown unit ID'))).toBe(true);
    });

    it('should reject excessive unit quantities', () => {
      const result = ImportService.validateImportData({
        meta: { version: APP_VERSION, age: 'imperial' },
        units: [{ id: 'militia', quantity: 99999999 }],
      });
      expect(result.success).toBe(false);
      expect(result.errors.some((e: string) => e.includes('exceeds maximum'))).toBe(true);
    });
  });

  describe('parseJSON', () => {
    it('should parse valid JSON string', () => {
      const json = JSON.stringify({
        meta: { version: APP_VERSION, age: 'imperial' },
        units: [{ id: 'militia', quantity: 10 }],
      });
      const result = ImportService.parseJSON(json);
      expect(result.success).toBe(true);
    });

    it('should reject invalid JSON syntax', () => {
      const result = ImportService.parseJSON('{ invalid json }');
      expect(result.success).toBe(false);
      expect(result.errors.some((e: string) => e.includes('Invalid JSON syntax'))).toBe(true);
    });
  });

  describe('toComposition', () => {
    it('should convert validated data to composition format', () => {
      const validData = {
        meta: {
          age: 'castle' as Age,
          civilizationId: 'franks',
          populationCap: 150,
        },
        units: [
          { id: 'militia', quantity: 10 },
          { id: 'archer', quantity: 5 },
          { id: 'unknown', quantity: 3 }, // Should be skipped
        ],
      };

      const result = ImportService.toComposition(validData);
      expect(result.composition).toEqual({ militia: 10, archer: 5 });
      expect(result.config.selectedAge).toBe('castle');
      expect(result.config.selectedCiv).toBe('franks');
      expect(result.config.populationCap).toBe(150);
    });

    it('should use defaults for missing config values', () => {
      const validData = {
        meta: {},
        units: [],
      };

      const result = ImportService.toComposition(validData);
      expect(result.config.selectedAge).toBe('imperial');
      expect(result.config.selectedCiv).toBe('generic');
      expect(result.config.populationCap).toBe(200);
    });
  });

  describe('fromJSON', () => {
    it('should import valid JSON composition', () => {
      const json = JSON.stringify({
        meta: {
          version: APP_VERSION,
          age: 'imperial',
          civilizationId: 'britons',
          populationCap: 200,
        },
        units: [{ id: 'militia', quantity: 10 }],
      });

      const result = ImportService.fromJSON(json);
      expect(result.success).toBe(true);
      expect(result.data!.composition).toEqual({ militia: 10 });
      expect(result.data!.config.selectedAge).toBe('imperial');
    });

    it('should fail for invalid JSON', () => {
      const result = ImportService.fromJSON('not json');
      expect(result.success).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('fromURL', () => {
    it('should import composition from valid URL', () => {
      const url = 'https://example.com/?army=valid_encoded';
      const result = ImportService.fromURL(url);
      expect(result.success).toBe(true);
      expect(result.data!.composition).toEqual({ militia: 10, archer: 5 });
      expect(result.data!.config.selectedCiv).toBe('britons');
    });

    it('should fail for URL without army parameter', () => {
      const url = 'https://example.com/';
      const result = ImportService.fromURL(url);
      expect(result.success).toBe(false);
      expect(result.errors.some((e: string) => e.includes('army'))).toBe(true);
    });

    it('should fail for invalid URL', () => {
      const result = ImportService.fromURL('not a url');
      expect(result.success).toBe(false);
      expect(result.errors.some((e: string) => e.includes('Invalid URL'))).toBe(true);
    });

    it('should fail for corrupted encoded data', () => {
      const url = 'https://example.com/?army=invalid_encoded';
      const result = ImportService.fromURL(url);
      expect(result.success).toBe(false);
      expect(result.errors.some((e: string) => e.includes('Failed to decode'))).toBe(true);
    });
  });

  describe('sanitizeData', () => {
    it('should sanitize composition data', () => {
      const data = {
        composition: {
          'militia<script>': 10,
          archer: -5,
          knight: 99999999,
        },
        config: {
          selectedAge: 'invalid' as Age,
          selectedCiv: 'britons<script>',
          populationCap: -100,
          previewCiv: 'generic',
        },
      };

      const sanitized = ImportService.sanitizeData(data);
      expect(sanitized!.composition['militia<script>']).toBeUndefined();
      expect(sanitized!.composition['militiascript']).toBe(10); // Cleaned key, valid quantity
      expect(sanitized!.composition.archer).toBeUndefined(); // Negative quantity removed
      expect(sanitized!.composition.knight).toBe(9999); // MAX_UNIT_QUANTITY
      expect(sanitized!.config.selectedAge).toBe('imperial'); // Default
      expect(sanitized!.config.selectedCiv).toBe('britonsscript');
      expect(sanitized!.config.populationCap).toBe(1); // Min value
    });

    it('should handle null data', () => {
      const result = ImportService.sanitizeData(null);
      expect(result).toBeNull();
    });

    it('should preserve resource limits', () => {
      const data = {
        composition: {},
        config: {
          selectedAge: 'imperial' as Age,
          selectedCiv: 'generic',
          populationCap: 200,
          resourceLimitMode: 'individual' as ResourceLimitMode,
          resourceLimits: {
            food: 10000,
            wood: 10000,
            gold: 5000,
            stone: 1000,
          },
          totalResourceLimit: 25000,
          previewCiv: 'generic',
        },
      };

      const sanitized = ImportService.sanitizeData(data);
      expect(sanitized!.config.resourceLimitMode).toBe('individual');
      expect(sanitized!.config.resourceLimits!.food).toBe(10000);
      expect(sanitized!.config.totalResourceLimit).toBe(25000);
    });
  });

  describe('createHistoryEntry', () => {
    it('should create history entry for successful import', () => {
      const importResult = {
        success: true,
        data: {
          composition: { militia: 10, archer: 5 },
          config: {
            selectedAge: 'imperial' as Age,
            selectedCiv: 'generic',
            previewCiv: 'generic',
            populationCap: 200,
          },
        },
        errors: [] as string[],
        warnings: [] as string[],
      };

      const entry = ImportService.createHistoryEntry('file', 'test.json', importResult);
      expect(entry.source).toBe('file');
      expect(entry.filename).toBe('test.json');
      expect(entry.success).toBe(true);
      expect(entry.unitCount).toBe(2);
      expect(entry.id).toMatch(/^import_/);
      expect(entry.importedAt).toBeDefined();
    });

    it('should create history entry for failed import', () => {
      const importResult = {
        success: false,
        data: null,
        errors: ['Import failed'] as string[],
        warnings: [] as string[],
      };

      const entry = ImportService.createHistoryEntry('paste', null, importResult);
      expect(entry.success).toBe(false);
      expect(entry.unitCount).toBe(0);
      expect(entry.filename).toBeNull();
    });
  });

  describe('autoDetect', () => {
    it('should detect URL input', () => {
      const result = ImportService.autoDetect('https://example.com/?army=valid_encoded');
      expect(result.success).toBe(true);
    });

    it('should detect JSON input', () => {
      const json = JSON.stringify({
        meta: { version: APP_VERSION, age: 'imperial' },
        units: [],
      });
      const result = ImportService.autoDetect(json);
      expect(result.success).toBe(true);
    });

    it('should detect encoded army data', () => {
      const result = ImportService.autoDetect('valid_encoded');
      expect(result.success).toBe(true);
      expect(result.warnings.some((w: string) => w.includes('base64'))).toBe(true);
    });

    it('should fail for unrecognized input', () => {
      const result = ImportService.autoDetect('some random text with spaces');
      expect(result.success).toBe(false);
      expect(result.errors.some((e: string) => e.includes('Unable to detect'))).toBe(true);
    });
  });

  describe('fromFile', () => {
    it('should reject non-JSON files', async () => {
      const file = new File(['content'], 'test.txt', { type: 'text/plain' });
      const result = await ImportService.fromFile(file);
      expect(result.success).toBe(false);
      expect(result.errors.some((e: string) => e.includes('JSON file'))).toBe(true);
    });

    it('should reject files that are too large', async () => {
      const largeContent = 'x'.repeat(2 * 1024 * 1024); // 2MB
      const file = new File([largeContent], 'large.json', { type: 'application/json' });
      const result = await ImportService.fromFile(file);
      expect(result.success).toBe(false);
      expect(result.errors.some((e: string) => e.includes('size exceeds'))).toBe(true);
    });

    it('should successfully import valid JSON file', async () => {
      const jsonData = {
        meta: { version: APP_VERSION, age: 'imperial' },
        units: [{ id: 'militia', quantity: 10 }],
      };
      const file = new File([JSON.stringify(jsonData)], 'composition.json', {
        type: 'application/json',
      });
      const result = await ImportService.fromFile(file);
      expect(result.success).toBe(true);
      expect(result.data!.composition).toEqual({ militia: 10 });
    });
  });
});
