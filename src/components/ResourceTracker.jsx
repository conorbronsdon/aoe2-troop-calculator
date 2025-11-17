import { useMemo, useState, useEffect } from 'react';
import { useArmy } from '../context/ArmyContext';
import {
  calculateCombinedTotals,
  calculatePercentage,
  getResourceColor,
} from '../utils/calculations';
import { fortifications } from '../data/fortifications';
import { calculateTechCost } from '../data/technologies';
import { RESOURCES, RESOURCE_DISPLAY_NAMES } from '../constants';
import ResourceIcon from './ResourceIcon';

const STORAGE_KEY = 'aoe2-resource-tracker-expanded';

const RESOURCE_GRADIENT_COLORS = {
  food: 'from-orange-400 to-red-500',
  wood: 'from-amber-500 to-amber-700',
  gold: 'from-yellow-400 to-yellow-600',
  stone: 'from-gray-400 to-gray-600',
};

// Status indicator helper
const getStatusIndicator = (percentage, isOverLimit) => {
  if (isOverLimit) {
    return { icon: '🚫', text: 'Over Limit', color: 'text-red-600 dark:text-red-400' };
  }
  if (percentage >= 95) {
    return { icon: '⚠️', text: 'Critical', color: 'text-red-500 dark:text-red-400' };
  }
  if (percentage >= 80) {
    return { icon: '📊', text: 'High', color: 'text-yellow-600 dark:text-yellow-400' };
  }
  if (percentage >= 50) {
    return { icon: '📈', text: 'Moderate', color: 'text-blue-600 dark:text-blue-400' };
  }
  return { icon: '✅', text: 'Good', color: 'text-green-600 dark:text-green-400' };
};

export default function ResourceTracker() {
  const { state } = useArmy();
  const { composition, fortificationComposition, config, researchedTechs } = state;

  // Collapsible state with localStorage persistence
  const [isExpanded, setIsExpanded] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // Persist expanded state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(isExpanded));
    } catch {
      // Ignore localStorage errors
    }
  }, [isExpanded]);

  // Memoize expensive calculations to prevent unnecessary recalculation
  const { totalCost, totalPopulation } = useMemo(
    () =>
      calculateCombinedTotals(
        composition,
        fortificationComposition,
        config.selectedCiv,
        config.selectedAge,
        fortifications,
        config.alliedCivs || []
      ),
    [composition, fortificationComposition, config.selectedCiv, config.selectedAge, config.alliedCivs]
  );

  // Calculate technology costs
  const techCost = useMemo(() => calculateTechCost(researchedTechs || []), [researchedTechs]);

  // Calculate combined costs (units + fortifications + technologies)
  const combinedCost = useMemo(
    () => ({
      food: totalCost.food + techCost.food,
      wood: totalCost.wood + techCost.wood,
      gold: totalCost.gold + techCost.gold,
      stone: totalCost.stone + techCost.stone,
    }),
    [totalCost, techCost]
  );

  // Memoize total resources used calculation (including tech costs)
  const totalResourcesUsed = useMemo(
    () => combinedCost.food + combinedCost.wood + combinedCost.gold + combinedCost.stone,
    [combinedCost]
  );

  // Check if any techs are researched
  const hasTechCosts = useMemo(
    () => techCost.food > 0 || techCost.wood > 0 || techCost.gold > 0 || techCost.stone > 0,
    [techCost]
  );

  // Memoize percentage calculations
  const resourcePercentages = useMemo(() => {
    if (config.resourceLimitMode === 'total') {
      const totalPercentage = calculatePercentage(totalResourcesUsed, config.totalResourceLimit);
      return RESOURCES.reduce(
        (acc, resource) => {
          acc[resource] = totalPercentage;
          return acc;
        },
        { total: totalPercentage }
      );
    } else {
      return RESOURCES.reduce((acc, resource) => {
        acc[resource] = calculatePercentage(
          combinedCost[resource],
          config.resourceLimits[resource]
        );
        return acc;
      }, {});
    }
  }, [
    config.resourceLimitMode,
    config.totalResourceLimit,
    config.resourceLimits,
    combinedCost,
    totalResourcesUsed,
  ]);

  const populationPercentage = useMemo(
    () => calculatePercentage(totalPopulation, config.populationCap),
    [totalPopulation, config.populationCap]
  );

  // Calculate status indicators for total resource mode
  const totalResourceStatus = useMemo(() => {
    const isOver = totalResourcesUsed > config.totalResourceLimit;
    return getStatusIndicator(resourcePercentages.total || 0, isOver);
  }, [totalResourcesUsed, config.totalResourceLimit, resourcePercentages.total]);

  // Calculate status indicators for population
  const populationStatus = useMemo(() => {
    const isOver = totalPopulation > config.populationCap;
    return getStatusIndicator(populationPercentage, isOver);
  }, [totalPopulation, config.populationCap, populationPercentage]);

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transition-colors duration-300"
      role="region"
      aria-label="Resource Tracker"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-1.5">
          <span role="img" aria-label="Resources">💎</span>
          Resources
        </h2>
        <div className="flex items-center gap-2">
          <span className={`text-xs ${totalResourceStatus.color}`}>{totalResourceStatus.icon} {totalResourceStatus.text}</span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            aria-expanded={isExpanded}
            aria-controls="resource-tracker-content"
          >
            {isExpanded ? '▼ Collapse' : '► Expand'}
          </button>
        </div>
      </div>

      {/* Collapsed Summary - Show quick stats when collapsed */}
      {!isExpanded && (
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 rounded p-2">
            <span className="text-gray-600 dark:text-gray-400">Total Cost:</span>
            <span className="font-bold text-gray-900 dark:text-white">{totalResourcesUsed.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center bg-purple-50 dark:bg-purple-900/30 rounded p-2">
            <span className="text-gray-600 dark:text-gray-400">Population:</span>
            <span className={`font-bold ${totalPopulation > config.populationCap ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
              {totalPopulation}/{config.populationCap}
            </span>
          </div>
        </div>
      )}

      {/* Expanded Content */}
      <div id="resource-tracker-content" className={isExpanded ? '' : 'hidden'}>
        {/* Total Resource Mode Display */}
        {config.resourceLimitMode === 'total' && (
        <div className="mb-3">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="font-medium text-gray-700 dark:text-gray-300" id="total-resources-label">
              Total
            </span>
            <div className="flex items-center gap-1">
              <span
                className={`font-bold ${
                  totalResourcesUsed > config.totalResourceLimit
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-900 dark:text-white'
                }`}
                aria-live="polite"
              >
                {totalResourcesUsed.toLocaleString()}
              </span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600 dark:text-gray-300">
                {config.totalResourceLimit.toLocaleString()}
              </span>
              <span className="text-xs font-medium bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded ml-1">
                {resourcePercentages.total.toFixed(0)}%
              </span>
            </div>
          </div>
          <div
            className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden"
            role="progressbar"
            aria-labelledby="total-resources-label"
            aria-valuenow={Math.min(100, resourcePercentages.total)}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className={`h-full bg-gradient-to-r ${
                totalResourcesUsed > config.totalResourceLimit
                  ? 'from-red-500 to-red-600'
                  : resourcePercentages.total >= 80
                    ? 'from-yellow-400 to-orange-500'
                    : 'from-green-400 to-emerald-500'
              } transition-all duration-300 rounded-full`}
              style={{ width: `${Math.min(100, resourcePercentages.total)}%` }}
            />
          </div>

          {/* Tech cost breakdown (compact) */}
          {hasTechCosts && (
            <div className="mt-2 p-2 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 rounded text-xs">
              <div className="font-medium text-indigo-700 dark:text-indigo-300 mb-1">
                ⚙️ Tech Costs:
              </div>
              <div className="grid grid-cols-2 gap-1">
                {techCost.food > 0 && (
                  <div className="flex justify-between">
                    <span>Food:</span>
                    <span className="text-orange-600 dark:text-orange-400">{techCost.food.toLocaleString()}</span>
                  </div>
                )}
                {techCost.wood > 0 && (
                  <div className="flex justify-between">
                    <span>Wood:</span>
                    <span className="text-amber-700 dark:text-amber-400">{techCost.wood.toLocaleString()}</span>
                  </div>
                )}
                {techCost.gold > 0 && (
                  <div className="flex justify-between">
                    <span>Gold:</span>
                    <span className="text-yellow-600 dark:text-yellow-400">{techCost.gold.toLocaleString()}</span>
                  </div>
                )}
                {techCost.stone > 0 && (
                  <div className="flex justify-between">
                    <span>Stone:</span>
                    <span className="text-gray-600 dark:text-gray-400">{techCost.stone.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Individual Resource Mode Display */}
      {config.resourceLimitMode === 'individual' && (
        <div className="space-y-2 mb-3">
          {RESOURCES.map((resource) => {
            const isOverLimit = combinedCost[resource] > config.resourceLimits[resource];

            return (
              <div key={resource}>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1" id={`${resource}-label`}>
                    <ResourceIcon resource={resource} size="sm" />
                    {RESOURCE_DISPLAY_NAMES[resource]}
                  </span>
                  <div className="flex items-center gap-1">
                    <span
                      className={`font-bold ${
                        isOverLimit ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'
                      }`}
                      aria-live="polite"
                    >
                      {combinedCost[resource].toLocaleString()}
                    </span>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {config.resourceLimits[resource].toLocaleString()}
                    </span>
                  </div>
                </div>
                <div
                  className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 overflow-hidden"
                  role="progressbar"
                  aria-labelledby={`${resource}-label`}
                  aria-valuenow={Math.min(100, resourcePercentages[resource])}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    className={`h-full bg-gradient-to-r ${
                      isOverLimit ? 'from-red-500 to-red-600' : RESOURCE_GRADIENT_COLORS[resource]
                    } transition-all duration-300 rounded-full`}
                    style={{ width: `${Math.min(100, resourcePercentages[resource])}%` }}
                  />
                </div>
              </div>
            );
          })}

          {/* Tech cost breakdown for individual mode */}
          {hasTechCosts && (
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 rounded text-xs">
              <div className="font-medium text-indigo-700 dark:text-indigo-300 mb-1">⚙️ Tech Costs:</div>
              <div className="grid grid-cols-2 gap-1">
                {RESOURCES.map(
                  (resource) =>
                    techCost[resource] > 0 && (
                      <div key={resource} className="flex justify-between">
                        <span className="flex items-center gap-1">
                          <ResourceIcon resource={resource} size="xs" />
                          {RESOURCE_DISPLAY_NAMES[resource]}:
                        </span>
                        <span className="font-semibold">{techCost[resource].toLocaleString()}</span>
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        </div>
      )}

        {/* Population */}
        <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded border border-purple-200 dark:border-purple-700">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1" id="population-label">
              <span role="img" aria-label="Population">👥</span>
              Population
            </span>
            <div className="flex items-center gap-1">
              <span
                className={`font-bold ${
                  totalPopulation > config.populationCap ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'
                }`}
                aria-live="polite"
              >
                {totalPopulation}
              </span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600 dark:text-gray-300">{config.populationCap}</span>
              <span className="text-xs font-medium bg-purple-100 dark:bg-purple-800/50 px-1.5 py-0.5 rounded ml-1">
                {populationPercentage.toFixed(0)}%
              </span>
            </div>
          </div>
          <div
            className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 overflow-hidden"
            role="progressbar"
            aria-labelledby="population-label"
            aria-valuenow={Math.min(100, populationPercentage)}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className={`h-full bg-gradient-to-r ${
                totalPopulation > config.populationCap
                  ? 'from-red-500 to-red-600'
                  : populationPercentage >= 80
                    ? 'from-purple-400 to-indigo-500'
                    : 'from-purple-400 to-purple-600'
              } transition-all duration-300 rounded-full`}
              style={{ width: `${Math.min(100, populationPercentage)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
