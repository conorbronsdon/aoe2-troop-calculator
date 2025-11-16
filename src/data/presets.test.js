import { describe, it, expect } from 'vitest';
import {
  presets,
  presetCategories,
  getPresetsByCategory,
  getPresetById,
  getPresetsForCiv,
} from './presets';
import { units } from './units';
import { civilizations } from './civilizations';

describe('Preset Army Compositions', () => {
  describe('presetCategories', () => {
    it('should have all required categories', () => {
      const expectedCategories = [
        'castle-age-rushes',
        'imperial-compositions',
        'civ-specific',
        'beginner',
      ];

      expectedCategories.forEach((categoryId) => {
        const category = presetCategories.find((c) => c.id === categoryId);
        expect(category).toBeDefined();
        expect(category.name).toBeTruthy();
        expect(category.description).toBeTruthy();
      });
    });

    it('should have unique category IDs', () => {
      const ids = presetCategories.map((c) => c.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });
  });

  describe('presets', () => {
    it('should have valid structure for all presets', () => {
      presets.forEach((preset) => {
        expect(preset.id).toBeTruthy();
        expect(preset.name).toBeTruthy();
        expect(preset.category).toBeTruthy();
        expect(preset.description).toBeTruthy();
        expect(Array.isArray(preset.recommendedCivs)).toBe(true);
        expect(typeof preset.composition).toBe('object');
        expect(typeof preset.config).toBe('object');
      });
    });

    it('should have unique preset IDs', () => {
      const ids = presets.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should reference valid categories', () => {
      const validCategories = presetCategories.map((c) => c.id);
      presets.forEach((preset) => {
        expect(validCategories).toContain(preset.category);
      });
    });

    it('should have valid unit IDs in compositions', () => {
      const validUnitIds = units.map((u) => u.id);

      presets.forEach((preset) => {
        Object.keys(preset.composition).forEach((unitId) => {
          expect(validUnitIds).toContain(unitId);
        });
      });
    });

    it('should have positive quantities for all units', () => {
      presets.forEach((preset) => {
        Object.entries(preset.composition).forEach(([unitId, quantity]) => {
          expect(quantity).toBeGreaterThan(0);
          expect(Number.isInteger(quantity)).toBe(true);
        });
      });
    });

    it('should have valid civilization IDs in recommendedCivs', () => {
      const validCivIds = civilizations.map((c) => c.id);

      presets.forEach((preset) => {
        preset.recommendedCivs.forEach((civId) => {
          expect(validCivIds).toContain(civId);
        });
      });
    });

    it('should have valid ages in config', () => {
      const validAges = ['dark', 'feudal', 'castle', 'imperial'];

      presets.forEach((preset) => {
        if (preset.config.selectedAge) {
          expect(validAges).toContain(preset.config.selectedAge);
        }
      });
    });

    it('should have valid civilization IDs in config', () => {
      const validCivIds = civilizations.map((c) => c.id);

      presets.forEach((preset) => {
        if (preset.config.selectedCiv) {
          expect(validCivIds).toContain(preset.config.selectedCiv);
        }
      });
    });
  });

  describe('getPresetsByCategory', () => {
    it('should return presets for castle-age-rushes category', () => {
      const castleRushes = getPresetsByCategory('castle-age-rushes');
      expect(castleRushes.length).toBeGreaterThan(0);
      castleRushes.forEach((preset) => {
        expect(preset.category).toBe('castle-age-rushes');
      });
    });

    it('should return presets for imperial-compositions category', () => {
      const imperialComps = getPresetsByCategory('imperial-compositions');
      expect(imperialComps.length).toBeGreaterThan(0);
      imperialComps.forEach((preset) => {
        expect(preset.category).toBe('imperial-compositions');
      });
    });

    it('should return presets for civ-specific category', () => {
      const civSpecific = getPresetsByCategory('civ-specific');
      expect(civSpecific.length).toBeGreaterThan(0);
      civSpecific.forEach((preset) => {
        expect(preset.category).toBe('civ-specific');
      });
    });

    it('should return presets for beginner category', () => {
      const beginner = getPresetsByCategory('beginner');
      expect(beginner.length).toBeGreaterThan(0);
      beginner.forEach((preset) => {
        expect(preset.category).toBe('beginner');
      });
    });

    it('should return empty array for invalid category', () => {
      const invalid = getPresetsByCategory('invalid-category');
      expect(invalid).toEqual([]);
    });
  });

  describe('getPresetById', () => {
    it('should return preset by ID', () => {
      const knightRush = getPresetById('knight-rush');
      expect(knightRush).toBeDefined();
      expect(knightRush.name).toBe('Knight Rush');
      expect(knightRush.composition.knight).toBe(10);
    });

    it('should return undefined for invalid ID', () => {
      const invalid = getPresetById('invalid-preset');
      expect(invalid).toBeUndefined();
    });

    it('should find all presets by their IDs', () => {
      presets.forEach((preset) => {
        const found = getPresetById(preset.id);
        expect(found).toBe(preset);
      });
    });
  });

  describe('getPresetsForCiv', () => {
    it('should return presets recommended for Franks', () => {
      const franksPresets = getPresetsForCiv('franks');
      expect(franksPresets.length).toBeGreaterThan(0);

      // Should include Franks-specific builds
      const hasFranksSpecific = franksPresets.some((p) => p.recommendedCivs.includes('franks'));
      expect(hasFranksSpecific).toBe(true);
    });

    it('should return presets recommended for Britons', () => {
      const britonsPresets = getPresetsForCiv('britons');
      expect(britonsPresets.length).toBeGreaterThan(0);

      const hasBritonsSpecific = britonsPresets.some((p) => p.recommendedCivs.includes('britons'));
      expect(hasBritonsSpecific).toBe(true);
    });

    it('should return beginner presets for generic civilization', () => {
      const genericPresets = getPresetsForCiv('generic');
      expect(genericPresets.length).toBeGreaterThan(0);

      // Should include beginner templates
      const hasBeginnerPresets = genericPresets.some((p) => p.category === 'beginner');
      expect(hasBeginnerPresets).toBe(true);
    });

    it('should return beginner presets when civId is empty', () => {
      const emptyPresets = getPresetsForCiv('');
      expect(emptyPresets.length).toBeGreaterThan(0);

      const hasBeginnerPresets = emptyPresets.some((p) => p.category === 'beginner');
      expect(hasBeginnerPresets).toBe(true);
    });

    it('should include universal presets (empty recommendedCivs)', () => {
      const mayansPresets = getPresetsForCiv('mayans');

      // Should include presets with empty recommendedCivs (beginner templates)
      const hasUniversalPresets = mayansPresets.some((p) => p.recommendedCivs.length === 0);
      expect(hasUniversalPresets).toBe(true);
    });
  });

  describe('preset content validation', () => {
    it('should have reasonable unit counts in compositions', () => {
      presets.forEach((preset) => {
        const totalUnits = Object.values(preset.composition).reduce((sum, qty) => sum + qty, 0);
        // Should be between 1 and 200 (max population)
        expect(totalUnits).toBeGreaterThan(0);
        expect(totalUnits).toBeLessThanOrEqual(200);
      });
    });

    it('should have Castle Age rushes with Castle Age units', () => {
      const castleRushes = getPresetsByCategory('castle-age-rushes');
      const ageOrder = { dark: 0, feudal: 1, castle: 2, imperial: 3 };

      castleRushes.forEach((preset) => {
        Object.keys(preset.composition).forEach((unitId) => {
          const unit = units.find((u) => u.id === unitId);
          // Units should be available in Castle Age or earlier
          expect(ageOrder[unit.age]).toBeLessThanOrEqual(2);
        });
      });
    });

    it('should have Imperial compositions with Imperial Age units', () => {
      const imperialComps = getPresetsByCategory('imperial-compositions');

      imperialComps.forEach((preset) => {
        // At least one unit should be Imperial Age
        const hasImperialUnit = Object.keys(preset.composition).some((unitId) => {
          const unit = units.find((u) => u.id === unitId);
          return unit.age === 'imperial';
        });
        expect(hasImperialUnit).toBe(true);
      });
    });

    it('should have civ-specific builds with matching civilization units', () => {
      const civSpecific = getPresetsByCategory('civ-specific');

      civSpecific.forEach((preset) => {
        if (preset.config.selectedCiv) {
          // Should have that civ in recommendedCivs
          expect(preset.recommendedCivs).toContain(preset.config.selectedCiv);
        }
      });
    });

    it('should have beginner templates that are accessible', () => {
      const beginner = getPresetsByCategory('beginner');

      beginner.forEach((preset) => {
        // Beginner templates should not require specific civs
        // They either have empty recommendedCivs or common civs
        expect(preset.composition).toBeDefined();
        expect(Object.keys(preset.composition).length).toBeGreaterThan(0);
      });
    });

    it('should have trash army preset with no gold cost', () => {
      const trashArmy = getPresetById('trash-army');
      expect(trashArmy).toBeDefined();

      // All units should have 0 gold cost
      Object.keys(trashArmy.composition).forEach((unitId) => {
        const unit = units.find((u) => u.id === unitId);
        expect(unit.cost.gold).toBe(0);
      });
    });
  });

  describe('preset statistics', () => {
    it('should have at least 20 total presets', () => {
      expect(presets.length).toBeGreaterThanOrEqual(20);
    });

    it('should have presets in all categories', () => {
      presetCategories.forEach((category) => {
        const categoryPresets = getPresetsByCategory(category.id);
        expect(categoryPresets.length).toBeGreaterThan(0);
      });
    });

    it('should have multiple civilization-specific builds', () => {
      const civSpecific = getPresetsByCategory('civ-specific');
      expect(civSpecific.length).toBeGreaterThanOrEqual(5);
    });

    it('should cover popular civilizations', () => {
      const popularCivs = ['franks', 'britons', 'mayans', 'mongols', 'goths'];

      popularCivs.forEach((civId) => {
        const civPresets = presets.filter((p) => p.recommendedCivs.includes(civId));
        expect(civPresets.length).toBeGreaterThan(0);
      });
    });
  });
});
