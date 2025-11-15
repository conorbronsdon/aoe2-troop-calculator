import React, { useState } from 'react';
import { useArmy } from '../context/ArmyContext';
import { civilizations } from '../data/civilizations';

export default function CivilizationBonuses() {
  const { state } = useArmy();
  const { config, composition } = state;
  const [isExpanded, setIsExpanded] = useState(true); // Start expanded by default

  // Get current civilization (use selectedCiv which is the applied one)
  const currentCiv = civilizations.find(civ => civ.id === config.selectedCiv);

  // Don't show for generic civilization
  if (!currentCiv || currentCiv.id === 'generic' || !currentCiv.bonuses || currentCiv.bonuses.length === 0) {
    return null;
  }

  // Helper function to check if a bonus is actively affecting the current army
  const isBonusActive = (bonus) => {
    if (bonus.type !== 'cost') return false; // Only cost bonuses affect calculations
    if (bonus.units === 'all') return Object.keys(composition).length > 0;

    // Check if any units in composition are affected by this bonus
    return Object.keys(composition).some(unitId =>
      bonus.units.includes(unitId) ||
      bonus.units.some(bonusUnit => unitId.includes(bonusUnit))
    );
  };

  // Categorize bonuses by type and mark which are active
  const costBonuses = currentCiv.bonuses
    .filter(b => b.type === 'cost')
    .map(b => ({ ...b, isActive: isBonusActive(b) }));
  const statBonuses = currentCiv.bonuses.filter(b => b.type === 'stat');
  const economicBonuses = currentCiv.bonuses.filter(b => b.type === 'economic');

  const activeBonusCount = costBonuses.filter(b => b.isActive).length;

  return (
    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg shadow-md p-4 mb-6 border border-amber-200 dark:border-amber-700">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="text-2xl">🏛️</div>
          <div>
            <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100">
              {currentCiv.name} Bonuses
            </h3>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              {currentCiv.region} • {currentCiv.bonuses.length} total bonus{currentCiv.bonuses.length !== 1 ? 'es' : ''}
              {activeBonusCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-green-200 text-green-800 rounded-full font-semibold">
                  {activeBonusCount} affecting army
                </span>
              )}
            </p>
          </div>
        </div>
        <button className="text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 transition-colors">
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          {/* Cost Bonuses */}
          {costBonuses.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                <span className="text-lg">💰</span>
                Cost Reduction Bonuses
                {activeBonusCount > 0 && (
                  <span className="text-xs text-green-600">({activeBonusCount} active)</span>
                )}
              </h4>
              <ul className="space-y-2 ml-6">
                {costBonuses.map((bonus, idx) => (
                  <li
                    key={idx}
                    className={`text-sm p-2 rounded transition-all ${
                      bonus.isActive
                        ? 'bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 text-green-900 dark:text-green-100 font-semibold -ml-2 pl-4'
                        : 'text-amber-900 dark:text-amber-100'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className={`inline-block w-2 h-2 rounded-full mt-1.5 ${
                        bonus.isActive ? 'bg-green-500 animate-pulse' : 'bg-amber-500'
                      }`}></span>
                      <div className="flex-1">
                        {bonus.description}
                        {bonus.isActive && (
                          <div className="text-xs text-green-700 dark:text-green-300 mt-1">
                            ✓ Currently affecting units in your army
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stat Bonuses */}
          {statBonuses.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                <span className="text-lg">⚔️</span>
                Military Bonuses
              </h4>
              <ul className="space-y-1 ml-6">
                {statBonuses.map((bonus, idx) => (
                  <li key={idx} className="text-sm text-amber-900 dark:text-amber-100">
                    <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                    {bonus.description}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Economic Bonuses */}
          {economicBonuses.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                <span className="text-lg">🌾</span>
                Economic Bonuses
              </h4>
              <ul className="space-y-1 ml-6">
                {economicBonuses.map((bonus, idx) => (
                  <li key={idx} className="text-sm text-amber-900 dark:text-amber-100">
                    <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                    {bonus.description}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Team Bonus */}
          {currentCiv.teamBonus && (
            <div className="border-t border-amber-300 dark:border-amber-700 pt-3 mt-3">
              <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                <span className="text-lg">🤝</span>
                Team Bonus
              </h4>
              <p className="text-sm text-amber-900 dark:text-amber-100 ml-6">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {currentCiv.teamBonus.description}
              </p>
            </div>
          )}

          {/* Info note */}
          <div className="bg-amber-100 dark:bg-amber-900/30 rounded p-2 mt-3">
            <p className="text-xs text-amber-800 dark:text-amber-200">
              💡 <strong>Note:</strong> Cost bonuses are automatically applied to unit calculations.
              Stat bonuses and economic bonuses are shown for reference.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
