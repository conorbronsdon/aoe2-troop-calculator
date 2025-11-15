import { describe, it, expect } from 'vitest';
import {
  calculateUnitCost,
  calculateTotals,
  hasDiscount,
  calculatePercentage,
  groupUnitsByCategory
} from './calculations';
import { getUnitById } from '../data/units';

describe('Calculation Functions', () => {
  describe('calculateUnitCost', () => {
    it('should return base cost for generic civilization', () => {
      const knight = getUnitById('knight');
      const cost = calculateUnitCost(knight, 'generic', 'castle');
      expect(cost).toEqual(knight.cost);
    });

    it('should apply Mayans archer discount in feudal age', () => {
      const archer = getUnitById('archer');
      const cost = calculateUnitCost(archer, 'mayans', 'feudal');
      // Mayans get 10% discount in feudal (archers cost wood and gold, not food)
      expect(cost.food).toBe(0); // archers don't cost food
      expect(cost.wood).toBe(Math.round(25 * 0.9)); // 23
      expect(cost.gold).toBe(Math.round(45 * 0.9)); // 41
    });

    it('should apply Mayans archer discount in castle age', () => {
      const crossbowman = getUnitById('crossbowman');
      const cost = calculateUnitCost(crossbowman, 'mayans', 'castle');
      // Mayans get 20% discount in castle (archers cost wood and gold, not food)
      expect(cost.food).toBe(0); // archers don't cost food
      expect(cost.wood).toBe(Math.round(25 * 0.8)); // 20
      expect(cost.gold).toBe(Math.round(45 * 0.8)); // 36
    });

    it('should apply Mayans archer discount in imperial age', () => {
      const arbalester = getUnitById('arbalester');
      const cost = calculateUnitCost(arbalester, 'mayans', 'imperial');
      // Mayans get 30% discount in imperial (archers cost wood and gold, not food)
      expect(cost.food).toBe(0); // archers don't cost food
      expect(cost.wood).toBe(Math.round(25 * 0.7)); // 18
      expect(cost.gold).toBe(Math.round(45 * 0.7)); // 32
    });

    it('should apply Goths infantry discount', () => {
      const champion = getUnitById('champion');
      const cost = calculateUnitCost(champion, 'goths', 'imperial');
      // Goths get 30% discount in imperial
      expect(cost.food).toBe(Math.round(60 * 0.7)); // 42
      expect(cost.gold).toBe(Math.round(20 * 0.7)); // 14
    });

    it('should apply Byzantines counter unit discount', () => {
      const halberdier = getUnitById('halberdier');
      const cost = calculateUnitCost(halberdier, 'byzantines', 'imperial');
      // Byzantines get 25% discount on counter units
      expect(cost.food).toBe(Math.round(35 * 0.75)); // 26
      expect(cost.wood).toBe(Math.round(25 * 0.75)); // 19
    });

    it('should apply Portuguese gold discount to all units', () => {
      const knight = getUnitById('knight');
      const cost = calculateUnitCost(knight, 'portuguese', 'castle');
      // Portuguese get 20% gold discount
      expect(cost.food).toBe(60); // unchanged
      expect(cost.gold).toBe(Math.round(75 * 0.8)); // 60
    });

    it('should not apply discount to non-applicable units', () => {
      const knight = getUnitById('knight');
      const cost = calculateUnitCost(knight, 'mayans', 'castle');
      // Mayans bonus only applies to archers, not cavalry
      expect(cost).toEqual(knight.cost);
    });

    it('should handle units with zero cost resources', () => {
      const scout = getUnitById('scout');
      const cost = calculateUnitCost(scout, 'goths', 'feudal');
      // Scout has no gold cost, discount shouldn't affect it
      expect(cost.gold).toBe(0);
    });
  });

  describe('calculateTotals', () => {
    it('should calculate totals for single unit type', () => {
      const composition = { knight: 10 };
      const { totalCost, totalPopulation } = calculateTotals(composition, 'generic', 'castle');

      expect(totalCost.food).toBe(600); // 60 * 10
      expect(totalCost.gold).toBe(750); // 75 * 10
      expect(totalCost.wood).toBe(0);
      expect(totalCost.stone).toBe(0);
      expect(totalPopulation).toBe(10);
    });

    it('should calculate totals for multiple unit types', () => {
      const composition = {
        knight: 10,
        crossbowman: 20
      };
      const { totalCost, totalPopulation } = calculateTotals(composition, 'generic', 'castle');

      // Knights cost 60 food + 75 gold, crossbowmen cost 25 wood + 45 gold
      expect(totalCost.food).toBe(600); // 60 * 10
      expect(totalCost.wood).toBe(500); // 25 * 20
      expect(totalCost.gold).toBe(1650); // (75 * 10) + (45 * 20)
      expect(totalPopulation).toBe(30);
    });

    it('should apply civilization bonuses in totals', () => {
      const composition = { crossbowman: 10 };
      const { totalCost } = calculateTotals(composition, 'mayans', 'castle');

      // Mayans get 20% discount in castle age (crossbowmen cost wood and gold, not food)
      expect(totalCost.food).toBe(0); // crossbowmen don't cost food
      expect(totalCost.wood).toBe(Math.round(25 * 0.8) * 10); // 200
      expect(totalCost.gold).toBe(Math.round(45 * 0.8) * 10); // 360
    });

    it('should handle empty composition', () => {
      const composition = {};
      const { totalCost, totalPopulation } = calculateTotals(composition, 'generic', 'castle');

      expect(totalCost).toEqual({ food: 0, wood: 0, gold: 0, stone: 0 });
      expect(totalPopulation).toBe(0);
    });

    it('should ignore zero quantity units', () => {
      const composition = {
        knight: 10,
        crossbowman: 0
      };
      const { totalCost, totalPopulation } = calculateTotals(composition, 'generic', 'castle');

      expect(totalCost.food).toBe(600);
      expect(totalPopulation).toBe(10);
    });

    it('should handle units with high population cost', () => {
      const composition = { trebuchet: 5 };
      const { totalPopulation } = calculateTotals(composition, 'generic', 'imperial');

      expect(totalPopulation).toBe(40); // 8 pop * 5
    });
  });

  describe('hasDiscount', () => {
    it('should return false when costs are identical', () => {
      const knight = getUnitById('knight');
      const result = hasDiscount(knight, knight.cost);
      expect(result).toBe(false);
    });

    it('should return true when any cost is different', () => {
      const knight = getUnitById('knight');
      const discountedCost = { ...knight.cost, gold: 60 };
      const result = hasDiscount(knight, discountedCost);
      expect(result).toBe(true);
    });

    it('should detect discount from civilization bonus', () => {
      const archer = getUnitById('archer');
      const adjustedCost = calculateUnitCost(archer, 'mayans', 'feudal');
      const result = hasDiscount(archer, adjustedCost);
      expect(result).toBe(true);
    });

    it('should handle zero cost resources correctly', () => {
      const scout = getUnitById('scout');
      const result = hasDiscount(scout, scout.cost);
      expect(result).toBe(false);
    });
  });

  describe('calculatePercentage', () => {
    it('should calculate percentage correctly', () => {
      expect(calculatePercentage(50, 100)).toBe(50);
      expect(calculatePercentage(100, 100)).toBe(100);
      expect(calculatePercentage(150, 100)).toBe(150);
    });

    it('should handle zero limit', () => {
      expect(calculatePercentage(100, 0)).toBe(0);
    });

    it('should handle zero usage', () => {
      expect(calculatePercentage(0, 100)).toBe(0);
    });

    it('should handle fractional percentages', () => {
      expect(calculatePercentage(33, 100)).toBe(33);
      expect(calculatePercentage(1, 3)).toBeCloseTo(33.33, 2);
    });

    it('should handle values over 100%', () => {
      expect(calculatePercentage(200, 100)).toBe(200);
      expect(calculatePercentage(500, 100)).toBe(500);
    });
  });

  describe('groupUnitsByCategory', () => {
    it('should group units by category', () => {
      const units = [
        getUnitById('knight'),
        getUnitById('cavalier'),
        getUnitById('archer'),
        getUnitById('crossbowman')
      ];
      const grouped = groupUnitsByCategory(units);

      expect(grouped).toHaveProperty('Cavalry');
      expect(grouped).toHaveProperty('Archer');
      expect(grouped.Cavalry.length).toBe(2);
      expect(grouped.Archer.length).toBe(2);
    });

    it('should handle empty array', () => {
      const grouped = groupUnitsByCategory([]);
      expect(grouped).toEqual({});
    });

    it('should maintain unit data in groups', () => {
      const knight = getUnitById('knight');
      const grouped = groupUnitsByCategory([knight]);

      expect(grouped.Cavalry[0].id).toBe('knight');
      expect(grouped.Cavalry[0].name).toBe('Knight');
    });
  });

  describe('Integration Tests', () => {
    it('should calculate full army with multiple civs correctly', () => {
      const composition = {
        knight: 20,
        crossbowman: 30,
        halberdier: 10
      };

      // Generic (no bonuses)
      const generic = calculateTotals(composition, 'generic', 'imperial');
      expect(generic.totalPopulation).toBe(60);

      // Byzantines (counter units discount)
      const byzantines = calculateTotals(composition, 'byzantines', 'imperial');
      expect(byzantines.totalCost.food).toBeLessThan(generic.totalCost.food);
      expect(byzantines.totalCost.wood).toBeLessThan(generic.totalCost.wood);
    });

    it('should handle complex army composition', () => {
      const composition = {
        knight: 15,
        crossbowman: 25,
        mangonel: 3,
        trebuchet: 2
      };

      const { totalCost, totalPopulation } = calculateTotals(composition, 'generic', 'imperial');

      // Verify total population (siege units have higher pop)
      expect(totalPopulation).toBe(15 + 25 + (3 * 3) + (2 * 8)); // 65

      // Verify resources are summed correctly
      expect(totalCost.food).toBeGreaterThan(0);
      expect(totalCost.wood).toBeGreaterThan(0);
      expect(totalCost.gold).toBeGreaterThan(0);
    });
  });
});
