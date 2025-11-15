import React, { useState, useMemo } from 'react';
import { useArmy } from '../context/ArmyContext';
import { getUnitsForCiv } from '../data/units';
import { groupUnitsByCategory } from '../utils/calculations';
import UnitCard from './UnitCard';
import UnitFilter from './UnitFilter';

export default function UnitSelection() {
  const { state } = useArmy();
  const { config } = state;
  const [filters, setFilters] = useState({
    searchTerm: '',
    categories: [],
    costType: 'all',
    ageFilter: 'all'
  });

  // Filter units by age and civilization (includes unique units)
  const availableUnits = getUnitsForCiv(config.selectedCiv, config.selectedAge);

  // Apply filters
  const filteredUnits = useMemo(() => {
    let filtered = [...availableUnits];

    // Search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(unit =>
        unit.name.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(unit =>
        filters.categories.includes(unit.category)
      );
    }

    // Cost type filter
    if (filters.costType !== 'all') {
      filtered = filtered.filter(unit => {
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
      filtered = filtered.filter(unit => unit.age === filters.ageFilter);
    }

    return filtered;
  }, [availableUnits, filters]);

  // Group units by category
  const unitsByCategory = groupUnitsByCategory(filteredUnits);

  const hasResults = filteredUnits.length > 0;

  return (
    <div>
      <UnitFilter onFilterChange={setFilters} />

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Select Units
          {filters.searchTerm || filters.categories.length > 0 || filters.costType !== 'all' || filters.ageFilter !== 'all' ? (
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({filteredUnits.length} {filteredUnits.length === 1 ? 'unit' : 'units'} found)
            </span>
          ) : null}
        </h2>

        {!hasResults ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg mb-2">No units match your filters</p>
            <p className="text-sm">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          Object.entries(unitsByCategory).map(([category, units]) => (
            <div key={category} className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-600">
                {category} ({units.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {units.map(unit => (
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
