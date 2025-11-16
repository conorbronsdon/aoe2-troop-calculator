import { useArmy } from '../context/ArmyContext';
import { getFortificationsForCiv } from '../data/fortifications';
import FortificationCard from './FortificationCard';

/**
 * FortificationSelection Component
 * Displays all available fortifications grouped by category
 * Filters by civilization and age
 */
export default function FortificationSelection() {
  const { state } = useArmy();
  const { config } = state;

  // Get fortifications available for current civ and age
  const availableFortifications = getFortificationsForCiv(config.selectedCiv, config.selectedAge);

  // Group fortifications by category
  const fortificationsByCategory = availableFortifications.reduce((acc, fortification) => {
    if (!acc[fortification.category]) {
      acc[fortification.category] = [];
    }
    acc[fortification.category].push(fortification);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">🏰 Select Fortifications</h2>
        <div className="text-sm text-gray-600 bg-amber-50 px-3 py-1 rounded border border-amber-200">
          Plan your defensive structures
        </div>
      </div>

      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>💡 Tip:</strong> Fortifications don&apos;t consume population but require
          resources. Stone is crucial for walls, towers, and castles. Plan your economy accordingly!
        </p>
      </div>

      {Object.keys(fortificationsByCategory).length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p className="text-lg">No fortifications available for this age.</p>
          <p className="text-sm mt-2">Try selecting a later age to unlock more options.</p>
        </div>
      ) : (
        Object.entries(fortificationsByCategory).map(([category, fortifications]) => (
          <div key={category} className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-600 flex items-center gap-2">
              {category === 'Walls' && '🧱'}
              {category === 'Towers' && '🗼'}
              {category === 'Castles' && '🏰'}
              <span>{category}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {fortifications.map((fortification) => (
                <FortificationCard key={fortification.id} fortification={fortification} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
