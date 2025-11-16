import React, { useMemo } from 'react';
import { useArmy } from '../context/ArmyContext';
import { calculateCombinedTotals, calculatePercentage, getResourceColor } from '../utils/calculations';
import { fortifications } from '../data/fortifications';
import { RESOURCES, RESOURCE_DISPLAY_NAMES } from '../constants';

export default function ResourceTracker() {
  const { state } = useArmy();
  const { composition, fortificationComposition, config } = state;

  // Memoize expensive calculations to prevent unnecessary recalculation
  const { totalCost, totalPopulation } = useMemo(() =>
    calculateCombinedTotals(
      composition,
      fortificationComposition,
      config.selectedCiv,
      config.selectedAge,
      fortifications
    ),
    [composition, fortificationComposition, config.selectedCiv, config.selectedAge]
  );

  // Memoize total resources used calculation
  const totalResourcesUsed = useMemo(() =>
    totalCost.food + totalCost.wood + totalCost.gold + totalCost.stone,
    [totalCost]
  );

  // Memoize percentage calculations
  const resourcePercentages = useMemo(() => {
    if (config.resourceLimitMode === 'total') {
      const totalPercentage = calculatePercentage(totalResourcesUsed, config.totalResourceLimit);
      return RESOURCES.reduce((acc, resource) => {
        acc[resource] = totalPercentage;
        return acc;
      }, { total: totalPercentage });
    } else {
      return RESOURCES.reduce((acc, resource) => {
        acc[resource] = calculatePercentage(totalCost[resource], config.resourceLimits[resource]);
        return acc;
      }, {});
    }
  }, [config.resourceLimitMode, config.totalResourceLimit, config.resourceLimits, totalCost, totalResourcesUsed]);

  const populationPercentage = useMemo(() =>
    calculatePercentage(totalPopulation, config.populationCap),
    [totalPopulation, config.populationCap]
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6" role="region" aria-label="Resource Tracker">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Resource Tracker</h2>

      {/* Total Resource Mode Display */}
      {config.resourceLimitMode === 'total' && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium" id="total-resources-label">Total Resources</span>
            <span
              className={totalResourcesUsed > config.totalResourceLimit ? 'text-red-600 font-bold' : ''}
              aria-live="polite"
            >
              {totalResourcesUsed.toLocaleString()} / {config.totalResourceLimit.toLocaleString()}
              ({resourcePercentages.total.toFixed(1)}%)
            </span>
          </div>
          <div
            className="w-full bg-gray-200 rounded-full h-6 overflow-hidden"
            role="progressbar"
            aria-labelledby="total-resources-label"
            aria-valuenow={Math.min(100, resourcePercentages.total)}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className={`h-full resource-bar ${getResourceColor(resourcePercentages.total)}`}
              style={{ width: `${Math.min(100, resourcePercentages.total)}%` }}
            />
          </div>

          {/* Breakdown of individual resources */}
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {RESOURCES.map(resource => (
              <div key={resource} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-medium">{RESOURCE_DISPLAY_NAMES[resource]}</span>
                <span>{totalCost[resource].toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Individual Resource Mode Display */}
      {config.resourceLimitMode === 'individual' && (
        <div className="space-y-3 mb-4">
          {RESOURCES.map(resource => (
            <div key={resource}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium" id={`${resource}-label`}>{RESOURCE_DISPLAY_NAMES[resource]}</span>
                <span
                  className={totalCost[resource] > config.resourceLimits[resource] ? 'text-red-600 font-bold' : ''}
                  aria-live="polite"
                >
                  {totalCost[resource].toLocaleString()} / {config.resourceLimits[resource].toLocaleString()}
                  ({resourcePercentages[resource].toFixed(1)}%)
                </span>
              </div>
              <div
                className="w-full bg-gray-200 rounded-full h-4 overflow-hidden"
                role="progressbar"
                aria-labelledby={`${resource}-label`}
                aria-valuenow={Math.min(100, resourcePercentages[resource])}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className={`h-full resource-bar ${getResourceColor(resourcePercentages[resource])}`}
                  style={{ width: `${Math.min(100, resourcePercentages[resource])}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Population */}
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium" id="population-label">Population</span>
          <span
            className={totalPopulation > config.populationCap ? 'text-red-600 font-bold' : ''}
            aria-live="polite"
          >
            {totalPopulation} / {config.populationCap}
            ({populationPercentage.toFixed(1)}%)
          </span>
        </div>
        <div
          className="w-full bg-gray-200 rounded-full h-4 overflow-hidden"
          role="progressbar"
          aria-labelledby="population-label"
          aria-valuenow={Math.min(100, populationPercentage)}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className={`h-full resource-bar ${getResourceColor(populationPercentage)}`}
            style={{ width: `${Math.min(100, populationPercentage)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
