import React from 'react';
import { useArmy, ACTION_TYPES } from '../context/ArmyContext';
import { civilizations } from '../data/civilizations';

const AGES = ['feudal', 'castle', 'imperial'];

export default function ConfigurationPanel() {
  const { state, dispatch } = useArmy();
  const { config } = state;

  const updateConfig = (updates) => {
    dispatch({ type: ACTION_TYPES.UPDATE_CONFIG, config: updates });
  };

  const applyCivilization = () => {
    dispatch({
      type: ACTION_TYPES.APPLY_CIVILIZATION,
      civId: config.previewCiv || config.selectedCiv
    });
  };

  const isPreviewing = config.previewCiv && config.previewCiv !== config.selectedCiv;
  const previewCiv = civilizations.find(civ => civ.id === (config.previewCiv || config.selectedCiv));
  const appliedCiv = civilizations.find(civ => civ.id === config.selectedCiv);

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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Resource Limit
            </label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
              value={config.totalResourceLimit}
              onChange={(e) => updateConfig({ totalResourceLimit: parseInt(e.target.value) || 0 })}
              placeholder="e.g., 20000"
            />
            <p className="text-xs text-gray-500 mt-1">Combined limit for all resources</p>
          </div>
        )}

        {/* Individual Resource Limits (shown when mode is 'individual') */}
        {config.resourceLimitMode === 'individual' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Individual Resource Limits
            </label>
            {['food', 'wood', 'gold', 'stone'].map(resource => (
              <div key={resource} className="mb-2">
                <label className="text-xs text-gray-600 capitalize">{resource}</label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-1 text-sm"
                  value={config.resourceLimits[resource]}
                  onChange={(e) => updateConfig({
                    resourceLimits: {
                      ...config.resourceLimits,
                      [resource]: parseInt(e.target.value) || 0
                    }
                  })}
                />
              </div>
            ))}
          </div>
        )}

        {/* Population Cap */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Population Cap
          </label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={config.populationCap}
            onChange={(e) => updateConfig({ populationCap: parseInt(e.target.value) || 0 })}
          />
        </div>

        {/* Age Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
          <select
            className="w-full border rounded px-3 py-2 capitalize"
            value={config.selectedAge}
            onChange={(e) => updateConfig({ selectedAge: e.target.value })}
          >
            {AGES.map(age => (
              <option key={age} value={age} className="capitalize">
                {age} Age
              </option>
            ))}
          </select>
        </div>

        {/* Fortification Mode Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mode
          </label>
          <button
            onClick={() => dispatch({ type: ACTION_TYPES.TOGGLE_FORTIFICATION_MODE })}
            className={`w-full py-2 px-4 rounded font-semibold transition-all duration-200 ${
              config.fortificationMode
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            title={config.fortificationMode
              ? 'Switch to unit selection mode'
              : 'Switch to fortification mode - plan walls, towers, and castles'}
          >
            {config.fortificationMode ? '🏰 Fortifications' : '⚔️ Units'}
          </button>
          <p className="text-xs text-gray-500 mt-1">
            {config.fortificationMode
              ? 'Build walls, towers, and castles'
              : 'Select military units'}
          </p>
        </div>

        {/* Civilization Selection */}
        <div className="md:col-span-2 lg:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Civilization
            {appliedCiv && appliedCiv.id !== 'generic' && (
              <span className="ml-2 text-xs text-blue-600 font-semibold">
                (Currently applied: {appliedCiv.name})
              </span>
            )}
          </label>
          <div className="flex gap-2">
            <select
              className={`flex-1 border rounded px-3 py-2 transition-all ${
                isPreviewing
                  ? 'border-amber-400 bg-amber-50 ring-2 ring-amber-200'
                  : 'border-gray-300'
              }`}
              value={config.previewCiv || config.selectedCiv}
              onChange={(e) => updateConfig({ previewCiv: e.target.value })}
            >
              {civilizations.map(civ => (
                <option key={civ.id} value={civ.id}>
                  {civ.name} {civ.region !== 'None' ? `(${civ.region})` : ''}
                </option>
              ))}
            </select>
            <button
              onClick={applyCivilization}
              disabled={!isPreviewing}
              className={`px-6 py-2 rounded font-semibold transition-all duration-200 ${
                isPreviewing
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              title={isPreviewing ? `Apply ${previewCiv.name} bonuses` : 'Select a different civilization to apply'}
            >
              {isPreviewing ? 'Apply' : 'Applied'}
            </button>
          </div>
          {isPreviewing && (
            <p className="text-sm text-amber-700 mt-2 flex items-center gap-1">
              <span className="animate-pulse">⚠️</span>
              <span>
                Previewing <strong>{previewCiv.name}</strong>. Click "Apply" to activate bonuses and update calculations.
              </span>
            </p>
          )}
          {!isPreviewing && appliedCiv && appliedCiv.id !== 'generic' && (
            <p className="text-sm text-green-700 mt-2 flex items-center gap-1">
              <span>✓</span>
              <span>
                <strong>{appliedCiv.name}</strong> bonuses are active and affecting your army.
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
