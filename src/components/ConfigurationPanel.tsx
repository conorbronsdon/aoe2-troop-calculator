import React from 'react';
import { useTranslation } from 'react-i18next';
import { useArmy, ACTION_TYPES, ArmyConfig } from '../context/ArmyContext';
import { LIMITS, AGES as ALL_AGES } from '../constants';
import CivilizationSelector from './CivilizationSelector';
import Tooltip from './Tooltip';
import { Age, DisplayMode } from '../types';

const AGES = ALL_AGES.filter((age) => age !== 'dark'); // Exclude Dark Age for army planning

export default function ConfigurationPanel(): React.ReactElement {
  const { t } = useTranslation();
  const { state, dispatch } = useArmy();
  const { config } = state;

  const updateConfig = (updates: Partial<ArmyConfig>): void => {
    dispatch({ type: ACTION_TYPES.UPDATE_CONFIG, config: updates });
  };

  // Validate and clamp resource values within bounds
  const validateResourceValue = (value: string): number => {
    const parsed = parseInt(value) || 0;
    return Math.max(0, Math.min(parsed, LIMITS.MAX_RESOURCE_VALUE));
  };

  // Validate and clamp population cap within bounds
  const validatePopulationCap = (value: string): number => {
    const parsed = parseInt(value) || 0;
    return Math.max(0, Math.min(parsed, LIMITS.MAX_POPULATION_CAP));
  };

  const applyCivilization = (): void => {
    dispatch({
      type: ACTION_TYPES.APPLY_CIVILIZATION,
      civId: config.previewCiv || config.selectedCiv,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transition-colors duration-300">
      <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">{t('configuration.title')}</h2>

      <div className="space-y-4">
        {/* Civilization Selection - Most important, first */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-400 dark:border-amber-600 rounded-lg p-3">
          <div className="mb-2">
            <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1">
              <span>🏛️</span>
              {t('configuration.civilization')}
            </h3>
          </div>
          <CivilizationSelector
            selectedCivId={config.selectedCiv}
            previewCivId={config.previewCiv}
            onPreviewChange={(civId: string) => updateConfig({ previewCiv: civId })}
            onApply={applyCivilization}
          />
        </div>

        {/* Age and Display Mode - Side by side */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="ageSelect" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('configuration.age')}
            </label>
            <select
              id="ageSelect"
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1.5 text-sm capitalize bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={config.selectedAge}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateConfig({ selectedAge: e.target.value as Age })}
              aria-label="Select game age"
            >
              {AGES.map((age) => (
                <option key={age} value={age} className="capitalize">
                  {t(`ages.${age}`)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="populationCap" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('configuration.popCap')}
            </label>
            <input
              id="populationCap"
              type="number"
              min="0"
              max={LIMITS.MAX_POPULATION_CAP}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={config.populationCap}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateConfig({ populationCap: validatePopulationCap(e.target.value) })}
            />
          </div>
        </div>

        {/* Display Mode */}
        <div>
          <label htmlFor="displayModeSelect" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('configuration.displayMode')}
          </label>
          <select
            id="displayModeSelect"
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={config.displayMode}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              dispatch({ type: ACTION_TYPES.SET_DISPLAY_MODE, mode: e.target.value as DisplayMode })
            }
            aria-label="Select display mode"
          >
            <option value="units">⚔️ {t('displayModes.units')}</option>
            <option value="both">⚔️🏰 {t('displayModes.both')}</option>
            <option value="fortifications">🏰 {t('displayModes.fortifications')}</option>
          </select>
        </div>

        {/* Resource Limit Mode */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('configuration.resourceMode')}
          </label>
          <div className="flex gap-3 text-sm">
            <label className="flex items-center cursor-pointer text-gray-900 dark:text-gray-100">
              <input
                type="radio"
                name="resourceMode"
                value="total"
                checked={config.resourceLimitMode === 'total'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateConfig({ resourceLimitMode: e.target.value as 'total' | 'individual' })}
                className="mr-1.5"
              />
              <span>{t('configuration.total')}</span>
            </label>
            <label className="flex items-center cursor-pointer text-gray-900 dark:text-gray-100">
              <input
                type="radio"
                name="resourceMode"
                value="individual"
                checked={config.resourceLimitMode === 'individual'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateConfig({ resourceLimitMode: e.target.value as 'total' | 'individual' })}
                className="mr-1.5"
              />
              <span>{t('configuration.individual')}</span>
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
              {t('configuration.totalResourceLimit')}
            </label>
            <input
              id="totalResourceLimit"
              type="number"
              min="0"
              max={LIMITS.MAX_RESOURCE_VALUE}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1.5 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              value={config.totalResourceLimit}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                {t('configuration.resourceLimits')}
              </legend>
              <div className="grid grid-cols-2 gap-2">
                {(['food', 'wood', 'gold', 'stone'] as const).map((resource) => (
                  <div key={resource}>
                    <label
                      htmlFor={`resource-${resource}`}
                      className="text-xs text-gray-600 dark:text-gray-400 capitalize"
                    >
                      {t(`resources.${resource}`)}
                    </label>
                    <input
                      id={`resource-${resource}`}
                      type="number"
                      min="0"
                      max={LIMITS.MAX_RESOURCE_VALUE}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      value={config.resourceLimits[resource]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateConfig({ showTechPanel: e.target.checked })}
              className="mr-2 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="flex items-center gap-1.5">
              <Tooltip content="Research technologies to boost units">
                <span role="img" aria-label="gear">⚙️</span>
              </Tooltip>
              <span className="font-medium">{t('configuration.technologyPanel')}</span>
            </span>
          </label>
        </div>

        {/* Unit Card Stats Toggle */}
        <div>
          <label className="flex items-center cursor-pointer p-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100 text-sm">
            <input
              type="checkbox"
              checked={config.showUnitCardStats || false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateConfig({ showUnitCardStats: e.target.checked })}
              className="mr-2 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="flex items-center gap-1.5">
              <Tooltip content="Show HP, attack, and armor on unit cards">
                <span role="img" aria-label="stats">📊</span>
              </Tooltip>
              <span className="font-medium">{t('configuration.showUnitCardStats')}</span>
            </span>
          </label>
        </div>

        {/* Team Bonuses Toggle */}
        <div>
          <label className="flex items-center cursor-pointer p-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100 text-sm">
            <input
              type="checkbox"
              checked={config.showTeamBonuses || false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateConfig({ showTeamBonuses: e.target.checked })}
              className="mr-2 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="flex items-center gap-1.5">
              <Tooltip content="Configure allied civilizations for team bonuses">
                <span role="img" aria-label="team">🤝</span>
              </Tooltip>
              <span className="font-medium">{t('configuration.teamBonuses')}</span>
            </span>
          </label>
        </div>

        {/* Civilization Comparison Toggle */}
        <div>
          <label className="flex items-center cursor-pointer p-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100 text-sm">
            <input
              type="checkbox"
              checked={config.showCivComparison || false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateConfig({ showCivComparison: e.target.checked })}
              className="mr-2 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="flex items-center gap-1.5">
              <Tooltip content="Compare bonuses between civilizations">
                <span role="img" aria-label="comparison">⚖️</span>
              </Tooltip>
              <span className="font-medium">{t('configuration.civComparison')}</span>
            </span>
          </label>
        </div>

        {/* Combat Analysis Toggle */}
        <div>
          <label className="flex items-center cursor-pointer p-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100 text-sm">
            <input
              type="checkbox"
              checked={config.showCombatAnalysis || false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateConfig({ showCombatAnalysis: e.target.checked })}
              className="mr-2 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="flex items-center gap-1.5">
              <Tooltip content="Analyze army combat effectiveness">
                <span role="img" aria-label="combat">⚔️</span>
              </Tooltip>
              <span className="font-medium">{t('configuration.combatAnalysis')}</span>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
