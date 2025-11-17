import { useState } from 'react';
import PropTypes from 'prop-types';
import { useArmy, ACTION_TYPES } from '../context/ArmyContext';
import { presets, presetCategories, getPresetsByCategory, getPresetById } from '../data/presets';
import { units } from '../data/units';
import { civilizations } from '../data/civilizations';
import { FaLayerGroup, FaInfoCircle } from 'react-icons/fa';

/**
 * Get unit name by ID
 */
const getUnitName = (unitId) => {
  const unit = units.find((u) => u.id === unitId);
  return unit ? unit.name : unitId;
};

/**
 * Get civilization name by ID
 */
const getCivName = (civId) => {
  const civ = civilizations.find((c) => c.id === civId);
  return civ ? civ.name : civId;
};

/**
 * PresetSelector component for loading pre-configured army compositions
 */
export default function PresetSelector() {
  const { dispatch } = useArmy();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('');
  const [message, setMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const categoryPresets = selectedCategory ? getPresetsByCategory(selectedCategory) : [];
  const presetDetails = selectedPreset ? getPresetById(selectedPreset) : null;

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedPreset('');
    setShowPreview(false);
  };

  const handlePresetChange = (presetId) => {
    setSelectedPreset(presetId);
    setShowPreview(!!presetId);
  };

  const handleLoadPreset = () => {
    if (!presetDetails) {
      setMessage('Please select a preset first');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    // Load the preset composition
    dispatch({
      type: ACTION_TYPES.IMPORT_COMPOSITION,
      composition: presetDetails.composition,
      config: presetDetails.config,
      mode: 'replace',
    });

    // If preset has a specific civ, apply it
    if (presetDetails.config.selectedCiv) {
      dispatch({
        type: ACTION_TYPES.APPLY_CIVILIZATION,
        civId: presetDetails.config.selectedCiv,
      });
    }

    setMessage(`✓ Loaded: ${presetDetails.name}`);
    setTimeout(() => setMessage(''), 3000);

    // Reset selections
    setSelectedCategory('');
    setSelectedPreset('');
    setShowPreview(false);
  };

  const handleMergePreset = () => {
    if (!presetDetails) {
      setMessage('Please select a preset first');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    // Merge the preset composition with existing
    dispatch({
      type: ACTION_TYPES.IMPORT_COMPOSITION,
      composition: presetDetails.composition,
      config: {}, // Don't override config on merge
      mode: 'merge',
    });

    setMessage(`✓ Merged: ${presetDetails.name}`);
    setTimeout(() => setMessage(''), 3000);
  };

  const calculateTotalUnits = (composition) => Object.values(composition).reduce((sum, qty) => sum + qty, 0);

  const calculateTotalCost = (composition) => {
    const totals = { food: 0, wood: 0, gold: 0, stone: 0 };
    Object.entries(composition).forEach(([unitId, quantity]) => {
      const unit = units.find((u) => u.id === unitId);
      if (unit) {
        totals.food += unit.cost.food * quantity;
        totals.wood += unit.cost.wood * quantity;
        totals.gold += unit.cost.gold * quantity;
        totals.stone += unit.cost.stone * quantity;
      }
    });
    return totals;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 transition-colors duration-300">
      <div className="flex items-center gap-2 mb-4">
        <FaLayerGroup className="text-purple-500 dark:text-purple-400 w-6 h-6" />
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Preset Army Compositions
        </h2>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
        Load pre-configured meta builds and strategies. Perfect for learning common army compositions
        or quickly setting up a proven strategy.
      </p>

      {message && (
        <div className="mb-4 text-sm text-center text-green-600 dark:text-green-400 font-medium">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Category Selection */}
        <div>
          <label
            htmlFor="preset-category"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Category
          </label>
          <select
            id="preset-category"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
          >
            <option value="">-- Select Category --</option>
            {presetCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {selectedCategory && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {presetCategories.find((c) => c.id === selectedCategory)?.description}
            </p>
          )}
        </div>

        {/* Preset Selection */}
        <div>
          <label
            htmlFor="preset-selection"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Build
          </label>
          <select
            id="preset-selection"
            value={selectedPreset}
            onChange={(e) => handlePresetChange(e.target.value)}
            disabled={!selectedCategory}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">-- Select Build --</option>
            {categoryPresets.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Preset Preview */}
      {showPreview && presetDetails && (
        <div className="border border-purple-200 dark:border-purple-700 rounded-lg p-4 mb-4 bg-purple-50 dark:bg-purple-900/20">
          <div className="flex items-start gap-2 mb-3">
            <FaInfoCircle className="text-purple-500 dark:text-purple-400 w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-purple-800 dark:text-purple-200">
                {presetDetails.name}
              </h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                {presetDetails.description}
              </p>
            </div>
          </div>

          {/* Recommended Civs */}
          {presetDetails.recommendedCivs.length > 0 && (
            <div className="mb-3">
              <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                Recommended for:{' '}
              </span>
              <span className="text-xs text-purple-700 dark:text-purple-300">
                {presetDetails.recommendedCivs.map((civId) => getCivName(civId)).join(', ')}
              </span>
            </div>
          )}

          {/* Composition Preview */}
          <div className="bg-white dark:bg-gray-800 rounded p-3 mb-3">
            <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Units ({calculateTotalUnits(presetDetails.composition)} total):
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(presetDetails.composition).map(([unitId, quantity]) => (
                <div
                  key={unitId}
                  className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-2 py-1"
                >
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {quantity}x{' '}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{getUnitName(unitId)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Preview */}
          <div className="bg-white dark:bg-gray-800 rounded p-3 mb-3">
            <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
              Total Cost:
            </div>
            <div className="flex flex-wrap gap-3 text-xs">
              {Object.entries(calculateTotalCost(presetDetails.composition)).map(
                ([resource, amount]) =>
                  amount > 0 && (
                    <div key={resource} className="flex items-center gap-1">
                      <span
                        className={`font-medium ${
                          resource === 'food'
                            ? 'text-red-600 dark:text-red-400'
                            : resource === 'wood'
                              ? 'text-amber-600 dark:text-amber-400'
                              : resource === 'gold'
                                ? 'text-yellow-600 dark:text-yellow-400'
                                : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {resource.charAt(0).toUpperCase() + resource.slice(1)}:
                      </span>
                      <span className="text-gray-900 dark:text-gray-100">
                        {amount.toLocaleString()}
                      </span>
                    </div>
                  )
              )}
            </div>
          </div>

          {/* Age Info */}
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Age: <span className="font-medium capitalize">{presetDetails.config.selectedAge}</span>
            {presetDetails.config.selectedCiv && (
              <>
                {' '}
                • Civilization:{' '}
                <span className="font-medium">{getCivName(presetDetails.config.selectedCiv)}</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleLoadPreset}
          disabled={!selectedPreset}
          className="bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white px-6 py-2 rounded font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Load Preset
        </button>
        <button
          onClick={handleMergePreset}
          disabled={!selectedPreset}
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 py-2 rounded font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Merge with Current
        </button>
        <button
          onClick={() => {
            setSelectedCategory('');
            setSelectedPreset('');
            setShowPreview(false);
          }}
          className="bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500 text-white px-4 py-2 rounded text-sm transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400 flex flex-wrap gap-4">
          <span>
            <strong>{presets.length}</strong> total presets
          </span>
          <span>
            <strong>{presetCategories.length}</strong> categories
          </span>
          <span>
            <strong>{presets.filter((p) => p.category === 'civ-specific').length}</strong>{' '}
            civilization-specific builds
          </span>
        </div>
      </div>
    </div>
  );
}

PresetSelector.propTypes = {};
