import { useMemo } from 'react';
import { useArmy } from '../context/ArmyContext';
import {
  calculateCombinedTotals,
  calculatePercentage,
  getResourceColor,
} from '../utils/calculations';
import { fortifications } from '../data/fortifications';
import { calculateTechCost } from '../data/technologies';
import { RESOURCES, RESOURCE_DISPLAY_NAMES } from '../constants';

// Resource-specific icons and colors
const RESOURCE_ICONS = {
  food: '🍖',
  wood: '🪵',
  gold: '🪙',
  stone: '🪨',
};

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

  // Memoize expensive calculations to prevent unnecessary recalculation
  const { totalCost, totalPopulation } = useMemo(
    () =>
      calculateCombinedTotals(
        composition,
        fortificationComposition,
        config.selectedCiv,
        config.selectedAge,
        fortifications
      ),
    [composition, fortificationComposition, config.selectedCiv, config.selectedAge]
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
      className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mb-6 border border-gray-200 dark:border-gray-700"
      role="region"
      aria-label="Resource Tracker"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <span className="text-3xl" role="img" aria-label="Resources">💎</span>
          Resource Tracker
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span className={totalResourceStatus.color}>{totalResourceStatus.icon}</span>
          <span className="font-medium">{totalResourceStatus.text}</span>
        </div>
      </div>

      {/* Total Resource Mode Display */}
      {config.resourceLimitMode === 'total' && (
        <div className="mb-6">
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2" id="total-resources-label">
              <span className="text-lg" role="img" aria-label="Total">💰</span>
              Total Resources
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`font-bold text-lg ${
                  totalResourcesUsed > config.totalResourceLimit
                    ? 'text-red-600 dark:text-red-400 animate-pulse'
                    : 'text-gray-900 dark:text-white'
                }`}
                aria-live="polite"
              >
                {totalResourcesUsed.toLocaleString()}
              </span>
              <span className="text-gray-500 dark:text-gray-400">/</span>
              <span className="text-gray-600 dark:text-gray-300">
                {config.totalResourceLimit.toLocaleString()}
              </span>
              <span className="text-sm font-medium bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {resourcePercentages.total.toFixed(1)}%
              </span>
            </div>
          </div>
          <div
            className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-8 overflow-hidden shadow-inner"
            role="progressbar"
            aria-labelledby="total-resources-label"
            aria-valuenow={Math.min(100, resourcePercentages.total)}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className={`h-full resource-bar bg-gradient-to-r ${
                totalResourcesUsed > config.totalResourceLimit
                  ? 'from-red-500 to-red-600 animate-pulse'
                  : resourcePercentages.total >= 80
                    ? 'from-yellow-400 to-orange-500'
                    : 'from-green-400 to-emerald-500'
              } transition-all duration-500 ease-out rounded-full shadow-lg`}
              style={{ width: `${Math.min(100, resourcePercentages.total)}%` }}
            />
          </div>

          {/* Breakdown of individual resources with icons */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {RESOURCES.map((resource) => (
              <div
                key={resource}
                className="flex flex-col items-center p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
              >
                <span className="text-2xl mb-1" role="img" aria-label={RESOURCE_DISPLAY_NAMES[resource]}>
                  {RESOURCE_ICONS[resource]}
                </span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {RESOURCE_DISPLAY_NAMES[resource]}
                </span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {combinedCost[resource].toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Tech cost breakdown (if any techs researched) */}
          {hasTechCosts && (
            <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 rounded-lg">
              <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
                <span role="img" aria-label="technology">
                  ⚙️
                </span>{' '}
                Technology Costs (included above):
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {techCost.food > 0 && (
                  <div className="flex justify-between">
                    <span>Food:</span>
                    <span className="text-orange-600 dark:text-orange-400">
                      {techCost.food.toLocaleString()}
                    </span>
                  </div>
                )}
                {techCost.wood > 0 && (
                  <div className="flex justify-between">
                    <span>Wood:</span>
                    <span className="text-amber-700 dark:text-amber-400">
                      {techCost.wood.toLocaleString()}
                    </span>
                  </div>
                )}
                {techCost.gold > 0 && (
                  <div className="flex justify-between">
                    <span>Gold:</span>
                    <span className="text-yellow-600 dark:text-yellow-400">
                      {techCost.gold.toLocaleString()}
                    </span>
                  </div>
                )}
                {techCost.stone > 0 && (
                  <div className="flex justify-between">
                    <span>Stone:</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {techCost.stone.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Individual Resource Mode Display */}
      {config.resourceLimitMode === 'individual' && (
        <div className="space-y-5 mb-6">
          {RESOURCES.map((resource) => {
            const isOverLimit = combinedCost[resource] > config.resourceLimits[resource];
            const status = getStatusIndicator(resourcePercentages[resource], isOverLimit);

            return (
              <div key={resource} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2" id={`${resource}-label`}>
                    <span className="text-xl" role="img" aria-label={RESOURCE_DISPLAY_NAMES[resource]}>
                      {RESOURCE_ICONS[resource]}
                    </span>
                    {RESOURCE_DISPLAY_NAMES[resource]}
                    <span className="text-sm" title={status.text}>{status.icon}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-bold text-base ${
                        isOverLimit
                          ? 'text-red-600 dark:text-red-400 animate-pulse'
                          : 'text-gray-900 dark:text-white'
                      }`}
                      aria-live="polite"
                    >
                      {combinedCost[resource].toLocaleString()}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">/</span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {config.resourceLimits[resource].toLocaleString()}
                    </span>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      isOverLimit
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                        : resourcePercentages[resource] >= 80
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                          : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    }`}>
                      {resourcePercentages[resource].toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div
                  className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-6 overflow-hidden shadow-inner"
                  role="progressbar"
                  aria-labelledby={`${resource}-label`}
                  aria-valuenow={Math.min(100, resourcePercentages[resource])}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    className={`h-full resource-bar bg-gradient-to-r ${
                      isOverLimit
                        ? 'from-red-500 to-red-600 animate-pulse'
                        : RESOURCE_GRADIENT_COLORS[resource]
                    } transition-all duration-500 ease-out rounded-full shadow-md`}
                    style={{ width: `${Math.min(100, resourcePercentages[resource])}%` }}
                  />
                </div>
              </div>
            );
          })}

          {/* Tech cost breakdown for individual mode */}
          {hasTechCosts && (
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 rounded-lg">
              <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-3 flex items-center gap-2">
                <span className="text-xl" role="img" aria-label="technology">⚙️</span>
                Technology Costs (included above)
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                {RESOURCES.map(
                  (resource) =>
                    techCost[resource] > 0 && (
                      <div key={resource} className="flex items-center justify-between bg-white dark:bg-gray-800 p-2 rounded shadow-sm">
                        <span className="flex items-center gap-1">
                          <span role="img" aria-label={RESOURCE_DISPLAY_NAMES[resource]}>{RESOURCE_ICONS[resource]}</span>
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
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
        <div className="flex justify-between items-center text-sm mb-2">
          <span className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2" id="population-label">
            <span className="text-xl" role="img" aria-label="Population">👥</span>
            Population
            <span className="text-sm" title={populationStatus.text}>{populationStatus.icon}</span>
          </span>
          <div className="flex items-center gap-2">
            <span
              className={`font-bold text-base ${
                totalPopulation > config.populationCap
                  ? 'text-red-600 dark:text-red-400 animate-pulse'
                  : 'text-gray-900 dark:text-white'
              }`}
              aria-live="polite"
            >
              {totalPopulation}
            </span>
            <span className="text-gray-500 dark:text-gray-400">/</span>
            <span className="text-gray-600 dark:text-gray-300">{config.populationCap}</span>
            <span className={`text-xs font-medium px-2 py-1 rounded ${
              totalPopulation > config.populationCap
                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                : populationPercentage >= 80
                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                  : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
            }`}>
              {populationPercentage.toFixed(1)}%
            </span>
          </div>
        </div>
        <div
          className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-6 overflow-hidden shadow-inner"
          role="progressbar"
          aria-labelledby="population-label"
          aria-valuenow={Math.min(100, populationPercentage)}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className={`h-full resource-bar bg-gradient-to-r ${
              totalPopulation > config.populationCap
                ? 'from-red-500 to-red-600 animate-pulse'
                : populationPercentage >= 80
                  ? 'from-purple-400 to-indigo-500'
                  : 'from-purple-400 to-purple-600'
            } transition-all duration-500 ease-out rounded-full shadow-md`}
            style={{ width: `${Math.min(100, populationPercentage)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
