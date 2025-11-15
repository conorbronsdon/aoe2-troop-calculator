/**
 * Data validation utilities
 * Ensures game data integrity
 */

import { logger } from './errorHandler';

/**
 * Validates a unit object
 * @param {Object} unit - Unit to validate
 * @throws {Error} If unit is invalid
 * @returns {boolean} True if valid
 */
export const validateUnit = (unit) => {
  const required = ['id', 'name', 'category', 'age', 'cost', 'population'];
  const missing = required.filter(field => !(field in unit));

  if (missing.length > 0) {
    throw new Error(`Unit ${unit.id || 'unknown'} missing fields: ${missing.join(', ')}`);
  }

  // Validate cost structure
  const resources = ['food', 'wood', 'gold', 'stone'];
  resources.forEach(res => {
    if (typeof unit.cost[res] !== 'number' || unit.cost[res] < 0) {
      throw new Error(`Invalid ${res} cost for ${unit.id}`);
    }
  });

  // Validate age
  const validAges = ['dark', 'feudal', 'castle', 'imperial'];
  if (!validAges.includes(unit.age)) {
    throw new Error(`Invalid age for ${unit.id}: ${unit.age}`);
  }

  // Validate population
  if (typeof unit.population !== 'number' || unit.population < 0) {
    throw new Error(`Invalid population for ${unit.id}: ${unit.population}`);
  }

  return true;
};

/**
 * Validates a civilization object
 * @param {Object} civ - Civilization to validate
 * @throws {Error} If civilization is invalid
 * @returns {boolean} True if valid
 */
export const validateCivilization = (civ) => {
  const required = ['id', 'name', 'region', 'bonuses'];
  const missing = required.filter(field => !(field in civ));

  if (missing.length > 0) {
    throw new Error(`Civilization ${civ.id || 'unknown'} missing fields: ${missing.join(', ')}`);
  }

  // Validate bonuses array
  if (!Array.isArray(civ.bonuses)) {
    throw new Error(`Civilization ${civ.id} bonuses must be an array`);
  }

  return true;
};

/**
 * Validates all game data
 * @param {Array} units - Array of units
 * @param {Array} civilizations - Array of civilizations
 * @returns {Object} Validation results
 */
export const validateGameData = (units, civilizations) => {
  const errors = [];

  try {
    units.forEach(validateUnit);
  } catch (error) {
    errors.push(`Unit validation error: ${error.message}`);
  }

  try {
    civilizations.forEach(validateCivilization);
  } catch (error) {
    errors.push(`Civilization validation error: ${error.message}`);
  }

  if (errors.length > 0) {
    logger.error('Game data validation failed', errors);
    return { valid: false, errors };
  }

  logger.info('All game data validated successfully');
  return { valid: true, errors: [] };
};
