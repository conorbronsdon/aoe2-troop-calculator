import { useState, useMemo, ChangeEvent } from 'react';
import { useArmy, ACTION_TYPES } from '../context/ArmyContext';
import { calculateUnitCost, hasDiscount } from '../utils/calculations';
import { civilizations } from '../data/civilizations';
import { LIMITS } from '../constants';
import { calculateUnitStats, formatStatValue } from '../utils/statCalculator';
import UnitIcon from './UnitIcon';
import ResourceCost from './ResourceCost';
import { Unit, Civilization, CostBonus } from '../types';
import { getTranslatedUnitName, getTranslatedCivName } from '../utils/translationHelpers';

interface UnitCardProps {
  unit: Unit;
}

interface UnitStats {
  base: {
    hp: number;
    attack: number;
    meleeArmor: number;
    pierceArmor: number;
    speed: number;
    range: number;
  };
  modified: {
    hp: number;
    attack: number;
    meleeArmor: number;
    pierceArmor: number;
    speed: number;
    range: number;
  };
}

export default function UnitCard({ unit }: UnitCardProps): JSX.Element {
  const { state, dispatch } = useArmy();
  const { composition, config, researchedTechs } = state;
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);

  const adjustedCost = calculateUnitCost(unit, config.selectedCiv, config.selectedAge);
  const baseCost = unit.cost;
  const showDiscount = hasDiscount(unit, adjustedCost);

  const quantity = composition[unit.id] || 0;

  // Get bonuses that apply to this unit
  const currentCiv = civilizations.find((civ: Civilization) => civ.id === config.selectedCiv);
  const applicableBonuses: CostBonus[] =
    currentCiv && currentCiv.id !== 'generic'
      ? (currentCiv.bonuses.filter((bonus) => {
          if (bonus.type !== 'cost') {
            return false;
          }
          const costBonus = bonus as CostBonus;
          // Check if units array contains 'all' or includes the specific unit id
          return Array.isArray(costBonus.units) && (costBonus.units.includes('all') || costBonus.units.includes(unit.id));
        }) as CostBonus[])
      : [];

  const hasBonuses = applicableBonuses.length > 0;

  // Calculate modified stats based on researched technologies
  const unitStats = useMemo<UnitStats | null>(
    () => calculateUnitStats(unit, researchedTechs || [], config.selectedCiv),
    [unit, researchedTechs, config.selectedCiv]
  );

  const hasStatsChanged = useMemo<boolean>(() => {
    if (!unitStats) {
      return false;
    }
    const { base, modified } = unitStats;
    return Object.keys(base).some((key) => Math.abs(modified[key as keyof typeof modified] - base[key as keyof typeof base]) > 0.001);
  }, [unitStats]);

  const addUnit = (): void => {
    dispatch({ type: ACTION_TYPES.ADD_UNIT, unitId: unit.id });
  };

  const removeUnit = (): void => {
    dispatch({ type: ACTION_TYPES.REMOVE_UNIT, unitId: unit.id });
  };

  const setQuantity = (value: string): void => {
    const parsed = parseInt(value) || 0;
    const validated = Math.max(0, Math.min(parsed, LIMITS.MAX_UNIT_QUANTITY));
    dispatch({ type: ACTION_TYPES.SET_UNIT_QUANTITY, unitId: unit.id, quantity: validated });
  };

  // Get unit names for counters and weaknesses
  const getUnitName = (unitId: string): string => {
    return getTranslatedUnitName(unitId);
  };

  const hasCounterInfo =
    (unit.counters && unit.counters.length > 0) || (unit.weakTo && unit.weakTo.length > 0);

  return (
    <div
      className={`border rounded-lg p-3 hover:shadow-md transition-all bg-white dark:bg-gray-800 ${
        hasBonuses ? 'border-blue-300 dark:border-blue-600 bg-blue-50/30 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="font-semibold text-sm flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <UnitIcon unitId={unit.id} category={unit.category} size="lg" />
            <span>{getTranslatedUnitName(unit.id)}</span>
            {hasBonuses && (
              <span
                className="text-xs px-1.5 py-0.5 bg-blue-500 text-white rounded-full font-bold cursor-help"
                title={`${currentCiv ? getTranslatedCivName(currentCiv.id) : ''} bonuses:\n${applicableBonuses.map((b) => b.description).join('\n')}`}
              >
                🏛️
              </span>
            )}
          </div>
          {hasBonuses && showDiscount && (
            <div className="text-xs text-blue-600 font-semibold mt-1">
              <span role="img" aria-label="Discount">
                💰
              </span>{' '}
              {currentCiv ? getTranslatedCivName(currentCiv.id) : ''} discount applied
            </div>
          )}
        </div>
        <span
          className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded"
          aria-label={`Population cost: ${unit.population}`}
        >
          Pop: {unit.population}
        </span>
      </div>

      {/* Compact Stats Bar - Conditionally visible based on config */}
      {config.showUnitCardStats && unitStats && (
        <div className="flex items-center gap-2 mb-2 text-xs bg-gray-100 dark:bg-gray-700/70 rounded px-2 py-1.5">
          <span
            className={`flex items-center gap-0.5 ${
              unitStats.modified.hp !== unitStats.base.hp
                ? 'text-green-600 dark:text-green-400 font-semibold'
                : 'text-gray-600 dark:text-gray-400'
            }`}
            title={`HP: ${unitStats.base.hp}${unitStats.modified.hp !== unitStats.base.hp ? ` → ${unitStats.modified.hp}` : ''}`}
          >
            ❤️ {Math.round(unitStats.modified.hp)}
          </span>
          <span
            className={`flex items-center gap-0.5 ${
              unitStats.modified.attack !== unitStats.base.attack
                ? 'text-green-600 dark:text-green-400 font-semibold'
                : 'text-gray-600 dark:text-gray-400'
            }`}
            title={`Attack: ${unitStats.base.attack}${unitStats.modified.attack !== unitStats.base.attack ? ` → ${unitStats.modified.attack}` : ''}`}
          >
            ⚔️ {unitStats.modified.attack}
          </span>
          <span
            className={`flex items-center gap-0.5 ${
              unitStats.modified.meleeArmor !== unitStats.base.meleeArmor ||
              unitStats.modified.pierceArmor !== unitStats.base.pierceArmor
                ? 'text-green-600 dark:text-green-400 font-semibold'
                : 'text-gray-600 dark:text-gray-400'
            }`}
            title={`Armor (Melee/Pierce): ${unitStats.base.meleeArmor}/${unitStats.base.pierceArmor}${
              unitStats.modified.meleeArmor !== unitStats.base.meleeArmor ||
              unitStats.modified.pierceArmor !== unitStats.base.pierceArmor
                ? ` → ${unitStats.modified.meleeArmor}/${unitStats.modified.pierceArmor}`
                : ''
            }`}
          >
            🛡️ {unitStats.modified.meleeArmor}/{unitStats.modified.pierceArmor}
          </span>
          {unitStats.base.range > 0 && (
            <span
              className={`flex items-center gap-0.5 ${
                unitStats.modified.range !== unitStats.base.range
                  ? 'text-green-600 dark:text-green-400 font-semibold'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              title={`Range: ${unitStats.base.range}${unitStats.modified.range !== unitStats.base.range ? ` → ${unitStats.modified.range}` : ''}`}
            >
              🎯 {unitStats.modified.range}
            </span>
          )}
          {hasStatsChanged && (
            <span
              className="ml-auto text-green-600 dark:text-green-400 font-bold"
              title="Stats modified by technologies or civilization bonuses"
            >
              ✨
            </span>
          )}
        </div>
      )}

      <div className="mb-3">
        <ResourceCost cost={adjustedCost} baseCost={baseCost} showDiscount={showDiscount} />
      </div>

      {/* More Info Section - Consolidated Stats and Counters */}
      {(unitStats || hasCounterInfo) && (
        <div className="mb-3 border-t pt-2">
          <button
            onClick={() => setShowMoreInfo(!showMoreInfo)}
            className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium flex items-center gap-1 w-full"
          >
            <span>{showMoreInfo ? '▼' : '►'}</span>
            <span>More Info</span>
            {hasStatsChanged && (
              <span className="ml-auto text-green-600 dark:text-green-400 text-xs font-semibold">
                Modified
              </span>
            )}
          </button>

          {showMoreInfo && (
            <div className="mt-2 space-y-3">
              {/* Combat Stats */}
              {unitStats && (
                <div className="space-y-1 bg-gray-50 dark:bg-gray-700/50 rounded p-2">
                  <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Combat Stats</div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">❤️</span>
                      <span className={hasStatsChanged && unitStats.modified.hp !== unitStats.base.hp ? 'text-green-600 dark:text-green-400 font-semibold' : ''}>
                        {Math.round(unitStats.modified.hp)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">⚔️</span>
                      <span className={hasStatsChanged && unitStats.modified.attack !== unitStats.base.attack ? 'text-green-600 dark:text-green-400 font-semibold' : ''}>
                        {unitStats.modified.attack}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">🛡️</span>
                      <span className={unitStats.modified.meleeArmor !== unitStats.base.meleeArmor || unitStats.modified.pierceArmor !== unitStats.base.pierceArmor ? 'text-green-600 dark:text-green-400 font-semibold' : ''}>
                        {unitStats.modified.meleeArmor}/{unitStats.modified.pierceArmor}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">🏃</span>
                      <span className={Math.abs(unitStats.modified.speed - unitStats.base.speed) > 0.001 ? 'text-green-600 dark:text-green-400 font-semibold' : ''}>
                        {formatStatValue('speed', unitStats.modified.speed)}
                      </span>
                    </div>
                    {unitStats.base.range > 0 && (
                      <div className="flex justify-between col-span-2">
                        <span className="text-gray-500">🎯 Range</span>
                        <span className={unitStats.modified.range !== unitStats.base.range ? 'text-green-600 dark:text-green-400 font-semibold' : ''}>
                          {unitStats.modified.range}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Counter Information */}
              {hasCounterInfo && (
                <div className="space-y-2">
                  {unit.counters && unit.counters.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">
                        ✅ Strong Against:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {unit.counters.map((counterId) => (
                          <span
                            key={counterId}
                            className="inline-block text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full border border-green-300 dark:border-green-700"
                          >
                            {getUnitName(counterId)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {unit.weakTo && unit.weakTo.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-red-700 dark:text-red-400 mb-1">⚠️ Weak To:</div>
                      <div className="flex flex-wrap gap-1">
                        {unit.weakTo.map((weakId) => (
                          <span
                            key={weakId}
                            className="inline-block text-xs px-2 py-0.5 bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 rounded-full border border-red-300 dark:border-red-700"
                          >
                            {getUnitName(weakId)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex items-center space-x-2">
        <button
          onClick={removeUnit}
          className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
          aria-label={`Remove one ${getTranslatedUnitName(unit.id)}`}
        >
          -
        </button>
        <input
          type="number"
          min="0"
          max={LIMITS.MAX_UNIT_QUANTITY}
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm text-center bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={quantity}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuantity(e.target.value)}
          aria-label={`Quantity of ${getTranslatedUnitName(unit.id)}`}
        />
        <button
          onClick={addUnit}
          className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-2 py-1 rounded text-sm"
          aria-label={`Add one ${getTranslatedUnitName(unit.id)}`}
        >
          +
        </button>
      </div>
    </div>
  );
}
