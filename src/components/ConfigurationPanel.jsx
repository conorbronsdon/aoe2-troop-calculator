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

        {/* Civilization Selection */}
        <div className="md:col-span-2 lg:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Civilization
          </label>
          <select
            className="w-full border rounded px-3 py-2"
            value={config.selectedCiv}
            onChange={(e) => updateConfig({ selectedCiv: e.target.value })}
          >
            {civilizations.map(civ => (
              <option key={civ.id} value={civ.id}>
                {civ.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
