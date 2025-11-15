import { describe, it, expect } from 'vitest';
import {
  units,
  getUnitById,
  getUnitsByCategory,
  getUnitsByAge,
  getUniqueUnitsByCiv,
  getUnitsForCiv
} from './index';

describe('Unit Data Functions', () => {
  describe('units array', () => {
    it('should contain multiple units', () => {
      expect(units.length).toBeGreaterThan(0);
    });

    it('should have valid unit structure', () => {
      const unit = units[0];
      expect(unit).toHaveProperty('id');
      expect(unit).toHaveProperty('name');
      expect(unit).toHaveProperty('category');
      expect(unit).toHaveProperty('age');
      expect(unit).toHaveProperty('cost');
      expect(unit).toHaveProperty('population');
    });

    it('should have valid cost structure', () => {
      const unit = units[0];
      expect(unit.cost).toHaveProperty('food');
      expect(unit.cost).toHaveProperty('wood');
      expect(unit.cost).toHaveProperty('gold');
      expect(unit.cost).toHaveProperty('stone');
    });
  });

  describe('getUnitById', () => {
    it('should return unit by id', () => {
      const knight = getUnitById('knight');
      expect(knight).toBeDefined();
      expect(knight.name).toBe('Knight');
    });

    it('should return undefined for non-existent unit', () => {
      const unit = getUnitById('non-existent-unit');
      expect(unit).toBeUndefined();
    });

    it('should return unique units by id', () => {
      const longbowman = getUnitById('longbowman');
      expect(longbowman).toBeDefined();
      expect(longbowman.civilization).toBe('britons');
    });
  });

  describe('getUnitsByCategory', () => {
    it('should return infantry units', () => {
      const infantry = getUnitsByCategory('Infantry');
      expect(infantry.length).toBeGreaterThan(0);
      infantry.forEach(unit => {
        expect(unit.category).toBe('Infantry');
      });
    });

    it('should return cavalry units', () => {
      const cavalry = getUnitsByCategory('Cavalry');
      expect(cavalry.length).toBeGreaterThan(0);
      cavalry.forEach(unit => {
        expect(unit.category).toBe('Cavalry');
      });
    });

    it('should return unique units', () => {
      const unique = getUnitsByCategory('Unique');
      expect(unique.length).toBeGreaterThan(0);
      unique.forEach(unit => {
        expect(unit.category).toBe('Unique');
        expect(unit).toHaveProperty('civilization');
      });
    });

    it('should return naval units', () => {
      const naval = getUnitsByCategory('Naval');
      expect(naval.length).toBeGreaterThan(0);
      naval.forEach(unit => {
        expect(unit.category).toBe('Naval');
      });
    });
  });

  describe('getUnitsByAge', () => {
    it('should return dark age units', () => {
      const darkAge = getUnitsByAge('dark');
      expect(darkAge.length).toBeGreaterThan(0);
      darkAge.forEach(unit => {
        expect(unit.age).toBe('dark');
      });
    });

    it('should return feudal and earlier units', () => {
      const feudal = getUnitsByAge('feudal');
      expect(feudal.length).toBeGreaterThan(0);
      const ages = [...new Set(feudal.map(u => u.age))];
      expect(ages.every(age => ['dark', 'feudal'].includes(age))).toBe(true);
    });

    it('should return castle and earlier units', () => {
      const castle = getUnitsByAge('castle');
      expect(castle.length).toBeGreaterThan(0);
      const ages = [...new Set(castle.map(u => u.age))];
      expect(ages.every(age => ['dark', 'feudal', 'castle'].includes(age))).toBe(true);
    });

    it('should return all units for imperial age', () => {
      const imperial = getUnitsByAge('imperial');
      expect(imperial.length).toBe(units.length);
    });

    it('should have increasing unit counts with higher ages', () => {
      const dark = getUnitsByAge('dark');
      const feudal = getUnitsByAge('feudal');
      const castle = getUnitsByAge('castle');
      const imperial = getUnitsByAge('imperial');

      expect(dark.length).toBeLessThan(feudal.length);
      expect(feudal.length).toBeLessThan(castle.length);
      expect(castle.length).toBeLessThan(imperial.length);
    });
  });

  describe('getUniqueUnitsByCiv', () => {
    it('should return empty array for generic civilization', () => {
      const units = getUniqueUnitsByCiv('generic');
      expect(units).toEqual([]);
    });

    it('should return empty array for null civilization', () => {
      const units = getUniqueUnitsByCiv(null);
      expect(units).toEqual([]);
    });

    it('should return britons unique units', () => {
      const units = getUniqueUnitsByCiv('britons');
      expect(units.length).toBeGreaterThan(0);
      units.forEach(unit => {
        expect(unit.civilization).toBe('britons');
        expect(['longbowman', 'elite-longbowman']).toContain(unit.id);
      });
    });

    it('should return aztecs unique units', () => {
      const units = getUniqueUnitsByCiv('aztecs');
      expect(units.length).toBeGreaterThan(0);
      units.forEach(unit => {
        expect(unit.civilization).toBe('aztecs');
      });
    });

    it('should return goths unique units', () => {
      const units = getUniqueUnitsByCiv('goths');
      expect(units.length).toBeGreaterThan(0);
      units.forEach(unit => {
        expect(unit.civilization).toBe('goths');
        expect(['huskarl', 'elite-huskarl']).toContain(unit.id);
      });
    });
  });

  describe('getUnitsForCiv', () => {
    it('should return generic units and no unique units for generic civ', () => {
      const units = getUnitsForCiv('generic', 'imperial');
      const uniqueUnits = units.filter(u => u.category === 'Unique');
      expect(uniqueUnits.length).toBe(0);
    });

    it('should include unique units for specific civilization', () => {
      const units = getUnitsForCiv('britons', 'imperial');
      const longbowman = units.find(u => u.id === 'longbowman');
      const eliteLongbowman = units.find(u => u.id === 'elite-longbowman');
      expect(longbowman).toBeDefined();
      expect(eliteLongbowman).toBeDefined();
    });

    it('should filter by age correctly', () => {
      const feudalUnits = getUnitsForCiv('britons', 'feudal');
      const eliteLongbowman = feudalUnits.find(u => u.id === 'elite-longbowman');
      expect(eliteLongbowman).toBeUndefined(); // Imperial age unit
    });

    it('should include civilization unique units in castle age', () => {
      const castleUnits = getUnitsForCiv('britons', 'castle');
      const longbowman = castleUnits.find(u => u.id === 'longbowman');
      expect(longbowman).toBeDefined(); // Castle age unique unit
    });

    it('should not include other civilizations unique units', () => {
      const britonsUnits = getUnitsForCiv('britons', 'imperial');
      const chuKoNu = britonsUnits.find(u => u.id === 'chu-ko-nu'); // Chinese unit
      expect(chuKoNu).toBeUndefined();
    });

    it('should include generic units for all civilizations', () => {
      const britonsUnits = getUnitsForCiv('britons', 'castle');
      const knight = britonsUnits.find(u => u.id === 'knight');
      expect(knight).toBeDefined();
    });

    it('should have more units in higher ages', () => {
      const feudal = getUnitsForCiv('britons', 'feudal');
      const castle = getUnitsForCiv('britons', 'castle');
      const imperial = getUnitsForCiv('britons', 'imperial');

      expect(feudal.length).toBeLessThan(castle.length);
      expect(castle.length).toBeLessThan(imperial.length);
    });
  });

  describe('Data Integrity', () => {
    it('should have unique unit IDs', () => {
      const ids = units.map(u => u.id);
      const uniqueIds = [...new Set(ids)];
      expect(ids.length).toBe(uniqueIds.length);
    });

    it('should have valid ages', () => {
      const validAges = ['dark', 'feudal', 'castle', 'imperial'];
      units.forEach(unit => {
        expect(validAges).toContain(unit.age);
      });
    });

    it('should have non-negative costs', () => {
      units.forEach(unit => {
        expect(unit.cost.food).toBeGreaterThanOrEqual(0);
        expect(unit.cost.wood).toBeGreaterThanOrEqual(0);
        expect(unit.cost.gold).toBeGreaterThanOrEqual(0);
        expect(unit.cost.stone).toBeGreaterThanOrEqual(0);
      });
    });

    it('should have non-negative population', () => {
      units.forEach(unit => {
        expect(unit.population).toBeGreaterThanOrEqual(0);
      });
    });

    it('should have positive population for military units', () => {
      const militaryCategories = ['Infantry', 'Cavalry', 'Archer', 'Siege', 'Monk', 'Unique'];
      units.forEach(unit => {
        if (militaryCategories.includes(unit.category)) {
          expect(unit.population).toBeGreaterThan(0);
        }
      });
    });

    it('should have unique units with civilization field', () => {
      const uniqueUnits = getUnitsByCategory('Unique');
      uniqueUnits.forEach(unit => {
        expect(unit).toHaveProperty('civilization');
        expect(typeof unit.civilization).toBe('string');
        expect(unit.civilization.length).toBeGreaterThan(0);
      });
    });
  });
});
