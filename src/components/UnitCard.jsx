import React, { useState } from 'react';
import { useArmy, ACTION_TYPES } from '../context/ArmyContext';
import { calculateUnitCost, hasDiscount } from '../utils/calculations';
import { civilizations } from '../data/civilizations';
import { getUnitById } from '../data/units';
import UnitIcon from './UnitIcon';

export default function UnitCard({ unit }) {
  const { state, dispatch } = useArmy();
  const { composition, config } = state;
  const [showCounters, setShowCounters] = useState(false);

  const adjustedCost = calculateUnitCost(unit, config.selectedCiv, config.selectedAge);
  const baseCost = unit.cost;
  const showDiscount = hasDiscount(unit, adjustedCost);

  const quantity = composition[unit.id] || 0;

  // Get bonuses that apply to this unit
  const currentCiv = civilizations.find(civ => civ.id === config.selectedCiv);
  const applicableBonuses = currentCiv && currentCiv.id !== 'generic'
    ? currentCiv.bonuses.filter(bonus => {
        if (bonus.type !== 'cost') return false;
        return bonus.units === 'all' || bonus.units.includes(unit.id);
      })
    : [];

  const hasBonuses = applicableBonuses.length > 0;

  const addUnit = () => {
    dispatch({ type: ACTION_TYPES.ADD_UNIT, unitId: unit.id });
  };

  const removeUnit = () => {
    dispatch({ type: ACTION_TYPES.REMOVE_UNIT, unitId: unit.id });
  };

  const setQuantity = (value) => {
    dispatch({ type: ACTION_TYPES.SET_UNIT_QUANTITY, unitId: unit.id, quantity: value });
  };

  // Get unit names for counters and weaknesses
  const getUnitName = (unitId) => {
    const foundUnit = getUnitById(unitId);
    return foundUnit ? foundUnit.name : unitId;
  };

  const hasCounterInfo = (unit.counters && unit.counters.length > 0) || (unit.weakTo && unit.weakTo.length > 0);

  return (
    <div className={`border rounded-lg p-3 hover:shadow-md transition-all ${
      hasBonuses ? 'border-blue-300 bg-blue-50/30' : ''
    }`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="font-semibold text-sm flex items-center gap-2">
            <UnitIcon unitId={unit.id} category={unit.category} size="lg" />
            <span>{unit.name}</span>
            {hasBonuses && (
              <span
                className="text-xs px-1.5 py-0.5 bg-blue-500 text-white rounded-full font-bold cursor-help"
                title={`${currentCiv.name} bonuses:\n${applicableBonuses.map(b => b.description).join('\n')}`}
              >
                🏛️
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500 capitalize">{unit.age} Age</div>
          {hasBonuses && showDiscount && (
            <div className="text-xs text-blue-600 font-semibold mt-1">
              💰 {currentCiv.name} discount applied
            </div>
          )}
        </div>
        <span className="text-xs bg-gray-200 px-2 py-1 rounded">Pop: {unit.population}</span>
      </div>

      <div className="text-xs space-y-1 mb-3">
        {adjustedCost.food > 0 && (
          <div className="flex items-center justify-between">
            <span>🌾 Food:</span>
            <span className={showDiscount ? 'text-green-600 font-semibold' : ''}>
              {adjustedCost.food}
              {showDiscount && baseCost.food !== adjustedCost.food && (
                <span className="text-gray-400 line-through ml-1">{baseCost.food}</span>
              )}
            </span>
          </div>
        )}
        {adjustedCost.wood > 0 && (
          <div className="flex items-center justify-between">
            <span>🪵 Wood:</span>
            <span className={showDiscount ? 'text-green-600 font-semibold' : ''}>
              {adjustedCost.wood}
              {showDiscount && baseCost.wood !== adjustedCost.wood && (
                <span className="text-gray-400 line-through ml-1">{baseCost.wood}</span>
              )}
            </span>
          </div>
        )}
        {adjustedCost.gold > 0 && (
          <div className="flex items-center justify-between">
            <span>🪙 Gold:</span>
            <span className={showDiscount ? 'text-green-600 font-semibold' : ''}>
              {adjustedCost.gold}
              {showDiscount && baseCost.gold !== adjustedCost.gold && (
                <span className="text-gray-400 line-through ml-1">{baseCost.gold}</span>
              )}
            </span>
          </div>
        )}
      </div>

      {/* Counter Information */}
      {hasCounterInfo && (
        <div className="mb-3 border-t pt-2">
          <button
            onClick={() => setShowCounters(!showCounters)}
            className="text-xs text-gray-600 hover:text-gray-800 font-medium flex items-center gap-1 w-full"
          >
            <span>{showCounters ? '▼' : '►'}</span>
            <span>Counters & Weaknesses</span>
          </button>

          {showCounters && (
            <div className="mt-2 space-y-2">
              {unit.counters && unit.counters.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-green-700 mb-1">✅ Strong Against:</div>
                  <div className="flex flex-wrap gap-1">
                    {unit.counters.map(counterId => (
                      <span
                        key={counterId}
                        className="inline-block text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full border border-green-300"
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
                  <div className="text-xs font-semibold text-red-700 mb-1">⚠️ Weak To:</div>
                  <div className="flex flex-wrap gap-1">
                    {unit.weakTo.map(weakId => (
                      <span
                        key={weakId}
                        className="inline-block text-xs px-2 py-0.5 bg-red-100 text-red-800 rounded-full border border-red-300"
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
          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
        >
          -
        </button>
        <input
          type="number"
          min="0"
          className="flex-1 border rounded px-2 py-1 text-sm text-center"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button
          onClick={addUnit}
          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm"
        >
          +
        </button>
      </div>
    </div>
  );
}
