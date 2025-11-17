import { useState, useMemo, ChangeEvent } from 'react';
import { useArmy } from '../context/ArmyContext';
import { civilizations } from '../data/civilizations';
import { getCivilizationIconUrl, FALLBACK_ICON, getRegionColors } from '../data/civilizationIcons';
import { CivilizationBonus, CostBonus, StatBonus, EconomicBonus } from '../types';
import { getTranslatedCivName } from '../utils/translationHelpers';

interface CostBonusWithActive extends CostBonus {
  isActive: boolean;
}

interface FilterableBonusWithActive {
  description: string;
  isActive?: boolean;
}

export default function CivilizationBonuses(): JSX.Element | null {
  const { state } = useArmy();
  const { config, composition } = state;
  const [isExpanded, setIsExpanded] = useState<boolean>(false); // Start collapsed by default
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showMilitary, setShowMilitary] = useState<boolean>(true);
  const [showEconomic, setShowEconomic] = useState<boolean>(true);
  const [showCost, setShowCost] = useState<boolean>(true);
  const [activeOnly, setActiveOnly] = useState<boolean>(false);
  const [iconError, setIconError] = useState<boolean>(false);

  // Get current civilization (use selectedCiv which is the applied one)
  const currentCiv = useMemo(
    () => civilizations.find((civ) => civ.id === config.selectedCiv),
    [config.selectedCiv]
  );

  // Get civilization icon URL
  const civIconUrl = useMemo(() => {
    if (!currentCiv || currentCiv.id === 'generic') {return null;}
    return getCivilizationIconUrl(currentCiv.id);
  }, [currentCiv]);

  // Get region colors for styling
  const regionColors = useMemo(() => {
    if (!currentCiv) {return getRegionColors('None');}
    return getRegionColors(currentCiv.region);
  }, [currentCiv]);

  // Pre-compute composition unit IDs as a Set for O(1) lookups
  const compositionUnitIds = useMemo(() => new Set(Object.keys(composition)), [composition]);

  // Memoize bonus active status calculation with optimized O(n) algorithm
  const { allCostBonuses, allStatBonuses, allEconomicBonuses } = useMemo(() => {
    if (!currentCiv || currentCiv.id === 'generic' || !currentCiv.bonuses) {
      return { allCostBonuses: [], allStatBonuses: [], allEconomicBonuses: [] };
    }

    // Helper function to check if a bonus is actively affecting the current army
    // Optimized from O(n²) to O(n) by using Set for lookups
    const isBonusActive = (bonus: CivilizationBonus): boolean => {
      if (bonus.type !== 'cost') {
        return false;
      }
      const costBonus = bonus as CostBonus;
      if ((costBonus.units as unknown) === 'all') {
        return compositionUnitIds.size > 0;
      }

      // Convert bonus units to Set for O(1) lookups
      const bonusUnitSet = new Set(costBonus.units);

      // Check if any units in composition are affected by this bonus
      for (const unitId of compositionUnitIds) {
        // Direct match O(1)
        if (bonusUnitSet.has(unitId)) {
          return true;
        }

        // Partial match (e.g., bonus applies to "knight" and unit is "knight_elite")
        for (const bonusUnit of costBonus.units) {
          if (unitId.includes(bonusUnit)) {
            return true;
          }
        }
      }
      return false;
    };

    const costBonuses: CostBonusWithActive[] = currentCiv.bonuses
      .filter((b): b is CostBonus => b.type === 'cost')
      .map((b) => ({ ...b, isActive: isBonusActive(b) }));
    const statBonuses: StatBonus[] = currentCiv.bonuses.filter((b): b is StatBonus => b.type === 'stat');
    const economicBonuses: EconomicBonus[] = currentCiv.bonuses.filter((b): b is EconomicBonus => b.type === 'economic');

    return {
      allCostBonuses: costBonuses,
      allStatBonuses: statBonuses,
      allEconomicBonuses: economicBonuses,
    };
  }, [currentCiv, compositionUnitIds]);

  // Don't show for generic civilization
  if (
    !currentCiv ||
    currentCiv.id === 'generic' ||
    !currentCiv.bonuses ||
    currentCiv.bonuses.length === 0
  ) {
    return null;
  }

  // Apply filters
  const filterBonus = (bonus: FilterableBonusWithActive): boolean => {
    // Search filter
    if (searchTerm && !bonus.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Active only filter
    if (activeOnly && !bonus.isActive) {
      return false;
    }

    return true;
  };

  const costBonuses = showCost ? allCostBonuses.filter(filterBonus) : [];
  const statBonuses = showMilitary ? allStatBonuses.filter(filterBonus) : [];
  const economicBonuses = showEconomic ? allEconomicBonuses.filter(filterBonus) : [];

  const activeBonusCount = allCostBonuses.filter((b) => b.isActive).length;
  const totalVisibleBonuses = costBonuses.length + statBonuses.length + economicBonuses.length;
  const hasActiveFilters = searchTerm || !showMilitary || !showEconomic || !showCost || activeOnly;

  return (
    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl shadow-lg p-5 mb-6 border-2 border-amber-300 dark:border-amber-700">
      <button
        className="flex items-center justify-between cursor-pointer w-full text-left"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls="civilization-bonuses-content"
      >
        <div className="flex items-center gap-4">
          {/* Civilization Insignia */}
          <div className="relative">
            {civIconUrl && !iconError ? (
              <img
                src={civIconUrl}
                alt={`${getTranslatedCivName(currentCiv.id)} insignia`}
                className="w-16 h-16 object-contain drop-shadow-lg"
                onError={() => setIconError(true)}
              />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center text-4xl bg-amber-100 dark:bg-amber-800 rounded-lg shadow-inner">
                {FALLBACK_ICON}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow">
              ACTIVE
            </div>
          </div>

          {/* Civilization Info */}
          <div>
            <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">
              {getTranslatedCivName(currentCiv.id)}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${regionColors.bg} ${regionColors.border} ${regionColors.text} border`}>
                {currentCiv.region}
              </span>
              <span className="text-sm text-amber-700 dark:text-amber-300">
                {currentCiv.bonuses.length} bonus{currentCiv.bonuses.length !== 1 ? 'es' : ''}
              </span>
              {activeBonusCount > 0 && (
                <span className="px-2 py-0.5 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full font-semibold text-xs animate-pulse">
                  {activeBonusCount} affecting army
                </span>
              )}
            </div>

            {/* Quick Bonus Summary */}
            <div className="flex gap-3 mt-2">
              <div className="flex items-center gap-1 text-xs">
                <span className="text-red-500" role="img" aria-hidden="true">⚔️</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {allStatBonuses.length} Military
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <span className="text-green-500" role="img" aria-hidden="true">🌾</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {allEconomicBonuses.length} Economic
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <span className="text-yellow-500" role="img" aria-hidden="true">💰</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {allCostBonuses.length} Cost
                </span>
              </div>
            </div>
          </div>
        </div>
        <span
          className="text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 transition-colors text-xl"
          aria-hidden="true"
        >
          {isExpanded ? '▼' : '▶'}
        </span>
      </button>

      {isExpanded && (
        <div id="civilization-bonuses-content" className="mt-4 space-y-3">
          {/* Filter Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-amber-200 dark:border-amber-700">
            <div className="space-y-3">
              {/* Search Bar */}
              <div className="relative">
                <label htmlFor="bonus-search" className="sr-only">
                  Search bonuses
                </label>
                <input
                  id="bonus-search"
                  type="text"
                  placeholder="Search bonuses..."
                  value={searchTerm}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
                  aria-label="Search bonuses"
                />
                <span
                  className="absolute right-3 top-2.5 text-gray-400"
                  role="img"
                  aria-label="Search"
                >
                  🔍
                </span>
              </div>

              {/* Filter Toggles */}
              <div className="flex flex-wrap gap-2" role="group" aria-label="Bonus type filters">
                <button
                  onClick={() => setShowMilitary(!showMilitary)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    showMilitary
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                  }`}
                  aria-pressed={showMilitary}
                  aria-label="Toggle military bonuses"
                >
                  <span role="img" aria-hidden="true">
                    ⚔️
                  </span>{' '}
                  Military
                </button>
                <button
                  onClick={() => setShowEconomic(!showEconomic)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    showEconomic
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                  }`}
                  aria-pressed={showEconomic}
                  aria-label="Toggle economic bonuses"
                >
                  <span role="img" aria-hidden="true">
                    🌾
                  </span>{' '}
                  Economic
                </button>
                <button
                  onClick={() => setShowCost(!showCost)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    showCost
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                  }`}
                  aria-pressed={showCost}
                  aria-label="Toggle cost bonuses"
                >
                  <span role="img" aria-hidden="true">
                    💰
                  </span>{' '}
                  Cost
                </button>
                <button
                  onClick={() => setActiveOnly(!activeOnly)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    activeOnly
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                  }`}
                  aria-pressed={activeOnly}
                  aria-label="Show only active bonuses"
                >
                  <span aria-hidden="true">✓</span> Active Only
                </button>
              </div>

              {/* Filter Status */}
              {hasActiveFilters && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-700 dark:text-amber-300">
                    {totalVisibleBonuses} bonus{totalVisibleBonuses !== 1 ? 'es' : ''} shown
                  </span>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setShowMilitary(true);
                      setShowEconomic(true);
                      setShowCost(true);
                      setActiveOnly(false);
                    }}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* No Results Message */}
          {totalVisibleBonuses === 0 && hasActiveFilters && (
            <div className="text-center py-6 text-amber-700 dark:text-amber-300">
              <p className="text-lg mb-2">No bonuses match your filters</p>
              <p className="text-sm">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Cost Bonuses */}
          {costBonuses.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                <span className="text-lg">💰</span>
                Cost Reduction Bonuses
                {activeBonusCount > 0 && (
                  <span className="text-xs text-green-600">({activeBonusCount} active)</span>
                )}
              </h4>
              <ul className="space-y-2 ml-6">
                {costBonuses.map((bonus) => (
                  <li
                    key={bonus.description}
                    className={`text-sm p-2 rounded transition-all ${
                      bonus.isActive
                        ? 'bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 text-green-900 dark:text-green-100 font-semibold -ml-2 pl-4'
                        : 'text-amber-900 dark:text-amber-100'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span
                        className={`inline-block w-2 h-2 rounded-full mt-1.5 ${
                          bonus.isActive ? 'bg-green-500 animate-pulse' : 'bg-amber-500'
                        }`}
                      />
                      <div className="flex-1">
                        {bonus.description}
                        {bonus.isActive && (
                          <div className="text-xs text-green-700 dark:text-green-300 mt-1">
                            ✓ Currently affecting units in your army
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stat Bonuses */}
          {statBonuses.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                <span className="text-lg">⚔️</span>
                Military Bonuses
              </h4>
              <ul className="space-y-1 ml-6">
                {statBonuses.map((bonus) => (
                  <li
                    key={bonus.description}
                    className="text-sm text-amber-900 dark:text-amber-100"
                  >
                    <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mr-2" />
                    {bonus.description}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Economic Bonuses */}
          {economicBonuses.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                <span className="text-lg">🌾</span>
                Economic Bonuses
              </h4>
              <ul className="space-y-1 ml-6">
                {economicBonuses.map((bonus) => (
                  <li
                    key={bonus.description}
                    className="text-sm text-amber-900 dark:text-amber-100"
                  >
                    <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mr-2" />
                    {bonus.description}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Team Bonus */}
          {currentCiv.teamBonus && (
            <div className="border-t border-amber-300 dark:border-amber-700 pt-3 mt-3">
              <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                <span className="text-lg">🤝</span>
                Team Bonus
              </h4>
              <p className="text-sm text-amber-900 dark:text-amber-100 ml-6">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2" />
                {currentCiv.teamBonus.description}
              </p>
            </div>
          )}

          {/* Info note */}
          <div className="bg-amber-100 dark:bg-amber-900/30 rounded p-2 mt-3">
            <p className="text-xs text-amber-800 dark:text-amber-200">
              💡 <strong>Note:</strong> Cost bonuses are automatically applied to unit calculations.
              Stat bonuses and economic bonuses are shown for reference.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
