import { getCivilizationById } from '../data/civilizations';
import { getUnitById } from '../data/units';
import type {
  Unit,
  ResourceCost,
  Age,
  Civilization,
  Fortification,
  UnitCategory,
  CostBonus,
} from '../types';

interface CivilizationWithTeamBonus extends Civilization {
  // Uses the TeamBonus from Civilization type
}

interface TotalsResult {
  totalCost: ResourceCost;
  totalPopulation: number;
}

/**
 * Apply team bonuses from allied civilizations
 * @param cost - Unit cost object
 * @param unit - Unit object
 * @param alliedCivs - Array of allied civilization IDs
 * @param age - Current age
 * @returns Adjusted cost after team bonuses
 */
export const applyTeamBonuses = (
  cost: ResourceCost,
  unit: Unit,
  alliedCivs: string[],
  age: Age
): ResourceCost => {
  if (!alliedCivs || alliedCivs.length === 0) {
    return cost;
  }

  const adjustedCost = { ...cost };

  alliedCivs.forEach((allyCivId) => {
    const allyCiv = getCivilizationById(allyCivId) as CivilizationWithTeamBonus | undefined;
    if (allyCiv && allyCiv.teamBonus) {
      const teamBonus = allyCiv.teamBonus;

      // Apply cost-type team bonuses
      if (teamBonus.type === 'cost') {
        const appliesToUnit =
          !teamBonus.units ||
          teamBonus.units.includes('all') ||
          teamBonus.units.includes(unit.id);

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
            const resource = teamBonus.resource as keyof ResourceCost;
            adjustedCost[resource] = Math.round(adjustedCost[resource] * (1 - discount));
          }
        }
      }
    }
  });

  return adjustedCost;
};

/**
 * Calculate unit cost with civilization bonuses applied
 * @param unit - Unit object
 * @param civId - Civilization ID
 * @param age - Current age
 * @param alliedCivs - Optional array of allied civilization IDs
 * @returns Adjusted cost { food, wood, gold, stone }
 */
export const calculateUnitCost = (
  unit: Unit,
  civId: string,
  age: Age,
  alliedCivs: string[] = []
): ResourceCost => {
  const civ = getCivilizationById(civId);
  const cost = { ...unit.cost };

  if (civ && civ.bonuses.length > 0) {
    civ.bonuses.forEach((bonus) => {
      if (bonus.type === 'cost') {
        const costBonus = bonus as CostBonus;
        // Check if this bonus applies to this unit
        const appliesToUnit =
          costBonus.units.includes('all') || costBonus.units.includes(unit.id);

        if (appliesToUnit) {
          let discount = 0;

          // Age-based discount
          if (costBonus.ages) {
            discount = costBonus.ages[age] || 0;
          } else {
            discount = costBonus.value || 0;
          }

          // Apply discount to specific resource or all
          if (costBonus.resource === 'all') {
            cost.food = Math.round(cost.food * (1 - discount));
            cost.wood = Math.round(cost.wood * (1 - discount));
            cost.gold = Math.round(cost.gold * (1 - discount));
            cost.stone = Math.round(cost.stone * (1 - discount));
          } else if (costBonus.resource === 'gold') {
            cost.gold = Math.round(cost.gold * (1 - discount));
          } else if (costBonus.resource === 'food') {
            cost.food = Math.round(cost.food * (1 - discount));
          } else if (costBonus.resource === 'wood') {
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
 * @param composition - Army composition { unitId: quantity }
 * @param civId - Civilization ID
 * @param age - Current age
 * @param alliedCivs - Optional array of allied civilization IDs
 * @returns { totalCost: { food, wood, gold, stone }, totalPopulation }
 */
export const calculateTotals = (
  composition: Record<string, number>,
  civId: string,
  age: Age,
  alliedCivs: string[] = []
): TotalsResult => {
  const totalCost: ResourceCost = { food: 0, wood: 0, gold: 0, stone: 0 };
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
 * @param fortificationComposition - Fortification composition { fortificationId: quantity }
 * @param fortifications - Array of all fortifications (imported from data)
 * @returns { food, wood, gold, stone }
 */
export const calculateFortificationCosts = (
  fortificationComposition: Record<string, number>,
  fortifications: Fortification[]
): ResourceCost => {
  const totalCost: ResourceCost = { food: 0, wood: 0, gold: 0, stone: 0 };

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
 * @param composition - Army composition { unitId: quantity }
 * @param fortificationComposition - Fortification composition { fortificationId: quantity }
 * @param civId - Civilization ID
 * @param age - Current age
 * @param fortifications - Array of all fortifications
 * @param alliedCivs - Optional array of allied civilization IDs
 * @returns { totalCost: { food, wood, gold, stone }, totalPopulation }
 */
export const calculateCombinedTotals = (
  composition: Record<string, number>,
  fortificationComposition: Record<string, number>,
  civId: string,
  age: Age,
  fortifications: Fortification[],
  alliedCivs: string[] = []
): TotalsResult => {
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
 * @param unit - Unit object
 * @param adjustedCost - Adjusted cost after bonuses
 * @returns True if unit has any discount
 */
export const hasDiscount = (unit: Unit, adjustedCost: ResourceCost): boolean =>
  JSON.stringify(adjustedCost) !== JSON.stringify(unit.cost);

/**
 * Calculate resource percentage usage
 * @param used - Resources used
 * @param limit - Resource limit
 * @returns Percentage (0-100+)
 */
export const calculatePercentage = (used: number, limit: number): number => {
  if (limit === 0) {
    return 0;
  }
  return (used / limit) * 100;
};

/**
 * Get color class based on resource usage percentage
 * @param percentage - Usage percentage
 * @returns Tailwind color class
 */
export const getResourceColor = (percentage: number): string => {
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
 * @param units - Array of units
 * @returns Units grouped by category
 */
export const groupUnitsByCategory = (units: Unit[]): Record<UnitCategory, Unit[]> =>
  units.reduce(
    (acc, unit) => {
      if (!acc[unit.category]) {
        acc[unit.category] = [];
      }
      acc[unit.category].push(unit);
      return acc;
    },
    {} as Record<UnitCategory, Unit[]>
  );
