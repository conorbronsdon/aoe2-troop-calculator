import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useArmy, ACTION_TYPES } from '../context/ArmyContext';
import { calculateUnitCost, hasDiscount } from '../utils/calculations';
import { civilizations } from '../data/civilizations';
import { getUnitById } from '../data/units';
import { LIMITS } from '../constants';
import { calculateUnitStats, formatStatValue } from '../utils/statCalculator';
import UnitIcon from './UnitIcon';
import ResourceCost from './ResourceCost';

export default function UnitCard({ unit }) {
  const { state, dispatch } = useArmy();
  const { composition, config, researchedTechs } = state;
  const [showCounters, setShowCounters] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const adjustedCost = calculateUnitCost(unit, config.selectedCiv, config.selectedAge);
  const baseCost = unit.cost;
  const showDiscount = hasDiscount(unit, adjustedCost);

  const quantity = composition[unit.id] || 0;

  // Get bonuses that apply to this unit
  const currentCiv = civilizations.find((civ) => civ.id === config.selectedCiv);
  const applicableBonuses =
    currentCiv && currentCiv.id !== 'generic'
      ? currentCiv.bonuses.filter((bonus) => {
          if (bonus.type !== 'cost') {
            return false;
          }
          return bonus.units === 'all' || bonus.units.includes(unit.id);
        })
      : [];

  const hasBonuses = applicableBonuses.length > 0;

  // Calculate modified stats based on researched technologies
  const unitStats = useMemo(
    () => calculateUnitStats(unit, researchedTechs || [], config.selectedCiv),
    [unit, researchedTechs, config.selectedCiv]
  );

  const hasStatsChanged = useMemo(() => {
    if (!unitStats) {
      return false;
    }
    const { base, modified } = unitStats;
    return Object.keys(base).some((key) => Math.abs(modified[key] - base[key]) > 0.001);
  }, [unitStats]);

  const addUnit = () => {
    dispatch({ type: ACTION_TYPES.ADD_UNIT, unitId: unit.id });
  };

  const removeUnit = () => {
    dispatch({ type: ACTION_TYPES.REMOVE_UNIT, unitId: unit.id });
  };

  const setQuantity = (value) => {
    const parsed = parseInt(value) || 0;
    const validated = Math.max(0, Math.min(parsed, LIMITS.MAX_UNIT_QUANTITY));
    dispatch({ type: ACTION_TYPES.SET_UNIT_QUANTITY, unitId: unit.id, quantity: validated });
  };

  // Get unit names for counters and weaknesses
  const getUnitName = (unitId) => {
    const foundUnit = getUnitById(unitId);
    return foundUnit ? foundUnit.name : unitId;
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
            <span>{unit.name}</span>
            {hasBonuses && (
              <span
                className="text-xs px-1.5 py-0.5 bg-blue-500 text-white rounded-full font-bold cursor-help"
                title={`${currentCiv.name} bonuses:\n${applicableBonuses.map((b) => b.description).join('\n')}`}
              >
                🏛️
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{unit.age} Age</div>
          {hasBonuses && showDiscount && (
            <div className="text-xs text-blue-600 font-semibold mt-1">
              <span role="img" aria-label="Discount">
                💰
              </span>{' '}
              {currentCiv.name} discount applied
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

      <div className="mb-3">
        <ResourceCost cost={adjustedCost} baseCost={baseCost} showDiscount={showDiscount} />
      </div>

      {/* Combat Stats Section */}
      {unitStats && (
        <div className="mb-3 border-t pt-2">
          <button
            onClick={() => setShowStats(!showStats)}
            className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium flex items-center gap-1 w-full"
          >
            <span>{showStats ? '▼' : '►'}</span>
            <span>Combat Stats</span>
            {hasStatsChanged && (
              <span className="ml-auto text-green-600 dark:text-green-400 text-xs font-semibold">
                Modified
              </span>
            )}
          </button>

          {showStats && (
            <div className="mt-2 space-y-1 bg-gray-50 dark:bg-gray-700/50 rounded p-2">
              {/* HP */}
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">
                  <span role="img" aria-label="health">
                    ❤️
                  </span>{' '}
                  HP:
                </span>
                <span
                  className={
                    hasStatsChanged && unitStats.modified.hp !== unitStats.base.hp
                      ? 'text-green-600 dark:text-green-400 font-semibold'
                      : ''
                  }
                >
                  {unitStats.base.hp !== unitStats.modified.hp ? (
                    <>
                      <span className="text-gray-400 line-through mr-1">{unitStats.base.hp}</span>
                      {formatStatValue('hp', unitStats.modified.hp)}
                    </>
                  ) : (
                    formatStatValue('hp', unitStats.modified.hp)
                  )}
                </span>
              </div>

              {/* Attack */}
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">
                  <span role="img" aria-label="attack">
                    ⚔️
                  </span>{' '}
                  Attack:
                </span>
                <span
                  className={
                    hasStatsChanged && unitStats.modified.attack !== unitStats.base.attack
                      ? 'text-green-600 dark:text-green-400 font-semibold'
                      : ''
                  }
                >
                  {unitStats.base.attack !== unitStats.modified.attack ? (
                    <>
                      <span className="text-gray-400 line-through mr-1">
                        {unitStats.base.attack}
                      </span>
                      {formatStatValue('attack', unitStats.modified.attack)}
                    </>
                  ) : (
                    formatStatValue('attack', unitStats.modified.attack)
                  )}
                </span>
              </div>

              {/* Armor */}
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">
                  <span role="img" aria-label="armor">
                    🛡️
                  </span>{' '}
                  Armor:
                </span>
                <span
                  className={
                    unitStats.modified.meleeArmor !== unitStats.base.meleeArmor ||
                    unitStats.modified.pierceArmor !== unitStats.base.pierceArmor
                      ? 'text-green-600 dark:text-green-400 font-semibold'
                      : ''
                  }
                >
                  {unitStats.base.meleeArmor !== unitStats.modified.meleeArmor ||
                  unitStats.base.pierceArmor !== unitStats.modified.pierceArmor ? (
                    <>
                      <span className="text-gray-400 line-through mr-1">
                        {unitStats.base.meleeArmor}/{unitStats.base.pierceArmor}
                      </span>
                      {formatStatValue('meleeArmor', unitStats.modified.meleeArmor)}/
                      {formatStatValue('pierceArmor', unitStats.modified.pierceArmor)}
                    </>
                  ) : (
                    `${formatStatValue('meleeArmor', unitStats.modified.meleeArmor)}/${formatStatValue('pierceArmor', unitStats.modified.pierceArmor)}`
                  )}
                </span>
              </div>

              {/* Range (only for ranged units) */}
              {unitStats.base.range > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">
                    <span role="img" aria-label="range">
                      🎯
                    </span>{' '}
                    Range:
                  </span>
                  <span
                    className={
                      unitStats.modified.range !== unitStats.base.range
                        ? 'text-green-600 dark:text-green-400 font-semibold'
                        : ''
                    }
                  >
                    {unitStats.base.range !== unitStats.modified.range ? (
                      <>
                        <span className="text-gray-400 line-through mr-1">
                          {unitStats.base.range}
                        </span>
                        {formatStatValue('range', unitStats.modified.range)}
                      </>
                    ) : (
                      formatStatValue('range', unitStats.modified.range)
                    )}
                  </span>
                </div>
              )}

              {/* Speed */}
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">
                  <span role="img" aria-label="speed">
                    🏃
                  </span>{' '}
                  Speed:
                </span>
                <span
                  className={
                    Math.abs(unitStats.modified.speed - unitStats.base.speed) > 0.001
                      ? 'text-green-600 dark:text-green-400 font-semibold'
                      : ''
                  }
                >
                  {Math.abs(unitStats.modified.speed - unitStats.base.speed) > 0.001 ? (
                    <>
                      <span className="text-gray-400 line-through mr-1">
                        {formatStatValue('speed', unitStats.base.speed)}
                      </span>
                      {formatStatValue('speed', unitStats.modified.speed)}
                    </>
                  ) : (
                    formatStatValue('speed', unitStats.modified.speed)
                  )}
                </span>
              </div>

              {/* Breakdown of bonuses */}
              {hasStatsChanged && (
                <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                  <div className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-1">
                    Bonuses Applied:
                  </div>
                  <div className="space-y-0.5">
                    {Object.entries(unitStats.breakdown).map(([stat, bonuses]) =>
                      bonuses.map((bonus) => (
                        <div
                          key={`${stat}-${bonus.source}`}
                          className="text-xs text-gray-600 dark:text-gray-400"
                        >
                          <span className="text-green-600 dark:text-green-400">{bonus.value}</span>{' '}
                          {stat === 'meleeArmor'
                            ? 'Melee Armor'
                            : stat === 'pierceArmor'
                              ? 'Pierce Armor'
                              : stat.charAt(0).toUpperCase() + stat.slice(1)}{' '}
                          from {bonus.source}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Counter Information */}
      {hasCounterInfo && (
        <div className="mb-3 border-t pt-2">
          <button
            onClick={() => setShowCounters(!showCounters)}
            className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium flex items-center gap-1 w-full"
          >
            <span>{showCounters ? '▼' : '►'}</span>
            <span>Counters & Weaknesses</span>
          </button>

          {showCounters && (
            <div className="mt-2 space-y-2">
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
                        title={`Effective against ${getUnitName(counterId)}`}
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
                        title={`Vulnerable to ${getUnitName(weakId)}`}
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

      <div className="flex items-center space-x-2">
        <button
          onClick={removeUnit}
          className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
          aria-label={`Remove one ${unit.name}`}
        >
          -
        </button>
        <input
          type="number"
          min="0"
          max={LIMITS.MAX_UNIT_QUANTITY}
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm text-center bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          aria-label={`Quantity of ${unit.name}`}
        />
        <button
          onClick={addUnit}
          className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-2 py-1 rounded text-sm"
          aria-label={`Add one ${unit.name}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

UnitCard.propTypes = {
  unit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    cost: PropTypes.shape({
      food: PropTypes.number.isRequired,
      wood: PropTypes.number.isRequired,
      gold: PropTypes.number.isRequired,
      stone: PropTypes.number.isRequired,
    }).isRequired,
    population: PropTypes.number.isRequired,
    counters: PropTypes.arrayOf(PropTypes.string),
    weakTo: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
