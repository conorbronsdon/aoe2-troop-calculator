import { useArmy } from '../context/ArmyContext';
import { civilizations } from '../data/civilizations';

/**
 * Prominent indicator showing the currently applied civilization
 * Always visible to show which civilization bonuses are active
 */
export default function CivilizationIndicator() {
  const { state } = useArmy();
  const { config, composition } = state;

  // Get applied and preview civilizations
  const appliedCiv = civilizations.find((civ) => civ.id === config.selectedCiv);
  const previewCiv = civilizations.find(
    (civ) => civ.id === (config.previewCiv || config.selectedCiv)
  );

  const isPreviewing = config.previewCiv && config.previewCiv !== config.selectedCiv;

  // Count how many bonuses are affecting current army composition
  const activeBonusCount =
    appliedCiv && appliedCiv.id !== 'generic'
      ? appliedCiv.bonuses.filter((bonus) => {
          if (bonus.type !== 'cost') {
            return false;
          }
          if (bonus.units === 'all') {
            return Object.keys(composition).length > 0;
          }

          // Check if any units in composition are affected by this bonus
          return Object.keys(composition).some(
            (unitId) =>
              bonus.units.includes(unitId) ||
              bonus.units.some((bonusUnit) => unitId.includes(bonusUnit))
          );
        }).length
      : 0;

  // Don't render if no civilization is selected
  if (!appliedCiv) {
    return null;
  }

  const isGeneric = appliedCiv.id === 'generic';

  return (
    <div
      className={`rounded-lg shadow-lg p-4 mb-6 border-2 transition-all duration-300 ${
        isGeneric
          ? 'bg-gray-50 border-gray-300'
          : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-400'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Civilization Icon/Indicator */}
          <div className={`text-4xl ${isGeneric ? 'opacity-50' : ''}`}>
            {isGeneric ? '⚔️' : '🏛️'}
          </div>

          {/* Civilization Info */}
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-xl font-bold ${isGeneric ? 'text-gray-700' : 'text-blue-900'}`}>
                {appliedCiv.name}
              </h3>
              {!isGeneric && (
                <span className="px-2 py-1 bg-blue-200 text-blue-800 text-xs font-semibold rounded-full">
                  ACTIVE
                </span>
              )}
              {isPreviewing && (
                <span className="px-2 py-1 bg-amber-200 text-amber-800 text-xs font-semibold rounded-full animate-pulse">
                  PREVIEWING: {previewCiv.name}
                </span>
              )}
            </div>

            <div className={`text-sm ${isGeneric ? 'text-gray-600' : 'text-blue-700'}`}>
              <span className="font-medium">{appliedCiv.region}</span>
              {!isGeneric && (
                <>
                  <span className="mx-2">•</span>
                  <span>
                    {appliedCiv.bonuses.length} total bonus
                    {appliedCiv.bonuses.length !== 1 ? 'es' : ''}
                  </span>
                  {activeBonusCount > 0 && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="font-semibold text-green-600">
                        {activeBonusCount} affecting current army
                      </span>
                    </>
                  )}
                </>
              )}
              {isGeneric && <span> • No bonuses applied</span>}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        {!isGeneric && (
          <div className="hidden md:flex gap-4 text-sm">
            <div className="text-center px-3 py-2 bg-white rounded-lg shadow-sm">
              <div className="text-2xl">💰</div>
              <div className="font-semibold text-blue-900">
                {appliedCiv.bonuses.filter((b) => b.type === 'cost').length}
              </div>
              <div className="text-xs text-gray-600">Cost</div>
            </div>
            <div className="text-center px-3 py-2 bg-white rounded-lg shadow-sm">
              <div className="text-2xl">⚔️</div>
              <div className="font-semibold text-blue-900">
                {appliedCiv.bonuses.filter((b) => b.type === 'stat').length}
              </div>
              <div className="text-xs text-gray-600">Stat</div>
            </div>
            <div className="text-center px-3 py-2 bg-white rounded-lg shadow-sm">
              <div className="text-2xl">🌾</div>
              <div className="font-semibold text-blue-900">
                {appliedCiv.bonuses.filter((b) => b.type === 'economic').length}
              </div>
              <div className="text-xs text-gray-600">Economic</div>
            </div>
          </div>
        )}
      </div>

      {/* Preview notice */}
      {isPreviewing && (
        <div className="mt-3 p-2 bg-amber-100 border border-amber-300 rounded text-sm text-amber-800">
          <strong>Preview Mode:</strong> You are previewing {previewCiv.name}. Click &quot;Apply
          Civilization&quot; to activate bonuses.
        </div>
      )}
    </div>
  );
}
