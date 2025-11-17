import React, { useMemo, useState } from 'react';
import { useArmy } from '../context/ArmyContext';
import { getUnitById } from '../data/units';
import { Unit } from '../types';

interface WeaknessInfo {
  unitType: string;
  count: number;
  percentage: number;
}

interface CounterInfo {
  unitType: string;
  count: number;
  percentage: number;
}

interface Suggestion {
  type: 'warning' | 'info';
  message: string;
}

interface ResourceBreakdown {
  food: number;
  wood: number;
  gold: number;
  stone: number;
  total: number;
}

interface CompositionInfo {
  melee: number;
  ranged: number;
  siege: number;
  support: number;
  meleeRatio: number;
  rangedRatio: number;
  siegeRatio: number;
}

interface AnalysisResult {
  totalUnits: number;
  categoryBreakdown: Record<string, number>;
  topWeaknesses: WeaknessInfo[];
  topCounters: CounterInfo[];
  resourceBreakdown: ResourceBreakdown;
  goldRatio: number;
  trashUnits: number;
  goldUnits: number;
  composition: CompositionInfo;
  suggestions: Suggestion[];
  avgCostPerUnit: number;
  efficiencyRating: string;
}

/**
 * Analyzes army composition for vulnerabilities, balance, and suggestions
 */
export default function ArmyCompositionAnalysis(): React.ReactElement {
  const { state } = useArmy();
  const { composition } = state;
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const analysis = useMemo((): AnalysisResult | null => {
    const unitEntries = Object.entries(composition);
    if (unitEntries.length === 0) {
      return null;
    }

    // Gather all units with their data
    const armyUnits = unitEntries
      .map(([unitId, quantity]) => ({
        unit: getUnitById(unitId) as Unit | undefined,
        quantity,
      }))
      .filter((entry): entry is { unit: Unit; quantity: number } => entry.unit !== undefined);

    if (armyUnits.length === 0) {
      return null;
    }

    // Calculate total units
    const totalUnits = armyUnits.reduce((sum, { quantity }) => sum + quantity, 0);

    // Category breakdown
    const categoryBreakdown: Record<string, number> = {};
    armyUnits.forEach(({ unit, quantity }) => {
      const category = unit.category || 'Other';
      categoryBreakdown[category] = (categoryBreakdown[category] || 0) + quantity;
    });

    // Calculate weaknesses (what enemy units counter our army)
    const weaknessCount: Record<string, number> = {};
    armyUnits.forEach(({ unit, quantity }) => {
      if (unit.weakTo && Array.isArray(unit.weakTo)) {
        unit.weakTo.forEach((weakness) => {
          weaknessCount[weakness] = (weaknessCount[weakness] || 0) + quantity;
        });
      }
    });

    // Sort weaknesses by count
    const topWeaknesses: WeaknessInfo[] = Object.entries(weaknessCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([unitType, count]) => ({
        unitType,
        count,
        percentage: Math.round((count / totalUnits) * 100),
      }));

    // Calculate what our army counters
    const counterCount: Record<string, number> = {};
    armyUnits.forEach(({ unit, quantity }) => {
      if (unit.counters && Array.isArray(unit.counters)) {
        unit.counters.forEach((counter) => {
          counterCount[counter] = (counterCount[counter] || 0) + quantity;
        });
      }
    });

    const topCounters: CounterInfo[] = Object.entries(counterCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([unitType, count]) => ({
        unitType,
        count,
        percentage: Math.round((count / totalUnits) * 100),
      }));

    // Calculate resource composition
    let totalFood = 0;
    let totalWood = 0;
    let totalGold = 0;
    let totalStone = 0;
    let goldUnits = 0;
    let trashUnits = 0;

    armyUnits.forEach(({ unit, quantity }) => {
      const cost = unit.cost || { food: 0, wood: 0, gold: 0, stone: 0 };
      totalFood += (cost.food || 0) * quantity;
      totalWood += (cost.wood || 0) * quantity;
      totalGold += (cost.gold || 0) * quantity;
      totalStone += (cost.stone || 0) * quantity;

      if ((cost.gold || 0) > 0) {
        goldUnits += quantity;
      } else {
        trashUnits += quantity;
      }
    });

    const totalCost = totalFood + totalWood + totalGold + totalStone;
    const goldRatio = totalUnits > 0 ? Math.round((goldUnits / totalUnits) * 100) : 0;

    // Calculate melee vs ranged balance
    let meleeUnits = 0;
    let rangedUnits = 0;
    let siegeUnits = 0;
    let supportUnits = 0;

    armyUnits.forEach(({ unit, quantity }) => {
      const category = unit.category || 'Other';
      if (category === 'Infantry' || category === 'Cavalry') {
        // Check if unit has range (some infantry/cavalry are ranged)
        const unitWithRange = unit as Unit & { range?: number };
        if (unitWithRange.range && unitWithRange.range > 1) {
          rangedUnits += quantity;
        } else {
          meleeUnits += quantity;
        }
      } else if (category === 'Archer') {
        rangedUnits += quantity;
      } else if (category === 'Siege') {
        siegeUnits += quantity;
      } else if (category === 'Monk' || category === 'Naval') {
        supportUnits += quantity;
      } else {
        // Unique units - check range
        const unitWithRange = unit as Unit & { range?: number };
        if (unitWithRange.range && unitWithRange.range > 1) {
          rangedUnits += quantity;
        } else {
          meleeUnits += quantity;
        }
      }
    });

    const meleeRatio = totalUnits > 0 ? Math.round((meleeUnits / totalUnits) * 100) : 0;
    const rangedRatio = totalUnits > 0 ? Math.round((rangedUnits / totalUnits) * 100) : 0;
    const siegeRatio = totalUnits > 0 ? Math.round((siegeUnits / totalUnits) * 100) : 0;

    // Generate suggestions
    const suggestions: Suggestion[] = [];

    // Check for anti-cavalry
    const hasAntiCavalry = topCounters.some(
      (c) => c.unitType.toLowerCase().includes('cavalry') || c.unitType.toLowerCase().includes('knight')
    );
    if (!hasAntiCavalry && totalUnits >= 5) {
      suggestions.push({
        type: 'warning',
        message: 'Consider adding Spearmen or Camels to counter enemy cavalry',
      });
    }

    // Check for anti-archer
    const hasAntiArcher = topCounters.some(
      (c) => c.unitType.toLowerCase().includes('archer') || c.unitType.toLowerCase().includes('crossbow')
    );
    if (!hasAntiArcher && totalUnits >= 5) {
      suggestions.push({
        type: 'warning',
        message: 'Consider adding Skirmishers or Siege to counter enemy archers',
      });
    }

    // Check for siege
    if (siegeUnits === 0 && totalUnits >= 10) {
      suggestions.push({
        type: 'info',
        message: 'No siege weapons - you may struggle against fortifications',
      });
    }

    // Check gold heavy army
    if (goldRatio > 80 && totalUnits >= 10) {
      suggestions.push({
        type: 'warning',
        message: 'Army is very gold-heavy (>80%). Consider adding trash units for sustainability',
      });
    }

    // Check for imbalance
    if (meleeRatio > 85 && totalUnits >= 10) {
      suggestions.push({
        type: 'info',
        message: 'Army is melee-heavy. Consider adding ranged support',
      });
    } else if (rangedRatio > 85 && totalUnits >= 10) {
      suggestions.push({
        type: 'info',
        message: 'Army is ranged-heavy. May struggle in close combat',
      });
    }

    // Cost efficiency
    const avgCostPerUnit = totalUnits > 0 ? Math.round(totalCost / totalUnits) : 0;
    let efficiencyRating = 'Balanced';
    if (avgCostPerUnit < 60) efficiencyRating = 'Very Cheap';
    else if (avgCostPerUnit < 80) efficiencyRating = 'Economical';
    else if (avgCostPerUnit > 150) efficiencyRating = 'Expensive';
    else if (avgCostPerUnit > 200) efficiencyRating = 'Very Expensive';

    return {
      totalUnits,
      categoryBreakdown,
      topWeaknesses,
      topCounters,
      resourceBreakdown: {
        food: totalFood,
        wood: totalWood,
        gold: totalGold,
        stone: totalStone,
        total: totalCost,
      },
      goldRatio,
      trashUnits,
      goldUnits,
      composition: {
        melee: meleeUnits,
        ranged: rangedUnits,
        siege: siegeUnits,
        support: supportUnits,
        meleeRatio,
        rangedRatio,
        siegeRatio,
      },
      suggestions,
      avgCostPerUnit,
      efficiencyRating,
    };
  }, [composition]);

  if (!analysis) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          Army Analysis
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Add units to your army to see composition analysis and suggestions.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 hover:from-purple-100 hover:to-indigo-100 dark:hover:from-purple-900/30 dark:hover:to-indigo-900/30 transition-colors"
        aria-expanded={isExpanded}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <span role="img" aria-label="Analysis">📊</span>
          Army Analysis
        </h3>
        <span className="text-gray-500 dark:text-gray-400">
          {isExpanded ? '▼' : '▶'}
        </span>
      </button>

      {isExpanded && (
        <div className="p-4 space-y-4">
          {/* Vulnerabilities */}
          {analysis.topWeaknesses.length > 0 && (
            <div>
              <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2 flex items-center gap-1">
                <span role="img" aria-label="Warning">⚠️</span> Vulnerabilities
              </h4>
              <div className="bg-red-50 dark:bg-red-900/20 rounded p-3 space-y-1">
                {analysis.topWeaknesses.map((weakness) => (
                  <div key={weakness.unitType} className="flex justify-between text-sm">
                    <span className="text-red-800 dark:text-red-300">
                      Weak to {weakness.unitType}
                    </span>
                    <span className="text-red-600 dark:text-red-400 font-medium">
                      {weakness.percentage}% of army
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strengths */}
          {analysis.topCounters.length > 0 && (
            <div>
              <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center gap-1">
                <span role="img" aria-label="Strength">💪</span> Strengths
              </h4>
              <div className="bg-green-50 dark:bg-green-900/20 rounded p-3 space-y-1">
                {analysis.topCounters.map((counter) => (
                  <div key={counter.unitType} className="flex justify-between text-sm">
                    <span className="text-green-800 dark:text-green-300">
                      Counters {counter.unitType}
                    </span>
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      {counter.percentage}% effective
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Composition Balance */}
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
              <span role="img" aria-label="Balance">⚖️</span> Composition Balance
            </h4>
            <div className="bg-gray-50 dark:bg-gray-700 rounded p-3 space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Melee Units</span>
                  <span className="font-medium">{analysis.composition.melee} ({analysis.composition.meleeRatio}%)</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all"
                    style={{ width: `${analysis.composition.meleeRatio}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Ranged Units</span>
                  <span className="font-medium">{analysis.composition.ranged} ({analysis.composition.rangedRatio}%)</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${analysis.composition.rangedRatio}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Siege Units</span>
                  <span className="font-medium">{analysis.composition.siege} ({analysis.composition.siegeRatio}%)</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${analysis.composition.siegeRatio}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Economy */}
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
              <span role="img" aria-label="Economy">💰</span> Economy
            </h4>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded p-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-yellow-800 dark:text-yellow-300">Gold Units</span>
                <span className="font-medium">{analysis.goldUnits} ({analysis.goldRatio}%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-800 dark:text-yellow-300">Trash Units</span>
                <span className="font-medium">{analysis.trashUnits} ({100 - analysis.goldRatio}%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-800 dark:text-yellow-300">Avg Cost/Unit</span>
                <span className="font-medium">{analysis.avgCostPerUnit} resources</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-800 dark:text-yellow-300">Efficiency</span>
                <span className="font-medium">{analysis.efficiencyRating}</span>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          {analysis.suggestions.length > 0 && (
            <div>
              <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-1">
                <span role="img" aria-label="Suggestions">💡</span> Suggestions
              </h4>
              <div className="space-y-2">
                {analysis.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded text-sm ${
                      suggestion.type === 'warning'
                        ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
                        : 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'
                    }`}
                  >
                    {suggestion.message}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
