import { getCivilizationById } from '../data/civilizations';
import { getUnitById } from '../data/units';

/**
 * Apply team bonuses from allied civilizations
 * @param {Object} cost - Unit cost object
 * @param {Object} unit - Unit object
 * @param {Array} alliedCivs - Array of allied civilization IDs
 * @param {string} age - Current age
 * @returns {Object} Adjusted cost after team bonuses
 */
export const applyTeamBonuses = (cost, unit, alliedCivs, age) => {
  if (!alliedCivs || alliedCivs.length === 0) {
    return cost;
  }

  const adjustedCost = { ...cost };

  alliedCivs.forEach((allyCivId) => {
    const allyCiv = getCivilizationById(allyCivId);
    if (allyCiv && allyCiv.teamBonus) {
      const teamBonus = allyCiv.teamBonus;

      // Apply cost-type team bonuses
      if (teamBonus.type === 'cost') {
        const appliesToUnit =
          !teamBonus.units || teamBonus.units === 'all' || teamBonus.units.includes(unit.id);

        if (appliesToUnit) {
          let discount = 0;

          if (teamBonus.ages) {
            discount = teamBonus.ages[age] || 0;
          } else {
            discount = teamBonus.value || 0;
          }

          if (teamBonus.resource === 'all') {
            adjustedCost.food = Math.round(adjustedCost.food * (1 - discount));
            adjustedCost.wood = Math.round(adjustedCost.wood * (1 - discount));
            adjustedCost.gold = Math.round(adjustedCost.gold * (1 - discount));
            adjustedCost.stone = Math.round(adjustedCost.stone * (1 - discount));
          } else if (teamBonus.resource) {
            adjustedCost[teamBonus.resource] = Math.round(
              adjustedCost[teamBonus.resource] * (1 - discount)
            );
          }
        }
      }
    }
  });

  return adjustedCost;
};

/**
 * Calculate unit cost with civilization bonuses applied
 * @param {Object} unit - Unit object
 * @param {string} civId - Civilization ID
 * @param {string} age - Current age
 * @param {Array} alliedCivs - Optional array of allied civilization IDs
 * @returns {Object} Adjusted cost { food, wood, gold, stone }
 */
export const calculateUnitCost = (unit, civId, age, alliedCivs = []) => {
  const civ = getCivilizationById(civId);
  const cost = { ...unit.cost };

  if (civ && civ.bonuses.length > 0) {
    civ.bonuses.forEach((bonus) => {
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

  // Apply team bonuses from allies
  const finalCost = applyTeamBonuses(cost, unit, alliedCivs, age);

  return finalCost;
};

/**
 * Calculate total resources and population for an army composition
 * @param {Object} composition - Army composition { unitId: quantity }
 * @param {string} civId - Civilization ID
 * @param {string} age - Current age
 * @param {Array} alliedCivs - Optional array of allied civilization IDs
 * @returns {Object} { totalCost: { food, wood, gold, stone }, totalPopulation }
 */
export const calculateTotals = (composition, civId, age, alliedCivs = []) => {
  const totalCost = { food: 0, wood: 0, gold: 0, stone: 0 };
  let totalPopulation = 0;

  Object.entries(composition).forEach(([unitId, quantity]) => {
    if (quantity > 0) {
      const unit = getUnitById(unitId);
      if (unit) {
        const adjustedCost = calculateUnitCost(unit, civId, age, alliedCivs);

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
 * Calculate total resources for fortifications
 * @param {Object} fortificationComposition - Fortification composition { fortificationId: quantity }
 * @param {Array} fortifications - Array of all fortifications (imported from data)
 * @returns {Object} { food, wood, gold, stone }
 */
export const calculateFortificationCosts = (fortificationComposition, fortifications) => {
  const totalCost = { food: 0, wood: 0, gold: 0, stone: 0 };

  Object.entries(fortificationComposition).forEach(([fortificationId, quantity]) => {
    if (quantity > 0) {
      const fortification = fortifications.find((f) => f.id === fortificationId);
      if (fortification) {
        totalCost.food += fortification.cost.food * quantity;
        totalCost.wood += fortification.cost.wood * quantity;
        totalCost.gold += fortification.cost.gold * quantity;
        totalCost.stone += fortification.cost.stone * quantity;
      }
    }
  });

  return totalCost;
};

/**
 * Calculate combined totals for units and fortifications
 * @param {Object} composition - Army composition { unitId: quantity }
 * @param {Object} fortificationComposition - Fortification composition { fortificationId: quantity }
 * @param {string} civId - Civilization ID
 * @param {string} age - Current age
 * @param {Array} fortifications - Array of all fortifications
 * @param {Array} alliedCivs - Optional array of allied civilization IDs
 * @returns {Object} { totalCost: { food, wood, gold, stone }, totalPopulation }
 */
export const calculateCombinedTotals = (
  composition,
  fortificationComposition,
  civId,
  age,
  fortifications,
  alliedCivs = []
) => {
  const unitTotals = calculateTotals(composition, civId, age, alliedCivs);
  const fortificationCosts = calculateFortificationCosts(fortificationComposition, fortifications);

  return {
    totalCost: {
      food: unitTotals.totalCost.food + fortificationCosts.food,
      wood: unitTotals.totalCost.wood + fortificationCosts.wood,
      gold: unitTotals.totalCost.gold + fortificationCosts.gold,
      stone: unitTotals.totalCost.stone + fortificationCosts.stone,
    },
    totalPopulation: unitTotals.totalPopulation,
  };
};

/**
 * Check if unit has a discount applied
 * @param {Object} unit - Unit object
 * @param {Object} adjustedCost - Adjusted cost after bonuses
 * @returns {boolean} True if unit has any discount
 */
export const hasDiscount = (unit, adjustedCost) =>
  JSON.stringify(adjustedCost) !== JSON.stringify(unit.cost);

/**
 * Calculate resource percentage usage
 * @param {number} used - Resources used
 * @param {number} limit - Resource limit
 * @returns {number} Percentage (0-100+)
 */
export const calculatePercentage = (used, limit) => {
  if (limit === 0) {
    return 0;
  }
  return (used / limit) * 100;
};

/**
 * Get color class based on resource usage percentage
 * @param {number} percentage - Usage percentage
 * @returns {string} Tailwind color class
 */
export const getResourceColor = (percentage) => {
  if (percentage > 100) {
    return 'bg-red-500';
  }
  if (percentage > 80) {
    return 'bg-yellow-500';
  }
  return 'bg-green-500';
};

/**
 * Group units by category
 * @param {Array} units - Array of units
 * @returns {Object} Units grouped by category
 */
export const groupUnitsByCategory = (units) =>
  units.reduce((acc, unit) => {
    if (!acc[unit.category]) {
      acc[unit.category] = [];
    }
    acc[unit.category].push(unit);
    return acc;
  }, {});
