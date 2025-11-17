/**
 * Combat Outcome Calculator Service
 *
 * Calculates expected combat outcomes between two army compositions.
 * Uses Age of Empires II damage formulas and unit statistics.
 */

import { calculateUnitStats } from '../utils/statCalculator';
import { getUnitById } from '../data/units';
import { Unit } from '../types';

// Types for combat service
interface ReloadTimes {
  infantry: number;
  cavalry: number;
  archer: number;
  siege: number;
  naval: number;
  unique: number;
  other: number;
  [key: string]: number;
}

interface AttackTypes {
  melee: string;
  ranged: string;
}

interface BonusDamageMap {
  [attackerUnitId: string]: {
    [defenderUnitId: string]: number;
  };
}

interface UnitStats {
  hp: number;
  attack: number;
  meleeArmor: number;
  pierceArmor: number;
  range: number;
  [key: string]: number;
}

interface CalculatedUnitStats {
  base: UnitStats;
  modified: UnitStats;
}

interface ArmyUnitData {
  unit: Unit;
  quantity: number;
  stats: UnitStats;
  baseStats: UnitStats;
}

interface ResourceCost {
  food: number;
  wood: number;
  gold: number;
  stone: number;
  total: number;
}

interface ArmyInput {
  composition: Record<string, number>;
  civId: string;
  researchedTechs?: string[];
}

interface ArmyStats {
  totalHP: number;
  totalDPS: number;
  timeToKill: number;
  cost: ResourceCost;
  population: number;
  costEfficiency: number;
  popEfficiency: number;
  unitCount: number;
}

interface CombatOutcome {
  winner: 'A' | 'B' | 'draw';
  confidence: 'uncertain' | 'slight' | 'moderate' | 'decisive';
  verdict: string;
  stats: {
    armyA: ArmyStats;
    armyB: ArmyStats;
  };
}

// Default reload times in seconds (approximations for AoE2 units)
const RELOAD_TIMES: ReloadTimes = {
  infantry: 2.0,
  cavalry: 1.9,
  archer: 2.0,
  siege: 6.0,
  naval: 3.0,
  unique: 2.0,
  other: 2.0,
};

// Attack type for damage calculation
const ATTACK_TYPE: AttackTypes = {
  melee: 'melee',
  ranged: 'ranged',
};

// Bonus damage tables for unit counters
// Format: { attackerUnitId: { defenderUnitId: bonusDamage } }
// These are simplified bonus damage values based on AoE2 armor class system
const BONUS_DAMAGE: BonusDamageMap = {
  // Spearman line bonus vs cavalry
  spearman: {
    scout: 15,
    'light-cavalry': 15,
    hussar: 15,
    knight: 22,
    cavalier: 22,
    paladin: 22,
    'camel-rider': 15,
    'heavy-camel': 15,
    'imperial-camel': 15,
    'battle-elephant': 25,
    'elite-battle-elephant': 25,
    'steppe-lancer': 15,
    'elite-steppe-lancer': 15,
  },
  pikeman: {
    scout: 22,
    'light-cavalry': 22,
    hussar: 22,
    knight: 32,
    cavalier: 32,
    paladin: 32,
    'camel-rider': 22,
    'heavy-camel': 22,
    'imperial-camel': 22,
    'battle-elephant': 47,
    'elite-battle-elephant': 47,
    'steppe-lancer': 22,
    'elite-steppe-lancer': 22,
  },
  halberdier: {
    scout: 32,
    'light-cavalry': 32,
    hussar: 32,
    knight: 47,
    cavalier: 47,
    paladin: 47,
    'camel-rider': 32,
    'heavy-camel': 32,
    'imperial-camel': 32,
    'battle-elephant': 60,
    'elite-battle-elephant': 60,
    'steppe-lancer': 32,
    'elite-steppe-lancer': 32,
  },
  // Camel bonus vs cavalry
  'camel-rider': {
    scout: 9,
    'light-cavalry': 9,
    hussar: 9,
    knight: 9,
    cavalier: 9,
    paladin: 9,
  },
  'heavy-camel': {
    scout: 18,
    'light-cavalry': 18,
    hussar: 18,
    knight: 18,
    cavalier: 18,
    paladin: 18,
  },
  'imperial-camel': {
    scout: 18,
    'light-cavalry': 18,
    hussar: 18,
    knight: 18,
    cavalier: 18,
    paladin: 18,
  },
  // Skirmisher bonus vs archers
  skirmisher: {
    archer: 3,
    crossbowman: 3,
    arbalester: 3,
    'cavalry-archer': 3,
    'heavy-cavalry-archer': 3,
    slinger: 3,
  },
  'elite-skirmisher': {
    archer: 4,
    crossbowman: 4,
    arbalester: 4,
    'cavalry-archer': 4,
    'heavy-cavalry-archer': 4,
    slinger: 4,
  },
  'imperial-skirmisher': {
    archer: 5,
    crossbowman: 5,
    arbalester: 5,
    'cavalry-archer': 5,
    'heavy-cavalry-archer': 5,
    slinger: 5,
  },
  // Siege bonus vs buildings (not relevant here, but including for completeness)
  // Mangonel/Onager bonus vs archers (area damage makes them effective)
  mangonel: {
    archer: 12,
    crossbowman: 12,
    arbalester: 12,
    skirmisher: 12,
    'elite-skirmisher': 12,
  },
  onager: {
    archer: 12,
    crossbowman: 12,
    arbalester: 12,
    skirmisher: 12,
    'elite-skirmisher': 12,
  },
  'siege-onager': {
    archer: 12,
    crossbowman: 12,
    arbalester: 12,
    skirmisher: 12,
    'elite-skirmisher': 12,
  },
};

/**
 * Get bonus damage for attacker vs defender
 */
const getBonusDamage = (attackerUnitId: string, defenderUnitId: string): number => {
  const attackerBonuses = BONUS_DAMAGE[attackerUnitId];
  if (attackerBonuses && attackerBonuses[defenderUnitId]) {
    return attackerBonuses[defenderUnitId];
  }
  return 0;
};

/**
 * Determine if a unit is ranged or melee based on range stat
 */
const getAttackType = (unit: UnitStats): string => (unit.range > 0 ? ATTACK_TYPE.ranged : ATTACK_TYPE.melee);

/**
 * Calculate total HP for an army
 */
const calculateTotalHP = (armyUnits: ArmyUnitData[]): number =>
  armyUnits.reduce((total, { quantity, stats }) => total + stats.hp * quantity, 0);

/**
 * Calculate total DPS for an army against a specific defender
 * Now includes bonus damage calculations for unit counters
 */
const calculateTotalDPS = (attackingArmy: ArmyUnitData[], defendingArmy: ArmyUnitData[]): number => {
  // Calculate weighted average armor and track defender composition
  const totalDefenders = defendingArmy.reduce((sum, { quantity }) => sum + quantity, 0);

  if (totalDefenders === 0) {
    return 0;
  }

  const avgMeleeArmor =
    defendingArmy.reduce((sum, { quantity, stats }) => sum + stats.meleeArmor * quantity, 0) / totalDefenders;
  const avgPierceArmor =
    defendingArmy.reduce((sum, { quantity, stats }) => sum + stats.pierceArmor * quantity, 0) / totalDefenders;

  // Calculate DPS with bonus damage applied
  return attackingArmy.reduce((totalDPS, { unit, quantity, stats }) => {
    const attackType = getAttackType(stats);
    const armor = attackType === ATTACK_TYPE.ranged ? avgPierceArmor : avgMeleeArmor;
    const baseDamagePerHit = Math.max(1, stats.attack - armor);

    // Calculate average bonus damage against defending army
    let avgBonusDamage = 0;
    defendingArmy.forEach(({ unit: defenderUnit, quantity: defQuantity }) => {
      const bonusDmg = getBonusDamage(unit.id, defenderUnit.id);
      avgBonusDamage += (bonusDmg * defQuantity) / totalDefenders;
    });

    const totalDamagePerHit = baseDamagePerHit + avgBonusDamage;
    const reloadTime = RELOAD_TIMES[unit.category.toLowerCase()] || 2.0;
    const dps = (totalDamagePerHit / reloadTime) * quantity;
    return totalDPS + dps;
  }, 0);
};

/**
 * Calculate resource cost for an army
 */
const calculateArmyCost = (composition: Record<string, number>): ResourceCost => {
  const cost: ResourceCost = { food: 0, wood: 0, gold: 0, stone: 0, total: 0 };

  Object.entries(composition).forEach(([unitId, quantity]) => {
    const unit = getUnitById(unitId);
    if (unit && quantity > 0) {
      if (unit.cost.food) {
        cost.food += unit.cost.food * quantity;
      }
      if (unit.cost.wood) {
        cost.wood += unit.cost.wood * quantity;
      }
      if (unit.cost.gold) {
        cost.gold += unit.cost.gold * quantity;
      }
      if (unit.cost.stone) {
        cost.stone += unit.cost.stone * quantity;
      }
    }
  });

  cost.total = cost.food + cost.wood + cost.gold + cost.stone;
  return cost;
};

/**
 * Calculate population for an army
 */
const calculateArmyPopulation = (composition: Record<string, number>): number => {
  let population = 0;

  Object.entries(composition).forEach(([unitId, quantity]) => {
    const unit = getUnitById(unitId);
    if (unit && quantity > 0) {
      population += unit.population * quantity;
    }
  });

  return population;
};

/**
 * Prepare army data with calculated stats
 */
const prepareArmyData = (composition: Record<string, number>, civId: string, researchedTechs: string[] = []): ArmyUnitData[] => {
  const armyUnits: ArmyUnitData[] = [];

  Object.entries(composition).forEach(([unitId, quantity]) => {
    if (quantity > 0) {
      const unit = getUnitById(unitId);
      if (unit) {
        const unitStats = calculateUnitStats(unit, researchedTechs, civId) as CalculatedUnitStats | null;
        if (unitStats) {
          armyUnits.push({
            unit,
            quantity,
            stats: unitStats.modified,
            baseStats: unitStats.base,
          });
        }
      }
    }
  });

  return armyUnits;
};

/**
 * Main combat outcome calculator
 *
 * @param armyA - First army { composition, civId, researchedTechs }
 * @param armyB - Second army { composition, civId, researchedTechs }
 * @returns Combat outcome analysis
 */
export const calculateCombatOutcome = (armyA: ArmyInput, armyB: ArmyInput): CombatOutcome => {
  // Prepare army data with stats
  const unitsA = prepareArmyData(armyA.composition, armyA.civId, armyA.researchedTechs);
  const unitsB = prepareArmyData(armyB.composition, armyB.civId, armyB.researchedTechs);

  // If either army is empty, return early
  if (unitsA.length === 0 || unitsB.length === 0) {
    return {
      winner: unitsA.length === 0 ? 'B' : 'A',
      verdict: 'One army is empty',
      confidence: 'decisive',
      stats: {
        armyA: { totalHP: 0, totalDPS: 0, timeToKill: 0, cost: { food: 0, wood: 0, gold: 0, stone: 0, total: 0 }, population: 0, costEfficiency: 0, popEfficiency: 0, unitCount: 0 },
        armyB: { totalHP: 0, totalDPS: 0, timeToKill: 0, cost: { food: 0, wood: 0, gold: 0, stone: 0, total: 0 }, population: 0, costEfficiency: 0, popEfficiency: 0, unitCount: 0 },
      },
    };
  }

  // Calculate base statistics
  const totalHPA = calculateTotalHP(unitsA);
  const totalHPB = calculateTotalHP(unitsB);

  const dpsAvsB = calculateTotalDPS(unitsA, unitsB);
  const dpsBvsA = calculateTotalDPS(unitsB, unitsA);

  // Time to kill (in seconds)
  const timeToKillB = dpsBvsA > 0 ? totalHPA / dpsBvsA : Infinity;
  const timeToKillA = dpsAvsB > 0 ? totalHPB / dpsAvsB : Infinity;

  // Calculate costs
  const costA = calculateArmyCost(armyA.composition);
  const costB = calculateArmyCost(armyB.composition);

  // Calculate population
  const popA = calculateArmyPopulation(armyA.composition);
  const popB = calculateArmyPopulation(armyB.composition);

  // Determine winner based on who kills faster
  let winner: 'A' | 'B' | 'draw';
  let confidence: 'uncertain' | 'slight' | 'moderate' | 'decisive';
  let verdict: string;

  const timeDifference = Math.abs(timeToKillA - timeToKillB);
  const avgTime = (timeToKillA + timeToKillB) / 2;
  const percentDifference = (timeDifference / avgTime) * 100;

  if (percentDifference < 10) {
    winner = 'draw';
    confidence = 'uncertain';
    verdict = 'Very close fight - could go either way';
  } else if (percentDifference < 25) {
    winner = timeToKillA < timeToKillB ? 'A' : 'B';
    confidence = 'slight';
    verdict = `Army ${winner} has a slight advantage`;
  } else if (percentDifference < 50) {
    winner = timeToKillA < timeToKillB ? 'A' : 'B';
    confidence = 'moderate';
    verdict = `Army ${winner} should win with moderate confidence`;
  } else {
    winner = timeToKillA < timeToKillB ? 'A' : 'B';
    confidence = 'decisive';
    verdict = `Army ${winner} has a decisive advantage`;
  }

  // Calculate efficiency metrics
  const costEfficiencyA = costB.total > 0 ? (dpsAvsB / costA.total) * 1000 : 0;
  const costEfficiencyB = costA.total > 0 ? (dpsBvsA / costB.total) * 1000 : 0;

  const popEfficiencyA = popA > 0 ? dpsAvsB / popA : 0;
  const popEfficiencyB = popB > 0 ? dpsBvsA / popB : 0;

  return {
    winner,
    confidence,
    verdict,
    stats: {
      armyA: {
        totalHP: Math.round(totalHPA),
        totalDPS: Math.round(dpsAvsB * 10) / 10,
        timeToKill: Math.round(timeToKillA),
        cost: costA,
        population: popA,
        costEfficiency: Math.round(costEfficiencyA * 100) / 100,
        popEfficiency: Math.round(popEfficiencyA * 100) / 100,
        unitCount: unitsA.reduce((sum, { quantity }) => sum + quantity, 0),
      },
      armyB: {
        totalHP: Math.round(totalHPB),
        totalDPS: Math.round(dpsBvsA * 10) / 10,
        timeToKill: Math.round(timeToKillB),
        cost: costB,
        population: popB,
        costEfficiency: Math.round(costEfficiencyB * 100) / 100,
        popEfficiency: Math.round(popEfficiencyB * 100) / 100,
        unitCount: unitsB.reduce((sum, { quantity }) => sum + quantity, 0),
      },
    },
  };
};

/**
 * Get a quick analysis string
 */
export const getQuickAnalysis = (outcome: CombatOutcome): string => {
  const { winner, confidence, stats } = outcome;

  if (winner === 'draw') {
    return 'This is a very close matchup. The outcome will likely depend on micro and positioning.';
  }

  const winnerStats = winner === 'A' ? stats.armyA : stats.armyB;
  const loserStats = winner === 'A' ? stats.armyB : stats.armyA;

  let analysis = `Army ${winner} is predicted to win with ${confidence} confidence. `;

  if (winnerStats.costEfficiency > loserStats.costEfficiency) {
    analysis += `They have better cost efficiency (${winnerStats.costEfficiency} vs ${loserStats.costEfficiency}). `;
  }

  if (winnerStats.totalDPS > loserStats.totalDPS * 1.2) {
    analysis += 'Superior damage output. ';
  }

  if (winnerStats.totalHP > loserStats.totalHP * 1.2) {
    analysis += 'Greater staying power. ';
  }

  return analysis.trim();
};
