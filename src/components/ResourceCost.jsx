import React from 'react';
import PropTypes from 'prop-types';

/**
 * ResourceCost Component
 * Displays resource costs with optional discount indicators
 * Shared component to eliminate duplication between UnitCard and FortificationCard
 */
export default function ResourceCost({ cost, baseCost, showDiscount }) {
  const resources = [
    { key: 'food', icon: '🌾', label: 'Food' },
    { key: 'wood', icon: '🪵', label: 'Wood' },
    { key: 'gold', icon: '🪙', label: 'Gold' },
    { key: 'stone', icon: '🪨', label: 'Stone' }
  ];

  return (
    <div className="text-xs space-y-1">
      {resources.map(({ key, icon, label }) => {
        if (cost[key] <= 0) return null;

        const hasDiscountForResource = showDiscount && baseCost && baseCost[key] !== cost[key];

        return (
          <div key={key} className="flex items-center justify-between">
            <span>
              <span role="img" aria-label={label}>{icon}</span>
              <span className="sr-only">{label}:</span>
              <span aria-hidden="true"> {label}:</span>
            </span>
            <span className={hasDiscountForResource ? 'text-green-600 font-semibold' : ''}>
              {cost[key]}
              {hasDiscountForResource && (
                <span className="text-gray-400 line-through ml-1" aria-label={`Original cost ${baseCost[key]}`}>
                  {baseCost[key]}
                </span>
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}

ResourceCost.propTypes = {
  cost: PropTypes.shape({
    food: PropTypes.number.isRequired,
    wood: PropTypes.number.isRequired,
    gold: PropTypes.number.isRequired,
    stone: PropTypes.number.isRequired
  }).isRequired,
  baseCost: PropTypes.shape({
    food: PropTypes.number,
    wood: PropTypes.number,
    gold: PropTypes.number,
    stone: PropTypes.number
  }),
  showDiscount: PropTypes.bool
};

ResourceCost.defaultProps = {
  baseCost: null,
  showDiscount: false
};
