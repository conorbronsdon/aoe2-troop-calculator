import { useMemo } from 'react';
import { useArmy } from '../context/ArmyContext';
import {
  calculateCombinedTotals,
  calculatePercentage,
  getResourceColor,
} from '../utils/calculations';
import { fortifications } from '../data/fortifications';
import { calculateTechCost } from '../data/technologies';
import { RESOURCES } from '../constants';
import ResourceIcon from './ResourceIcon';
import { ResourceCost as ResourceCostType, ResourceType } from '../types';

/**
 * Compact resource and population tracking bar for bottom of page
 * Shows total resources and population at a glance without individual progress bars
 */
export default function CompactResourceBar(): JSX.Element {
  const { state } = useArmy();
  const { composition, fortificationComposition, config, researchedTechs } = state;

  // Memoize expensive calculations
  const { totalCost, totalPopulation } = useMemo<{ totalCost: ResourceCostType; totalPopulation: number }>(
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
  const techCost = useMemo<ResourceCostType>(() => calculateTechCost(researchedTechs || []), [researchedTechs]);

  // Calculate combined costs (units + fortifications + technologies)
  const combinedCost = useMemo<ResourceCostType>(
    () => ({
      food: totalCost.food + techCost.food,
      wood: totalCost.wood + techCost.wood,
      gold: totalCost.gold + techCost.gold,
      stone: totalCost.stone + techCost.stone,
    }),
    [totalCost, techCost]
  );

  // Calculate total resources used
  const totalResourcesUsed = useMemo<number>(
    () => combinedCost.food + combinedCost.wood + combinedCost.gold + combinedCost.stone,
    [combinedCost]
  );

  // Calculate percentages
  const resourcePercentage = useMemo<number>(() => {
    if (config.resourceLimitMode === 'total') {
      return calculatePercentage(totalResourcesUsed, config.totalResourceLimit);
    } else {
      // For individual mode, show highest percentage as indicator
      const percentages = RESOURCES.map((resource: ResourceType) =>
        calculatePercentage(combinedCost[resource], config.resourceLimits[resource])
      );
      return Math.max(...percentages);
    }
  }, [
    config.resourceLimitMode,
    config.totalResourceLimit,
    config.resourceLimits,
    combinedCost,
    totalResourcesUsed,
  ]);

  const populationPercentage = useMemo<number>(
    () => calculatePercentage(totalPopulation, config.populationCap),
    [totalPopulation, config.populationCap]
  );

  // Determine if over limits
  const isResourceOverLimit = useMemo<boolean>(() => {
    if (config.resourceLimitMode === 'total') {
      return totalResourcesUsed > config.totalResourceLimit;
    } else {
      return RESOURCES.some(
        (resource: ResourceType) => combinedCost[resource] > config.resourceLimits[resource]
      );
    }
  }, [
    config.resourceLimitMode,
    config.totalResourceLimit,
    config.resourceLimits,
    combinedCost,
    totalResourcesUsed,
  ]);

  const isPopulationOverLimit = totalPopulation > config.populationCap;

  // Get status indicator
  const getStatusIcon = (percentage: number, isOver: boolean): string => {
    if (isOver) {return '🚫';}
    if (percentage >= 95) {return '⚠️';}
    if (percentage >= 80) {return '📊';}
    return '✅';
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t-2 border-gray-200 dark:border-gray-700 shadow-lg z-50"
      role="region"
      aria-label="Compact Resource Tracker"
    >
      <div className="container mx-auto max-w-7xl px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Total Resources Section */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-lg" role="img" aria-label="Resources">
                💰
              </span>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Total Resources
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`font-bold ${isResourceOverLimit ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}
                  >
                    {totalResourcesUsed.toLocaleString()}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">/</span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {config.resourceLimitMode === 'total'
                      ? config.totalResourceLimit.toLocaleString()
                      : 'Individual'}
                  </span>
                  <span className="text-sm">{getStatusIcon(resourcePercentage, isResourceOverLimit)}</span>
                </div>
              </div>
            </div>

            {/* Resource Progress Bar */}
            <div className="hidden md:block w-32">
              <div
                className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden"
                role="progressbar"
                aria-label="Resource usage"
                aria-valuenow={Math.min(100, resourcePercentage)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className={`h-full transition-all duration-500 ease-out rounded-full ${
                    isResourceOverLimit
                      ? 'bg-red-500 animate-pulse'
                      : getResourceColor(resourcePercentage)
                  }`}
                  style={{ width: `${Math.min(100, resourcePercentage)}%` }}
                />
              </div>
              <div className="text-xs text-center mt-0.5 text-gray-500 dark:text-gray-400">
                {resourcePercentage.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Resource Breakdown (compact) */}
          <div className="hidden lg:flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <ResourceIcon resource="food" size="sm" />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {combinedCost.food.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <ResourceIcon resource="wood" size="sm" />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {combinedCost.wood.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <ResourceIcon resource="gold" size="sm" />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {combinedCost.gold.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <ResourceIcon resource="stone" size="sm" />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {combinedCost.stone.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Population Section */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
            {/* Population Progress Bar */}
            <div className="hidden md:block w-32">
              <div
                className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden"
                role="progressbar"
                aria-label="Population usage"
                aria-valuenow={Math.min(100, populationPercentage)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className={`h-full transition-all duration-500 ease-out rounded-full ${
                    isPopulationOverLimit
                      ? 'bg-red-500 animate-pulse'
                      : getResourceColor(populationPercentage)
                  }`}
                  style={{ width: `${Math.min(100, populationPercentage)}%` }}
                />
              </div>
              <div className="text-xs text-center mt-0.5 text-gray-500 dark:text-gray-400">
                {populationPercentage.toFixed(1)}%
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-lg" role="img" aria-label="Population">
                👥
              </span>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Population
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`font-bold ${isPopulationOverLimit ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}
                  >
                    {totalPopulation}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">/</span>
                  <span className="text-gray-600 dark:text-gray-300">{config.populationCap}</span>
                  <span className="text-sm">{getStatusIcon(populationPercentage, isPopulationOverLimit)}</span>
                </div>
              </div>
            </div>

            {/* Quick Link to Saved Compositions */}
            <a
              href="#saved-compositions"
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors"
              title="Jump to Army Compositions"
            >
              <span>💾</span>
              <span className="hidden md:inline">Compositions</span>
            </a>

            {/* Star on GitHub */}
            <a
              href="https://github.com/conorbronsdon/aoe2-troop-calculator"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 text-white text-xs font-medium rounded transition-colors"
              title="Star us on GitHub"
            >
              <span>⭐</span>
              <span className="hidden md:inline">Star on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
