import React from 'react';
import { useArmy, ACTION_TYPES } from '../context/ArmyContext';
import { calculateUnitCost, hasDiscount } from '../utils/calculations';
import UnitIcon from './UnitIcon';

export default function UnitCard({ unit }) {
  const { state, dispatch } = useArmy();
  const { composition, config } = state;

  const adjustedCost = calculateUnitCost(unit, config.selectedCiv, config.selectedAge);
  const baseCost = unit.cost;
  const showDiscount = hasDiscount(unit, adjustedCost);

  const quantity = composition[unit.id] || 0;

  const addUnit = () => {
    dispatch({ type: ACTION_TYPES.ADD_UNIT, unitId: unit.id });
  };

  const removeUnit = () => {
    dispatch({ type: ACTION_TYPES.REMOVE_UNIT, unitId: unit.id });
  };

  const setQuantity = (value) => {
    dispatch({ type: ACTION_TYPES.SET_UNIT_QUANTITY, unitId: unit.id, quantity: value });
  };

  return (
    <div className="border rounded-lg p-3 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="font-semibold text-sm flex items-center gap-2">
            <UnitIcon unitId={unit.id} category={unit.category} size="lg" />
            <span>{unit.name}</span>
          </div>
          <div className="text-xs text-gray-500 capitalize">{unit.age} Age</div>
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
