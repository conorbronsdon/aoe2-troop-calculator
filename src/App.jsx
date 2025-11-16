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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Compact Header */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 dark:from-gray-900 dark:via-gray-800 dark:to-purple-950 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">
                AoE2 Army Calculator
              </h1>
              <p className="text-sm text-blue-100 dark:text-gray-300">
                100+ units · 51 civilizations · Accurate bonuses
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <a
                href="https://github.com/conorbronsdon/aoe2-troop-calculator"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
              >
                <FaGithub className="w-4 h-4" />
                <span className="hidden sm:inline">GitHub</span>
                <FaStar className="w-3 h-3 text-yellow-300" />
              </a>
              <SocialShareButtons />
            </div>
          </div>
        </div>
      </header>

      {/* Main Two-Column Layout */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6" id="calculator">
          {/* Left Sidebar - Configuration & Status */}
          <aside className="lg:w-96 xl:w-[420px] flex-shrink-0">
            <div className="lg:sticky lg:top-4 space-y-4 max-h-[calc(100vh-2rem)] lg:overflow-y-auto lg:pr-2">
              <ConfigurationPanel />
              <CivilizationIndicator />
              <ResourceTracker />
              <CivilizationBonuses />
              {config.showTechPanel && <TechnologyPanel />}
              <CivilizationComparison />
              <PresetSelector />
            </div>
          </aside>

          {/* Main Content Area - Unit Selection & Army */}
          <main className="flex-1 min-w-0">
            {/* Conditionally show Units and/or Fortifications based on display mode */}
            {(config.displayMode === 'units' || config.displayMode === 'both') && <UnitSelection />}
            {(config.displayMode === 'fortifications' || config.displayMode === 'both') && (
              <FortificationSelection />
            )}

            <ArmyCompositionSummary />

            {/* Buy Me a Coffee CTA */}
            <BuyMeCoffee />

            {/* Saved Compositions */}
            <div id="saved-compositions" className="mt-6">
              <SaveLoadPanel />
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-6">
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
            <p className="mt-1">Built for AoE2 players | Inspired by pro player strategies</p>
          </div>
        </div>
      </footer>
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
