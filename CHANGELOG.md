# Changelog

All notable changes to the Age of Empires II Army Composition Calculator will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
