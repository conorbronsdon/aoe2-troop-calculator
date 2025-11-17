import React, { useState, useMemo } from 'react';
import { useArmy } from '../context/ArmyContext';
import { calculateCombatOutcome, getQuickAnalysis } from '../services/combat.service';
import { getTranslatedUnitName } from '../utils/translationHelpers';

interface CombatSimulatorProps {
  embedded?: boolean;
}

interface CommonUnit {
  id: string;
  category: string;
}

interface ResourceCost {
  food: number;
  wood: number;
  gold: number;
  stone: number;
  total: number;
}

interface ArmyStats {
  totalHP: number;
  totalDPS: number;
  timeToKill: number;
  unitCount: number;
  cost: ResourceCost;
  population: number;
  costEfficiency: number;
  popEfficiency: number;
}

interface CombatOutcomeResult {
  winner: 'A' | 'B' | 'draw';
  confidence: 'uncertain' | 'slight' | 'moderate' | 'decisive';
  verdict: string;
  stats: {
    armyA: ArmyStats;
    armyB: ArmyStats;
  };
}

const COMMON_UNITS: CommonUnit[] = [
  { id: 'knight', category: 'Cavalry' },
  { id: 'crossbowman', category: 'Archer' },
  { id: 'pikeman', category: 'Infantry' },
  { id: 'mangonel', category: 'Siege' },
  { id: 'archer', category: 'Archer' },
  { id: 'scout', category: 'Cavalry' },
  { id: 'skirmisher', category: 'Archer' },
  { id: 'halberdier', category: 'Infantry' },
];

export default function CombatSimulator({ embedded = false }: CombatSimulatorProps): React.ReactElement | null {
  const { state } = useArmy();
  const { composition, config, researchedTechs } = state;

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [enemyComposition, setEnemyComposition] = useState<Record<string, number>>({});
  const [enemyCiv] = useState<string>('generic');
  const [quickAddUnit, setQuickAddUnit] = useState<string>('');
  const [quickAddQuantity, setQuickAddQuantity] = useState<number>(10);

  // Check if user has any units selected
  const hasUserArmy = useMemo(() => Object.values(composition).some((qty) => qty > 0), [composition]);

  // Calculate combat outcome
  const combatOutcome = useMemo((): CombatOutcomeResult | null => {
    if (!hasUserArmy || Object.keys(enemyComposition).length === 0) {
      return null;
    }

    const armyA = {
      composition,
      civId: config.selectedCiv,
      researchedTechs,
    };

    const armyB = {
      composition: enemyComposition,
      civId: enemyCiv,
      researchedTechs: [] as string[], // Enemy uses no techs for simplicity
    };

    return calculateCombatOutcome(armyA, armyB) as CombatOutcomeResult;
  }, [composition, config.selectedCiv, researchedTechs, enemyComposition, enemyCiv, hasUserArmy]);

  const handleQuickAdd = (): void => {
    if (quickAddUnit && quickAddQuantity > 0) {
      setEnemyComposition((prev) => ({
        ...prev,
        [quickAddUnit]: (prev[quickAddUnit] || 0) + quickAddQuantity,
      }));
    }
  };

  const handleRemoveUnit = (unitId: string): void => {
    setEnemyComposition((prev) => {
      const newComp = { ...prev };
      delete newComp[unitId];
      return newComp;
    });
  };

  const handleClearEnemy = (): void => {
    setEnemyComposition({});
  };

  const getUnitName = (unitId: string): string => {
    return getTranslatedUnitName(unitId);
  };

  const getConfidenceColor = (confidence: string): string => {
    switch (confidence) {
      case 'decisive':
        return 'text-green-600 dark:text-green-400';
      case 'moderate':
        return 'text-blue-600 dark:text-blue-400';
      case 'slight':
        return 'text-yellow-600 dark:text-yellow-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getWinnerColor = (winner: string): string => {
    switch (winner) {
      case 'A':
        return 'bg-green-100 dark:bg-green-900/30 border-green-500';
      case 'B':
        return 'bg-red-100 dark:bg-red-900/30 border-red-500';
      default:
        return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-500';
    }
  };

  if (!hasUserArmy) {
    return null;
  }

  // Content to render (shared between embedded and standalone modes)
  const simulatorContent = (
    <div className="space-y-4">
      {/* Enemy Army Builder */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-3">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Enemy Army (Army B)</h4>
          {Object.keys(enemyComposition).length > 0 && (
            <button onClick={handleClearEnemy} className="text-xs text-red-600 dark:text-red-400 hover:underline">
              Clear
            </button>
          )}
        </div>

        {/* Quick Add */}
        <div className="flex gap-2 mb-2">
          <select
            value={quickAddUnit}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setQuickAddUnit(e.target.value)}
            className="flex-1 text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">Select unit...</option>
            {COMMON_UNITS.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {getTranslatedUnitName(unit.id)} ({unit.category})
              </option>
            ))}
          </select>
          <input
            type="number"
            value={quickAddQuantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuickAddQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            max="200"
            className="w-20 text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <button
            onClick={handleQuickAdd}
            disabled={!quickAddUnit}
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>

        {/* Enemy Units List */}
        {Object.keys(enemyComposition).length > 0 ? (
          <div className="space-y-1">
            {Object.entries(enemyComposition).map(([unitId, quantity]) => (
              <div
                key={unitId}
                className="flex items-center justify-between bg-white dark:bg-gray-600 rounded px-2 py-1 text-xs"
              >
                <span>
                  {quantity}x {getUnitName(unitId)}
                </span>
                <button
                  onClick={() => handleRemoveUnit(unitId)}
                  className="text-red-500 hover:text-red-700"
                  aria-label={`Remove ${getUnitName(unitId)}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500 dark:text-gray-400 italic">Add units to simulate combat</p>
        )}
      </div>

      {/* Combat Results */}
      {combatOutcome && (
        <div className={`rounded p-3 border-2 ${getWinnerColor(combatOutcome.winner)}`}>
          <div className="text-center mb-3">
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {combatOutcome.winner === 'draw'
                ? '🤝 Draw'
                : combatOutcome.winner === 'A'
                  ? '🏆 Your Army Wins!'
                  : '⚠️ Enemy Army Wins'}
            </div>
            <div className={`text-sm ${getConfidenceColor(combatOutcome.confidence)}`}>{combatOutcome.verdict}</div>
          </div>

          {/* Stats Comparison */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="font-semibold text-gray-700 dark:text-gray-300">Your Army</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-700 dark:text-gray-300">Stat</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-700 dark:text-gray-300">Enemy Army</div>
            </div>

            {/* Total HP */}
            <div className="text-center text-green-600 dark:text-green-400">
              {combatOutcome.stats.armyA.totalHP.toLocaleString()}
            </div>
            <div className="text-center text-gray-600 dark:text-gray-400">Total HP</div>
            <div className="text-center text-red-600 dark:text-red-400">
              {combatOutcome.stats.armyB.totalHP.toLocaleString()}
            </div>

            {/* DPS */}
            <div className="text-center text-green-600 dark:text-green-400">
              {combatOutcome.stats.armyA.totalDPS}
            </div>
            <div className="text-center text-gray-600 dark:text-gray-400">Total DPS</div>
            <div className="text-center text-red-600 dark:text-red-400">
              {combatOutcome.stats.armyB.totalDPS}
            </div>

            {/* Time to Kill */}
            <div className="text-center text-green-600 dark:text-green-400">
              {combatOutcome.stats.armyA.timeToKill}s
            </div>
            <div className="text-center text-gray-600 dark:text-gray-400">Time to Kill</div>
            <div className="text-center text-red-600 dark:text-red-400">
              {combatOutcome.stats.armyB.timeToKill}s
            </div>

            {/* Unit Count */}
            <div className="text-center text-green-600 dark:text-green-400">
              {combatOutcome.stats.armyA.unitCount}
            </div>
            <div className="text-center text-gray-600 dark:text-gray-400">Units</div>
            <div className="text-center text-red-600 dark:text-red-400">
              {combatOutcome.stats.armyB.unitCount}
            </div>

            {/* Cost */}
            <div className="text-center text-green-600 dark:text-green-400">
              {combatOutcome.stats.armyA.cost.total.toLocaleString()}
            </div>
            <div className="text-center text-gray-600 dark:text-gray-400">Total Cost</div>
            <div className="text-center text-red-600 dark:text-red-400">
              {combatOutcome.stats.armyB.cost.total.toLocaleString()}
            </div>
          </div>

          {/* Quick Analysis */}
          <div className="mt-3 p-2 bg-white/50 dark:bg-gray-800/50 rounded text-xs text-gray-700 dark:text-gray-300">
            <strong>Analysis:</strong> {getQuickAnalysis(combatOutcome)}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="text-xs text-gray-500 dark:text-gray-400 italic">
        Note: This simulation includes bonus damage for unit counters (e.g., pikemen vs cavalry). Actual combat outcomes also depend on micro, positioning, terrain, and other factors.
      </div>
    </div>
  );

  // Embedded mode: just return the content
  if (embedded) {
    return simulatorContent;
  }

  // Standalone mode: wrap in container with header
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <span role="img" aria-label="combat">
            ⚔️
          </span>
          Combat Simulator
          <span className="text-xs font-normal text-gray-500 dark:text-gray-400">(Beta)</span>
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          {isExpanded ? '▼ Collapse' : '► Expand'}
        </button>
      </div>

      {isExpanded && simulatorContent}
    </div>
  );
}
