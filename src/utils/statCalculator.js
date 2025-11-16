/**
 * Stat Calculator - Calculates modified unit stats based on technologies and civilization bonuses
 *
 * This module handles:
 * - Applying technology effects to base unit stats
 * - Applying civilization bonuses to unit stats
 * - Calculating final effective stats for units
 */

import { getTechById, EFFECT_TYPES } from '../data/technologies';
import { civilizations } from '../data/civilizations';

/**
 * Base stats for all units in Age of Empires II
 * These represent the base (unupgraded) stats for each unit
 */
export const BASE_UNIT_STATS = {
  // Infantry
  'militiaman': { hp: 40, attack: 4, meleeArmor: 0, pierceArmor: 1, range: 0, speed: 0.9 },
  'man-at-arms': { hp: 45, attack: 6, meleeArmor: 0, pierceArmor: 1, range: 0, speed: 0.9 },
  'longswordsman': { hp: 60, attack: 9, meleeArmor: 1, pierceArmor: 1, range: 0, speed: 0.9 },
  'two-handed-swordsman': { hp: 60, attack: 12, meleeArmor: 1, pierceArmor: 1, range: 0, speed: 0.9 },
  'champion': { hp: 70, attack: 13, meleeArmor: 1, pierceArmor: 1, range: 0, speed: 0.9 },
  'spearman': { hp: 45, attack: 3, meleeArmor: 0, pierceArmor: 0, range: 0, speed: 1.0 },
  'pikeman': { hp: 55, attack: 4, meleeArmor: 0, pierceArmor: 0, range: 0, speed: 1.0 },
  'halberdier': { hp: 60, attack: 6, meleeArmor: 0, pierceArmor: 0, range: 0, speed: 1.0 },
  'eagle-scout': { hp: 50, attack: 4, meleeArmor: 0, pierceArmor: 2, range: 0, speed: 1.1 },
  'eagle-warrior': { hp: 55, attack: 7, meleeArmor: 0, pierceArmor: 3, range: 0, speed: 1.15 },
  'elite-eagle-warrior': { hp: 60, attack: 9, meleeArmor: 0, pierceArmor: 4, range: 0, speed: 1.3 },

  // Cavalry
  'scout': { hp: 45, attack: 3, meleeArmor: 0, pierceArmor: 2, range: 0, speed: 1.55 },
  'light-cavalry': { hp: 60, attack: 7, meleeArmor: 0, pierceArmor: 2, range: 0, speed: 1.5 },
  'hussar': { hp: 75, attack: 7, meleeArmor: 0, pierceArmor: 2, range: 0, speed: 1.5 },
  'knight': { hp: 100, attack: 10, meleeArmor: 2, pierceArmor: 2, range: 0, speed: 1.35 },
  'cavalier': { hp: 120, attack: 12, meleeArmor: 2, pierceArmor: 2, range: 0, speed: 1.35 },
  'paladin': { hp: 160, attack: 14, meleeArmor: 2, pierceArmor: 3, range: 0, speed: 1.35 },
  'camel': { hp: 100, attack: 6, meleeArmor: 0, pierceArmor: 0, range: 0, speed: 1.45 },
  'heavy-camel': { hp: 120, attack: 7, meleeArmor: 0, pierceArmor: 0, range: 0, speed: 1.45 },
  'imperial-camel': { hp: 140, attack: 9, meleeArmor: 0, pierceArmor: 0, range: 0, speed: 1.45 },
  'battle-elephant': { hp: 250, attack: 12, meleeArmor: 1, pierceArmor: 2, range: 0, speed: 0.85 },
  'elite-battle-elephant': { hp: 300, attack: 14, meleeArmor: 1, pierceArmor: 3, range: 0, speed: 0.85 },
  'steppe-lancer': { hp: 60, attack: 9, meleeArmor: 0, pierceArmor: 1, range: 1, speed: 1.45 },
  'elite-steppe-lancer': { hp: 80, attack: 11, meleeArmor: 0, pierceArmor: 1, range: 1, speed: 1.45 },

  // Archers
  'archer': { hp: 30, attack: 4, meleeArmor: 0, pierceArmor: 0, range: 4, speed: 0.96 },
  'crossbowman': { hp: 35, attack: 5, meleeArmor: 0, pierceArmor: 0, range: 5, speed: 0.96 },
  'arbalester': { hp: 40, attack: 6, meleeArmor: 0, pierceArmor: 0, range: 5, speed: 0.96 },
  'skirmisher': { hp: 30, attack: 2, meleeArmor: 0, pierceArmor: 3, range: 4, speed: 0.96 },
  'elite-skirmisher': { hp: 35, attack: 3, meleeArmor: 0, pierceArmor: 4, range: 5, speed: 0.96 },
  'imperial-skirmisher': { hp: 35, attack: 4, meleeArmor: 0, pierceArmor: 5, range: 5, speed: 0.96 },
  'cavalry-archer': { hp: 50, attack: 6, meleeArmor: 0, pierceArmor: 0, range: 4, speed: 1.4 },
  'heavy-cavalry-archer': { hp: 60, attack: 7, meleeArmor: 1, pierceArmor: 0, range: 4, speed: 1.4 },
  'hand-cannoneer': { hp: 35, attack: 17, meleeArmor: 1, pierceArmor: 0, range: 7, speed: 0.96 },
  'slinger': { hp: 40, attack: 4, meleeArmor: 0, pierceArmor: 0, range: 5, speed: 0.96 },

  // Siege
  'battering-ram': { hp: 175, attack: 2, meleeArmor: -3, pierceArmor: 180, range: 0, speed: 0.5 },
  'capped-ram': { hp: 200, attack: 3, meleeArmor: -3, pierceArmor: 190, range: 0, speed: 0.5 },
  'siege-ram': { hp: 270, attack: 4, meleeArmor: -3, pierceArmor: 195, range: 0, speed: 0.6 },
  'mangonel': { hp: 50, attack: 40, meleeArmor: 0, pierceArmor: 6, range: 7, speed: 0.6 },
  'onager': { hp: 60, attack: 50, meleeArmor: 0, pierceArmor: 7, range: 8, speed: 0.6 },
  'siege-onager': { hp: 70, attack: 75, meleeArmor: 0, pierceArmor: 8, range: 8, speed: 0.6 },
  'scorpion': { hp: 40, attack: 12, meleeArmor: 0, pierceArmor: 6, range: 7, speed: 0.65 },
  'heavy-scorpion': { hp: 50, attack: 16, meleeArmor: 0, pierceArmor: 7, range: 8, speed: 0.65 },
  'bombard-cannon': { hp: 80, attack: 40, meleeArmor: 2, pierceArmor: 5, range: 12, speed: 0.7 },
  'trebuchet': { hp: 150, attack: 200, meleeArmor: 1, pierceArmor: 150, range: 16, speed: 0.8 },

  // Monks
  'monk': { hp: 30, attack: 0, meleeArmor: 0, pierceArmor: 0, range: 0, speed: 0.7 },
  'missionary': { hp: 30, attack: 0, meleeArmor: 0, pierceArmor: 0, range: 0, speed: 1.1 },

  // Unique Units (some examples)
  'longbowman': { hp: 35, attack: 6, meleeArmor: 0, pierceArmor: 0, range: 5, speed: 0.96 },
  'elite-longbowman': { hp: 40, attack: 7, meleeArmor: 0, pierceArmor: 1, range: 6, speed: 0.96 },
  'cataphract': { hp: 110, attack: 9, meleeArmor: 2, pierceArmor: 1, range: 0, speed: 1.35 },
  'elite-cataphract': { hp: 150, attack: 12, meleeArmor: 2, pierceArmor: 1, range: 0, speed: 1.35 },
  'woad-raider': { hp: 65, attack: 8, meleeArmor: 0, pierceArmor: 1, range: 0, speed: 1.2 },
  'elite-woad-raider': { hp: 80, attack: 13, meleeArmor: 0, pierceArmor: 1, range: 0, speed: 1.2 },
  'throwing-axeman': { hp: 50, attack: 7, meleeArmor: 0, pierceArmor: 0, range: 3, speed: 1.0 },
  'elite-throwing-axeman': { hp: 60, attack: 8, meleeArmor: 1, pierceArmor: 0, range: 4, speed: 1.0 },
  'huskarl': { hp: 60, attack: 10, meleeArmor: 0, pierceArmor: 6, range: 0, speed: 1.05 },
  'elite-huskarl': { hp: 70, attack: 12, meleeArmor: 0, pierceArmor: 8, range: 0, speed: 1.05 },
  'teutonic-knight': { hp: 80, attack: 12, meleeArmor: 5, pierceArmor: 2, range: 0, speed: 0.65 },
  'elite-teutonic-knight': { hp: 100, attack: 17, meleeArmor: 10, pierceArmor: 2, range: 0, speed: 0.65 },
  'janissary': { hp: 44, attack: 17, meleeArmor: 1, pierceArmor: 0, range: 8, speed: 0.96 },
  'elite-janissary': { hp: 50, attack: 22, meleeArmor: 2, pierceArmor: 0, range: 8, speed: 0.96 },
  'mangudai': { hp: 60, attack: 6, meleeArmor: 0, pierceArmor: 0, range: 4, speed: 1.45 },
  'elite-mangudai': { hp: 60, attack: 8, meleeArmor: 1, pierceArmor: 0, range: 4, speed: 1.45 },
  'war-elephant': { hp: 450, attack: 15, meleeArmor: 1, pierceArmor: 2, range: 0, speed: 0.6 },
  'elite-war-elephant': { hp: 600, attack: 20, meleeArmor: 1, pierceArmor: 3, range: 0, speed: 0.6 },
  'mameluke': { hp: 65, attack: 7, meleeArmor: 0, pierceArmor: 0, range: 3, speed: 1.4 },
  'elite-mameluke': { hp: 80, attack: 10, meleeArmor: 1, pierceArmor: 0, range: 3, speed: 1.4 },
  'samurai': { hp: 60, attack: 8, meleeArmor: 1, pierceArmor: 1, range: 0, speed: 1.0 },
  'elite-samurai': { hp: 80, attack: 12, meleeArmor: 1, pierceArmor: 1, range: 0, speed: 1.0 },
  'chu-ko-nu': { hp: 45, attack: 8, meleeArmor: 0, pierceArmor: 0, range: 4, speed: 0.96 },
  'elite-chu-ko-nu': { hp: 50, attack: 8, meleeArmor: 0, pierceArmor: 0, range: 4, speed: 0.96 },
  'war-wagon': { hp: 150, attack: 9, meleeArmor: 0, pierceArmor: 3, range: 4, speed: 1.2 },
  'elite-war-wagon': { hp: 200, attack: 9, meleeArmor: 0, pierceArmor: 4, range: 5, speed: 1.2 },
  'plumed-archer': { hp: 50, attack: 5, meleeArmor: 0, pierceArmor: 1, range: 4, speed: 1.2 },
  'elite-plumed-archer': { hp: 65, attack: 5, meleeArmor: 0, pierceArmor: 2, range: 5, speed: 1.2 },
  'jaguar-warrior': { hp: 50, attack: 10, meleeArmor: 1, pierceArmor: 1, range: 0, speed: 1.0 },
  'elite-jaguar-warrior': { hp: 75, attack: 12, meleeArmor: 2, pierceArmor: 1, range: 0, speed: 1.0 },
  'tarkan': { hp: 100, attack: 8, meleeArmor: 1, pierceArmor: 3, range: 0, speed: 1.35 },
  'elite-tarkan': { hp: 150, attack: 11, meleeArmor: 1, pierceArmor: 4, range: 0, speed: 1.35 },
  'conquistador': { hp: 55, attack: 16, meleeArmor: 2, pierceArmor: 2, range: 6, speed: 1.3 },
  'elite-conquistador': { hp: 70, attack: 18, meleeArmor: 2, pierceArmor: 2, range: 6, speed: 1.3 },
  'kamayuk': { hp: 60, attack: 7, meleeArmor: 0, pierceArmor: 0, range: 1, speed: 1.0 },
  'elite-kamayuk': { hp: 80, attack: 8, meleeArmor: 1, pierceArmor: 0, range: 1, speed: 1.0 }
};

/**
 * Get base stats for a unit
 * @param {string} unitId - The unit ID
 * @returns {Object|null} Base stats or null if not found
 */
export const getBaseStats = (unitId) => {
  return BASE_UNIT_STATS[unitId] || null;
};

/**
 * Check if a technology affects a specific unit
 * @param {Object} tech - Technology object
 * @param {Object} unit - Unit object
 * @returns {boolean} Whether the tech affects the unit
 */
const techAffectsUnit = (tech, unit) => {
  for (const effect of tech.effects) {
    const { affectsUnits } = effect;

    // Check if affects specific unit IDs
    if (affectsUnits.includes(unit.id)) {
      return true;
    }

    // Check if affects unit category
    if (affectsUnits.includes(unit.category)) {
      return true;
    }

    // Check for 'all' units
    if (affectsUnits.includes('all')) {
      return true;
    }
  }

  return false;
};

/**
 * Calculate modified stats for a unit based on researched technologies
 * @param {Object} unit - Unit object with id and category
 * @param {Array} researchedTechs - Array of researched technology IDs
 * @param {string} civId - Selected civilization ID (optional)
 * @returns {Object} Modified stats with breakdown
 */
export const calculateUnitStats = (unit, researchedTechs = [], civId = 'generic') => {
  const baseStats = getBaseStats(unit.id);

  if (!baseStats) {
    // Return null if no base stats available
    return null;
  }

  // Start with base stats
  const modifiedStats = { ...baseStats };
  const breakdown = {
    hp: [],
    attack: [],
    meleeArmor: [],
    pierceArmor: [],
    range: [],
    speed: []
  };

  // Apply technology effects
  researchedTechs.forEach(techId => {
    const tech = getTechById(techId);
    if (!tech) {
      return;
    }

    tech.effects.forEach(effect => {
      // Check if this effect applies to the unit
      const applies = effect.affectsUnits.includes(unit.id) ||
                      effect.affectsUnits.includes(unit.category) ||
                      effect.affectsUnits.includes('all');

      if (!applies) {
        return;
      }

      // Apply the effect
      switch (effect.type) {
        case EFFECT_TYPES.HP:
          modifiedStats.hp += effect.value;
          breakdown.hp.push({ source: tech.name, value: `+${effect.value}` });
          break;
        case EFFECT_TYPES.ATTACK:
          modifiedStats.attack += effect.value;
          breakdown.attack.push({ source: tech.name, value: `+${effect.value}` });
          break;
        case EFFECT_TYPES.MELEE_ARMOR:
          modifiedStats.meleeArmor += effect.value;
          breakdown.meleeArmor.push({ source: tech.name, value: `+${effect.value}` });
          break;
        case EFFECT_TYPES.PIERCE_ARMOR:
          modifiedStats.pierceArmor += effect.value;
          breakdown.pierceArmor.push({ source: tech.name, value: `+${effect.value}` });
          break;
        case EFFECT_TYPES.RANGE:
          modifiedStats.range += effect.value;
          breakdown.range.push({ source: tech.name, value: `+${effect.value}` });
          break;
        case EFFECT_TYPES.SPEED:
          modifiedStats.speed += effect.value;
          breakdown.speed.push({ source: tech.name, value: `+${Math.round(effect.value * 100)}%` });
          break;
        default:
          break;
      }
    });
  });

  // Apply civilization bonuses (if applicable)
  if (civId && civId !== 'generic') {
    const civ = civilizations.find(c => c.id === civId);
    if (civ && civ.bonuses) {
      civ.bonuses.forEach(bonus => {
        // Check if this is a military bonus that affects stats
        if (bonus.type === 'military' && bonus.affects) {
          // Check if this bonus affects the unit
          const affectedCategories = bonus.affects.split(',').map(s => s.trim().toLowerCase());
          const unitCategory = unit.category.toLowerCase();
          const unitName = unit.name.toLowerCase();

          const isAffected = affectedCategories.some(cat =>
            unitCategory.includes(cat) || unitName.includes(cat)
          );

          if (isAffected && bonus.effect) {
            // Parse percentage-based bonuses (e.g., "+20% HP")
            const hpMatch = bonus.effect.match(/\+(\d+)%\s*HP/i);
            if (hpMatch) {
              const percentage = parseInt(hpMatch[1]) / 100;
              const hpBonus = Math.round(baseStats.hp * percentage);
              modifiedStats.hp += hpBonus;
              breakdown.hp.push({ source: civ.name, value: `+${hpBonus} (${hpMatch[1]}%)` });
            }

            // Parse attack bonuses
            const attackMatch = bonus.effect.match(/\+(\d+)\s*attack/i);
            if (attackMatch) {
              const attackBonus = parseInt(attackMatch[1]);
              modifiedStats.attack += attackBonus;
              breakdown.attack.push({ source: civ.name, value: `+${attackBonus}` });
            }

            // Parse range bonuses
            const rangeMatch = bonus.effect.match(/\+(\d+)\s*range/i);
            if (rangeMatch) {
              const rangeBonus = parseInt(rangeMatch[1]);
              modifiedStats.range += rangeBonus;
              breakdown.range.push({ source: civ.name, value: `+${rangeBonus}` });
            }
          }
        }
      });
    }
  }

  return {
    base: baseStats,
    modified: modifiedStats,
    breakdown
  };
};

/**
 * Format stat value for display
 * @param {string} statType - Type of stat (hp, attack, etc.)
 * @param {number} value - The value to format
 * @returns {string} Formatted string
 */
export const formatStatValue = (statType, value) => {
  switch (statType) {
    case 'speed':
      return value.toFixed(2);
    case 'meleeArmor':
    case 'pierceArmor':
      return Math.round(value).toString();
    default:
      return Math.round(value).toString();
  }
};

/**
 * Get a summary of stat changes
 * @param {Object} base - Base stats
 * @param {Object} modified - Modified stats
 * @returns {Object} Summary of changes
 */
export const getStatChangeSummary = (base, modified) => {
  const changes = {};

  Object.keys(base).forEach(stat => {
    const diff = modified[stat] - base[stat];
    if (Math.abs(diff) > 0.001) {
      changes[stat] = {
        base: base[stat],
        modified: modified[stat],
        diff: diff,
        percentage: ((diff / base[stat]) * 100).toFixed(1)
      };
    }
  });

  return changes;
};
