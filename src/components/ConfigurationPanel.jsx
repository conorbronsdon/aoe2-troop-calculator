import { useArmy, ACTION_TYPES } from '../context/ArmyContext';
import { civilizations } from '../data/civilizations';
import { LIMITS, AGES as ALL_AGES } from '../constants';
import CivilizationSelector from './CivilizationSelector';

const AGES = ALL_AGES.filter((age) => age !== 'dark'); // Exclude Dark Age for army planning

export default function ConfigurationPanel() {
  const { state, dispatch } = useArmy();
  const { config } = state;

  const updateConfig = (updates) => {
    dispatch({ type: ACTION_TYPES.UPDATE_CONFIG, config: updates });
  };

  // Validate and clamp resource values within bounds
  const validateResourceValue = (value) => {
    const parsed = parseInt(value) || 0;
    return Math.max(0, Math.min(parsed, LIMITS.MAX_RESOURCE_VALUE));
  };

  // Validate and clamp population cap within bounds
  const validatePopulationCap = (value) => {
    const parsed = parseInt(value) || 0;
    return Math.max(0, Math.min(parsed, LIMITS.MAX_POPULATION_CAP));
  };

  const applyCivilization = () => {
    dispatch({
      type: ACTION_TYPES.APPLY_CIVILIZATION,
      civId: config.previewCiv || config.selectedCiv,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transition-colors duration-300">
      <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">Configuration</h2>

      <div className="space-y-4">
        {/* Civilization Selection - Most important, first */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-400 dark:border-amber-600 rounded-lg p-3">
          <div className="mb-2">
            <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1">
              <span>🏛️</span>
              Civilization
            </h3>
          </div>
          <CivilizationSelector
            selectedCivId={config.selectedCiv}
            previewCivId={config.previewCiv}
            onPreviewChange={(civId) => updateConfig({ previewCiv: civId })}
            onApply={applyCivilization}
          />
        </div>

        {/* Age and Display Mode - Side by side */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="ageSelect" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Age
            </label>
            <select
              id="ageSelect"
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1.5 text-sm capitalize bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={config.selectedAge}
              onChange={(e) => updateConfig({ selectedAge: e.target.value })}
              aria-label="Select game age"
            >
              {AGES.map((age) => (
                <option key={age} value={age} className="capitalize">
                  {age}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="populationCap" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Pop Cap
            </label>
            <input
              id="populationCap"
              type="number"
              min="0"
              max={LIMITS.MAX_POPULATION_CAP}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={config.populationCap}
              onChange={(e) => updateConfig({ populationCap: validatePopulationCap(e.target.value) })}
            />
          </div>
        </div>

        {/* Display Mode */}
        <div>
          <label htmlFor="displayModeSelect" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Display Mode
          </label>
          <select
            id="displayModeSelect"
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={config.displayMode}
            onChange={(e) =>
              dispatch({ type: ACTION_TYPES.SET_DISPLAY_MODE, mode: e.target.value })
            }
            aria-label="Select display mode"
          >
            <option value="units">⚔️ Units Only</option>
            <option value="both">⚔️🏰 Units & Fortifications</option>
            <option value="fortifications">🏰 Fortifications Only</option>
          </select>
        </div>

        {/* Resource Limit Mode */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Resource Mode
          </label>
          <div className="flex gap-3 text-sm">
            <label className="flex items-center cursor-pointer text-gray-900 dark:text-gray-100">
              <input
                type="radio"
                name="resourceMode"
                value="total"
                checked={config.resourceLimitMode === 'total'}
                onChange={(e) => updateConfig({ resourceLimitMode: e.target.value })}
                className="mr-1.5"
              />
              <span>Total</span>
            </label>
            <label className="flex items-center cursor-pointer text-gray-900 dark:text-gray-100">
              <input
                type="radio"
                name="resourceMode"
                value="individual"
                checked={config.resourceLimitMode === 'individual'}
                onChange={(e) => updateConfig({ resourceLimitMode: e.target.value })}
                className="mr-1.5"
              />
              <span>Individual</span>
            </label>
          </div>
        </div>

        {/* Total Resource Limit */}
        {config.resourceLimitMode === 'total' && (
          <div>
            <label
              htmlFor="totalResourceLimit"
              className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Total Resource Limit
            </label>
            <input
              id="totalResourceLimit"
              type="number"
              min="0"
              max={LIMITS.MAX_RESOURCE_VALUE}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={config.totalResourceLimit}
              onChange={(e) =>
                updateConfig({ totalResourceLimit: validateResourceValue(e.target.value) })
              }
              placeholder="e.g., 20000"
            />
          </div>
        )}

        {/* Individual Resource Limits */}
        {config.resourceLimitMode === 'individual' && (
          <div>
            <fieldset>
              <legend className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Resource Limits
              </legend>
              <div className="grid grid-cols-2 gap-2">
                {['food', 'wood', 'gold', 'stone'].map((resource) => (
                  <div key={resource}>
                    <label
                      htmlFor={`resource-${resource}`}
                      className="text-xs text-gray-600 dark:text-gray-400 capitalize"
                    >
                      {resource}
                    </label>
                    <input
                      id={`resource-${resource}`}
                      type="number"
                      min="0"
                      max={LIMITS.MAX_RESOURCE_VALUE}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      value={config.resourceLimits[resource]}
                      onChange={(e) =>
                        updateConfig({
                          resourceLimits: {
                            ...config.resourceLimits,
                            [resource]: validateResourceValue(e.target.value),
                          },
                        })
                      }
                      aria-label={`${resource} resource limit`}
                    />
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {/* Technology Panel Toggle */}
        <div>
          <label className="flex items-center cursor-pointer p-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100 text-sm">
            <input
              type="checkbox"
              checked={config.showTechPanel || false}
              onChange={(e) => updateConfig({ showTechPanel: e.target.checked })}
              className="mr-2 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="flex items-center gap-1.5">
              <span role="img" aria-label="gear">⚙️</span>
              <span className="font-medium">Technology Panel</span>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
