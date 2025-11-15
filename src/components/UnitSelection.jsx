import React from 'react';
import { useArmy } from '../context/ArmyContext';
import { getUnitsByAge } from '../data/units';
import { groupUnitsByCategory } from '../utils/calculations';
import UnitCard from './UnitCard';

export default function UnitSelection() {
  const { state } = useArmy();
  const { config } = state;

  // Filter units by age
  const availableUnits = getUnitsByAge(config.selectedAge);

  // Group units by category
  const unitsByCategory = groupUnitsByCategory(availableUnits);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Select Units</h2>

      {Object.entries(unitsByCategory).map(([category, units]) => (
        <div key={category} className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-600">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {units.map(unit => (
              <UnitCard key={unit.id} unit={unit} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
