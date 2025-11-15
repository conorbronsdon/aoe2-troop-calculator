import { archerUnits } from './archers';
import { infantryUnits } from './infantry';
import { cavalryUnits } from './cavalry';
import { siegeUnits } from './siege';
import { otherUnits } from './other';

/**
 * Complete unit roster
 * Aggregates all unit types into a single array
 */
export const units = [
  ...archerUnits,
  ...infantryUnits,
  ...cavalryUnits,
  ...siegeUnits,
  ...otherUnits
];

/**
 * Get unit by ID
 * @param {string} unitId - Unit identifier
 * @returns {Object|undefined} Unit data or undefined if not found
 */
export const getUnitById = (unitId) => {
  return units.find(unit => unit.id === unitId);
};

/**
 * Get units by category
 * @param {string} category - Unit category
 * @returns {Array} Array of units in the category
 */
export const getUnitsByCategory = (category) => {
  return units.filter(unit => unit.category === category);
};

/**
 * Get units available in a specific age
 * @param {string} age - Age identifier
 * @returns {Array} Array of units available in that age or earlier
 */
export const getUnitsByAge = (age) => {
  const ageOrder = { dark: 0, feudal: 1, castle: 2, imperial: 3 };
  const targetAgeValue = ageOrder[age];
  return units.filter(unit => ageOrder[unit.age] <= targetAgeValue);
};
