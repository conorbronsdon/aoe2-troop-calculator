import React from 'react';
import { useArmy, ACTION_TYPES } from '../context/ArmyContext';
import { getUnitById } from '../data/units';
import { calculateUnitCost } from '../utils/calculations';

export default function ArmyCompositionSummary() {
  const { state, dispatch } = useArmy();
  const { composition, config } = state;

  const resetComposition = () => {
    dispatch({ type: ACTION_TYPES.RESET_COMPOSITION });
  };

  const compositionEntries = Object.entries(composition).filter(([_, quantity]) => quantity > 0);

  if (compositionEntries.length === 0) {
    return null;
  }

  const totalUnits = Object.values(composition).reduce((sum, q) => sum + q, 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Army Composition</h2>
        <button
          onClick={resetComposition}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Reset All
        </button>
      </div>

      <div className="space-y-2">
        {compositionEntries.map(([unitId, quantity]) => {
          const unit = getUnitById(unitId);
          if (!unit) return null;

          const adjustedCost = calculateUnitCost(unit, config.selectedCiv, config.selectedAge);
          const totalUnitCost = {
            food: adjustedCost.food * quantity,
            wood: adjustedCost.wood * quantity,
            gold: adjustedCost.gold * quantity,
            stone: adjustedCost.stone * quantity
          };

          return (
            <div key={unitId} className="border rounded p-3 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-lg">{quantity}x</span>
                <span className="font-medium">{unit.name}</span>
              </div>
              <div className="text-sm text-gray-600">
                {totalUnitCost.food > 0 && <span className="mr-3">🌾 {totalUnitCost.food}</span>}
                {totalUnitCost.wood > 0 && <span className="mr-3">🪵 {totalUnitCost.wood}</span>}
                {totalUnitCost.gold > 0 && <span className="mr-3">🪙 {totalUnitCost.gold}</span>}
                <span className="ml-3 text-blue-600">Pop: {unit.population * quantity}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="text-sm text-gray-600">
          <strong>Total Units:</strong> {totalUnits}
        </div>
      </div>
    </div>
  );
}
