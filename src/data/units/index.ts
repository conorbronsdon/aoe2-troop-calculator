import type { Unit, Age } from '../../types';
import { archerUnits } from './archers';
import { infantryUnits } from './infantry';
import { cavalryUnits } from './cavalry';
import { siegeUnits } from './siege';
import { navalUnits } from './naval';
import { uniqueUnits } from './unique';
import { otherUnits } from './other';
import { canCivBuildUnit, getMissingUnitsForCiv } from '../techTree';

// Re-export tech tree functions
export { canCivBuildUnit, getMissingUnitsForCiv };

/**
 * Complete unit roster
 * Aggregates all unit types into a single array
 */
export const units: Unit[] = [
  ...archerUnits,
  ...infantryUnits,
  ...cavalryUnits,
  ...siegeUnits,
  ...navalUnits,
  ...uniqueUnits,
  ...otherUnits,
];

/**
 * Get unit by ID
 * @param unitId - Unit identifier
 * @returns Unit data or undefined if not found
 */
export const getUnitById = (unitId: string): Unit | undefined =>
  units.find((unit) => unit.id === unitId);

/**
 * Get units by category
 * @param category - Unit category
 * @returns Array of units in the category
 */
export const getUnitsByCategory = (category: string): Unit[] =>
  units.filter((unit) => unit.category === category);

/**
 * Get units available in a specific age
 * @param age - Age identifier
 * @returns Array of units available in that age or earlier
 */
export const getUnitsByAge = (age: Age): Unit[] => {
  const ageOrder: Record<Age, number> = { dark: 0, feudal: 1, castle: 2, imperial: 3 };
  const targetAgeValue = ageOrder[age];
  return units.filter((unit) => ageOrder[unit.age] <= targetAgeValue);
};

/**
 * Get unique units for a specific civilization
 * @param civId - Civilization identifier
 * @returns Array of unique units for that civilization
 */
export const getUniqueUnitsByCiv = (civId: string): Unit[] => {
  if (!civId || civId === 'generic') {
    return [];
  }
  return uniqueUnits.filter((unit) => unit.civilization === civId);
};

/**
 * Get units available for a specific civilization and age
 * Includes generic units and civ-specific unique units
 * Filters out units that the civilization cannot build (tech tree restrictions)
 * @param civId - Civilization identifier
 * @param age - Age identifier
 * @returns Array of units available for that civ in that age
 */
export const getUnitsForCiv = (civId: string, age: Age): Unit[] => {
  const ageOrder: Record<Age, number> = { dark: 0, feudal: 1, castle: 2, imperial: 3 };
  const targetAgeValue = ageOrder[age];

  // Get all non-unique units filtered by age
  const genericUnits = units.filter(
    (unit) => unit.category !== 'Unique' && ageOrder[unit.age] <= targetAgeValue
  );

  // Filter out units that the civilization cannot build (tech tree restrictions)
  const availableGenericUnits = genericUnits.filter((unit) => canCivBuildUnit(civId, unit.id));

  // Get unique units for this civ
  const civUniqueUnits = getUniqueUnitsByCiv(civId).filter(
    (unit) => ageOrder[unit.age] <= targetAgeValue
  );

  return [...availableGenericUnits, ...civUniqueUnits];
};
