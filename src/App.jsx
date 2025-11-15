import React, { useEffect } from 'react';
import { ArmyProvider } from './context/ArmyContext';
import ConfigurationPanel from './components/ConfigurationPanel';
import ResourceTracker from './components/ResourceTracker';
import UnitSelection from './components/UnitSelection';
import ArmyCompositionSummary from './components/ArmyCompositionSummary';
import { units } from './data/units';
import { civilizations } from './data/civilizations';
import { validateGameData } from './utils/validators';
import { logger } from './utils/errorHandler';

function AppContent() {
  useEffect(() => {
    // Validate game data on mount
    const validation = validateGameData(units, civilizations);
    if (!validation.valid) {
      logger.error('Game data validation failed', validation.errors);
    }
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        Age of Empires II: Army Calculator
      </h1>

      <ConfigurationPanel />
      <ResourceTracker />
      <UnitSelection />
      <ArmyCompositionSummary />

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Age of Empires II © Microsoft Corporation</p>
        <p className="mt-2">
          Built for AoE2 players | Inspired by pro player strategies
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <ArmyProvider>
      <AppContent />
    </ArmyProvider>
  );
}

export default App;
