import React, { useEffect } from 'react';
import { ArmyProvider, useArmy, ACTION_TYPES } from './context/ArmyContext';
import ConfigurationPanel from './components/ConfigurationPanel';
import ResourceTracker from './components/ResourceTracker';
import UnitSelection from './components/UnitSelection';
import ArmyCompositionSummary from './components/ArmyCompositionSummary';
import SaveLoadPanel from './components/SaveLoadPanel';
import SocialShareButtons from './components/SocialShareButtons';
import BuyMeCoffee from './components/BuyMeCoffee';
import CivilizationComparison from './components/CivilizationComparison';
import { units } from './data/units';
import { civilizations } from './data/civilizations';
import { validateGameData } from './utils/validators';
import { logger } from './utils/errorHandler';
import { ShareService } from './services/share.service';
import { initializeAnalytics } from './utils/analytics';
import { analyticsConfig } from './config/analytics.config';

function AppContent() {
  const { dispatch } = useArmy();

  useEffect(() => {
    // Initialize analytics
    if (analyticsConfig.enabled && analyticsConfig.measurementId) {
      initializeAnalytics(analyticsConfig.measurementId);
      logger.info('Analytics initialized');
    }

    // Validate game data on mount
    const validation = validateGameData(units, civilizations);
    if (!validation.valid) {
      logger.error('Game data validation failed', validation.errors);
    }

    // Load composition from URL if present
    const urlData = ShareService.loadFromUrl();
    if (urlData) {
      logger.info('Loading composition from URL');
      dispatch({
        type: ACTION_TYPES.LOAD_COMPOSITION,
        composition: urlData.composition,
        config: urlData.config
      });

      // Clean up URL after loading
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        Age of Empires II: Army Calculator
      </h1>

      {/* Social Share Buttons */}
      <SocialShareButtons />

      <ConfigurationPanel />
      <CivilizationComparison />
      <ResourceTracker />
      <SaveLoadPanel />
      <UnitSelection />
      <ArmyCompositionSummary />

      {/* Buy Me a Coffee CTA */}
      <BuyMeCoffee />

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
