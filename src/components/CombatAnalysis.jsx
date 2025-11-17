import { useState, useMemo } from 'react';
import { useArmy } from '../context/ArmyContext';
import ArmyCombatStats from './ArmyCombatStats';
import CombatSimulator from './CombatSimulator';

export default function CombatAnalysis() {
  const { state } = useArmy();
  const { composition } = state;
  const [activeTab, setActiveTab] = useState('stats');

  // Check if user has any units selected
  const hasArmy = useMemo(() => Object.values(composition).some((qty) => qty > 0), [composition]);

  if (!hasArmy) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <span role="img" aria-label="combat">
            ⚔️
          </span>
          Combat Analysis
        </h3>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-600 mb-3">
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'stats'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }`}
        >
          Army Stats
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'simulator'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }`}
        >
          Battle Simulator
          <span className="ml-1 text-xs text-gray-400">(Beta)</span>
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'stats' && <ArmyCombatStatsContent />}
        {activeTab === 'simulator' && <CombatSimulatorContent />}
      </div>
    </div>
  );
}

// Wrapper to render ArmyCombatStats content without its own container
function ArmyCombatStatsContent() {
  return (
    <div className="army-stats-content">
      <ArmyCombatStats embedded={true} />
    </div>
  );
}

// Wrapper to render CombatSimulator content without its own container
function CombatSimulatorContent() {
  return (
    <div className="combat-simulator-content">
      <CombatSimulator embedded={true} />
    </div>
  );
}
