import React, { useEffect } from 'react';
import { ArmyProvider, useArmy, ACTION_TYPES } from './context/ArmyContext';
import { ThemeProvider } from './context/ThemeContext';
import ConfigurationPanel from './components/ConfigurationPanel';
import CivilizationBonuses from './components/CivilizationBonuses';
import ResourceTracker from './components/ResourceTracker';
import UnitSelection from './components/UnitSelection';
import ArmyCompositionSummary from './components/ArmyCompositionSummary';
import SaveLoadPanel from './components/SaveLoadPanel';
import SocialShareButtons from './components/SocialShareButtons';
import BuyMeCoffee from './components/BuyMeCoffee';
import CivilizationComparison from './components/CivilizationComparison';
import ThemeToggle from './components/ThemeToggle';
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
      <ThemeToggle />
      <h1 className="text-4xl font-bold text-center mb-2 text-gray-800 dark:text-gray-100">
        Age of Empires II: Army Calculator
      </h1>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
        Created by{' '}
        <a
          href="https://www.linkedin.com/in/conorbronsdon/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Conor Bronsdon
        </a>
      </p>

      {/* Social Share Buttons */}
      <SocialShareButtons />

      <ConfigurationPanel />
      <CivilizationBonuses />
      <CivilizationComparison />
      <ResourceTracker />
      <SaveLoadPanel />
      <UnitSelection />
      <ArmyCompositionSummary />

      {/* Buy Me a Coffee CTA */}
      <BuyMeCoffee />

      {/* Footer */}
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Created by{' '}
            <a
              href="https://conorbronsdon.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Conor Bronsdon
            </a>
          </p>
          <div className="flex justify-center items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <a
              href="https://github.com/conorbronsdon/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              GitHub
            </a>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <a
              href="https://x.com/ConorBronsdon"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Twitter
            </a>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <a
              href="https://www.linkedin.com/in/conorbronsdon/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <a
              href="https://conorbronsdon.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Substack
            </a>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Age of Empires II © Microsoft Corporation</p>
          <p className="mt-2">
            Built for AoE2 players | Inspired by pro player strategies
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ArmyProvider>
        <AppContent />
      </ArmyProvider>
    </ThemeProvider>
  );
}

export default App;
