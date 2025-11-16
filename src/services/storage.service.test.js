/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  const mockComposition = { militia: 10, archer: 5 };
  const mockConfig = {
    resourceLimitMode: 'total',
    totalResourceLimit: 20000,
    populationCap: 200,
    selectedAge: 'imperial',
    selectedCiv: 'britons',
  };

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('isAvailable', () => {
    it('should return true when localStorage is available', () => {
      expect(StorageService.isAvailable()).toBe(true);
    });

    it('should return false when localStorage throws an error', () => {
      // Create a mock localStorage that throws on setItem
      const mockLocalStorage = {
        getItem: vi.fn(),
        setItem: vi.fn(() => {
          throw new Error('QuotaExceeded');
        }),
        removeItem: vi.fn(),
        clear: vi.fn(),
        length: 0,
        key: vi.fn(),
      };

      vi.stubGlobal('localStorage', mockLocalStorage);

      expect(StorageService.isAvailable()).toBe(false);

      vi.unstubAllGlobals();
    });
  });

  describe('save', () => {
    it('should save a composition with metadata', () => {
      const result = StorageService.save('Test Army', mockComposition, mockConfig);

      expect(result).toBeDefined();
      expect(result.name).toBe('Test Army');
      expect(result.composition).toEqual(mockComposition);
      expect(result.config).toEqual(mockConfig);
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeDefined();
      expect(result.updatedAt).toBeDefined();
    });

    it('should store composition in localStorage', () => {
      StorageService.save('Test Army', mockComposition, mockConfig);

      const stored = JSON.parse(localStorage.getItem('aoe2_army_compositions'));
      expect(stored).toHaveLength(1);
      expect(stored[0].name).toBe('Test Army');
    });

    it('should append to existing compositions', () => {
      StorageService.save('Army 1', mockComposition, mockConfig);
      StorageService.save('Army 2', { knight: 20 }, mockConfig);

      const stored = StorageService.getAll();
      expect(stored).toHaveLength(2);
      expect(stored[0].name).toBe('Army 1');
      expect(stored[1].name).toBe('Army 2');
    });
  });

  describe('getAll', () => {
    it('should return empty array when no compositions saved', () => {
      expect(StorageService.getAll()).toEqual([]);
    });

    it('should return all saved compositions', () => {
      StorageService.save('Army 1', mockComposition, mockConfig);
      StorageService.save('Army 2', { knight: 20 }, mockConfig);

      const compositions = StorageService.getAll();
      expect(compositions).toHaveLength(2);
    });

    it('should handle corrupted localStorage data', () => {
      localStorage.setItem('aoe2_army_compositions', 'invalid json');

      const compositions = StorageService.getAll();
      expect(compositions).toEqual([]);
    });
  });

  describe('getById', () => {
    it('should return composition by ID', () => {
      const saved = StorageService.save('Test Army', mockComposition, mockConfig);

      const found = StorageService.getById(saved.id);
      expect(found).toBeDefined();
      expect(found.name).toBe('Test Army');
    });

    it('should return null for non-existent ID', () => {
      const found = StorageService.getById('non-existent');
      expect(found).toBeNull();
    });
  });

  describe('update', () => {
    it('should update an existing composition', async () => {
      const saved = StorageService.save('Original', mockComposition, mockConfig);

      // Small delay to ensure updatedAt differs
      await new Promise((resolve) => setTimeout(resolve, 10));

      const updated = StorageService.update(saved.id, {
        name: 'Updated',
        composition: { knight: 30 },
      });

      expect(updated.name).toBe('Updated');
      expect(updated.composition).toEqual({ knight: 30 });
      expect(new Date(updated.updatedAt).getTime()).toBeGreaterThanOrEqual(
        new Date(saved.updatedAt).getTime()
      );
    });

    it('should return null for non-existent ID', () => {
      const result = StorageService.update('non-existent', { name: 'Test' });
      expect(result).toBeNull();
    });

    it('should preserve other properties when updating', () => {
      const saved = StorageService.save('Test', mockComposition, mockConfig);
      const updated = StorageService.update(saved.id, { name: 'New Name' });

      expect(updated.composition).toEqual(mockComposition);
      expect(updated.config).toEqual(mockConfig);
    });
  });

  describe('delete', () => {
    it('should delete a composition by ID', () => {
      const saved = StorageService.save('Test', mockComposition, mockConfig);

      const result = StorageService.delete(saved.id);
      expect(result).toBe(true);

      const compositions = StorageService.getAll();
      expect(compositions).toHaveLength(0);
    });

    it('should return false for non-existent ID', () => {
      const result = StorageService.delete('non-existent');
      expect(result).toBe(false);
    });

    it('should not affect other compositions', () => {
      // Mock Date.now to ensure unique IDs
      let mockTime = 1000;
      const originalDateNow = Date.now;
      Date.now = vi.fn(() => mockTime++);

      const saved1 = StorageService.save('Army 1', mockComposition, mockConfig);
      StorageService.save('Army 2', { knight: 20 }, mockConfig);

      StorageService.delete(saved1.id);

      const compositions = StorageService.getAll();
      expect(compositions).toHaveLength(1);
      expect(compositions[0].name).toBe('Army 2');

      Date.now = originalDateNow;
    });
  });

  describe('deleteAll', () => {
    it('should remove all compositions', () => {
      StorageService.save('Army 1', mockComposition, mockConfig);
      StorageService.save('Army 2', { knight: 20 }, mockConfig);

      const result = StorageService.deleteAll();
      expect(result).toBe(true);

      const compositions = StorageService.getAll();
      expect(compositions).toEqual([]);
    });

    it('should handle errors gracefully', () => {
      // Create a mock localStorage that throws on removeItem
      const mockLocalStorage = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(() => {
          throw new Error('Storage error');
        }),
        clear: vi.fn(),
        length: 0,
        key: vi.fn(),
      };

      vi.stubGlobal('localStorage', mockLocalStorage);

      const result = StorageService.deleteAll();
      expect(result).toBe(false);

      vi.unstubAllGlobals();
    });
  });
});
