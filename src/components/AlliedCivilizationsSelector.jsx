import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useArmy, ACTION_TYPES } from '../context/ArmyContext';
import { civilizations, getCivilizationById } from '../data/civilizations';
import { FaUsers, FaTimes, FaPlus } from 'react-icons/fa';

export default function AlliedCivilizationsSelector() {
  const { t } = useTranslation();
  const { state, dispatch } = useArmy();
  const { config } = state;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const availableCivs = civilizations.filter(
    (civ) =>
      civ.id !== 'generic' &&
      civ.id !== config.selectedCiv &&
      !config.alliedCivs.includes(civ.id)
  );

  const filteredCivs = availableCivs.filter((civ) =>
    civ.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAlly = (civId) => {
    if (config.alliedCivs.length < 3) {
      dispatch({
        type: ACTION_TYPES.SET_ALLIED_CIVS,
        civIds: [...config.alliedCivs, civId],
      });
    }
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  const handleRemoveAlly = (civId) => {
    dispatch({
      type: ACTION_TYPES.SET_ALLIED_CIVS,
      civIds: config.alliedCivs.filter((id) => id !== civId),
    });
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 border border-purple-400 dark:border-purple-600 rounded-lg p-3">
      <div className="mb-2">
        <h3 className="text-sm font-bold text-purple-900 dark:text-purple-200 flex items-center gap-1">
          <FaUsers className="w-4 h-4" />
          {t('configuration.alliedCivilizations')}
        </h3>
        <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
          {t('configuration.selectAllies')}
        </p>
      </div>

      {/* Selected Allies */}
      <div className="space-y-2 mb-3">
        {config.alliedCivs.length === 0 ? (
          <p className="text-xs text-gray-500 dark:text-gray-400 italic">
            {t('configuration.noAlliesSelected')}
          </p>
        ) : (
          config.alliedCivs.map((civId) => {
            const civ = getCivilizationById(civId);
            return (
              <div
                key={civId}
                className="flex items-center justify-between bg-white dark:bg-gray-700 rounded px-2 py-1.5 shadow-sm"
              >
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {civ?.name || civId}
                </span>
                <button
                  onClick={() => handleRemoveAlly(civId)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                  aria-label={`Remove ${civ?.name || civId}`}
                >
                  <FaTimes className="w-3 h-3" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Add Ally Button */}
      {config.alliedCivs.length < 3 && (
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            <FaPlus className="w-3 h-3" />
            Add Ally ({config.alliedCivs.length}/3)
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-60 overflow-hidden">
              <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search civilizations..."
                  className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  autoFocus
                />
              </div>
              <div className="max-h-48 overflow-y-auto">
                {filteredCivs.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400 p-3 text-center">
                    No civilizations found
                  </p>
                ) : (
                  filteredCivs.map((civ) => (
                    <button
                      key={civ.id}
                      onClick={() => handleAddAlly(civ.id)}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-purple-50 dark:hover:bg-purple-900/30 text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-between"
                    >
                      <span>{civ.name}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">{civ.region}</span>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

AlliedCivilizationsSelector.propTypes = {};
