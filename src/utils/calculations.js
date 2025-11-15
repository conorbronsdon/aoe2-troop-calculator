import { getCivilizationById } from '../data/civilizations';
import { getUnitById } from '../data/units';

/**
 * Calculate unit cost with civilization bonuses applied
 * @param {Object} unit - Unit object
 * @param {string} civId - Civilization ID
 * @param {string} age - Current age
 * @returns {Object} Adjusted cost { food, wood, gold, stone }
 */
export const calculateUnitCost = (unit, civId, age) => {
  const civ = getCivilizationById(civId);
  let cost = { ...unit.cost };

  if (civ && civ.bonuses.length > 0) {
    civ.bonuses.forEach(bonus => {
      if (bonus.type === 'cost') {
        // Check if this bonus applies to this unit
        const appliesToUnit = bonus.units === 'all' || bonus.units.includes(unit.id);

        if (appliesToUnit) {
          let discount = 0;

          // Age-based discount
          if (bonus.ages) {
            discount = bonus.ages[age] || 0;
          } else {
            discount = bonus.value || 0;
          }

          // Apply discount to specific resource or all
          if (bonus.resource === 'all') {
            cost.food = Math.round(cost.food * (1 - discount));
            cost.wood = Math.round(cost.wood * (1 - discount));
            cost.gold = Math.round(cost.gold * (1 - discount));
            cost.stone = Math.round(cost.stone * (1 - discount));
          } else if (bonus.resource === 'gold') {
            cost.gold = Math.round(cost.gold * (1 - discount));
          } else if (bonus.resource === 'food') {
            cost.food = Math.round(cost.food * (1 - discount));
          } else if (bonus.resource === 'wood') {
            cost.wood = Math.round(cost.wood * (1 - discount));
          }
        }
      }
    });
  }

  return cost;
};

/**
 * Calculate total resources and population for an army composition
 * @param {Object} composition - Army composition { unitId: quantity }
 * @param {string} civId - Civilization ID
 * @param {string} age - Current age
 * @returns {Object} { totalCost: { food, wood, gold, stone }, totalPopulation }
 */
export const calculateTotals = (composition, civId, age) => {
  let totalCost = { food: 0, wood: 0, gold: 0, stone: 0 };
  let totalPopulation = 0;

  Object.entries(composition).forEach(([unitId, quantity]) => {
    if (quantity > 0) {
      const unit = getUnitById(unitId);
      if (unit) {
        const adjustedCost = calculateUnitCost(unit, civId, age);

        totalCost.food += adjustedCost.food * quantity;
        totalCost.wood += adjustedCost.wood * quantity;
        totalCost.gold += adjustedCost.gold * quantity;
        totalCost.stone += adjustedCost.stone * quantity;
        totalPopulation += unit.population * quantity;
      }
    }
  });

  return { totalCost, totalPopulation };
};

/**
 * Check if unit has a discount applied
 * @param {Object} unit - Unit object
 * @param {Object} adjustedCost - Adjusted cost after bonuses
 * @returns {boolean} True if unit has any discount
 */
export const hasDiscount = (unit, adjustedCost) => {
  return JSON.stringify(adjustedCost) !== JSON.stringify(unit.cost);
};

/**
 * Calculate resource percentage usage
 * @param {number} used - Resources used
 * @param {number} limit - Resource limit
 * @returns {number} Percentage (0-100+)
 */
export const calculatePercentage = (used, limit) => {
  if (limit === 0) return 0;
  return (used / limit) * 100;
};

/**
 * Get color class based on resource usage percentage
 * @param {number} percentage - Usage percentage
 * @returns {string} Tailwind color class
 */
export const getResourceColor = (percentage) => {
  if (percentage > 100) return 'bg-red-500';
  if (percentage > 80) return 'bg-yellow-500';
  return 'bg-green-500';
};

/**
 * Group units by category
 * @param {Array} units - Array of units
 * @returns {Object} Units grouped by category
 */
export const groupUnitsByCategory = (units) => {
  return units.reduce((acc, unit) => {
    if (!acc[unit.category]) {
      acc[unit.category] = [];
    }
    acc[unit.category].push(unit);
    return acc;
  }, {});
};
