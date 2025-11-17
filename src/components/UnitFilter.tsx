import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { SEARCH_DEBOUNCE_MS } from '../constants';

const STORAGE_KEY = 'aoe2-unit-filter-expanded';

interface FilterState {
  searchTerm: string;
  categories: string[];
  costType: string;
  ageFilter: string;
  hideNaval: boolean;
}

interface UnitFilterProps {
  onFilterChange: (filters: FilterState) => void;
}

interface CostTypeOption {
  id: string;
  label: string;
}

interface AgeFilterOption {
  id: string;
  label: string;
}

export default function UnitFilter({ onFilterChange }: UnitFilterProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCostType, setSelectedCostType] = useState<string>('all');
  const [selectedAgeFilter, setSelectedAgeFilter] = useState<string>('all');
  const [hideNaval, setHideNaval] = useState<boolean>(false);

  // Collapsible state - start collapsed by default
  const [isExpanded, setIsExpanded] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved !== null ? JSON.parse(saved) : false; // Start collapsed
    } catch {
      return false;
    }
  });

  // Debounce timer ref for search input
  const searchDebounceRef = useRef<NodeJS.Timeout | null>(null);

  const categories: string[] = ['Infantry', 'Cavalry', 'Archer', 'Siege', 'Naval', 'Unique', 'Other'];
  const costTypes: CostTypeOption[] = [
    { id: 'all', label: 'All Costs' },
    { id: 'trash', label: 'Trash Units (No Gold)' },
    { id: 'gold', label: 'Gold Units' },
    { id: 'low-cost', label: 'Low Cost (<100 total)' },
  ];
  const ageFilters: AgeFilterOption[] = [
    { id: 'all', label: 'All Ages' },
    { id: 'dark', label: 'Dark Age' },
    { id: 'feudal', label: 'Feudal Age' },
    { id: 'castle', label: 'Castle Age' },
    { id: 'imperial', label: 'Imperial Age' },
  ];

  // Cleanup debounce timer on unmount
  useEffect(
    () => () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }
    },
    []
  );

  // Persist expanded state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(isExpanded));
    } catch {
      // Ignore localStorage errors
    }
  }, [isExpanded]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear existing debounce timer
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    // Debounce the filter update for performance
    searchDebounceRef.current = setTimeout(() => {
      updateFilters({ searchTerm: value });
    }, SEARCH_DEBOUNCE_MS);
  };

  const toggleCategory = (category: string): void => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
    updateFilters({ categories: newCategories });
  };

  const handleCostTypeChange = (costType: string): void => {
    setSelectedCostType(costType);
    updateFilters({ costType });
  };

  const handleAgeFilterChange = (ageFilter: string): void => {
    setSelectedAgeFilter(ageFilter);
    updateFilters({ ageFilter });
  };

  const handleHideNavalChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.checked;
    setHideNaval(value);
    updateFilters({ hideNaval: value });
  };

  const updateFilters = (changes: Partial<FilterState>): void => {
    const filters: FilterState = {
      searchTerm: changes.searchTerm !== undefined ? changes.searchTerm : searchTerm,
      categories: changes.categories !== undefined ? changes.categories : selectedCategories,
      costType: changes.costType !== undefined ? changes.costType : selectedCostType,
      ageFilter: changes.ageFilter !== undefined ? changes.ageFilter : selectedAgeFilter,
      hideNaval: changes.hideNaval !== undefined ? changes.hideNaval : hideNaval,
    };
    onFilterChange(filters);
  };

  const clearFilters = (): void => {
    // Clear any pending debounce timer
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedCostType('all');
    setSelectedAgeFilter('all');
    setHideNaval(false);
    onFilterChange({
      searchTerm: '',
      categories: [],
      costType: 'all',
      ageFilter: 'all',
      hideNaval: false,
    });
  };

  const hasActiveFilters =
    searchTerm ||
    selectedCategories.length > 0 ||
    selectedCostType !== 'all' ||
    selectedAgeFilter !== 'all' ||
    hideNaval;

  // Count active filters for display
  const activeFilterCount = [
    searchTerm ? 1 : 0,
    selectedCategories.length,
    selectedCostType !== 'all' ? 1 : 0,
    selectedAgeFilter !== 'all' ? 1 : 0,
    hideNaval ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4 transition-colors duration-300">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Filter Units</h3>
          {activeFilterCount > 0 && (
            <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            aria-expanded={isExpanded}
            aria-controls="unit-filter-content"
          >
            {isExpanded ? '▼ Collapse' : '► Expand'}
          </button>
        </div>
      </div>

      {/* Always Visible: Categories and Hide Naval on same line */}
      <div className="mt-3">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategories.includes(category)
                  ? 'bg-blue-500 dark:bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
          <label className="inline-flex items-center cursor-pointer ml-2">
            <input
              type="checkbox"
              checked={hideNaval}
              onChange={handleHideNavalChange}
              className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 dark:border-gray-600 focus:ring-blue-500"
            />
            <span className="ml-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">Hide Naval</span>
          </label>
        </div>
      </div>

      {/* Collapsed Summary - only show search/cost/age info */}
      {!isExpanded && (searchTerm || selectedCostType !== 'all' || selectedAgeFilter !== 'all') && (
        <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded p-2 mt-2">
          {searchTerm && <span className="mr-2">🔍 &quot;{searchTerm}&quot;</span>}
          {selectedCostType !== 'all' && <span className="mr-2">💰 {costTypes.find(t => t.id === selectedCostType)?.label}</span>}
          {selectedAgeFilter !== 'all' && <span className="mr-2">⏰ {ageFilters.find(a => a.id === selectedAgeFilter)?.label}</span>}
        </div>
      )}

      {/* Expanded Content - Search, Cost Type, Age filters */}
      <div id="unit-filter-content" className={isExpanded ? 'mt-4' : 'hidden'}>
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search units by name..."
              value={searchTerm}
              onChange={handleSearchChange}
              data-search-input="unit-filter"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        {/* Cost Type and Age Filters - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cost Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cost Type</label>
            <select
              value={selectedCostType}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => handleCostTypeChange(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {costTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Age Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Age</label>
            <select
              value={selectedAgeFilter}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => handleAgeFilterChange(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {ageFilters.map((age) => (
                <option key={age.id} value={age.id}>
                  {age.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
