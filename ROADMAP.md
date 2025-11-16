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
**Status:** Not Started
**Priority:** Critical
**Complexity:** High

Add support for Age of Empires II technologies and upgrades:
- Blacksmith upgrades (Fletching, Bodkin Arrow, Bracer, Forging, Iron Casting, Blast Furnace, etc.)
- University technologies (Ballistics, Chemistry, Siege Engineers, etc.)
- Monastery upgrades (Redemption, Atonement, Sanctity, etc.)
- Economy upgrades (Wheelbarrow, Hand Cart, etc.)
- Age-specific techs that unlock or enhance units
- Unique technologies for each civilization

**Impact:** Transforms the calculator from basic cost tracking to realistic army planning with actual combat-ready stats.

**Technical Requirements:**
- Create technology data structure with costs, requirements, effects
- Build tech tree UI for selecting/deselecting upgrades
- Implement stat calculation engine that applies tech bonuses
- Handle civ-specific tech restrictions
- Update unit stat displays to show modified values

**Acceptance Criteria:**
- Users can select technologies available to their civilization
- Unit stats (HP, attack, armor, range) update based on selected techs
- Costs account for technology investments
- Tech tree shows which techs are available per age
- Unique technologies properly integrated

---

## ⭐ High Priority

### Calculate and Display Unit Statistics
**Status:** Not Started
**Priority:** High
**Complexity:** Medium

Currently, military bonuses (HP, attack, armor, range) are shown for reference only. Calculate and display actual unit stats.

**What to Implement:**
- Calculate base stats + civilization bonuses
- Display modified stats on unit cards
- Show stat comparisons between civilizations
- Highlight which bonuses are active for current army composition
- Add tooltips explaining stat calculations

**Impact:** Users can see actual combat effectiveness, not just costs.

**Dependencies:** Should ideally be done alongside or after Technology System.

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

## Recently Completed ✅

### Component Testing & Performance (v2.4.1 - November 2025)
Comprehensive component testing and performance improvements:
- ✅ **Component Testing:** Added 89 tests for critical UI components (ErrorBoundary, ThemeToggle, ResourceCost, UnitCard)
- ✅ **Performance:** Added search input debouncing (300ms) to UnitFilter for improved responsiveness
- ✅ **Testing Infrastructure:** Added @testing-library/jest-dom and vitest setup configuration
- ✅ **Testing:** Total test coverage increased from 142 tests to 225 tests (58% increase, 263% total increase from v2.3)

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

**Last Updated:** November 2025
**Current Version:** 2.4.0
