import { useState, useMemo } from 'react';
import { useArmy, ACTION_TYPES } from '../context/ArmyContext';
import { getUnitsForCiv } from '../data/units';
import { groupUnitsByCategory } from '../utils/calculations';
import UnitCard from './UnitCard';
import UnitFilter from './UnitFilter';
import { Unit } from '../types';

interface FilterState {
  searchTerm: string;
  categories: string[];
  costType: string;
  ageFilter: string;
  hideNaval: boolean;
}

export default function UnitSelection(): JSX.Element {
  const { state, dispatch } = useArmy();
  const { config, composition } = state;
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    categories: [],
    costType: 'all',
    ageFilter: 'all',
    hideNaval: false,
  });

  const resetComposition = (): void => {
    dispatch({ type: ACTION_TYPES.RESET_COMPOSITION });
  };

  const hasUnitsSelected = Object.values(composition).some((quantity) => quantity > 0);

  // Filter units by age and civilization (includes unique units)
  const availableUnits: Unit[] = getUnitsForCiv(config.selectedCiv, config.selectedAge);

  // Apply filters
  const filteredUnits = useMemo<Unit[]>(() => {
    let filtered = [...availableUnits];

    // Hide Naval filter (quick toggle)
    if (filters.hideNaval) {
      filtered = filtered.filter((unit) => unit.category !== 'Naval');
    }

    // Search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter((unit) => unit.name.toLowerCase().includes(searchLower));
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((unit) => filters.categories.includes(unit.category));
    }

    // Cost type filter
    if (filters.costType !== 'all') {
      filtered = filtered.filter((unit) => {
        const totalCost = unit.cost.food + unit.cost.wood + unit.cost.gold + unit.cost.stone;
        switch (filters.costType) {
          case 'trash':
            return unit.cost.gold === 0;
          case 'gold':
            return unit.cost.gold > 0;
          case 'low-cost':
            return totalCost < 100;
          default:
            return true;
        }
      });
    }

    // Age filter
    if (filters.ageFilter !== 'all') {
      filtered = filtered.filter((unit) => unit.age === filters.ageFilter);
    }

    return filtered;
  }, [availableUnits, filters]);

  // Group units by category
  const unitsByCategory: Record<string, Unit[]> = groupUnitsByCategory(filteredUnits);

  const hasResults = filteredUnits.length > 0;

  return (
    <div>
      <UnitFilter onFilterChange={setFilters} />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 transition-colors duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Select Units
            {filters.searchTerm ||
            filters.categories.length > 0 ||
            filters.costType !== 'all' ||
            filters.ageFilter !== 'all' ||
            filters.hideNaval ? (
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                ({filteredUnits.length} {filteredUnits.length === 1 ? 'unit' : 'units'} found)
              </span>
            ) : null}
          </h2>
          {hasUnitsSelected && (
            <button
              onClick={resetComposition}
              className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              Reset All
            </button>
          )}
        </div>

        {!hasResults ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p className="text-lg mb-2">No units match your filters</p>
            <p className="text-sm">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          Object.entries(unitsByCategory).map(([category, units]) => (
            <div key={category} className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-600 dark:text-gray-300">
                {category} ({units.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {units.map((unit) => (
                  <UnitCard key={unit.id} unit={unit} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
