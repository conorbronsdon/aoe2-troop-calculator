import { useState } from 'react';
import { civilizations } from '../data/civilizations';

/**
 * Civilization Comparison Component
 * Allows users to compare bonuses between multiple civilizations
 */
const CivilizationComparison = () => {
  const [selectedCivs, setSelectedCivs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddCiv = (civId) => {
    if (selectedCivs.length < 3 && !selectedCivs.includes(civId)) {
      setSelectedCivs([...selectedCivs, civId]);
    }
  };

  const handleRemoveCiv = (civId) => {
    setSelectedCivs(selectedCivs.filter((id) => id !== civId));
  };

  const getCivData = (civId) => civilizations.find((civ) => civ.id === civId);

  if (!isOpen) {
    return (
      <div className="mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Compare Civilizations
        </button>
      </div>
    );
  }

  return (
    <div className="mb-6 border rounded-lg p-4 bg-white shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Civilization Comparison</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          aria-label="Close comparison"
        >
          ×
        </button>
      </div>

      {/* Civilization Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add Civilization to Compare (Max 3)
        </label>
        <select
          onChange={(e) => {
            if (e.target.value) {
              handleAddCiv(e.target.value);
              e.target.value = '';
            }
          }}
          className="w-full md:w-64 border rounded px-3 py-2"
          disabled={selectedCivs.length >= 3}
        >
          <option value="">Select a civilization...</option>
          {civilizations
            .filter((civ) => !selectedCivs.includes(civ.id))
            .map((civ) => (
              <option key={civ.id} value={civ.id}>
                {civ.name} ({civ.region})
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
              return (
                <div key={civId} className="border rounded-lg p-4 bg-gray-50">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{civ.name}</h3>
                      <p className="text-sm text-gray-600">{civ.region}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveCiv(civId)}
                      className="text-red-500 hover:text-red-700 font-bold"
                      aria-label={`Remove ${civ.name}`}
                    >
                      ×
                    </button>
                  </div>

                  {/* Bonuses */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">
                      Bonuses ({civ.bonuses.length})
                    </h4>
                    {civ.bonuses.length > 0 ? (
                      <ul className="text-sm space-y-1">
                        {civ.bonuses.map((bonus) => (
                          <li key={bonus.description} className="flex items-start gap-2">
                            <span className="text-green-600 mt-0.5">✓</span>
                            <span className="text-gray-700">{bonus.description}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No bonuses</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>Select civilizations above to compare their bonuses</p>
        </div>
      )}

      {/* Clear All Button */}
      {selectedCivs.length > 0 && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setSelectedCivs([])}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default CivilizationComparison;
