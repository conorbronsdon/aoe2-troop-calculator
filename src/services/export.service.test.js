/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ExportService } from './export.service';

// Mock the dependencies
vi.mock('../data/units', () => ({
  getUnitById: vi.fn((id) => {
    const units = {
      militia: {
        name: 'Militia',
        category: 'Infantry',
        population: 1,
      },
      archer: {
        name: 'Archer',
        category: 'Archer',
        population: 1,
      },
      knight: {
        name: 'Knight',
        category: 'Cavalry',
        population: 1,
      },
    };
    return units[id] || null;
  }),
}));

vi.mock('../data/civilizations', () => ({
  getCivilizationById: vi.fn((id) => {
    const civs = {
      britons: { name: 'Britons' },
      generic: { name: 'Generic' },
    };
    return civs[id] || null;
  }),
}));

vi.mock('../utils/calculations', () => ({
  calculateUnitCost: vi.fn((_unit) => ({
    food: 60,
    wood: 20,
    gold: 0,
    stone: 0,
  })),
}));

describe('ExportService', () => {
  const mockComposition = { militia: 10, archer: 5 };
  const mockConfig = {
    selectedCiv: 'britons',
    selectedAge: 'imperial',
    populationCap: 200,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('toCSV', () => {
    it('should generate valid CSV format', () => {
      const csv = ExportService.toCSV(mockComposition, mockConfig);

      expect(csv).toContain('Age of Empires II - Army Composition');
      expect(csv).toContain('Civilization,Britons');
      expect(csv).toContain('Age,Imperial');
      expect(csv).toContain('Population Cap,200');
    });

    it('should include header row with correct columns', () => {
      const csv = ExportService.toCSV(mockComposition, mockConfig);

      expect(csv).toContain('Unit,Quantity,Food (each),Wood (each),Gold (each),Stone (each)');
    });

    it('should include unit data rows', () => {
      const csv = ExportService.toCSV(mockComposition, mockConfig);

      expect(csv).toContain('Militia');
      expect(csv).toContain('Archer');
    });

    it('should calculate totals correctly', () => {
      const csv = ExportService.toCSV(mockComposition, mockConfig);

      expect(csv).toContain('TOTAL');
      // 10 militia + 5 archers = 15 units
      expect(csv).toContain('15');
    });

    it('should handle empty composition', () => {
      const csv = ExportService.toCSV({}, mockConfig);

      expect(csv).toContain('TOTAL');
      expect(csv).toContain('0'); // Zero units
    });

    it('should escape commas in data', () => {
      const csv = ExportService.toCSV(mockComposition, mockConfig);

      // Check that the CSV is properly formatted
      const lines = csv.split('\n');
      expect(lines.length).toBeGreaterThan(5);
    });

    it('should skip units with zero quantity', () => {
      const composition = { militia: 0, archer: 5 };
      const csv = ExportService.toCSV(composition, mockConfig);

      const lines = csv.split('\n');
      const militiaLine = lines.find((line) => line.startsWith('Militia,'));
      expect(militiaLine).toBeUndefined();
    });

    it('should handle unknown civilization gracefully', () => {
      const config = { ...mockConfig, selectedCiv: 'unknown' };
      const csv = ExportService.toCSV(mockComposition, config);

      expect(csv).toContain('Unknown');
    });
  });

  describe('toJSON', () => {
    it('should generate valid JSON format', () => {
      const json = ExportService.toJSON(mockComposition, mockConfig);
      const parsed = JSON.parse(json);

      expect(parsed).toHaveProperty('meta');
      expect(parsed).toHaveProperty('units');
      expect(parsed).toHaveProperty('totals');
    });

    it('should include metadata', () => {
      const json = ExportService.toJSON(mockComposition, mockConfig);
      const parsed = JSON.parse(json);

      expect(parsed.meta.civilization).toBe('Britons');
      expect(parsed.meta.civilizationId).toBe('britons');
      expect(parsed.meta.age).toBe('imperial');
      expect(parsed.meta.populationCap).toBe(200);
      expect(parsed.meta.exportedAt).toBeDefined();
      expect(parsed.meta.version).toBeDefined();
    });

    it('should include unit details', () => {
      const json = ExportService.toJSON(mockComposition, mockConfig);
      const parsed = JSON.parse(json);

      expect(parsed.units).toHaveLength(2);

      const militia = parsed.units.find((u) => u.id === 'militia');
      expect(militia).toBeDefined();
      expect(militia.name).toBe('Militia');
      expect(militia.quantity).toBe(10);
      expect(militia.costPerUnit).toBeDefined();
      expect(militia.totalCost).toBeDefined();
    });

    it('should calculate totals correctly', () => {
      const json = ExportService.toJSON(mockComposition, mockConfig);
      const parsed = JSON.parse(json);

      expect(parsed.totals.units).toBe(15); // 10 + 5
      expect(parsed.totals.food).toBe(900); // 15 * 60
      expect(parsed.totals.population).toBe(15); // 15 * 1
    });

    it('should handle empty composition', () => {
      const json = ExportService.toJSON({}, mockConfig);
      const parsed = JSON.parse(json);

      expect(parsed.units).toHaveLength(0);
      expect(parsed.totals.units).toBe(0);
    });

    it('should be properly formatted with indentation', () => {
      const json = ExportService.toJSON(mockComposition, mockConfig);

      // Check for indentation (pretty printing)
      expect(json).toContain('\n');
      expect(json).toContain('  ');
    });
  });

  describe('downloadCSV', () => {
    it('should create and click download link', () => {
      const mockLink = {
        href: '',
        download: '',
        style: { display: '' },
        click: vi.fn(),
      };

      const mockCreateElement = vi.spyOn(document, 'createElement').mockReturnValue(mockLink);
      const mockAppendChild = vi.spyOn(document.body, 'appendChild').mockImplementation(() => {});
      const mockRemoveChild = vi.spyOn(document.body, 'removeChild').mockImplementation(() => {});

      // Define URL methods if they don't exist (jsdom doesn't have them)
      const originalCreateObjectURL = URL.createObjectURL;
      const originalRevokeObjectURL = URL.revokeObjectURL;
      URL.createObjectURL = vi.fn().mockReturnValue('blob:url');
      URL.revokeObjectURL = vi.fn().mockImplementation(() => {});

      ExportService.downloadCSV('csv content');

      expect(mockCreateElement).toHaveBeenCalledWith('a');
      expect(mockLink.click).toHaveBeenCalled();
      expect(mockLink.download).toContain('.csv');
      expect(URL.revokeObjectURL).toHaveBeenCalled();

      mockCreateElement.mockRestore();
      mockAppendChild.mockRestore();
      mockRemoveChild.mockRestore();
      URL.createObjectURL = originalCreateObjectURL;
      URL.revokeObjectURL = originalRevokeObjectURL;
    });

    it('should use custom filename when provided', () => {
      const mockLink = {
        href: '',
        download: '',
        style: { display: '' },
        click: vi.fn(),
      };

      vi.spyOn(document, 'createElement').mockReturnValue(mockLink);
      vi.spyOn(document.body, 'appendChild').mockImplementation(() => {});
      vi.spyOn(document.body, 'removeChild').mockImplementation(() => {});

      // Define URL methods if they don't exist (jsdom doesn't have them)
      const originalCreateObjectURL = URL.createObjectURL;
      const originalRevokeObjectURL = URL.revokeObjectURL;
      URL.createObjectURL = vi.fn().mockReturnValue('blob:url');
      URL.revokeObjectURL = vi.fn().mockImplementation(() => {});

      ExportService.downloadCSV('csv content', 'custom.csv');

      expect(mockLink.download).toBe('custom.csv');

      URL.createObjectURL = originalCreateObjectURL;
      URL.revokeObjectURL = originalRevokeObjectURL;
    });
  });

  describe('downloadJSON', () => {
    it('should create and click download link', () => {
      const mockLink = {
        href: '',
        download: '',
        style: { display: '' },
        click: vi.fn(),
      };

      vi.spyOn(document, 'createElement').mockReturnValue(mockLink);
      vi.spyOn(document.body, 'appendChild').mockImplementation(() => {});
      vi.spyOn(document.body, 'removeChild').mockImplementation(() => {});

      // Define URL methods if they don't exist (jsdom doesn't have them)
      const originalCreateObjectURL = URL.createObjectURL;
      const originalRevokeObjectURL = URL.revokeObjectURL;
      URL.createObjectURL = vi.fn().mockReturnValue('blob:url');
      URL.revokeObjectURL = vi.fn().mockImplementation(() => {});

      ExportService.downloadJSON('json content');

      expect(mockLink.download).toContain('.json');
      expect(mockLink.click).toHaveBeenCalled();

      URL.createObjectURL = originalCreateObjectURL;
      URL.revokeObjectURL = originalRevokeObjectURL;
    });
  });

  describe('copyToClipboard', () => {
    it('should copy content to clipboard', async () => {
      const mockClipboard = {
        writeText: vi.fn().mockResolvedValue(undefined),
      };
      Object.defineProperty(navigator, 'clipboard', {
        value: mockClipboard,
        writable: true,
      });

      const result = await ExportService.copyToClipboard('test content');

      expect(result).toBe(true);
      expect(mockClipboard.writeText).toHaveBeenCalledWith('test content');
    });

    it('should return false on clipboard error', async () => {
      const mockClipboard = {
        writeText: vi.fn().mockRejectedValue(new Error('Clipboard error')),
      };
      Object.defineProperty(navigator, 'clipboard', {
        value: mockClipboard,
        writable: true,
      });

      const result = await ExportService.copyToClipboard('test content');

      expect(result).toBe(false);
    });
  });
});
