import React, { useState } from 'react';
import { useArmy } from '../context/ArmyContext';
import { civilizations } from '../data/civilizations';

export default function CivilizationBonuses() {
  const { state } = useArmy();
  const { config } = state;
  const [isExpanded, setIsExpanded] = useState(false);

  // Get current civilization
  const currentCiv = civilizations.find(civ => civ.id === config.selectedCivilization);

  // Don't show for generic civilization
  if (!currentCiv || currentCiv.id === 'generic' || !currentCiv.bonuses || currentCiv.bonuses.length === 0) {
    return null;
  }

  // Categorize bonuses by type
  const costBonuses = currentCiv.bonuses.filter(b => b.type === 'cost');
  const statBonuses = currentCiv.bonuses.filter(b => b.type === 'stat');
  const economicBonuses = currentCiv.bonuses.filter(b => b.type === 'economic');

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
              {currentCiv.region} • {currentCiv.bonuses.length} active bonus{currentCiv.bonuses.length !== 1 ? 'es' : ''}
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
              </h4>
              <ul className="space-y-1 ml-6">
                {costBonuses.map((bonus, idx) => (
                  <li key={idx} className="text-sm text-amber-900 dark:text-amber-100">
                    <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                    {bonus.description}
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
