import React from 'react';
import { useArmy } from '../context/ArmyContext';
import { calculateCombinedTotals, calculatePercentage, getResourceColor } from '../utils/calculations';
import { fortifications } from '../data/fortifications';

export default function ResourceTracker() {
  const { state } = useArmy();
  const { composition, fortificationComposition, config } = state;

  const { totalCost, totalPopulation } = calculateCombinedTotals(
    composition,
    fortificationComposition,
    config.selectedCiv,
    config.selectedAge,
    fortifications
  );

  // Get total resources used
  const getTotalResourcesUsed = () => {
    return totalCost.food + totalCost.wood + totalCost.gold + totalCost.stone;
  };

  // Get resource percentage
  const getResourcePercentage = (resource) => {
    if (config.resourceLimitMode === 'total') {
      const totalUsed = getTotalResourcesUsed();
      return calculatePercentage(totalUsed, config.totalResourceLimit);
    } else {
      return calculatePercentage(totalCost[resource], config.resourceLimits[resource]);
    }
  };

  // Get total resource percentage (for total mode)
  const getTotalResourcePercentage = () => {
    return calculatePercentage(getTotalResourcesUsed(), config.totalResourceLimit);
  };

  const getPopulationPercentage = () => {
    return calculatePercentage(totalPopulation, config.populationCap);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Resource Tracker</h2>

      {/* Total Resource Mode Display */}
      {config.resourceLimitMode === 'total' && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">Total Resources</span>
            <span className={getTotalResourcesUsed() > config.totalResourceLimit ? 'text-red-600 font-bold' : ''}>
              {getTotalResourcesUsed().toLocaleString()} / {config.totalResourceLimit.toLocaleString()}
              ({getTotalResourcePercentage().toFixed(1)}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
            <div
              className={`h-full resource-bar ${getResourceColor(getTotalResourcePercentage())}`}
              style={{ width: `${Math.min(100, getTotalResourcePercentage())}%` }}
            />
          </div>

          {/* Breakdown of individual resources */}
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {['food', 'wood', 'gold', 'stone'].map(resource => (
              <div key={resource} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="capitalize font-medium">{resource}</span>
                <span>{totalCost[resource].toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Individual Resource Mode Display */}
      {config.resourceLimitMode === 'individual' && (
        <div className="space-y-3 mb-4">
          {['food', 'wood', 'gold', 'stone'].map(resource => (
            <div key={resource}>
              <div className="flex justify-between text-sm mb-1">
                <span className="capitalize font-medium">{resource}</span>
                <span className={totalCost[resource] > config.resourceLimits[resource] ? 'text-red-600 font-bold' : ''}>
                  {totalCost[resource].toLocaleString()} / {config.resourceLimits[resource].toLocaleString()}
                  ({getResourcePercentage(resource).toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full resource-bar ${getResourceColor(getResourcePercentage(resource))}`}
                  style={{ width: `${Math.min(100, getResourcePercentage(resource))}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Population */}
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium">Population</span>
          <span className={totalPopulation > config.populationCap ? 'text-red-600 font-bold' : ''}>
            {totalPopulation} / {config.populationCap}
            ({getPopulationPercentage().toFixed(1)}%)
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className={`h-full resource-bar ${getResourceColor(getPopulationPercentage())}`}
            style={{ width: `${Math.min(100, getPopulationPercentage())}%` }}
          />
        </div>
      </div>
    </div>
  );
}
