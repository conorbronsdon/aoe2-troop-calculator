import { useArmy } from '../context/ArmyContext';
import { civilizations } from '../data/civilizations';
import { getCivilizationIconUrl, FALLBACK_ICON } from '../data/civilizationIcons';

/**
 * Minimal indicator showing only preview state or generic civilization notice
 * Main civilization info is now displayed in CivilizationBonuses component
 */
export default function CivilizationIndicator(): JSX.Element | null {
  const { state } = useArmy();
  const { config } = state;

  // Get applied and preview civilizations
  const appliedCiv = civilizations.find((civ) => civ.id === config.selectedCiv);
  const previewCiv = civilizations.find(
    (civ) => civ.id === (config.previewCiv || config.selectedCiv)
  );

  const isPreviewing = config.previewCiv && config.previewCiv !== config.selectedCiv;

  // Don't render if no civilization is selected
  if (!appliedCiv) {
    return null;
  }

  // Only show indicator for preview mode
  // For regular civilizations, the CivilizationBonuses component handles the display
  // For generic civilization, the CivilizationSelector already shows a warning
  if (!isPreviewing) {
    return null;
  }

  // Show preview notice
  if (isPreviewing && previewCiv) {
    const previewIconUrl = getCivilizationIconUrl(previewCiv.id);

    return (
      <div className="rounded-lg shadow-md p-4 mb-6 border-2 border-amber-400 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {previewIconUrl ? (
              <img
                src={previewIconUrl}
                alt={`${previewCiv.name} insignia`}
                className="w-10 h-10 object-contain opacity-75"
              />
            ) : (
              <div className="text-2xl">{FALLBACK_ICON}</div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100">
                  Previewing: {previewCiv.name}
                </h3>
                <span className="px-2 py-0.5 bg-amber-200 dark:bg-amber-700 text-amber-800 dark:text-amber-200 text-xs font-semibold rounded-full animate-pulse">
                  PREVIEW
                </span>
              </div>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Click &quot;Apply Civilization&quot; to activate these bonuses
              </p>
            </div>
          </div>
          <div className="text-sm text-amber-800 dark:text-amber-200">
            <span className="font-medium">Current:</span> {appliedCiv.name}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
