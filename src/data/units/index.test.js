import { describe, it, expect } from 'vitest';
import {
  units,
  getUnitById,
  getUnitsByCategory,
  getUnitsByAge,
  getUniqueUnitsByCiv,
  getUnitsForCiv,
  canCivBuildUnit,
  getMissingUnitsForCiv,
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
      infantry.forEach((unit) => {
        expect(unit.category).toBe('Infantry');
      });
    });

    it('should return cavalry units', () => {
      const cavalry = getUnitsByCategory('Cavalry');
      expect(cavalry.length).toBeGreaterThan(0);
      cavalry.forEach((unit) => {
        expect(unit.category).toBe('Cavalry');
      });
    });

    it('should return unique units', () => {
      const unique = getUnitsByCategory('Unique');
      expect(unique.length).toBeGreaterThan(0);
      unique.forEach((unit) => {
        expect(unit.category).toBe('Unique');
        expect(unit).toHaveProperty('civilization');
      });
    });

    it('should return naval units', () => {
      const naval = getUnitsByCategory('Naval');
      expect(naval.length).toBeGreaterThan(0);
      naval.forEach((unit) => {
        expect(unit.category).toBe('Naval');
      });
    });
  });

  describe('getUnitsByAge', () => {
    it('should return dark age units', () => {
      const darkAge = getUnitsByAge('dark');
      expect(darkAge.length).toBeGreaterThan(0);
      darkAge.forEach((unit) => {
        expect(unit.age).toBe('dark');
      });
    });

    it('should return feudal and earlier units', () => {
      const feudal = getUnitsByAge('feudal');
      expect(feudal.length).toBeGreaterThan(0);
      const ages = [...new Set(feudal.map((u) => u.age))];
      expect(ages.every((age) => ['dark', 'feudal'].includes(age))).toBe(true);
    });

    it('should return castle and earlier units', () => {
      const castle = getUnitsByAge('castle');
      expect(castle.length).toBeGreaterThan(0);
      const ages = [...new Set(castle.map((u) => u.age))];
      expect(ages.every((age) => ['dark', 'feudal', 'castle'].includes(age))).toBe(true);
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
      units.forEach((unit) => {
        expect(unit.civilization).toBe('britons');
        expect(['longbowman', 'elite-longbowman']).toContain(unit.id);
      });
    });

    it('should return aztecs unique units', () => {
      const units = getUniqueUnitsByCiv('aztecs');
      expect(units.length).toBeGreaterThan(0);
      units.forEach((unit) => {
        expect(unit.civilization).toBe('aztecs');
      });
    });

    it('should return goths unique units', () => {
      const units = getUniqueUnitsByCiv('goths');
      expect(units.length).toBeGreaterThan(0);
      units.forEach((unit) => {
        expect(unit.civilization).toBe('goths');
        expect(['huskarl', 'elite-huskarl']).toContain(unit.id);
      });
    });
  });

  describe('getUnitsForCiv', () => {
    it('should return generic units and no unique units for generic civ', () => {
      const units = getUnitsForCiv('generic', 'imperial');
      const uniqueUnits = units.filter((u) => u.category === 'Unique');
      expect(uniqueUnits.length).toBe(0);
    });

    it('should include unique units for specific civilization', () => {
      const units = getUnitsForCiv('britons', 'imperial');
      const longbowman = units.find((u) => u.id === 'longbowman');
      const eliteLongbowman = units.find((u) => u.id === 'elite-longbowman');
      expect(longbowman).toBeDefined();
      expect(eliteLongbowman).toBeDefined();
    });

    it('should filter by age correctly', () => {
      const feudalUnits = getUnitsForCiv('britons', 'feudal');
      const eliteLongbowman = feudalUnits.find((u) => u.id === 'elite-longbowman');
      expect(eliteLongbowman).toBeUndefined(); // Imperial age unit
    });

    it('should include civilization unique units in castle age', () => {
      const castleUnits = getUnitsForCiv('britons', 'castle');
      const longbowman = castleUnits.find((u) => u.id === 'longbowman');
      expect(longbowman).toBeDefined(); // Castle age unique unit
    });

    it('should not include other civilizations unique units', () => {
      const britonsUnits = getUnitsForCiv('britons', 'imperial');
      const chuKoNu = britonsUnits.find((u) => u.id === 'chu-ko-nu'); // Chinese unit
      expect(chuKoNu).toBeUndefined();
    });

    it('should include generic units for all civilizations', () => {
      const britonsUnits = getUnitsForCiv('britons', 'castle');
      const knight = britonsUnits.find((u) => u.id === 'knight');
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
      const ids = units.map((u) => u.id);
      const uniqueIds = [...new Set(ids)];
      expect(ids.length).toBe(uniqueIds.length);
    });

    it('should have valid ages', () => {
      const validAges = ['dark', 'feudal', 'castle', 'imperial'];
      units.forEach((unit) => {
        expect(validAges).toContain(unit.age);
      });
    });

    it('should have non-negative costs', () => {
      units.forEach((unit) => {
        expect(unit.cost.food).toBeGreaterThanOrEqual(0);
        expect(unit.cost.wood).toBeGreaterThanOrEqual(0);
        expect(unit.cost.gold).toBeGreaterThanOrEqual(0);
        expect(unit.cost.stone).toBeGreaterThanOrEqual(0);
      });
    });

    it('should have non-negative population', () => {
      units.forEach((unit) => {
        expect(unit.population).toBeGreaterThanOrEqual(0);
      });
    });

    it('should have positive population for military units', () => {
      const militaryCategories = ['Infantry', 'Cavalry', 'Archer', 'Siege', 'Monk', 'Unique'];
      units.forEach((unit) => {
        if (militaryCategories.includes(unit.category)) {
          expect(unit.population).toBeGreaterThan(0);
        }
      });
    });

    it('should have unique units with civilization field', () => {
      const uniqueUnits = getUnitsByCategory('Unique');
      uniqueUnits.forEach((unit) => {
        expect(unit).toHaveProperty('civilization');
        expect(typeof unit.civilization).toBe('string');
        expect(unit.civilization.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Technology Tree Restrictions', () => {
    describe('canCivBuildUnit', () => {
      it('should allow generic civ to build all units', () => {
        expect(canCivBuildUnit('generic', 'knight')).toBe(true);
        expect(canCivBuildUnit('generic', 'paladin')).toBe(true);
        expect(canCivBuildUnit('generic', 'hand-cannoneer')).toBe(true);
      });

      it('should prevent Aztecs from building cavalry', () => {
        expect(canCivBuildUnit('aztecs', 'knight')).toBe(false);
        expect(canCivBuildUnit('aztecs', 'scout')).toBe(false);
        expect(canCivBuildUnit('aztecs', 'paladin')).toBe(false);
        expect(canCivBuildUnit('aztecs', 'cavalry-archer')).toBe(false);
      });

      it('should allow Aztecs to build Eagle Warriors', () => {
        expect(canCivBuildUnit('aztecs', 'eagle-scout')).toBe(true);
        expect(canCivBuildUnit('aztecs', 'eagle-warrior')).toBe(true);
      });

      it('should prevent Mayans from building cavalry', () => {
        expect(canCivBuildUnit('mayans', 'knight')).toBe(false);
        expect(canCivBuildUnit('mayans', 'hussar')).toBe(false);
      });

      it('should prevent Vikings from building certain cavalry units', () => {
        expect(canCivBuildUnit('vikings', 'knight')).toBe(true); // Vikings DO get Knights
        expect(canCivBuildUnit('vikings', 'paladin')).toBe(false); // But not Paladin
        expect(canCivBuildUnit('vikings', 'cavalry-archer')).toBe(false); // And not Cavalry Archers
        expect(canCivBuildUnit('vikings', 'hussar')).toBe(false); // And not Hussar
      });

      it('should allow Goths to build Hand Cannoneers', () => {
        expect(canCivBuildUnit('goths', 'hand-cannoneer')).toBe(true); // Goths DO get Hand Cannoneers
      });

      it('should prevent Turks from building Pikemen', () => {
        expect(canCivBuildUnit('turks', 'pikeman')).toBe(false);
        expect(canCivBuildUnit('turks', 'halberdier')).toBe(false);
        expect(canCivBuildUnit('turks', 'elite-skirmisher')).toBe(false);
      });

      it('should allow civilizations to build units not in their restriction list', () => {
        expect(canCivBuildUnit('britons', 'knight')).toBe(true);
        expect(canCivBuildUnit('franks', 'knight')).toBe(true);
        expect(canCivBuildUnit('goths', 'champion')).toBe(true);
      });

      it('should allow only Incas to build Slinger', () => {
        expect(canCivBuildUnit('incas', 'slinger')).toBe(true);
        expect(canCivBuildUnit('aztecs', 'slinger')).toBe(false);
        expect(canCivBuildUnit('mayans', 'slinger')).toBe(false);
        expect(canCivBuildUnit('britons', 'slinger')).toBe(false);
      });

      it('should allow only Berbers to build Genitour', () => {
        expect(canCivBuildUnit('berbers', 'genitour')).toBe(true);
        expect(canCivBuildUnit('berbers', 'elite-genitour')).toBe(true);
        expect(canCivBuildUnit('ethiopians', 'genitour')).toBe(false);
        expect(canCivBuildUnit('britons', 'genitour')).toBe(false);
      });

      it('should allow only Spanish to build Missionary', () => {
        expect(canCivBuildUnit('spanish', 'missionary')).toBe(true);
        expect(canCivBuildUnit('britons', 'missionary')).toBe(false);
        expect(canCivBuildUnit('aztecs', 'missionary')).toBe(false);
      });

      it('should allow only Vietnamese to build Imperial Skirmisher', () => {
        expect(canCivBuildUnit('vietnamese', 'imperial-skirmisher')).toBe(true);
        expect(canCivBuildUnit('britons', 'imperial-skirmisher')).toBe(false);
        expect(canCivBuildUnit('aztecs', 'imperial-skirmisher')).toBe(false);
        expect(canCivBuildUnit('turks', 'imperial-skirmisher')).toBe(false);
      });

      it('should allow only Southeast Asian civs to build Battle Elephants', () => {
        expect(canCivBuildUnit('vietnamese', 'battle-elephant')).toBe(true);
        expect(canCivBuildUnit('khmer', 'battle-elephant')).toBe(true);
        expect(canCivBuildUnit('burmese', 'battle-elephant')).toBe(true);
        expect(canCivBuildUnit('malay', 'battle-elephant')).toBe(true);
        expect(canCivBuildUnit('britons', 'battle-elephant')).toBe(false);
        expect(canCivBuildUnit('persians', 'battle-elephant')).toBe(false);
      });

      it('should allow only Central Asian civs to build Steppe Lancers', () => {
        expect(canCivBuildUnit('cumans', 'steppe-lancer')).toBe(true);
        expect(canCivBuildUnit('mongols', 'steppe-lancer')).toBe(true);
        expect(canCivBuildUnit('tatars', 'steppe-lancer')).toBe(true);
        expect(canCivBuildUnit('jurchens', 'steppe-lancer')).toBe(true); // Three Kingdoms civ
        expect(canCivBuildUnit('khitans', 'steppe-lancer')).toBe(true); // Three Kingdoms civ
        expect(canCivBuildUnit('britons', 'steppe-lancer')).toBe(false);
        expect(canCivBuildUnit('huns', 'steppe-lancer')).toBe(false);
      });

      it('should allow only Hindustanis to build Imperial Camel', () => {
        expect(canCivBuildUnit('hindustanis', 'imperial-camel')).toBe(true);
        expect(canCivBuildUnit('berbers', 'imperial-camel')).toBe(false);
        expect(canCivBuildUnit('saracens', 'imperial-camel')).toBe(false);
        expect(canCivBuildUnit('persians', 'imperial-camel')).toBe(false);
      });

      it('should restrict Pikeman to only Gurjaras and Turks', () => {
        expect(canCivBuildUnit('gurjaras', 'pikeman')).toBe(false);
        expect(canCivBuildUnit('turks', 'pikeman')).toBe(false);
        expect(canCivBuildUnit('franks', 'pikeman')).toBe(true);
        expect(canCivBuildUnit('huns', 'pikeman')).toBe(true);
        expect(canCivBuildUnit('britons', 'pikeman')).toBe(true);
      });
    });

    describe('getMissingUnitsForCiv', () => {
      it('should return empty array for generic civ', () => {
        const missing = getMissingUnitsForCiv('generic');
        expect(missing).toEqual([]);
      });

      it('should return cavalry units for Aztecs', () => {
        const missing = getMissingUnitsForCiv('aztecs');
        expect(missing).toContain('knight');
        expect(missing).toContain('scout');
        expect(missing).toContain('cavalry-archer');
      });

      it('should return missing units for Vikings', () => {
        const missing = getMissingUnitsForCiv('vikings');
        expect(missing).not.toContain('knight'); // Vikings DO get Knights
        expect(missing).toContain('paladin'); // But not Paladin
        expect(missing).toContain('hussar'); // And not Hussar
        expect(missing).toContain('cavalry-archer'); // And not Cavalry Archers
        expect(missing).toContain('hand-cannoneer'); // And not Hand Cannoneers
      });
    });

    describe('getUnitsForCiv with tech tree restrictions', () => {
      it('should not include cavalry for Aztecs', () => {
        const units = getUnitsForCiv('aztecs', 'imperial');
        const knight = units.find((u) => u.id === 'knight');
        const paladin = units.find((u) => u.id === 'paladin');
        const cavArcher = units.find((u) => u.id === 'cavalry-archer');

        expect(knight).toBeUndefined();
        expect(paladin).toBeUndefined();
        expect(cavArcher).toBeUndefined();
      });

      it('should include Eagle Warriors for Aztecs', () => {
        const units = getUnitsForCiv('aztecs', 'imperial');
        const eagleScout = units.find((u) => u.id === 'eagle-scout');
        const eagleWarrior = units.find((u) => u.id === 'eagle-warrior');

        expect(eagleScout).toBeDefined();
        expect(eagleWarrior).toBeDefined();
      });

      it('should include Aztec unique units', () => {
        const units = getUnitsForCiv('aztecs', 'imperial');
        const jaguarWarrior = units.find((u) => u.id === 'jaguar-warrior');

        expect(jaguarWarrior).toBeDefined();
      });

      it('should not include restricted units for Vikings', () => {
        const units = getUnitsForCiv('vikings', 'imperial');
        const knight = units.find((u) => u.id === 'knight');
        const paladin = units.find((u) => u.id === 'paladin');
        const cavArcher = units.find((u) => u.id === 'cavalry-archer');

        expect(knight).toBeDefined(); // Vikings DO get Knights
        expect(paladin).toBeUndefined(); // But not Paladin
        expect(cavArcher).toBeUndefined(); // And not Cavalry Archers
      });

      it('should still include allowed units for Vikings', () => {
        const units = getUnitsForCiv('vikings', 'imperial');
        const champion = units.find((u) => u.id === 'champion');
        const arbalester = units.find((u) => u.id === 'arbalester');

        expect(champion).toBeDefined();
        expect(arbalester).toBeDefined();
      });

      it('should not include Paladin for civilizations missing it', () => {
        const britonsUnits = getUnitsForCiv('britons', 'imperial');
        const gothsUnits = getUnitsForCiv('goths', 'imperial');

        const britonsPaladin = britonsUnits.find((u) => u.id === 'paladin');
        const gothsPaladin = gothsUnits.find((u) => u.id === 'paladin');

        expect(britonsPaladin).toBeUndefined();
        expect(gothsPaladin).toBeUndefined();
      });

      it('should allow generic civ to have all units', () => {
        const units = getUnitsForCiv('generic', 'imperial');
        const knight = units.find((u) => u.id === 'knight');
        const paladin = units.find((u) => u.id === 'paladin');
        const cavArcher = units.find((u) => u.id === 'cavalry-archer');

        expect(knight).toBeDefined();
        expect(paladin).toBeDefined();
        expect(cavArcher).toBeDefined();
      });
    });
  });
});
