import React from 'react';
import { useArmy, ACTION_TYPES } from '../context/ArmyContext';

/**
 * FortificationCard Component
 * Displays a single fortification with its cost, stats, and quantity controls
 */
export default function FortificationCard({ fortification }) {
  const { state, dispatch } = useArmy();
  const { fortificationComposition } = state;

  const quantity = fortificationComposition[fortification.id] || 0;
  const cost = fortification.cost;

  const addFortification = () => {
    dispatch({ type: ACTION_TYPES.ADD_FORTIFICATION, fortificationId: fortification.id });
  };

  const removeFortification = () => {
    dispatch({ type: ACTION_TYPES.REMOVE_FORTIFICATION, fortificationId: fortification.id });
  };

  const setQuantity = (value) => {
    dispatch({
      type: ACTION_TYPES.SET_FORTIFICATION_QUANTITY,
      fortificationId: fortification.id,
      quantity: value
    });
  };

  return (
    <div className="border rounded-lg p-3 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="font-semibold text-sm flex items-center gap-2">
            <span className="text-2xl">
              {fortification.category === 'Walls' && '🧱'}
              {fortification.category === 'Towers' && '🗼'}
              {fortification.category === 'Castles' && '🏰'}
            </span>
            <span>{fortification.name}</span>
          </div>
          <div className="text-xs text-gray-500 capitalize">{fortification.age} Age</div>
          {fortification.description && (
            <div className="text-xs text-gray-600 mt-1 italic">
              {fortification.description}
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="text-xs space-y-1 mb-2 bg-gray-50 p-2 rounded">
        {fortification.hp && (
          <div className="flex items-center justify-between">
            <span>❤️ HP:</span>
            <span className="font-semibold">{fortification.hp}</span>
          </div>
        )}
        {fortification.attack !== undefined && fortification.attack > 0 && (
          <div className="flex items-center justify-between">
            <span>⚔️ Attack:</span>
            <span className="font-semibold">{fortification.attack}</span>
          </div>
        )}
        {fortification.range && (
          <div className="flex items-center justify-between">
            <span>🎯 Range:</span>
            <span className="font-semibold">{fortification.range}</span>
          </div>
        )}
      </div>

      {/* Cost */}
      <div className="text-xs space-y-1 mb-3">
        {cost.food > 0 && (
          <div className="flex items-center justify-between">
            <span>🌾 Food:</span>
            <span>{cost.food}</span>
          </div>
        )}
        {cost.wood > 0 && (
          <div className="flex items-center justify-between">
            <span>🪵 Wood:</span>
            <span>{cost.wood}</span>
          </div>
        )}
        {cost.gold > 0 && (
          <div className="flex items-center justify-between">
            <span>🪙 Gold:</span>
            <span>{cost.gold}</span>
          </div>
        )}
        {cost.stone > 0 && (
          <div className="flex items-center justify-between">
            <span>🪨 Stone:</span>
            <span>{cost.stone}</span>
          </div>
        )}
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={removeFortification}
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
          onClick={addFortification}
          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm"
        >
          +
        </button>
      </div>
    </div>
  );
}
