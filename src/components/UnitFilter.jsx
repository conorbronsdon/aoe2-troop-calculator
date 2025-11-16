import React, { useState, useEffect, useRef } from 'react';
import { SEARCH_DEBOUNCE_MS } from '../constants';

export default function UnitFilter({ onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCostType, setSelectedCostType] = useState('all');
  const [selectedAgeFilter, setSelectedAgeFilter] = useState('all');
  const [hideNaval, setHideNaval] = useState(false);

  // Debounce timer ref for search input
  const searchDebounceRef = useRef(null);

  const categories = ['Infantry', 'Cavalry', 'Archer', 'Siege', 'Naval', 'Unique', 'Other'];
  const costTypes = [
    { id: 'all', label: 'All Costs' },
    { id: 'trash', label: 'Trash Units (No Gold)' },
    { id: 'gold', label: 'Gold Units' },
    { id: 'low-cost', label: 'Low Cost (<100 total)' }
  ];
  const ageFilters = [
    { id: 'all', label: 'All Ages' },
    { id: 'dark', label: 'Dark Age' },
    { id: 'feudal', label: 'Feudal Age' },
    { id: 'castle', label: 'Castle Age' },
    { id: 'imperial', label: 'Imperial Age' }
  ];

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }
    };
  }, []);

  const handleSearchChange = (e) => {
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

  const toggleCategory = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
    updateFilters({ categories: newCategories });
  };

  const handleCostTypeChange = (costType) => {
    setSelectedCostType(costType);
    updateFilters({ costType });
  };

  const handleAgeFilterChange = (ageFilter) => {
    setSelectedAgeFilter(ageFilter);
    updateFilters({ ageFilter });
  };

  const handleHideNavalChange = (e) => {
    const value = e.target.checked;
    setHideNaval(value);
    updateFilters({ hideNaval: value });
  };

  const updateFilters = (changes) => {
    const filters = {
      searchTerm: changes.searchTerm !== undefined ? changes.searchTerm : searchTerm,
      categories: changes.categories !== undefined ? changes.categories : selectedCategories,
      costType: changes.costType !== undefined ? changes.costType : selectedCostType,
      ageFilter: changes.ageFilter !== undefined ? changes.ageFilter : selectedAgeFilter,
      hideNaval: changes.hideNaval !== undefined ? changes.hideNaval : hideNaval
    };
    onFilterChange(filters);
  };

  const clearFilters = () => {
    // Clear any pending debounce timer
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedCostType('all');
    setSelectedAgeFilter('all');
    setHideNaval(false);
    onFilterChange({ searchTerm: '', categories: [], costType: 'all', ageFilter: 'all', hideNaval: false });
  };

  const hasActiveFilters = searchTerm || selectedCategories.length > 0 || selectedCostType !== 'all' || selectedAgeFilter !== 'all' || hideNaval;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Filter Units</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search units by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Quick Toggles */}
      <div className="mb-4">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={hideNaval}
            onChange={handleHideNavalChange}
            className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm font-medium text-gray-700">Hide Naval Units</span>
        </label>
      </div>

      {/* Category Filters */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategories.includes(category)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Cost Type and Age Filters - Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cost Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cost Type</label>
          <select
            value={selectedCostType}
            onChange={(e) => handleCostTypeChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {costTypes.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
        </div>

        {/* Age Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
          <select
            value={selectedAgeFilter}
            onChange={(e) => handleAgeFilterChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {ageFilters.map(age => (
              <option key={age.id} value={age.id}>{age.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
