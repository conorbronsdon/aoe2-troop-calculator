# AoE2 Army Composition Calculator - Roadmap

This roadmap outlines planned enhancements and features for the AoE2 Army Composition Calculator.

## Legend
- 🔥 **Critical** - Core functionality gap
- ⭐ **High Priority** - Significant value, moderate complexity
- 🎯 **Medium Priority** - Good value, various complexity
- 💡 **Future Consideration** - Nice to have, may be complex

---

## 🔥 Critical Priority

### Code Quality & Testing Infrastructure
**Status:** ✅ Mostly Complete (v2.4.0)
**Priority:** Critical
**Complexity:** Medium

Address critical code quality issues identified in the November 2025 codebase review:

**Testing Gaps:**
- ✅ Added Error Boundary component to prevent full app crashes
- ✅ Added 54 unit tests for all service layers (ShareService, ExportService, StorageService)
- ✅ Added 89 component tests for critical UI components (ErrorBoundary, ThemeToggle, ResourceCost, UnitCard)
- ✅ Added validation for URL parameters in shared compositions

**Input Validation:**
- ✅ Added bounds checking for resource limits (max 999,999)
- ✅ Added max limits for unit quantities (max 9,999)
- ✅ Added max limits for population cap (max 10,000)
- ✅ All inputs now properly validated with min/max attributes and value clamping

**Type Safety:**
- ✅ Added PropTypes validation to critical React components
- Consider TypeScript migration for better compile-time safety (future)

**Performance Optimizations:**
- ✅ Added memoization for expensive calculations (useMemo in ResourceTracker, CivilizationBonuses)
- ✅ Optimized bonus matching algorithm from O(n²) to O(n) using Set-based lookups
- ✅ Added debouncing for search inputs (UnitFilter with 300ms delay)
- ✅ Fixed inefficient re-renders in ResourceTracker with comprehensive memoization

**Accessibility:**
- ✅ Added proper label associations for form controls (htmlFor, aria-label, aria-describedby)
- ✅ Fixed emoji usage (added role="img" and aria-label attributes)
- ✅ Added ARIA progressbar attributes for resource trackers
- ✅ Added sr-only text for screen reader compatibility
- ✅ Added aria-pressed for toggle buttons, aria-expanded for collapsible sections

**Code Quality Improvements (v2.4.0):**
- ✅ Extracted duplicate CostDisplay logic into shared ResourceCost component
- ✅ Added prop-types dependency for type safety
- ✅ Added jsdom dependency for service layer testing
- ✅ Added @testing-library/jest-dom for component testing matchers
- ✅ Test coverage increased from 62 tests to 225 tests (263% increase)
- ✅ Added vitest test setup configuration for automatic cleanup

**Acceptance Criteria:**
- ✅ Error boundary catches and displays component errors gracefully
- ✅ Service layers have comprehensive test coverage (54 new tests)
- ✅ Input validation prevents invalid game states
- ✅ No ESLint errors (warnings acceptable)
- ✅ Performance improved through memoization and O(n) algorithm optimization

---

### Technology/Upgrade System
**Status:** ✅ Complete (v2.4.0)
**Priority:** Critical
**Complexity:** High

Add support for Age of Empires II technologies and upgrades:
- ✅ Blacksmith upgrades (Fletching, Bodkin Arrow, Bracer, Forging, Iron Casting, Blast Furnace)
- ✅ University technologies (Ballistics, Chemistry, Siege Engineers)
- ✅ Monastery upgrades (Redemption, Atonement, Sanctity)
- ✅ Economy upgrades (Wheelbarrow, Hand Cart)
- ✅ Age-specific techs that unlock or enhance units
- ⏳ Unique technologies for each civilization (future enhancement)

**Impact:** Transforms the calculator from basic cost tracking to realistic army planning with actual combat-ready stats.

**Implementation (v2.4.0):**
- ✅ Created technology data structure in `src/data/technologies.js` (553 LOC)
- ✅ Built TechnologyPanel component for tech selection UI
- ✅ Implemented stat calculation engine in `src/utils/statCalculator.js` (14.4K LOC)
- ✅ Added tech restrictions per civilization in `src/data/techTree.js`
- ✅ Unit stats (HP, attack, armor) update based on selected techs
- ✅ Integrated with ArmyContext state management (researchedTechs)

**Acceptance Criteria:**
- ✅ Users can select technologies available to their civilization
- ✅ Unit stats (HP, attack, armor) update based on selected techs
- ✅ Tech tree shows which techs are available per age
- ⏳ Costs account for technology investments (tech cost tracking - future)
- ⏳ Unique technologies properly integrated (future enhancement)

---

## ⭐ High Priority

### Calculate and Display Unit Statistics
**Status:** ✅ Partially Complete (v2.4.0)
**Priority:** High
**Complexity:** Medium

Unit statistics calculation system with technology bonuses.

**What's Implemented:**
- ✅ Calculate base stats + civilization bonuses via `statCalculator.js`
- ✅ Technology effects applied to unit stats
- ✅ Stat calculation engine (14.4K LOC comprehensive system)
- ⏳ Display modified stats on unit cards (UI enhancement needed)
- ⏳ Show stat comparisons between civilizations
- ⏳ Highlight which bonuses are active for current army composition
- ⏳ Add tooltips explaining stat calculations

**Impact:** Users can see actual combat effectiveness, not just costs.

**Next Steps:**
- Add visual stat display on UnitCards (HP bar, attack/armor icons)
- Implement stat comparison modal for side-by-side unit analysis
- Add tooltips showing calculation breakdown

---

### Progressive Web App (PWA) Support
**Status:** Not Started
**Priority:** High
**Complexity:** Medium

Convert the application into a Progressive Web App for offline functionality.

**Features:**
- Service worker for offline caching
- Install prompt for "Add to Home Screen"
- Offline army composition planning
- Background sync when connection restored
- Faster load times with cached assets

**Technical Requirements:**
- Add service worker registration in `main.jsx`
- Create `manifest.json` with app metadata
- Configure Vite PWA plugin or manual service worker
- Cache critical assets (unit data, icons, styles)
- Handle offline/online state transitions

**Impact:** Users can plan armies without internet connection, perfect for gaming sessions.

**Acceptance Criteria:**
- App installable on desktop/mobile
- Full functionality available offline
- Saved compositions persist across sessions
- Cache invalidation on new versions

---

### Preset Army Compositions (Meta Builds)
**Status:** Not Started
**Priority:** High
**Complexity:** Low

Provide pre-configured army templates for common strategies.

**Features:**
- **Castle Age Timing Attacks:**
  - Knights rush (10 Knights + 2 Monks)
  - Crossbow push (25 Crossbowmen + 2 Siege)
  - Eagle rush (15 Eagles)
- **Imperial Age Compositions:**
  - Paladin + Siege (15 Paladins + 3 Siege Onager)
  - Arbalester + Halbs (40 Arbs + 20 Halbs)
  - Heavy Camel + Siege (20 Camels + 4 Trebuchets)
- **Civilization-Specific Builds:**
  - Britons: Longbowmen deathball
  - Franks: Paladin spam
  - Mayans: Plumes + Eagles
  - Mongols: Mangudai + Rams
- **Beginner Templates:**
  - Trash army (Spears + Skirms)
  - Basic gold army
  - Balanced composition

**UI Design:**
```
[Load Preset ▼]
├── Castle Age Rushes
│   ├── Knight Rush (Franks)
│   ├── Crossbow Push (Britons)
│   └── Eagle Rush (Aztecs)
├── Imperial Compositions
│   ├── Heavy Cavalry + Siege
│   └── Ranged + Infantry
└── Beginner Builds
    └── Balanced Army
```

**Impact:** New players learn meta strategies, experienced players save time.

---

### Import Compositions from JSON/URL
**Status:** Not Started
**Priority:** High
**Complexity:** Low

Allow importing saved compositions from JSON files or URLs.

**Features:**
- Import from JSON file upload
- Paste composition JSON directly
- Import from shared URL parameters
- Validate imported data structure
- Merge or replace current composition
- Import history tracking

**UI Elements:**
- "Import" button next to "Export"
- File upload dialog
- Paste JSON textarea modal
- "Import from URL" input field
- Validation error messages

**Technical Requirements:**
- File input with drag-and-drop support
- JSON schema validation
- Version compatibility checking
- Error handling for malformed data
- Sanitize imported data

**Impact:** Complete the save/load workflow, enable team composition sharing.

---

### Civilization UI Consolidation & Visual Polish
**Status:** Not Started
**Priority:** High
**Complexity:** Medium

Streamline the civilization selection interface to reduce visual redundancy and improve consistency.

**Current Issues:**
- Active civilization display doesn't utilize the civilization insignia
- Redundant visual elements: separate active status indicator + bonuses section + dropdown below
- Selected civilization doesn't auto-populate in comparison section
- Visual disconnect between selector and bonuses display

**Proposed Improvements:**

1. **Unified Civilization Display:**
   - Combine active status and bonuses section into single cohesive component
   - Display civilization insignia prominently next to active civilization name
   - Keep the excellent bonus count/type indicators (Military/Economic/Cost)
   - Remove redundant "Civilization" label repetition

2. **Bonuses Section Enhancement:**
   ```
   ┌─ Franks ─────────────────────────────┐
   │ [INSIGNIA] Active Civilization       │
   │ ⚔️ 3 Military  🌾 2 Economic  💰 1 Cost │
   │ [Filter controls...]                 │
   │ • Cavalry have +20% HP               │
   │ • Farm upgrades free                 │
   │ • ...                                │
   └──────────────────────────────────────┘
   ```

3. **Smart Comparison Integration:**
   - Auto-populate "Army A" with currently selected civilization
   - Pre-fill comparison when entering comparison mode
   - Remember last compared civilizations

**Technical Changes:**
- Refactor `CivilizationBonuses.jsx` to include insignia display
- Pass civilization icon URL through to bonuses component
- Remove duplicate civilization name displays
- Add context connection for comparison auto-fill
- Consolidate related state into single visual unit

**Acceptance Criteria:**
- Civilization insignia visible in bonuses section header
- No duplicate "Civilization" or civ name displays
- Bonus type indicators retained (they work well)
- Selected civ auto-fills comparison section
- Reduced vertical space usage
- Improved visual hierarchy

**Impact:** Cleaner, more professional UI with less visual clutter and better information density.

---

### Resource Tracker Visual Enhancement
**Status:** Not Started
**Priority:** High
**Complexity:** Medium

Improve the visual design and information density of the resource tracking component.

**Current Issues:**
- Basic appearance compared to rest of UI
- Progress bars lack visual refinement
- Resource icons could be more prominent
- Limited visual feedback for resource status

**Proposed Improvements:**

1. **Enhanced Progress Bars:**
   - Gradient fills for visual depth
   - Animated transitions when values change
   - Pulse effect when approaching limits
   - Resource-specific colors (Food=red, Wood=brown, Gold=yellow, Stone=gray)

2. **Improved Resource Icons:**
   - Larger, more detailed resource icons
   - Icon badges showing exact quantities
   - Tooltip with breakdown (units, fortifications, techs)
   - Glow effect on critical resources

3. **Status Indicators:**
   - Green checkmark when under budget
   - Yellow warning at 80-99% capacity
   - Red alert when over limit
   - Animated warning for exceeded resources

4. **Layout Refinements:**
   ```
   ┌─ Resources ──────────────────────────┐
   │ 🍖 Food      2,450 / 5,000           │
   │ [████████████░░░░░░] 49%             │
   │                                      │
   │ 🪵 Wood      1,200 / 3,000           │
   │ [████████░░░░░░░░░░] 40%             │
   │                                      │
   │ 🪙 Gold      3,800 / 4,000  ⚠️       │
   │ [██████████████████] 95%             │
   │                                      │
   │ 🪨 Stone       450 / 2,000           │
   │ [████░░░░░░░░░░░░░░] 23%             │
   │                                      │
   │ 👥 Population: 145 / 200             │
   └──────────────────────────────────────┘
   ```

5. **Interactive Features:**
   - Click resource to see cost breakdown
   - Hover for detailed tooltips
   - Mini-chart showing resource distribution
   - Quick adjust resource limits from tracker

**Technical Implementation:**
- Add CSS animations for smooth transitions
- Implement gradient backgrounds with Tailwind
- Add hover states and tooltips
- Consider Chart.js or simple SVG for visualizations
- Ensure dark mode compatibility

**Acceptance Criteria:**
- Progress bars have gradient fills and smooth animations
- Resource status clearly indicated (green/yellow/red)
- Tooltips show cost breakdown by category
- Visual design matches polished civ selector
- Dark/light mode fully supported
- Performance maintained (no jank on updates)

**Impact:** More visually appealing interface that matches the quality of other components, better resource awareness for users.

---

### Unit Search and Filter System
**Status:** ✅ Complete
**Priority:** High
**Complexity:** Low

With 100+ units, browsing is cumbersome. Add search and filter functionality.

**Features:**
- **Search Bar:** Type to find units by name
- **Category Filters:** Infantry, Cavalry, Archers, Siege, Naval, Unique
- **Cost Filters:** Filter by resource requirements (gold units, trash units, etc.)
- **Age Filters:** Show only units available in selected age
- **Counter Filters:** Filter units that counter specific unit types
- **Tag Filters:** Anti-cavalry, anti-archer, tanky, etc.

**UI Mockup:**
```
┌─────────────────────────────────────────┐
│ Search: [___________] 🔍                │
│ Filters: [Infantry▼] [All Ages▼] [All Costs▼] │
└─────────────────────────────────────────┘
```

**Acceptance Criteria:**
- ✅ Real-time search as user types
- ✅ Multiple filters can be combined
- ✅ Filter state persists during session
- ✅ Clear filters button
- ✅ Mobile-friendly filter UI

**Implementation Notes (v2.3.0):**
- New `UnitFilter` component with comprehensive filtering
- Search by unit name with instant results
- Category toggle buttons (Infantry, Cavalry, Archer, etc.)
- Cost type filters: Trash (no gold), Gold units, Low cost (<100 total)
- Age-specific filtering
- Results counter showing matches
- Clear all filters button

---

## 🎯 Medium Priority

### Enhanced Unique Unit Documentation
**Status:** Partially Complete
**Priority:** Medium
**Complexity:** Low

Create comprehensive documentation showcasing unique units.

**What to Add:**
- `UNIQUE_UNITS.md` file documenting all 50+ unique units
- Unique unit stats, costs, and special abilities
- Which civilizations get which unique units
- Historical/cultural context for unique units
- Visual guide with unit icons
- Link from main README

**Structure:**
```markdown
## European Civilizations

### Britons - Longbowman
- **Age:** Castle Age
- **Cost:** 35W, 40G
- **Special Ability:** +1 range, fires faster than Arbalester
- **Best Use:** Massed behind meat shield, siege support
```

---

### Team Bonus System
**Status:** Not Started
**Priority:** Medium
**Complexity:** Medium

Allow planning for team games by selecting allied civilizations.

**Features:**
- UI to select up to 3 allied civilizations (for 4v4)
- Display active team bonuses from allies
- Apply team bonus effects to calculations
- Show which ally provides which bonus
- Toggle team bonuses on/off

**Example:**
```
Your Civ: Mayans
Allies: Huns (cavalry +20% HP), Celts (siege speed +20%), Britons (archery ranges work 20% faster)
```

**Technical Notes:**
- Team bonuses already documented in civilization data
- Need UI for ally selection
- Some team bonuses affect production, not unit stats (display only)
- Some affect costs (implement calculation)

---

### Unit Counter Visualization
**Status:** ✅ Complete
**Priority:** Medium
**Complexity:** Low

Your unit data already includes `counters` and `weakTo` fields. Visualize this information.

**Features:**
- Show counter relationships on unit cards
- "Strong Against" badges with icons
- "Weak Against" warnings
- Army composition analysis: "Your army is weak to Knights"
- Counter suggestion: "Add Spearmen to counter enemy cavalry"

**UI Examples:**
- ✅ **Strong vs:** [Archer Icon] [Skirmisher Icon]
- ⚠️ **Weak to:** [Knight Icon] [Cataphract Icon]

**Acceptance Criteria:**
- ✅ All unit cards show counter information
- ✅ Color-coded badges (green for counters, red for weaknesses)
- Composition-level analysis warns of vulnerabilities (future enhancement)
- Clickable counter icons to add suggested units (future enhancement)

**Implementation Notes (v2.3.0):**
- Collapsible "Counters & Weaknesses" section on each unit card
- Green badges for "Strong Against" with unit names
- Red badges for "Weak To" with unit names
- Tooltips explaining relationships
- Uses existing `counters` and `weakTo` data from unit definitions
- Smart unit name resolution from IDs

---

### Advanced Filtering for Civilization Bonuses
**Status:** ✅ Complete
**Priority:** Medium
**Complexity:** Low

Enhance the existing `CivilizationBonuses.jsx` component with filtering.

**Features:**
- Filter bonuses by type: Military (⚔️), Economic (🌾), Cost (💰)
- Search bonuses by keyword (e.g., "archer", "gold", "cavalry")
- Toggle showing only active bonuses (affecting current army)
- Compare bonuses across multiple civilizations
- Show bonus values by age

**Example UI:**
```
Civilization Bonuses (Mayans) 🔍 [Search bonuses...]
☑️ Military  ☑️ Economic  ☑️ Cost  ☐ Active Only
```

**Implementation Notes (v2.3.0):**
- ✅ Search bar to filter bonuses by keyword
- ✅ Color-coded toggle buttons for Military (red), Economic (green), Cost (yellow)
- ✅ "Active Only" filter to show bonuses affecting current army composition
- ✅ Real-time filtering with result count
- ✅ Clear filters button
- ✅ "No results" message when filters match nothing
- ✅ Dark mode support for all filter controls

---

### Keyboard Shortcuts for Power Users
**Status:** Not Started
**Priority:** Medium
**Complexity:** Low

Add keyboard shortcuts to improve workflow efficiency.

**Shortcuts:**
- `Ctrl/Cmd + S` - Save current composition
- `Ctrl/Cmd + E` - Export to JSON
- `Ctrl/Cmd + /` - Focus search bar
- `Ctrl/Cmd + 1-5` - Switch age (Dark=1, Feudal=2, Castle=3, Imperial=4)
- `Ctrl/Cmd + D` - Toggle dark mode
- `Ctrl/Cmd + C` - Toggle comparison mode
- `Esc` - Clear filters/close modals
- `?` - Show keyboard shortcuts help
- `+/-` on unit cards - Increment/decrement quantity

**UI Requirements:**
- Keyboard shortcut help modal (press `?`)
- Visual indicators for shortcuts in UI
- Customizable shortcuts (future)
- No conflicts with browser shortcuts

**Technical Implementation:**
- Global keyboard event listener in App.jsx
- useKeyboardShortcuts custom hook
- Prevent default for captured shortcuts
- Focus management for accessibility

**Impact:** Power users can plan armies 2-3x faster.

---

### Undo/Redo System
**Status:** Not Started
**Priority:** Medium
**Complexity:** Medium

Allow users to undo and redo composition changes.

**Features:**
- Undo last action (unit add/remove, config change)
- Redo previously undone action
- History stack with 50+ actions
- Visual undo/redo buttons
- Keyboard shortcuts (Ctrl+Z, Ctrl+Shift+Z)
- History preview (optional)

**Technical Requirements:**
- Implement command pattern or state snapshots
- Store action history in context
- Efficient state diffing for memory management
- Handle edge cases (clear composition, load preset)

**Implementation Approach:**
```javascript
// State snapshot approach
const [history, setHistory] = useState([initialState]);
const [historyIndex, setHistoryIndex] = useState(0);

const undo = () => historyIndex > 0 && setHistoryIndex(i => i - 1);
const redo = () => historyIndex < history.length - 1 && setHistoryIndex(i => i + 1);
```

**Impact:** Reduces user frustration, enables experimentation.

---

### Multi-Language Support (i18n)
**Status:** Not Started
**Priority:** Medium
**Complexity:** High

Internationalize the application for global users.

**Languages (Priority Order):**
1. English (current)
2. Spanish (large AoE2 community)
3. German (strong EU player base)
4. Portuguese (Brazil community)
5. French
6. Korean (competitive scene)
7. Chinese (growing player base)

**Technical Requirements:**
- Install react-i18next or similar library
- Extract all strings to translation files
- Handle unit names (keep official translations)
- Date/number formatting by locale
- RTL support for Arabic (future)
- Language detection from browser
- Language selector UI

**Files to Create:**
```
src/
├── i18n/
│   ├── index.js           # i18n configuration
│   ├── locales/
│   │   ├── en.json        # English
│   │   ├── es.json        # Spanish
│   │   ├── de.json        # German
│   │   └── ...
```

**Challenges:**
- Unit names must match official game translations
- Cultural differences in bonus descriptions
- Maintaining translation quality

**Impact:** Opens app to ~60% more potential users globally.

---

### Army Composition Analysis & Recommendations
**Status:** Not Started
**Priority:** Medium
**Complexity:** Medium

Provide intelligent feedback on army compositions.

**Features:**
- **Vulnerability Analysis:**
  - "Your army is weak to cavalry - consider adding Spearmen"
  - "No siege units - you may struggle against fortifications"
  - "Heavy gold cost - vulnerable to trade disruption"
- **Balance Indicators:**
  - Melee/Ranged ratio visualization
  - Gold/Trash unit balance
  - Population efficiency score
- **Counter Suggestions:**
  - "Enemy has archers? Add Skirmishers or Siege"
  - "Facing cavalry? Camels or Halbs recommended"
- **Cost Efficiency Ratings:**
  - Resource efficiency per unit type
  - Pop efficiency comparisons

**UI Design:**
```
┌─ Army Analysis ─────────────────┐
│ ⚠️ Vulnerabilities               │
│   • Weak to: Knights, Paladins  │
│   • Missing: Siege weapons      │
│                                 │
│ 📊 Balance                       │
│   Melee: ████░░ 40%             │
│   Ranged: ██████ 60%            │
│                                 │
│ 💡 Suggestions                   │
│   + Add 5 Halberdiers            │
│   + Consider Rams for buildings  │
└─────────────────────────────────┘
```

**Impact:** Helps players identify composition weaknesses before battles.

---

### Civilization Quick Stats & Tier List
**Status:** Not Started
**Priority:** Medium
**Complexity:** Low

Display civilization power rankings and quick stats.

**Features:**
- Overall tier list (S, A, B, C, D) based on current meta
- Win rates by ELO bracket (integrate with aoestats.io)
- Civilization strengths summary
- Best maps for each civ
- Difficulty rating (beginner, intermediate, advanced)
- Popular strategies per civ

**Data Sources:**
- aoestats.io for win rates
- Community tier lists (TheViper, Hera, etc.)
- Tournament results

**UI Placement:**
- Dropdown next to civilization selector
- Tooltip on hover over civ name
- Dedicated "Civ Guide" panel (collapsible)

**Example Display:**
```
Franks - Tier: S
Win Rate: 52.3% (1200+ ELO)
Strengths: Cavalry, Fast Castle
Best Maps: Arabia, Arena
Difficulty: Beginner-Friendly
```

**Impact:** Helps players choose civilizations that match their skill level and strategy.

---

## 💡 Future Considerations

### Battle Simulator
**Status:** Not Started
**Priority:** Low
**Complexity:** Very High

Calculate expected outcomes of army vs army matchups.

**What It Would Do:**
- Input: Two army compositions
- Output: Predicted winner, casualties, cost-effectiveness
- Factors: Unit counters, stats, micro potential, formation
- Visualization: Animated battle timeline

**Why Low Priority:**
- Extremely complex to implement accurately
- AoE2 combat involves micro, positioning, terrain
- Risk of oversimplification or inaccuracy
- Many existing tools for this (aoe2calc, etc.)

**If Implemented:**
- Partner with existing battle calculators
- Use official game data from DE
- Disclaimer about simulation limitations

---

### Formation and Positioning System
**Status:** Not Started
**Priority:** Low
**Complexity:** High

Visual army formation planner.

**Features:**
- Drag-and-drop unit positioning
- Formation templates (box, line, staggered)
- Range visualization
- Melee/ranged layering
- Export formation images

**Why Low Priority:**
- Niche use case (mostly for specific battles)
- Complex UI/UX
- Position matters less than composition in most games

---

### Economic Planning Module
**Status:** Not Started
**Priority:** Medium
**Complexity:** Medium

Help players plan villager distribution to afford their army.

**Features:**
- Input desired army composition
- Output: Required villagers per resource
- Timeline: When can you afford X units
- Villager efficiency calculations
- Build order suggestions

**Example:**
```
To afford this army continuously:
- 20 farmers (food)
- 15 lumberjacks (wood)
- 25 gold miners (gold)
- 5 stone miners (stone)
```

---

### Mobile App Version
**Status:** Not Started
**Priority:** Low
**Complexity:** High

Native mobile apps for iOS and Android.

**Options:**
- React Native port
- Progressive Web App (PWA) - easier path
- Capacitor.js wrapper

**Why Low Priority:**
- Current responsive web design works on mobile
- PWA can provide offline support without app stores
- Development and maintenance overhead

---

### Integration with AoE2.net API
**Status:** Not Started
**Priority:** Low
**Complexity:** Medium

Integrate with Age of Empires II API for live data.

**Features:**
- Pull official unit stats from API
- Get latest patch balance changes
- Stay automatically updated with game patches
- Link to player profiles and match history

**API:** https://age-of-empires-2-api.herokuapp.com/docs/

**Challenges:**
- API reliability and maintenance
- Handling API downtime gracefully
- May not include all DE content

---

### Replay File Analysis
**Status:** Not Started
**Priority:** Low
**Complexity:** Very High

Parse and analyze AoE2 replay files (.aoe2record).

**Features:**
- Upload replay file
- Extract army compositions at key timestamps
- Analyze resource spending patterns
- Visualize unit production timeline
- Compare to optimal compositions
- Learning tool for improving gameplay

**Technical Challenges:**
- Reverse-engineer replay file format
- Handle different game versions
- Large file sizes (10-50MB)
- Compute-intensive parsing

**Why Low Priority:**
- Extremely complex to implement
- Replay format not officially documented
- Third-party tools exist (CaptureAge, etc.)

---

### Cloud Sync & User Accounts
**Status:** Not Started
**Priority:** Low
**Complexity:** Very High

Backend infrastructure for user accounts and cloud saving.

**Features:**
- User registration/login (OAuth with Discord/Google)
- Cloud-synced compositions across devices
- Community shared composition library
- Composition ratings and comments
- User profiles with favorite civilizations
- History of saved compositions

**Technical Requirements:**
- Backend server (Node.js/Express or similar)
- Database (PostgreSQL or MongoDB)
- Authentication system (JWT, OAuth)
- API endpoints for CRUD operations
- Security measures (rate limiting, validation)
- GDPR compliance for EU users

**Infrastructure:**
- Hosting (Vercel, Heroku, AWS)
- Database hosting
- CDN for static assets
- Monitoring and logging

**Why Low Priority:**
- Significant infrastructure cost
- Ongoing maintenance burden
- Security responsibilities
- Current localStorage solution works well

---

### Hotkey Reference Integration
**Status:** Not Started
**Priority:** Low
**Complexity:** Low

Display in-game hotkeys for selected units.

**Features:**
- Show default hotkey for unit production
- Display control group shortcuts
- Military building hotkeys
- Customizable hotkey presets (default, grid, etc.)
- Printable hotkey cheat sheet

**Data Requirements:**
- Hotkey mappings for all buildings
- Unit production hotkeys
- Different hotkey profiles

**Impact:** Helps players practice hotkeys alongside composition planning.

---

### Tournament Mode
**Status:** Not Started
**Priority:** Low
**Complexity:** Medium

Special features for tournament organizers.

**Features:**
- Tournament bracket integration
- Pre-set civilization pools (draft mode)
- Map pool configuration
- Best-of series tracking
- Export tournament reports
- Spectator-friendly views

**Use Cases:**
- Casters planning commentary
- Tournament admins tracking picks/bans
- Players preparing for specific opponents

---

## ⚠️ Technical Debt & Security

### Dependency Updates
**Status:** Needs Attention
**Priority:** Medium
**Complexity:** Low

Current security vulnerabilities and outdated dependencies:
- 4 moderate severity vulnerabilities in esbuild/vite
- ESLint 8.x deprecated (upgrade to ESLint 9.x)
- Several deprecated npm packages (rimraf, inflight, glob)

**Required Actions:**
- Run `npm audit fix --force` (may introduce breaking changes)
- Test thoroughly after updates
- Update ESLint configuration for v9 compatibility

---

### Architecture Improvements
**Status:** Not Started
**Priority:** Medium
**Complexity:** High

Address structural issues identified in code review:

**State Management:**
- Reduce prop drilling through multiple component levels
- Consider Zustand or Jotai for simpler state management
- Extract business logic into custom hooks (useConfig, useComposition)

**Code Organization:**
- Create useToast custom hook to eliminate code duplication
- Separate business logic from UI in components
- Add feature flag system for safer rollouts

**Error Handling:**
- Standardize on logger utility (currently mix of logger.error, console.error, silent fail)
- Add proper error states and user feedback
- Implement retry logic for network operations

---

### TypeScript Migration
**Status:** Not Started
**Priority:** Medium
**Complexity:** High

Migrate codebase from JavaScript to TypeScript for better type safety.

**Benefits:**
- Compile-time type checking
- Better IDE autocomplete and refactoring
- Self-documenting code with interfaces
- Catch bugs before runtime
- Easier onboarding for new contributors

**Migration Strategy:**
1. Install TypeScript and configure `tsconfig.json`
2. Rename files incrementally (`.jsx` → `.tsx`)
3. Add type definitions for data structures (Unit, Civilization, Tech)
4. Type React components with generic props
5. Add strict mode gradually
6. Remove PropTypes once TypeScript coverage is complete

**Key Types to Define:**
```typescript
interface Unit {
  id: string;
  name: string;
  age: 'dark' | 'feudal' | 'castle' | 'imperial';
  cost: { food?: number; wood?: number; gold?: number; stone?: number };
  population: number;
  category: 'infantry' | 'cavalry' | 'archer' | 'siege' | 'naval' | 'unique';
  counters: string[];
  weakTo: string[];
}

interface Civilization {
  id: string;
  name: string;
  bonuses: CivBonus[];
  teamBonus: string;
  uniqueUnit: string;
  uniqueTech: string[];
}
```

**Effort Estimate:** 40-60 hours for full migration

**Impact:** Significantly improved code reliability and developer experience.

---

### ESLint 9.x Migration
**Status:** Not Started
**Priority:** Medium
**Complexity:** Low

Update ESLint configuration for version 9.x compatibility.

**Current Issue:**
- ESLint 8.56.0 installed but uses deprecated `.eslintrc.json` format
- Future ESLint versions require flat config (`eslint.config.js`)
- Blocking `npm run check` in some environments

**Required Actions:**
1. Migrate `.eslintrc.json` to `eslint.config.js` (flat config)
2. Update ESLint plugins for v9 compatibility
3. Test all linting rules still work
4. Update CI/CD scripts if needed

**New Config Format:**
```javascript
// eslint.config.js
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  js.configs.recommended,
  {
    plugins: { react, 'react-hooks': reactHooks },
    rules: {
      // ... existing rules
    },
  },
];
```

**Impact:** Future-proofs linting infrastructure, unblocks tooling.

---

### Performance Monitoring & Analytics Dashboard
**Status:** Not Started
**Priority:** Low
**Complexity:** Medium

Track application performance metrics.

**Metrics to Track:**
- Component render times
- Bundle size trends
- User session duration
- Feature usage statistics
- Error rates and types
- Load times by network condition

**Tools:**
- Lighthouse CI for performance audits
- Web Vitals (LCP, FID, CLS)
- Bundle analyzer integration
- Error tracking (Sentry or similar)

**Dashboard Features:**
- Performance trend graphs
- Bundle size breakdown
- Most used features
- Error hotspots
- User flow analysis

**Impact:** Data-driven optimization decisions.

---

## Recently Completed ✅

### Civilization Selector Enhancement (v2.4.1 - November 2025)
- ✅ Enhanced civilization selector with visual prominence
- ✅ Added civilization icons for all 51 civilizations
- ✅ Improved UI/UX for civilization selection
- ✅ Better visual feedback and discoverability

### Component Testing & Performance (v2.4.1 - November 2025)
Comprehensive component testing and performance improvements:
- ✅ **Component Testing:** Added 89 tests for critical UI components (ErrorBoundary, ThemeToggle, ResourceCost, UnitCard)
- ✅ **Performance:** Added search input debouncing (300ms) to UnitFilter for improved responsiveness
- ✅ **Testing Infrastructure:** Added @testing-library/jest-dom and vitest setup configuration
- ✅ **Testing:** Total test coverage increased to 256 tests (313% total increase from v2.3 baseline of 62 tests)

### Code Quality & Data Processing Improvements (v2.4.0 - November 2025)
Comprehensive code hardening and robustness improvements:
- ✅ **Error Handling:** Added Error Boundary component for graceful error recovery
- ✅ **Input Validation:** Added bounds checking for all numeric inputs (resource limits, population cap, unit quantities)
- ✅ **Type Safety:** Added PropTypes to critical components (UnitCard, FortificationCard, ResourceCost, ErrorBoundary)
- ✅ **Code Deduplication:** Extracted shared ResourceCost component, reducing code duplication by ~60 lines
- ✅ **Performance:** Optimized bonus matching algorithm from O(n²) to O(n) using Set-based lookups
- ✅ **Performance:** Added comprehensive memoization to ResourceTracker and CivilizationBonuses
- ✅ **Accessibility:** Added ARIA labels, progressbar attributes, screen reader support, proper form labels
- ✅ **Testing:** Added 54 new service layer tests (StorageService, ExportService, ShareService)
- ✅ **Testing:** Total test coverage increased from 62 tests to 142 tests (129% increase)
- ✅ **Dependencies:** Added prop-types for type safety, jsdom for testing infrastructure

### Code Quality Fixes (v2.3.1 - November 2025)
- Fixed 2 failing tests for population calculations after siege unit corrections
- Fixed 14 ESLint errors (unescaped entities, missing curly braces)
- Removed hard-coded version string in export service
- Cleaned up unused variables
- Comprehensive codebase review identifying 38+ improvement areas

### Unit Search and Filter System (v2.3.0)
Comprehensive filtering UI with search bar, category toggles, cost type filters, and age filters. New `UnitFilter` component.

### Unit Counter Visualization (v2.3.0)
Visual display of counter relationships on unit cards with green "Strong Against" and red "Weak To" badges.

### Advanced Civilization Bonus Filtering (v2.3.0)
Search and filter civilization bonuses by type (Military/Economic/Cost) and by keyword with "Active Only" toggle.

### Tech Tree Restrictions (v2.2.1)
All 51 civilizations have tech tree restrictions implemented in `src/data/techTree.js`.

### Civilization Bonus Documentation (v2.2.1)
Complete documentation of all military and economic bonuses in `CIV_BONUSES.md`.

### Visual Comparison Tool (v2.1.0)
Side-by-side civilization comparison implemented in `CivilizationComparison.jsx`.

### Fortification System (v2.2.0)
Full support for walls, gates, towers, and castles with flexible display modes.

---

## How to Contribute

1. Pick an item from this roadmap
2. Create a GitHub issue (see `GITHUB_ISSUES.md` for templates)
3. Discuss approach in the issue
4. Fork the repo and create a feature branch
5. Submit a PR referencing the issue

For questions or suggestions about the roadmap, open a discussion on GitHub.

---

**Last Updated:** November 16, 2025
**Current Version:** 2.4.0
**Total Roadmap Items:** 35+ features across 4 priority levels
**Next Major Focus:** PWA Support, Preset Compositions, Import Functionality
