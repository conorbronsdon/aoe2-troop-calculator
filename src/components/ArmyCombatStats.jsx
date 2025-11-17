import { useMemo, useState } from 'react';
import { useArmy } from '../context/ArmyContext';
import { getUnitById } from '../data/units';
import { calculateUnitStats } from '../utils/statCalculator';

export default function ArmyCombatStats() {
  const { state } = useArmy();
  const { composition, researchedTechs, config } = state;
  const [isExpanded, setIsExpanded] = useState(true);

  // Calculate aggregate combat stats for the entire army
  const armyStats = useMemo(() => {
    const unitEntries = Object.entries(composition).filter(([, quantity]) => quantity > 0);

    if (unitEntries.length === 0) {
      return null;
    }

    const stats = {
      totalUnits: 0,
      totalHP: { base: 0, modified: 0 },
      totalAttack: { base: 0, modified: 0 },
      avgMeleeArmor: { base: 0, modified: 0 },
      avgPierceArmor: { base: 0, modified: 0 },
      rangedUnits: 0,
      meleeUnits: 0,
      avgRange: 0,
      unitBreakdown: [],
      hasModifications: false,
    };

    let totalRangeSum = 0;
    let rangedCount = 0;
    let armorSumBase = { melee: 0, pierce: 0 };
    let armorSumMod = { melee: 0, pierce: 0 };

    unitEntries.forEach(([unitId, quantity]) => {
      const unit = getUnitById(unitId);
      if (!unit) {
        return;
      }

      const unitStats = calculateUnitStats(unit, researchedTechs || [], config.selectedCiv);
      if (!unitStats) {
        return;
      }

      const { base, modified, breakdown } = unitStats;

      stats.totalUnits += quantity;
      stats.totalHP.base += base.hp * quantity;
      stats.totalHP.modified += modified.hp * quantity;
      stats.totalAttack.base += base.attack * quantity;
      stats.totalAttack.modified += modified.attack * quantity;

      armorSumBase.melee += base.meleeArmor * quantity;
      armorSumBase.pierce += base.pierceArmor * quantity;
      armorSumMod.melee += modified.meleeArmor * quantity;
      armorSumMod.pierce += modified.pierceArmor * quantity;

      if (base.range > 0) {
        stats.rangedUnits += quantity;
        totalRangeSum += modified.range * quantity;
        rangedCount += quantity;
      } else {
        stats.meleeUnits += quantity;
      }

      // Check if this unit has modifications
      const hasChanges = Object.keys(base).some(
        (key) => Math.abs(modified[key] - base[key]) > 0.001
      );
      if (hasChanges) {
        stats.hasModifications = true;
      }

      // Store breakdown for tooltip
      stats.unitBreakdown.push({
        unitId,
        unitName: unit.name,
        quantity,
        baseStats: base,
        modifiedStats: modified,
        bonuses: breakdown,
        hasChanges,
      });
    });

    // Calculate averages
    if (stats.totalUnits > 0) {
      stats.avgMeleeArmor.base = armorSumBase.melee / stats.totalUnits;
      stats.avgMeleeArmor.modified = armorSumMod.melee / stats.totalUnits;
      stats.avgPierceArmor.base = armorSumBase.pierce / stats.totalUnits;
      stats.avgPierceArmor.modified = armorSumMod.pierce / stats.totalUnits;
    }

    if (rangedCount > 0) {
      stats.avgRange = totalRangeSum / rangedCount;
    }

    return stats;
  }, [composition, researchedTechs, config.selectedCiv]);

  if (!armyStats || armyStats.totalUnits === 0) {
    return null;
  }

  const hpChange = armyStats.totalHP.modified - armyStats.totalHP.base;
  const attackChange = armyStats.totalAttack.modified - armyStats.totalAttack.base;
  const meleeArmorChange = armyStats.avgMeleeArmor.modified - armyStats.avgMeleeArmor.base;
  const pierceArmorChange = armyStats.avgPierceArmor.modified - armyStats.avgPierceArmor.base;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <span role="img" aria-label="combat">
            ⚔️
          </span>
          Army Combat Power
          {armyStats.hasModifications && (
            <span className="text-xs text-green-600 dark:text-green-400 font-normal">
              (Modified by Techs)
            </span>
          )}
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          {isExpanded ? '▼ Hide' : '► Show'}
        </button>
      </div>

      {isExpanded && (
        <>
          {/* Main Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            {/* Total HP */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-2">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total HP</div>
              <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {Math.round(armyStats.totalHP.modified).toLocaleString()}
              </div>
              {hpChange > 0 && (
                <div className="text-xs text-green-600 dark:text-green-400 font-semibold">
                  +{Math.round(hpChange).toLocaleString()} from upgrades
                </div>
              )}
            </div>

            {/* Total Attack */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-2">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Attack</div>
              <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {Math.round(armyStats.totalAttack.modified)}
              </div>
              {attackChange > 0 && (
                <div className="text-xs text-green-600 dark:text-green-400 font-semibold">
                  +{attackChange} from upgrades
                </div>
              )}
            </div>

            {/* Average Armor */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-2">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Avg Armor</div>
              <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {armyStats.avgMeleeArmor.modified.toFixed(1)}/
                {armyStats.avgPierceArmor.modified.toFixed(1)}
              </div>
              {(meleeArmorChange > 0 || pierceArmorChange > 0) && (
                <div className="text-xs text-green-600 dark:text-green-400 font-semibold">
                  +{meleeArmorChange.toFixed(1)}/+{pierceArmorChange.toFixed(1)}
                </div>
              )}
            </div>

            {/* Composition */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-2">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Composition</div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                <span title="Melee units">🗡️ {armyStats.meleeUnits}</span>
                {armyStats.rangedUnits > 0 && (
                  <span className="ml-2" title="Ranged units">
                    🏹 {armyStats.rangedUnits}
                  </span>
                )}
              </div>
              {armyStats.rangedUnits > 0 && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Avg Range: {armyStats.avgRange.toFixed(1)}
                </div>
              )}
            </div>
          </div>

          {/* Unit Breakdown */}
          {armyStats.unitBreakdown.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
              <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Unit Breakdown
              </div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {armyStats.unitBreakdown.map(({ unitId, unitName, quantity, modifiedStats, hasChanges }) => (
                  <div
                    key={unitId}
                    className="flex items-center justify-between text-xs bg-gray-50 dark:bg-gray-700/30 rounded px-2 py-1"
                  >
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {quantity}x {unitName}
                      {hasChanges && (
                        <span className="ml-1 text-green-600 dark:text-green-400">✨</span>
                      )}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      HP: {Math.round(modifiedStats.hp * quantity)} | ATK:{' '}
                      {modifiedStats.attack * quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Upgrade Summary */}
          {armyStats.hasModifications && researchedTechs.length > 0 && (
            <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
              <div className="text-xs font-semibold text-green-700 dark:text-green-300 mb-1">
                Active Technologies: {researchedTechs.length}
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">
                Your army benefits from researched upgrades. Expand unit cards for detailed breakdowns.
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
