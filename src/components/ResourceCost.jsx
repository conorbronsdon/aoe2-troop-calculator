import PropTypes from 'prop-types';
import ResourceIcon from './ResourceIcon';

/**
 * ResourceCost Component
 * Displays resource costs with optional discount indicators
 * Shared component to eliminate duplication between UnitCard and FortificationCard
 */
export default function ResourceCost({ cost, baseCost = null, showDiscount = false }) {
  const resources = [
    { key: 'food', label: 'Food' },
    { key: 'wood', label: 'Wood' },
    { key: 'gold', label: 'Gold' },
    { key: 'stone', label: 'Stone' },
  ];

  return (
    <div className="text-xs space-y-1 text-gray-900 dark:text-gray-100">
      {resources.map(({ key, label }) => {
        if (cost[key] <= 0) {
          return null;
        }

        const hasDiscountForResource = showDiscount && baseCost && baseCost[key] !== cost[key];

        return (
          <div key={key} className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <ResourceIcon resource={key} size="xs" />
              <span className="sr-only">{label}:</span>
              <span aria-hidden="true">{label}:</span>
            </span>
            <span className={hasDiscountForResource ? 'text-green-600 dark:text-green-400 font-semibold' : ''}>
              {cost[key]}
              {hasDiscountForResource && (
                <span
                  className="text-gray-400 dark:text-gray-500 line-through ml-1"
                  aria-label={`Original cost ${baseCost[key]}`}
                >
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
    stone: PropTypes.number.isRequired,
  }).isRequired,
  baseCost: PropTypes.shape({
    food: PropTypes.number,
    wood: PropTypes.number,
    gold: PropTypes.number,
    stone: PropTypes.number,
  }),
  showDiscount: PropTypes.bool,
};
