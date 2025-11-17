import ResourceIcon from './ResourceIcon';
import { ResourceCost as ResourceCostType, ResourceType } from '../types';

/**
 * ResourceCost Component
 * Displays resource costs with optional discount indicators
 * Shared component to eliminate duplication between UnitCard and FortificationCard
 */

interface ResourceCostProps {
  cost: ResourceCostType;
  baseCost?: ResourceCostType | null;
  showDiscount?: boolean;
}

interface ResourceInfo {
  key: ResourceType;
  label: string;
}

export default function ResourceCost({
  cost,
  baseCost = null,
  showDiscount = false,
}: ResourceCostProps): JSX.Element {
  const resources: ResourceInfo[] = [
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
              {hasDiscountForResource && baseCost && (
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
