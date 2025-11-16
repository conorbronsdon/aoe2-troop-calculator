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
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Configuration</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Resource Limit Mode Toggle */}
        <div className="md:col-span-2 lg:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resource Limit Mode
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="resourceMode"
                value="total"
                checked={config.resourceLimitMode === 'total'}
                onChange={(e) => updateConfig({ resourceLimitMode: e.target.value })}
                className="mr-2"
              />
              <span>Total Resources</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="resourceMode"
                value="individual"
                checked={config.resourceLimitMode === 'individual'}
                onChange={(e) => updateConfig({ resourceLimitMode: e.target.value })}
                className="mr-2"
              />
              <span>Individual Resources</span>
            </label>
          </div>
        </div>

        {/* Total Resource Limit (shown when mode is 'total') */}
        {config.resourceLimitMode === 'total' && (
          <div>
            <label
              htmlFor="totalResourceLimit"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Total Resource Limit
            </label>
            <input
              id="totalResourceLimit"
              type="number"
              min="0"
              max={LIMITS.MAX_RESOURCE_VALUE}
              className="w-full border rounded px-3 py-2"
              value={config.totalResourceLimit}
              onChange={(e) =>
                updateConfig({ totalResourceLimit: validateResourceValue(e.target.value) })
              }
              placeholder="e.g., 20000"
              aria-describedby="totalResourceLimitHelp"
            />
            <p id="totalResourceLimitHelp" className="text-xs text-gray-500 mt-1">
              Combined limit for all resources (max: {LIMITS.MAX_RESOURCE_VALUE.toLocaleString()})
            </p>
          </div>
        )}

        {/* Individual Resource Limits (shown when mode is 'individual') */}
        {config.resourceLimitMode === 'individual' && (
          <div>
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-2">
                Individual Resource Limits
              </legend>
              {['food', 'wood', 'gold', 'stone'].map((resource) => (
                <div key={resource} className="mb-2">
                  <label
                    htmlFor={`resource-${resource}`}
                    className="text-xs text-gray-600 capitalize"
                  >
                    {resource}
                  </label>
                  <input
                    id={`resource-${resource}`}
                    type="number"
                    min="0"
                    max={LIMITS.MAX_RESOURCE_VALUE}
                    className="w-full border rounded px-3 py-1 text-sm"
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
            </fieldset>
          </div>
        )}

        {/* Population Cap */}
        <div>
          <label htmlFor="populationCap" className="block text-sm font-medium text-gray-700 mb-2">
            Population Cap
          </label>
          <input
            id="populationCap"
            type="number"
            min="0"
            max={LIMITS.MAX_POPULATION_CAP}
            className="w-full border rounded px-3 py-2"
            value={config.populationCap}
            onChange={(e) => updateConfig({ populationCap: validatePopulationCap(e.target.value) })}
            aria-describedby="populationCapHelp"
          />
          <p id="populationCapHelp" className="text-xs text-gray-500 mt-1">
            Max: {LIMITS.MAX_POPULATION_CAP.toLocaleString()}
          </p>
        </div>

        {/* Age Selection */}
        <div>
          <label htmlFor="ageSelect" className="block text-sm font-medium text-gray-700 mb-2">
            Age
          </label>
          <select
            id="ageSelect"
            className="w-full border rounded px-3 py-2 capitalize"
            value={config.selectedAge}
            onChange={(e) => updateConfig({ selectedAge: e.target.value })}
            aria-label="Select game age"
          >
            {AGES.map((age) => (
              <option key={age} value={age} className="capitalize">
                {age} Age
              </option>
            ))}
          </select>
        </div>

        {/* Display Mode Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Display Mode</label>
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer p-2 rounded border border-gray-300 hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="displayMode"
                value="units"
                checked={config.displayMode === 'units'}
                onChange={(e) =>
                  dispatch({ type: ACTION_TYPES.SET_DISPLAY_MODE, mode: e.target.value })
                }
                className="mr-2"
              />
              <span className="flex items-center gap-2">
                <span>⚔️</span>
                <span className="font-medium">Units Only</span>
              </span>
            </label>
            <label className="flex items-center cursor-pointer p-2 rounded border border-gray-300 hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="displayMode"
                value="both"
                checked={config.displayMode === 'both'}
                onChange={(e) =>
                  dispatch({ type: ACTION_TYPES.SET_DISPLAY_MODE, mode: e.target.value })
                }
                className="mr-2"
              />
              <span className="flex items-center gap-2">
                <span>⚔️🏰</span>
                <span className="font-medium">Units & Fortifications</span>
              </span>
            </label>
            <label className="flex items-center cursor-pointer p-2 rounded border border-gray-300 hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="displayMode"
                value="fortifications"
                checked={config.displayMode === 'fortifications'}
                onChange={(e) =>
                  dispatch({ type: ACTION_TYPES.SET_DISPLAY_MODE, mode: e.target.value })
                }
                className="mr-2"
              />
              <span className="flex items-center gap-2">
                <span>🏰</span>
                <span className="font-medium">Fortifications Only</span>
              </span>
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {config.displayMode === 'units' && 'Select military units for your army'}
            {config.displayMode === 'both' && 'Plan both military units and defensive structures'}
            {config.displayMode === 'fortifications' && 'Build walls, towers, and castles'}
          </p>
        </div>

        {/* Technology Panel Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Advanced Options</label>
          <label className="flex items-center cursor-pointer p-2 rounded border border-gray-300 hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              checked={config.showTechPanel || false}
              onChange={(e) => updateConfig({ showTechPanel: e.target.checked })}
              className="mr-2 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="flex items-center gap-2">
              <span role="img" aria-label="gear">
                ⚙️
              </span>
              <span className="font-medium">Show Technology Panel</span>
            </span>
          </label>
          <p className="text-xs text-gray-500 mt-2">
            Configure Blacksmith, University, and other upgrades to see modified unit stats
          </p>
        </div>

        {/* Civilization Selection - Enhanced with visual prominence */}
        <div className="md:col-span-2 lg:col-span-3">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-400 rounded-xl p-5 shadow-lg">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-amber-900 flex items-center gap-2">
                <span className="text-2xl">🏛️</span>
                Select Your Civilization
              </h3>
              <p className="text-sm text-amber-700 mt-1">
                Choose a civilization to apply unique bonuses to your army composition
              </p>
            </div>

            <CivilizationSelector
              selectedCivId={config.selectedCiv}
              previewCivId={config.previewCiv}
              onPreviewChange={(civId) => updateConfig({ previewCiv: civId })}
              onApply={applyCivilization}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
