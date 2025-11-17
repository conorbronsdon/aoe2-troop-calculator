import { useArmy } from '../context/ArmyContext';
import { getFortificationsForCiv } from '../data/fortifications';
import FortificationCard from './FortificationCard';
import { Fortification } from '../types';

/**
 * FortificationSelection Component
 * Displays all available fortifications grouped by category
 * Filters by civilization and age
 */
export default function FortificationSelection(): JSX.Element {
  const { state } = useArmy();
  const { config } = state;

  // Get fortifications available for current civ and age
  const availableFortifications: Fortification[] = getFortificationsForCiv(config.selectedCiv, config.selectedAge);

  // Group fortifications by category
  const fortificationsByCategory = availableFortifications.reduce<Record<string, Fortification[]>>((acc, fortification) => {
    if (!acc[fortification.category]) {
      acc[fortification.category] = [];
    }
    acc[fortification.category].push(fortification);
    return acc;
  }, {});

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">🏰 Select Fortifications</h2>
        <div className="text-sm text-gray-600 dark:text-amber-200 bg-amber-50 dark:bg-amber-900/30 px-3 py-1 rounded border border-amber-200 dark:border-amber-700">
          Plan your defensive structures
        </div>
      </div>

      <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>💡 Tip:</strong> Fortifications don&apos;t consume population but require
          resources. Stone is crucial for walls, towers, and castles. Plan your economy accordingly!
        </p>
      </div>

      {Object.keys(fortificationsByCategory).length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          <p className="text-lg">No fortifications available for this age.</p>
          <p className="text-sm mt-2">Try selecting a later age to unlock more options.</p>
        </div>
      ) : (
        Object.entries(fortificationsByCategory).map(([category, fortifications]) => (
          <div key={category} className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-600 dark:text-gray-300 flex items-center gap-2">
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
