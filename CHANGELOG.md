# Changelog

All notable changes to the Age of Empires II Army Composition Calculator will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.2.0] - 2025-11-17

### Added
- **Unit and Civilization Name Translations**: Complete translation of game entities
  - 164+ unit names translated across 8 languages
  - 51 civilization names translated across 8 languages
  - All unique unit names localized
  - Generic unit names fully translated
  - Elite unit variants properly translated
  - Translation helper utilities (getTranslatedUnitName, getTranslatedCivName)

- **Team Bonus Calculation Support**: Allied civilization bonuses now applied
  - Team bonus cost effects now applied to unit calculations
  - UnitCard displays costs adjusted for allied team bonuses
  - ArmyCompositionSummary shows totals with team bonus discounts
  - Export functions (CSV/JSON) preserve team bonus cost adjustments
  - Comprehensive documentation of current implementation and limitations

### Changed
- All 12+ components updated to use translated names
  - UnitCard: Unit names now displayed in selected language
  - CivilizationSelector: Civilization names localized
  - UnitSelection: Search now works with translated names
  - CombatSimulator: Unit names in combat analysis
  - PresetSelector: Preset army unit names translated
  - AlliedCivilizationsSelector: Allied civ names localized
  - And 6 more components updated
- Search functionality enhanced to work with translated content
- Accessibility: All aria-labels now use translated names
- Enhanced i18n infrastructure with translation utilities
- UnitCard and ArmyCompositionSummary now pass alliedCivs to cost calculations
- Export service includes team bonus cost adjustments

### Technical
- Created src/utils/translationHelpers.ts
- Added unitNames section to all 8 translation files (1,312+ translation keys added)
- Added civilizationNames section to all 8 translation files (408+ translation keys added)
- Total new translation keys: 1,720+ across 8 languages (13,760 total translations)
- PWA precache assets: 263 (includes all translation files)
- Enhanced applyTeamBonuses() documentation with implementation notes
- Updated ROADMAP.md with Team Bonus System status and future enhancements
- Team bonus calculations integrated throughout cost calculation pipeline

---

## [3.1.0] - 2025-11-17

### Added
- **Expanded Multi-Language Support**: 4 new languages (8 total)
  - French (Français) - France, Canada, Belgium, Africa
  - Italian (Italiano) - Italy, Switzerland
  - Polish (Polski) - Poland, Eastern Europe
  - Chinese Simplified (简体中文) - Mainland China
  - Doubles international reach from 4 to 8 languages

- **Expanded Translation Coverage**: 100+ new translation keys
  - Accessibility labels (ARIA text for screen readers)
  - Tooltips for buttons and actions
  - PWA installation prompts
  - Error boundary messages
  - Resource and stat labels

### Changed
- Updated all existing languages (EN, ES, DE, PT) with new translation keys
- PWA precache increased from 251 to 263 assets
- Updated i18n.ts to register all 8 languages
- Language selector now displays 8 language options with flags

### Technical
- Version bumped to 3.1.0
- Total translation strings: 260+ keys per language
- 1,440 lines of translations added

---

## [3.0.0] - 2025-11-17

### Added
- **Team Bonus System**: Allied civilization planning
  - Select up to 3 allied civilizations for team games
  - Team bonuses automatically applied to cost calculations
  - Visual display of bonuses received from allies
  - Shows your team bonus shared with allies
  - Dedicated Team Bonuses section in sidebar
  - AlliedCivilizationsSelector with searchable dropdown
  - Real-time resource updates when allies change
  - Color-coded bonus indicators by civilization

- **Multi-Language Support (i18n)**: Initial 4-language release
  - English (default)
  - Spanish (Español) - large AoE2 community
  - German (Deutsch) - strong EU player base
  - Portuguese (Português) - Brazil community
  - i18next + react-i18next integration
  - Browser language auto-detection
  - Persistent language preference (localStorage)
  - Language selector with country flags in header
  - Complete UI translation (150+ strings)

### Changed
- Major version bump to 3.0.0 (new team features + i18n)
- Architecture improvements for translation support
- Enhanced state management for team bonuses

### Technical
- Added src/i18n.ts for internationalization config
- Created src/locales/ directory structure
- AlliedCivilizationsSelector component
- TeamBonusDisplay component
- LanguageSelector component
- Expands accessibility to 60% more users globally

---

## [2.13.0] - 2025-11-17

### Added
- **Keyboard Shortcuts**: 10+ shortcuts for power users
  - Ctrl+S / Cmd+S: Quick save composition
  - Ctrl+Z / Cmd+Z: Undo last action
  - Ctrl+Shift+Z / Cmd+Shift+Z: Redo action
  - Ctrl+E / Cmd+E: Export to JSON
  - Ctrl+/ / Cmd+/: Focus search bar
  - Ctrl+D / Cmd+D: Toggle dark mode
  - ?: Show keyboard shortcuts help modal
  - Escape: Close modals
  - Platform-aware key formatting (Mac vs Windows)

- **Undo/Redo System**: Full action history
  - 50-action history stack
  - Visual toolbar buttons in header
  - Tracks composition changes
  - Tracks configuration changes
  - Tracks technology changes
  - Prevents accidental data loss
  - useKeyboardShortcuts hook integration

- **Army Composition Analysis**: Strategic insights
  - Vulnerability detection (what counters your army)
  - Strength analysis (what your army counters)
  - Melee/Ranged/Siege balance indicators
  - Economy metrics (gold vs trash units)
  - Intelligent suggestions for improving composition
  - Collapsible panel in sidebar
  - Full dark mode support

- **Global Toast Notifications**: Centralized messaging
  - ToastContext for app-wide notifications
  - Success, warning, info, error types
  - Auto-dismiss with customizable timing
  - ARIA live regions for accessibility
  - Consistent notification behavior

- **KeyboardShortcutsHelp Modal**: User guidance
  - Comprehensive shortcuts reference
  - Platform-specific key display
  - Accessible modal design
  - Gradient header styling

### Technical
- All 372 tests passing
- ToastContext architecture (centralized notifications)
- useKeyboardShortcuts custom hook
- ArmyCompositionAnalysis component (500+ lines)
- Version bumped to 2.13.0

---

## [2.12.0] - 2025-11-17

### Added
- **Combat Statistics Display**: Unit stats shown directly on cards
  - HP, Attack, Melee Armor, Pierce Armor, Range, Speed display
  - Technology effects applied to unit stats via statCalculator.js
  - Army-level aggregate stats via ArmyCombatStats component
  - Visual indicators for tech-modified stats (green highlights)
  - Expandable combat panels with stat breakdown

- **Toggle Combat Stats**: User control over stat visibility
  - New toggle to show/hide combat stats on unit cards
  - Reduces visual clutter for users who don't need detailed stats
  - Preference saved during session

- **Consolidated Combat Panels**: Cleaner UI organization
  - Unified combat stats display
  - Collapsible sections for better information hierarchy
  - Simplified UnitCard interface

### Changed
- **ESLint 9.x Migration**: Updated to flat config format
  - Removed deprecated .eslintrc.json
  - New eslint.config.js with flat configuration
  - Updated npm scripts for ESLINT_USE_FLAT_CONFIG

- **Footer Improvements**:
  - Persistent footer fixed at bottom of viewport
  - Text-based social links (reverted from icons)
  - Improved layout and organization

- **UnitFilter Organization**: Better logical grouping of filter options

### Technical
- Version bumped to 2.12.0
- Stat calculation engine integrated with UI components

---

## [2.11.0] - 2025-11-17

### Added
- **Floating BuyMeCoffee Button**: Less intrusive support CTA
  - Positioned as floating element instead of inline
  - Respects user experience while maintaining visibility
  - Smooth hover animations

- **Mobile Sidebar Accordion Navigation**:
  - Collapsible sections for mobile menu
  - Logical section grouping (Units, Configuration, Resources)
  - Smooth expand/collapse animations
  - Improved touch targets for mobile users

### Changed
- Support CTA redesigned for better UX
- Mobile navigation more intuitive with accordion pattern
- Reduced cognitive load on mobile interfaces

### Technical
- Version bumped to 2.11.0

---

## [2.10.0] - 2025-11-17

### Added
- **Progressive Web App (PWA) Support**: Full offline functionality and installable app
  - Service worker with Workbox for 251 precached assets
  - Auto-update notifications when new version is available
  - PWAInstallPrompt component with friendly install UI
  - Dismissal persistence (7-day cooldown after "Not now")
  - Automatic detection of installation status
  - Slide-up animation for install prompt
  - Cache-first strategy for Google Fonts
  - Standalone display mode for native app experience
  - vite-plugin-pwa integration with automatic SW generation

- **Export Button Consolidation** (UI Polish):
  - CSV and JSON export options consolidated into single dropdown menu
  - Reduced visual clutter from 6 buttons to 4 buttons
  - Click-outside handling to close dropdown
  - Proper ARIA attributes (aria-expanded, aria-haspopup)

### Changed
- Updated vite.config.js with PWA plugin configuration
- Added service worker registration in main.jsx
- Removed manual manifest link (auto-injected by plugin)
- Added TypeScript declarations for virtual modules
- Tailwind config extended with slide-up animation
- Fixed missing ACTION_TYPES import in ArmyCompositionSummary

### Tests
- Added 18 comprehensive PWAInstallPrompt component tests
  - Rendering, interactions, dismissal persistence
  - Accessibility, cleanup, event handling
- Total test count: 368 tests (all passing)

### Dependencies
- Added vite-plugin-pwa (v1.1.0)
- Added workbox-window (v7.3.0)

### Documentation
- Updated ROADMAP.md: PWA Support marked complete
- Updated ROADMAP.md: Export button consolidation marked complete
- Version bumped to 2.10.0

---

## [2.9.0] - 2025-11-16

### Added
- **Preset Army Compositions**: 24 pre-configured meta builds
  - Castle Age Rushes: Knight Rush, Crossbow Push, Eagle Rush, Camel Push, Monk Siege Push
  - Imperial Compositions: Paladin + Siege, Arbalester + Halbs, Heavy Camel + Siege, Cav Archer + Hussar
  - Civilization-Specific: Britons Longbow, Franks Paladin, Mayans Plumes, Mongols Mangudai, Goths Infantry
  - Beginner Templates: Trash Army, Basic Gold Army, Balanced Composition, Defensive Turtle, Raiding Party
  - New `PresetSelector` component with two-dropdown interface
  - Live preview showing unit composition, total cost, recommended civs
  - Load/Merge modes for flexible preset application
  - Auto-apply civilization settings from presets
  - Helper functions: getPresetsByCategory, getPresetById, getPresetsForCiv

### Tests
- Added 60 new tests (33 data validation + 27 component tests)
- Total test count: 350 tests (all passing)

### Documentation
- Updated ROADMAP.md: Preset Army Compositions marked complete
- Version bumped to 2.9.0

---

## [2.8.0] - 2025-11-16

### Added
- **Enhanced Unique Unit Documentation**: Comprehensive guide to all unique units
  - Complete stats comparison tables (HP, Attack, Armor, Speed, Range)
  - Infantry, Archer, Cavalry, Siege & Special, Naval unit categories
  - Training times for all 48 unique unit types
  - Elite upgrade costs (Food, Gold, Research Time) for all units
  - Portuguese civilization documentation (Organ Gun, Elite Organ Gun)
  - Regional organization (American, African, Asian, European, Middle Eastern)
  - Quick reference section with comparison tables
  - Historical context and tactical recommendations
  - 1,360+ lines of comprehensive documentation

### Changed
- **README.md Updates**:
  - Added new Documentation section with links to all guides
  - Updated Table of Contents to include Documentation
  - Updated project stats to reflect enhanced documentation
  - Version updated to 2.8.0
- **UNIQUE_UNITS.md Improvements**:
  - Cleaned up Table of Contents (removed non-existent civilizations)
  - Added Portuguese with Organ Gun documentation
  - Added comprehensive Quick Reference section
  - Updated footer with version info and cross-references

### Documentation
- ROADMAP.md: Marked "Enhanced Unique Unit Documentation" as complete
- Added cross-references between documentation files
- Total documentation now covers 45 civilizations with 90+ unique units

## [2.7.0] - 2025-11-16

### Added
- **Complete Unique Technologies System**: All 50 civilizations now have unique technologies
  - 100+ unique technologies covering Castle Age and Imperial Age
  - Full stat effects integration (HP, attack, armor, range, speed bonuses)
  - Cost tracking included in total resource calculations
  - Visual distinction with yellow styling and ⭐ icons
  - Civilization-specific display (only shows when civ selected)
  - Tech prerequisites (Imperial Age techs require Castle Age techs)

### Changed
- Updated civilization data to include all unique technologies
- Enhanced technology effects system for unique bonuses
- Version bumped to 2.7.0

### Documentation
- Updated ROADMAP.md to mark unique technologies as complete
- Added unique technologies section to civilization features

## [2.6.0] - 2025-11-16

### Added
- **Import Compositions Feature**: Complete import functionality for army compositions
  - New `ImportService` (`src/services/import.service.js`):
    - Full JSON schema validation with detailed error messages
    - Version compatibility checking with migration warnings
    - Data sanitization to prevent XSS/injection attacks
    - Auto-detection of input format (JSON, URL, base64 encoded)
    - File reading with FileReader API
    - Unit existence validation with unknown unit warnings
    - Age and civilization validation
  - New `ImportModal` component (`src/components/ImportModal.jsx`):
    - Three-tab interface: File Upload, Paste JSON, Import from URL
    - Drag-and-drop file upload with visual feedback
    - File size validation (1MB max)
    - Real-time validation error and warning display
    - Import mode selection: Replace or Merge compositions
    - Responsive design with dark mode support
    - Accessible UI with proper ARIA attributes
  - Import history tracking in `StorageService`:
    - Automatic history logging in localStorage
    - Tracks source type (file/paste/url), filename, timestamp
    - Records success/failure and unit count
    - History limited to 50 most recent entries
    - Import statistics via `StorageService.getImportStats()`
  - New `IMPORT_COMPOSITION` action type in `ArmyContext`
  - Import button in `ArmyCompositionSummary` component
  - Import constants in `src/constants.js`:
    - `IMPORT_SOURCES`, `IMPORT_MODES`, `MAX_IMPORT_FILE_SIZE`
    - `IMPORT_HISTORY_KEY`, `MAX_IMPORT_HISTORY`

### Changed
- Updated `ArmyCompositionSummary` to include import button and modal
- Enhanced `ArmyContext` reducer with import composition handling
- Extended `StorageService` with import history management
- Updated `STORAGE_KEYS` to include `IMPORT_HISTORY`
- Version bumped to 2.6.0 in `package.json` and `constants.js`

### Tests
- Added 34 comprehensive unit tests for `ImportService`
  - Validation tests for JSON structure, version compatibility
  - Parsing tests for various input formats
  - Sanitization tests for security (XSS protection)
  - History entry creation tests
  - Auto-detection tests for URLs, JSON, and encoded data
  - File import tests with size and type validation
- Total test count: 290 tests (all passing)

### Documentation
- Updated ROADMAP.md to mark import feature as complete
- Added import feature to README.md features section
- Updated project structure in README.md
- Incremented version numbers throughout documentation

## [2.3.0] - 2025-11-15

### Added
- **Unit Search and Filter System**: Comprehensive filtering UI for 100+ units
  - Real-time search bar to find units by name
  - Category toggle buttons (Infantry, Cavalry, Archer, Siege, Naval, Unique, Other)
  - Cost type filters (Trash units, Gold units, Low cost <100 total)
  - Age-specific filtering (Dark, Feudal, Castle, Imperial)
  - Results counter showing number of matches
  - "Clear All Filters" button for quick reset
  - Mobile-friendly responsive design
  - New `UnitFilter` component (`src/components/UnitFilter.jsx`)

- **Unit Counter Visualization**: Visual display of counter relationships
  - Collapsible "Counters & Weaknesses" section on each unit card
  - Green "Strong Against" badges with unit names
  - Red "Weak To" badges with unit names
  - Tooltips explaining relationships
  - Smart unit name resolution from IDs
  - Uses existing `counters` and `weakTo` data from unit definitions
  - Enhanced `UnitCard` component with counter display

- **Advanced Civilization Bonus Filtering**: Enhanced bonus panel with filtering
  - Search bar to filter bonuses by keyword
  - Type toggle buttons: Military (red), Economic (green), Cost (yellow)
  - "Active Only" filter to show bonuses affecting current army
  - Real-time filtering with visible bonus count
  - "No results" message when filters match nothing
  - Clear filters button
  - Dark mode support for all filter controls
  - Enhanced `CivilizationBonuses` component

### Changed
- Updated `UnitSelection` component to integrate with new filter system
- Improved unit browsing experience with filter state management
- Enhanced `UnitCard` to show strategic counter information
- Better organization of civilization bonuses with filtering capabilities

## [2.2.1] - 2025-11-15

### Fixed
- Fixed civilization count from 45 to 51 in documentation
- Updated project metadata to reflect Definitive Edition alignment

### Changed
- Comprehensive documentation cleanup and standardization
- Enhanced README with accurate feature descriptions
- Updated version references across documentation

## [2.2.0] - 2025-11-15

### Added
- Fortification mode with walls, gates, towers, and castles
- Flexible display modes: Units Only, Units & Fortifications, Fortifications Only
- Hero unit section for special campaign units
- Official Age of Empires II unit icons with smart fallback system
- Automatic icon loading from Age of Empires wiki
- Smooth loading transitions with emoji placeholders
- Enhanced civilization selection with comprehensive bonus indicators

### Changed
- Updated content to align with Age of Empires II: Definitive Edition (2025)
- Replaced emoji icons with professional game-icons.net library
- Improved documentation structure and clarity
- Enhanced display mode flexibility for better strategic planning

## [2.1.0] - 2025-11-15

### Added
- Technology tree restrictions for all 51 civilizations
- Civilization-specific unit filtering (e.g., Aztecs/Mayans/Incas cannot build cavalry)
- Enhanced bonus display system with categories
- Comprehensive documentation for tech tree restrictions
- Unit availability validation by civilization

### Changed
- Units now filtered based on civilization-specific tech trees
- Improved bonus panel organization and visibility
- Enhanced accuracy for historically accurate unit restrictions

## [2.0.0] - 2025-11-15

### Added
- Complete unit roster with 100+ units across all categories
- 50+ unique units for all 51 civilizations
- Infantry units: Militia line, Spearman line, Eagle line
- Cavalry units: Scout line, Knight line, Camel line, Battle Elephant, Steppe Lancer
- Archer units: Archer line, Skirmisher line, Cavalry Archer, Hand Cannoneer, Slinger, Genitour
- Siege units: Ram line, Mangonel line, Scorpion line, Bombard Cannon, Trebuchet, Petard
- Naval units: Galley line, Fire Ship line, Demolition Ship line, Cannon Galleon line
- Monk units: Monk and Missionary
- 34 additional civilizations from all AoE2 expansions (total 51)
- JSON export functionality for compositions
- Comprehensive print layout styling
- Dark mode with theme toggle
- Civilization comparison feature for side-by-side analysis
- Comprehensive mobile optimizations
- Unit icons for enhanced visual clarity
- Meta tags and analytics integration
- Social sharing buttons (Twitter, Reddit, Discord)
- Buy Me a Coffee CTA for project support
- Creator attribution with social links
- Comprehensive test coverage
- Detailed documentation and usage guides

### Changed
- Rebuilt app with modular architecture for scalability
- Enhanced README with pro player match links
- Improved bonus system with automatic cost calculations
- Enhanced UI/UX across all components
- Optimized performance for large unit rosters

### Fixed
- Resource calculation accuracy with civilization bonuses
- Unit availability by age and civilization
- Mobile responsiveness issues

## [1.1.0] - 2025-11-14

### Added
- Save/Load system for army compositions
- CSV export functionality
- Shareable URL links for compositions
- Funding information and Buy Me a Coffee integration
- Comprehensive deployment guide
- Dual resource limit modes (total vs. per-resource)

### Changed
- Default resource mode changed to 'total'
- Default resource limits updated for better gameplay balance
- Enhanced README with deployment instructions

### Fixed
- GitHub Actions npm cache dependency issues
- GitHub funding username format

## [1.0.0] - 2025-11-14

### Added
- Initial release of Age of Empires II Army Composition Calculator
- Basic unit selection system
- Resource tracking (food, wood, gold, stone)
- Population cap management
- Age selection (Dark, Feudal, Castle, Imperial)
- Civilization bonuses for initial set of civilizations
- Real-time resource and population counters
- Visual progress bars with color-coded feedback
- Responsive design for desktop and mobile
- Category-based unit organization
- Unit counter information

### Core Features
- Custom resource limits
- Population cap control (200 default)
- Live resource tracking
- Basic unit roster
- Civilization selection
- Age-based filtering

---

## Version History Summary

- **2.3.x**: Unit search/filter system, counter visualization, bonus filtering
- **2.2.x**: Documentation improvements and Definitive Edition alignment
- **2.1.x**: Technology tree restrictions and enhanced bonuses
- **2.0.x**: Complete overhaul with 100+ units, unique units, and advanced features
- **1.1.x**: Save/Load, export features, and deployment improvements
- **1.0.x**: Initial release with core functionality

## Links

- [GitHub Repository](https://github.com/conorbronsdon/aoe2-troop-calculator)
- [Project Website](https://conorbronsdon.github.io/aoe2-troop-calculator/)
- [Report Issues](https://github.com/conorbronsdon/aoe2-troop-calculator/issues)

## Upcoming Features

See the [README Roadmap](README.md#-roadmap) for planned features and enhancements.
