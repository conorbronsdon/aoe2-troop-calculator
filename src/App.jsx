import { useEffect } from 'react';
import { ArmyProvider, useArmy, ACTION_TYPES } from './context/ArmyContext';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import ConfigurationPanel from './components/ConfigurationPanel';
import CivilizationIndicator from './components/CivilizationIndicator';
import CivilizationBonuses from './components/CivilizationBonuses';
import TechnologyPanel from './components/TechnologyPanel';
import ResourceTracker from './components/ResourceTracker';
import UnitSelection from './components/UnitSelection';
import FortificationSelection from './components/FortificationSelection';
import ArmyCompositionSummary from './components/ArmyCompositionSummary';
import SaveLoadPanel from './components/SaveLoadPanel';
import PresetSelector from './components/PresetSelector';
import SocialShareButtons from './components/SocialShareButtons';
import BuyMeCoffee from './components/BuyMeCoffee';
import CivilizationComparison from './components/CivilizationComparison';
import ThemeToggle from './components/ThemeToggle';
import CompactResourceBar from './components/CompactResourceBar';
import { units } from './data/units';
import { civilizations } from './data/civilizations';
import { validateGameData } from './utils/validators';
import { logger } from './utils/errorHandler';
import { ShareService } from './services/share.service';
import { initializeAnalytics } from './utils/analytics';
import { analyticsConfig } from './config/analytics.config';
import { FaGithub, FaStar } from 'react-icons/fa';

function AppContent() {
  const { state, dispatch } = useArmy();
  const { config } = state;

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
        config: urlData.config,
      });

      // Clean up URL after loading
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4 max-w-7xl pb-24">
      <ThemeToggle />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 dark:from-gray-900 dark:via-gray-800 dark:to-purple-950 text-white rounded-xl shadow-2xl p-8 mb-8 transition-colors duration-300">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            AoE2: Definitive Edition Army Calculator
          </h1>
          <p className="text-lg md:text-xl mb-6 text-blue-100 dark:text-gray-300">
            100+ units · 51 civilizations · Fortifications · Accurate bonuses · Tech tree
            restrictions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <a
              href="#calculator"
              className="bg-white text-blue-900 dark:bg-gray-100 dark:text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-white transition-all transform hover:scale-105 shadow-lg"
            >
              Start Planning
            </a>
            <a
              href="https://github.com/conorbronsdon/aoe2-troop-calculator"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white dark:border-gray-400 px-8 py-3 rounded-lg font-semibold hover:bg-white/10 dark:hover:bg-gray-700/50 transition-all flex items-center gap-2"
            >
              <FaGithub className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
          <div className="flex justify-center items-center gap-2 text-sm text-blue-200 dark:text-gray-400">
            <FaStar className="w-4 h-4 text-yellow-300 dark:text-yellow-400" />
            <span>Star us on GitHub if you find this useful!</span>
          </div>
        </div>
      </div>

      {/* Social Share Buttons */}
      <SocialShareButtons />

      <div id="calculator">
        <ConfigurationPanel />
      </div>
      <CivilizationIndicator />
      <CivilizationBonuses />
      {config.showTechPanel && <TechnologyPanel />}
      <CivilizationComparison />
      <ResourceTracker />
      <SaveLoadPanel />
      <PresetSelector />

      {/* Conditionally show Units and/or Fortifications based on display mode */}
      {(config.displayMode === 'units' || config.displayMode === 'both') && <UnitSelection />}
      {(config.displayMode === 'fortifications' || config.displayMode === 'both') && (
        <FortificationSelection />
      )}

      <ArmyCompositionSummary />

      {/* Compact Resource Tracker at Bottom */}
      <CompactResourceBar />

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
          <p className="mt-2">Built for AoE2 players | Inspired by pro player strategies</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ArmyProvider>
          <AppContent />
        </ArmyProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
