import { useState, ChangeEvent } from 'react';
import { civilizations } from '../data/civilizations';
import { Civilization } from '../types';
import { getTranslatedCivName } from '../utils/translationHelpers';

/**
 * Civilization Comparison Component
 * Allows users to compare bonuses between multiple civilizations
 */
const CivilizationComparison = (): JSX.Element => {
  const [selectedCivs, setSelectedCivs] = useState<string[]>([]);

  const handleAddCiv = (civId: string): void => {
    if (selectedCivs.length < 3 && !selectedCivs.includes(civId)) {
      setSelectedCivs([...selectedCivs, civId]);
    }
  };

  const handleRemoveCiv = (civId: string): void => {
    setSelectedCivs(selectedCivs.filter((id) => id !== civId));
  };

  const getCivData = (civId: string): Civilization | undefined => civilizations.find((civ) => civ.id === civId);

  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Civilization Comparison</h2>
      </div>

      {/* Civilization Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Add Civilization to Compare (Max 3)
        </label>
        <select
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            if (e.target.value) {
              handleAddCiv(e.target.value);
              e.target.value = '';
            }
          }}
          className="w-full md:w-64 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          disabled={selectedCivs.length >= 3}
        >
          <option value="">Select a civilization...</option>
          {civilizations
            .filter((civ) => !selectedCivs.includes(civ.id))
            .map((civ) => (
              <option key={civ.id} value={civ.id}>
                {getTranslatedCivName(civ.id)} ({civ.region})
              </option>
            ))}
        </select>
      </div>

      {/* Comparison Grid */}
      {selectedCivs.length > 0 ? (
        <div className="overflow-x-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-w-full">
            {selectedCivs.map((civId) => {
              const civ = getCivData(civId);
              if (!civ) return null;
              return (
                <div key={civId} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{getTranslatedCivName(civ.id)}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{civ.region}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveCiv(civId)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-bold"
                      aria-label={`Remove ${getTranslatedCivName(civ.id)}`}
                    >
                      ×
                    </button>
                  </div>

                  {/* Bonuses */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-2">
                      Bonuses ({civ.bonuses.length})
                    </h4>
                    {civ.bonuses.length > 0 ? (
                      <ul className="text-sm space-y-1">
                        {civ.bonuses.map((bonus) => (
                          <li key={bonus.description} className="flex items-start gap-2">
                            <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                            <span className="text-gray-700 dark:text-gray-300">{bonus.description}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic">No bonuses</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>Select civilizations above to compare their bonuses</p>
        </div>
      )}

      {/* Clear All Button */}
      {selectedCivs.length > 0 && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setSelectedCivs([])}
            className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default CivilizationComparison;
