import { useEffect, useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArmyProvider, useArmy, ACTION_TYPES } from './context/ArmyContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ToastProvider, ToastContainer, useToast, TOAST_TYPES } from './context/ToastContext';
import ErrorBoundary from './components/ErrorBoundary';
import ConfigurationPanel from './components/ConfigurationPanel';
import CivilizationIndicator from './components/CivilizationIndicator';
import CivilizationBonuses from './components/CivilizationBonuses';
import TechnologyPanel from './components/TechnologyPanel';
import ResourceTracker from './components/ResourceTracker';
import UnitSelection from './components/UnitSelection';
import FortificationSelection from './components/FortificationSelection';
import ArmyCompositionSummary from './components/ArmyCompositionSummary';
import ArmyCompositionAnalysis from './components/ArmyCompositionAnalysis';
import SaveLoadPanel from './components/SaveLoadPanel';
import PresetSelector from './components/PresetSelector';
import SocialShareButtons from './components/SocialShareButtons';
import BuyMeCoffee from './components/BuyMeCoffee';
import CivilizationComparison from './components/CivilizationComparison';
import ThemeToggle from './components/ThemeToggle';
import CombatAnalysis from './components/CombatAnalysis';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import MobileSidebarSection from './components/MobileSidebarSection';
import KeyboardShortcutsHelp from './components/KeyboardShortcutsHelp';
import AlliedCivilizationsSelector from './components/AlliedCivilizationsSelector';
import TeamBonusDisplay from './components/TeamBonusDisplay';
import LanguageSelector from './components/LanguageSelector';
import { units } from './data/units';
import { civilizations } from './data/civilizations';
import { validateGameData } from './utils/validators';
import { logger } from './utils/errorHandler';
import { ShareService } from './services/share.service';
import { ExportService } from './services/export.service';
import { StorageService } from './services/storage.service';
import { initializeAnalytics } from './utils/analytics';
import { analyticsConfig } from './config/analytics.config';
import { FaGithub, FaStar, FaUndo, FaRedo, FaKeyboard } from 'react-icons/fa';
import { useSavedCompositions } from './hooks/useSavedCompositions';
import { useKeyboardShortcuts, KEYBOARD_SHORTCUTS } from './hooks/useKeyboardShortcuts';
import './i18n'; // Initialize i18n

function AppContent() {
  const { t } = useTranslation();
  const { state, dispatch, canUndo, canRedo } = useArmy();
  const { config, composition } = state;
  const { count: savedCompositionsCount } = useSavedCompositions();
  const { showToast } = useToast();
  const { toggleTheme } = useTheme();
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const searchInputRef = useRef(null);

  // Keyboard shortcuts handlers
  const handleUndo = useCallback(() => {
    if (canUndo) {
      dispatch({ type: ACTION_TYPES.UNDO });
      showToast(t('notifications.undone'), TOAST_TYPES.INFO, 2000);
    }
  }, [dispatch, canUndo, showToast, t]);

  const handleRedo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: ACTION_TYPES.REDO });
      showToast(t('notifications.redone'), TOAST_TYPES.INFO, 2000);
    }
  }, [dispatch, canRedo, showToast, t]);

  const handleSave = useCallback(() => {
    const unitCount = Object.keys(composition).length;
    if (unitCount === 0) {
      showToast(t('notifications.noUnitsToSave'), TOAST_TYPES.WARNING, 2000);
      return;
    }
    const name = `Army ${new Date().toLocaleString()}`;
    StorageService.save(name, composition, config);
    showToast(`${t('notifications.saved')}: ${name}`, TOAST_TYPES.SUCCESS, 2000);
    window.dispatchEvent(new Event('savedCompositionsUpdated'));
  }, [composition, config, showToast, t]);

  const handleExportJson = useCallback(() => {
    const unitCount = Object.keys(composition).length;
    if (unitCount === 0) {
      showToast(t('notifications.noUnitsToExport'), TOAST_TYPES.WARNING, 2000);
      return;
    }
    ExportService.downloadJSON(composition, config);
    showToast(t('notifications.exported'), TOAST_TYPES.SUCCESS, 2000);
  }, [composition, config, showToast, t]);

  const handleClearComposition = useCallback(() => {
    dispatch({ type: ACTION_TYPES.RESET_COMPOSITION });
    showToast(t('notifications.compositionCleared'), TOAST_TYPES.INFO, 2000);
  }, [dispatch, showToast, t]);

  const handleFocusSearch = useCallback(() => {
    // Focus the unit search input
    const searchInput = document.querySelector('[data-search-input="unit-filter"]');
    if (searchInput) {
      searchInput.focus();
      showToast(t('notifications.searchFocused'), TOAST_TYPES.INFO, 1500);
    }
  }, [showToast, t]);

  const handleToggleDarkMode = useCallback(() => {
    toggleTheme();
    showToast(t('notifications.themeToggled'), TOAST_TYPES.INFO, 1500);
  }, [toggleTheme, showToast, t]);

  const handleShowHelp = useCallback(() => {
    setShowShortcutsHelp(true);
  }, []);

  const handleEsc = useCallback(() => {
    if (showShortcutsHelp) {
      setShowShortcutsHelp(false);
    }
  }, [showShortcutsHelp]);

  // Register keyboard shortcuts
  useKeyboardShortcuts({
    [KEYBOARD_SHORTCUTS.UNDO]: handleUndo,
    [KEYBOARD_SHORTCUTS.REDO]: handleRedo,
    [KEYBOARD_SHORTCUTS.REDO_ALT]: handleRedo,
    [KEYBOARD_SHORTCUTS.SAVE]: handleSave,
    [KEYBOARD_SHORTCUTS.EXPORT_JSON]: handleExportJson,
    [KEYBOARD_SHORTCUTS.CLEAR]: handleClearComposition,
    [KEYBOARD_SHORTCUTS.FOCUS_SEARCH]: handleFocusSearch,
    [KEYBOARD_SHORTCUTS.TOGGLE_DARK_MODE]: handleToggleDarkMode,
    [KEYBOARD_SHORTCUTS.HELP]: handleShowHelp,
    [KEYBOARD_SHORTCUTS.ESC]: handleEsc,
  });

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
              <h1 className="text-xl lg:text-2xl font-bold">
                Age of Empires II Definitive Edition: Army + Troop Composition Calculator
              </h1>
              <p className="text-sm text-blue-100 dark:text-gray-300">
                100+ units · 51 civilizations · Accurate bonuses · Resource tracking · Saved army presets
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Undo/Redo Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleUndo}
                  disabled={!canUndo}
                  className={`p-2 rounded-lg transition-colors ${
                    canUndo
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-white/5 text-white/30 cursor-not-allowed'
                  }`}
                  title="Undo (Ctrl+Z)"
                  aria-label="Undo last action"
                >
                  <FaUndo className="w-4 h-4" />
                </button>
                <button
                  onClick={handleRedo}
                  disabled={!canRedo}
                  className={`p-2 rounded-lg transition-colors ${
                    canRedo
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-white/5 text-white/30 cursor-not-allowed'
                  }`}
                  title="Redo (Ctrl+Shift+Z)"
                  aria-label="Redo last action"
                >
                  <FaRedo className="w-4 h-4" />
                </button>
                <button
                  onClick={handleShowHelp}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Keyboard Shortcuts (?)"
                  aria-label="Show keyboard shortcuts"
                >
                  <FaKeyboard className="w-4 h-4" />
                </button>
              </div>
              <ThemeToggle />
              <LanguageSelector />
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-blue-100 dark:text-gray-300 hidden sm:inline">
                  {t('app.enjoyingCalculator')}
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/conorbronsdon/aoe2-troop-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <FaGithub className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('header.github')}</span>
                    <FaStar className="w-3 h-3 text-yellow-300" />
                  </a>
                  <SocialShareButtons />
                </div>
              </div>
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
              {/* Configuration Section - High priority, open by default on mobile */}
              <MobileSidebarSection title={t('configuration.title')} icon="⚙️" defaultOpen={true} priority="high">
                <ConfigurationPanel />
              </MobileSidebarSection>

              {/* Team Bonuses Section - New for v3.0 */}
              <MobileSidebarSection title={t('teamBonuses.title')} icon="🤝" defaultOpen={false} priority="normal">
                <div className="space-y-4">
                  <AlliedCivilizationsSelector />
                  <TeamBonusDisplay />
                </div>
              </MobileSidebarSection>

              {/* Army Status Section - Shows current army state */}
              <MobileSidebarSection title={t('army.title')} icon="🛡️" defaultOpen={false} priority="normal">
                <div className="space-y-4">
                  <CivilizationIndicator />
                  <ArmyCompositionSummary />
                  <ArmyCompositionAnalysis />
                  <CivilizationBonuses />
                </div>
              </MobileSidebarSection>

              {/* Technologies Section - Conditional */}
              {config.showTechPanel && (
                <MobileSidebarSection title={t('technologies.title')} icon="🔬" defaultOpen={false} priority="normal">
                  <TechnologyPanel />
                </MobileSidebarSection>
              )}

              {/* Tools Section - Comparison, saves, presets */}
              <MobileSidebarSection title={t('tools.title')} icon="🧰" defaultOpen={false} priority="low">
                <div className="space-y-4">
                  <CivilizationComparison />
                  {/* SaveLoadPanel appears above presets when compositions exist, below otherwise */}
                  {savedCompositionsCount > 0 && <SaveLoadPanel hideSaveButton={true} />}
                  <PresetSelector />
                  {savedCompositionsCount === 0 && <SaveLoadPanel hideSaveButton={true} />}
                </div>
              </MobileSidebarSection>
            </div>
          </aside>

          {/* Main Content Area - Unit Selection & Army */}
          <main className="flex-1 min-w-0">
            {/* Resource Tracker at top of main content */}
            <ResourceTracker />

            {/* Consolidated Combat Analysis Panel */}
            <CombatAnalysis />

            {/* Conditionally show Units and/or Fortifications based on display mode */}
            {(config.displayMode === 'units' || config.displayMode === 'both') && <UnitSelection />}
            {(config.displayMode === 'fortifications' || config.displayMode === 'both') && (
              <FortificationSelection />
            )}
          </main>
        </div>
      </div>

      {/* Spacer for fixed footer */}
      <div className="h-24" />

      {/* Footer - Fixed at bottom */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-start gap-3 text-xs text-gray-600 dark:text-gray-400 flex-wrap">
            <span>
              Created by{' '}
              <a
                href="https://conorbronsdon.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                Conor Bronsdon
              </a>
            </span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
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
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span className="text-gray-500 dark:text-gray-400">Age of Empires II © Microsoft</span>
          </div>
        </div>
      </footer>

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />

      {/* Floating Buy Me a Coffee button */}
      <BuyMeCoffee />

      {/* Keyboard Shortcuts Help Modal */}
      <KeyboardShortcutsHelp
        isOpen={showShortcutsHelp}
        onClose={() => setShowShortcutsHelp(false)}
      />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ArmyProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </ArmyProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
