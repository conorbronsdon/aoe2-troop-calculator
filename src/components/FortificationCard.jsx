import React from 'react';
import PropTypes from 'prop-types';
import { useArmy, ACTION_TYPES } from '../context/ArmyContext';
import { LIMITS } from '../constants';
import ResourceCost from './ResourceCost';

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
    const parsed = parseInt(value) || 0;
    const validated = Math.max(0, Math.min(parsed, LIMITS.MAX_UNIT_QUANTITY));
    dispatch({
      type: ACTION_TYPES.SET_FORTIFICATION_QUANTITY,
      fortificationId: fortification.id,
      quantity: validated
    });
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Walls': return { icon: '🧱', label: 'Wall' };
      case 'Towers': return { icon: '🗼', label: 'Tower' };
      case 'Castles': return { icon: '🏰', label: 'Castle' };
      default: return { icon: '🏗️', label: 'Building' };
    }
  };

  const { icon, label } = getCategoryIcon(fortification.category);

  return (
    <div className="border rounded-lg p-3 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="font-semibold text-sm flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label={label}>
              {icon}
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
            <span>
              <span role="img" aria-label="Hit Points">❤️</span>
              <span className="sr-only">HP:</span>
              <span aria-hidden="true"> HP:</span>
            </span>
            <span className="font-semibold">{fortification.hp}</span>
          </div>
        )}
        {fortification.attack !== undefined && fortification.attack > 0 && (
          <div className="flex items-center justify-between">
            <span>
              <span role="img" aria-label="Attack">⚔️</span>
              <span className="sr-only">Attack:</span>
              <span aria-hidden="true"> Attack:</span>
            </span>
            <span className="font-semibold">{fortification.attack}</span>
          </div>
        )}
        {fortification.range && (
          <div className="flex items-center justify-between">
            <span>
              <span role="img" aria-label="Range">🎯</span>
              <span className="sr-only">Range:</span>
              <span aria-hidden="true"> Range:</span>
            </span>
            <span className="font-semibold">{fortification.range}</span>
          </div>
        )}
      </div>

      {/* Cost */}
      <div className="mb-3">
        <ResourceCost cost={cost} />
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={removeFortification}
          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
          aria-label={`Remove one ${fortification.name}`}
        >
          -
        </button>
        <input
          type="number"
          min="0"
          max={LIMITS.MAX_UNIT_QUANTITY}
          className="flex-1 border rounded px-2 py-1 text-sm text-center"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          aria-label={`Quantity of ${fortification.name}`}
        />
        <button
          onClick={addFortification}
          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm"
          aria-label={`Add one ${fortification.name}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

FortificationCard.propTypes = {
  fortification: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    cost: PropTypes.shape({
      food: PropTypes.number.isRequired,
      wood: PropTypes.number.isRequired,
      gold: PropTypes.number.isRequired,
      stone: PropTypes.number.isRequired
    }).isRequired,
    hp: PropTypes.number,
    attack: PropTypes.number,
    range: PropTypes.number,
    description: PropTypes.string
  }).isRequired
};
