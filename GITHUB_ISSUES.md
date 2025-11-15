# GitHub Issues - Ready to Copy & Paste

This file contains pre-written GitHub issues for the roadmap items. Copy each issue below and paste into GitHub Issues.

**How to create issues:**
1. Go to https://github.com/conorbronsdon/aoe2-troop-calculator/issues/new
2. Copy the title and body from the sections below
3. Add appropriate labels (enhancement, feature, documentation, etc.)
4. Submit the issue

---

## Issue #1: Technology/Upgrade System

### Title
```
Implement Technology/Upgrade System
```

### Body
```markdown
## Description
Add support for Age of Empires II technologies and upgrades to make army compositions realistic and combat-ready.

## Problem
Currently, the calculator shows base unit stats without any upgrades. In real games, units always have technologies researched (Fletching, Bodkin Arrow, armor upgrades, etc.). This makes the calculator less accurate for planning actual army compositions.

## Proposed Solution
Implement a comprehensive technology system that allows users to:
- Select Blacksmith upgrades (attack, armor, archer upgrades)
- Choose University technologies (Ballistics, Chemistry, Siege Engineers, etc.)
- Enable Monastery upgrades (Redemption, Sanctity, etc.)
- Apply economy upgrades (Wheelbarrow, Hand Cart, etc.)
- Access civilization-specific unique technologies

## Technical Requirements
- [ ] Create technology data structure (`src/data/technologies.js`)
  - Technology costs, prerequisites, effects
  - Age requirements
  - Civilization-specific restrictions
- [ ] Build tech tree UI component
  - Visual tech tree or categorized selection
  - Show/hide techs based on selected age and civ
  - Display costs and effects
- [ ] Implement stat calculation engine
  - Apply technology bonuses to unit stats
  - Combine with civilization bonuses
  - Update resource calculations to include tech costs
- [ ] Update unit displays
  - Show modified stats on unit cards
  - Tooltips explaining which techs are applied
  - Before/after comparison view

## Acceptance Criteria
- [ ] Users can select technologies available to their civilization
- [ ] Unit stats (HP, attack, armor, range) update based on selected techs
- [ ] Total cost accounts for technology investments
- [ ] Tech tree shows which techs are available per age
- [ ] Unique technologies properly integrated
- [ ] Mobile-responsive tech selection UI
- [ ] Tests for technology application logic

## Priority
🔥 **Critical** - This is the biggest missing feature

## Estimated Complexity
**High** - Requires significant data entry, UI work, and calculation logic

## Related Issues
- Depends on or relates to: "Calculate and Display Unit Statistics" (#2)

## Additional Context
Reference: [Official AoE2 Tech Tree](https://ageofempires.fandom.com/wiki/Technology_tree)

## Files to Modify/Create
- `src/data/technologies.js` (new)
- `src/components/TechnologyTree.jsx` (new)
- `src/context/ArmyContext.jsx` (modify)
- `src/utils/calculations.js` (modify or create)
```

### Labels
`enhancement`, `feature`, `high-priority`, `complex`

---

## Issue #2: Calculate and Display Unit Statistics

### Title
```
Calculate and Display Actual Unit Statistics
```

### Body
```markdown
## Description
Currently, military bonuses (HP, attack, armor, range) are shown for reference only. Implement actual stat calculations so users can see real combat effectiveness.

## Problem
The civilization bonuses panel shows stat bonuses like "+2 HP for Knights" but these aren't calculated or displayed on the unit cards. Users can't see the actual combat stats of their units.

## Proposed Solution
Calculate and display modified unit stats based on:
- Base unit stats
- Civilization bonuses
- Future: Technology upgrades (see issue #1)

## Tasks
- [ ] Create base stats data for all units
  - HP, attack, armor (melee/pierce), range, speed
  - Add to unit data structure
- [ ] Build stat calculation utility
  - Apply civilization bonuses to base stats
  - Handle percentage and flat bonuses
  - Combine multiple bonuses correctly
- [ ] Update unit card display
  - Show calculated stats
  - Highlight bonused stats (e.g., "HP: 110 (+10)")
  - Add stat tooltips explaining calculation
- [ ] Add stat comparison view
  - Compare same unit across civilizations
  - Show stat differences in comparison mode
- [ ] Create unit stats reference
  - Sortable table of all units with stats
  - Filter by category, civilization

## Acceptance Criteria
- [ ] All units show accurate HP, attack, armor, range
- [ ] Bonuses from civilizations properly applied
- [ ] Stat modifications clearly indicated
- [ ] Tooltips explain where bonuses come from
- [ ] Stats update when civilization changes
- [ ] Unit tests for stat calculation logic

## Priority
⭐ **High** - Significantly increases calculator value

## Estimated Complexity
**Medium** - Data entry + calculation logic

## Related Issues
- Should be implemented alongside or after: "Technology/Upgrade System" (#1)

## Data Source
Use official AoE2 DE stats: https://age-of-empires-2-api.herokuapp.com/docs/

## Files to Modify/Create
- `src/data/units/*.js` (add base stats)
- `src/utils/statCalculations.js` (new)
- `src/components/UnitCard.jsx` (enhance)
- `src/components/UnitStatsTooltip.jsx` (new)
```

### Labels
`enhancement`, `feature`, `high-priority`

---

## Issue #3: Unit Search and Filter System

### Title
```
Add Unit Search and Advanced Filtering
```

### Body
```markdown
## Description
With 100+ units, browsing is cumbersome. Add search and filter functionality to help users find units quickly.

## Problem
Users must scroll through all units to find what they need. No way to quickly find "all cavalry" or "trash units" or search by name.

## Proposed Solution
Add a comprehensive search and filter system to the unit selection panel.

## Features
- [ ] **Search Bar**
  - Real-time search as user types
  - Search by unit name
  - Fuzzy matching (e.g., "arc" matches "Archer")

- [ ] **Category Filters**
  - Infantry, Cavalry, Archers, Siege, Naval, Unique, Monks
  - Multi-select with checkboxes or pills

- [ ] **Cost Filters**
  - Gold units (requires gold)
  - Trash units (no gold cost)
  - Filter by specific resources

- [ ] **Age Filters**
  - Filter by availability (Dark, Feudal, Castle, Imperial)

- [ ] **Counter Filters**
  - "Counters Archers", "Counters Cavalry", etc.
  - Use existing `counters` field in unit data

- [ ] **Tag System** (optional enhancement)
  - Anti-cavalry, anti-archer, tanky, fast, etc.
  - Add tags to unit data

## UI Mockup
```
┌────────────────────────────────────────────────┐
│ 🔍 Search units... [________________]          │
│                                                 │
│ Category: [All ▼] Age: [All ▼] Cost: [All ▼]  │
│                                                 │
│ ☐ Counters Infantry  ☐ Counters Cavalry        │
│                                                 │
│ [Clear Filters] [25 units shown]               │
└────────────────────────────────────────────────┘
```

## Acceptance Criteria
- [ ] Search responds instantly (debounced if needed)
- [ ] Multiple filters can be combined (AND logic)
- [ ] Filter state persists during session
- [ ] Clear filters button resets all filters
- [ ] Mobile-friendly filter UI (collapsible on mobile)
- [ ] URL params update to reflect filters (shareable filtered views)
- [ ] Show count of filtered results

## Priority
⭐ **High** - Immediate UX improvement

## Estimated Complexity
**Low-Medium** - Straightforward UI enhancement

## Files to Modify/Create
- `src/components/UnitSelection.jsx` (major update)
- `src/components/UnitFilters.jsx` (new)
- `src/components/SearchBar.jsx` (new)
- `src/utils/filterUtils.js` (new)
```

### Labels
`enhancement`, `UX`, `high-priority`, `good-first-issue`

---

## Issue #4: Enhanced Unique Unit Documentation

### Title
```
Create Comprehensive Unique Unit Documentation
```

### Body
```markdown
## Description
Create detailed documentation showcasing all 50+ unique units with stats, special abilities, and strategic information.

## Motivation
Unique units are what make each civilization special. We have the data, but it's not well-documented for users to learn from.

## Proposed Content

### New File: `UNIQUE_UNITS.md`

Structure:
```markdown
# Unique Units Guide

## European Civilizations

### Britons - Longbowman
- **Trained At:** Castle, Archery Range (Imp)
- **Age:** Castle Age
- **Cost:** 35 Wood, 40 Gold
- **Stats:**
  - HP: 35 (40 Elite)
  - Attack: 6 (7 Elite)
  - Range: 5 (6 Elite) - longest range archer!
  - Armor: 0/0 (0/1 Elite)
- **Special Abilities:**
  - +1 range over standard archers
  - Faster firing rate than Arbalester
  - Bonus vs Spearmen
- **Counters:** Skirmishers, Siege, Cavalry charges
- **Best Use:** Mass behind meat shield, siege support
- **Historical Context:** Famous English longbowmen from Hundred Years' War

[Repeat for all 50+ unique units organized by region]
```

## Tasks
- [ ] Document all unique units with full stats
- [ ] Include special abilities and quirks
- [ ] Add strategic usage tips
- [ ] Include historical/cultural context
- [ ] Add visual guide with unit icons
- [ ] Link from main README
- [ ] Cross-reference with civilization bonuses
- [ ] Add comparison table (sortable)

## Bonus Enhancement (optional)
- [ ] Add "Unique Units" filter to main calculator
- [ ] Highlight unique units in unit selection
- [ ] Show special abilities on unit cards

## Acceptance Criteria
- [ ] All 50+ unique units documented
- [ ] Accurate stats and costs
- [ ] Clear strategic guidance
- [ ] Well-formatted and readable
- [ ] Linked from README.md

## Priority
🎯 **Medium** - Good value, mostly documentation work

## Estimated Complexity
**Low** - Primarily documentation, data is already in code

## Files to Create
- `UNIQUE_UNITS.md` (new)
- Update `README.md` to link to it

## Data Source
Reference: `src/data/units/unique.js` (already contains all unique units)
```

### Labels
`documentation`, `enhancement`, `good-first-issue`

---

## Issue #5: Team Bonus System for Allied Civilizations

### Title
```
Implement Team Bonus System for Allied Civilizations
```

### Body
```markdown
## Description
Allow users to select allied civilizations and apply team bonuses for team game planning.

## Motivation
Team games (2v2, 3v3, 4v4) are extremely popular in AoE2. Team bonuses significantly affect army composition and strategy.

## Proposed Solution
Add ally selection UI and team bonus application.

## Features
- [ ] **Ally Selection Panel**
  - Select up to 3 allied civilizations (for 4v4)
  - Dropdown or autocomplete for each ally slot
  - Clear individual allies

- [ ] **Team Bonus Display**
  - Show active team bonuses from each ally
  - Indicate which ally provides which bonus
  - Group with your own civilization bonuses

- [ ] **Bonus Application**
  - Apply team bonus effects to calculations
  - Handle cost reduction team bonuses (e.g., Mayans wall discount)
  - Display-only bonuses (e.g., Huns cavalry HP boost)

- [ ] **Toggle System**
  - Enable/disable team bonuses
  - Useful for 1v1 vs team game planning

## UI Mockup
```
┌─────────────────────────────────────────┐
│ Your Civilization: [Mayans ▼]           │
│                                          │
│ Allies (Team Bonuses):                  │
│ Ally 1: [Huns ▼]        🤝 +20% Cav HP  │
│ Ally 2: [Celts ▼]       🤝 +20% Siege   │
│ Ally 3: [Britons ▼]     🤝 Ranges +20%  │
│                                          │
│ ☑️ Apply team bonuses to calculations   │
└─────────────────────────────────────────┘
```

## Technical Requirements
- [ ] Extend configuration state to include allies
- [ ] Create AllySelection component
- [ ] Parse team bonus data from civilizations.js
- [ ] Apply team bonuses in calculation logic
- [ ] Update save/load to include ally selections
- [ ] Update URL sharing to encode allies

## Acceptance Criteria
- [ ] Users can select up to 3 allies
- [ ] Team bonuses clearly displayed
- [ ] Cost-affecting team bonuses properly calculated
- [ ] Toggle for enabling/disabling team bonuses
- [ ] Ally selections persist in saves and shares
- [ ] Mobile-responsive UI

## Priority
🎯 **Medium** - Useful for team game players

## Estimated Complexity
**Medium** - UI + calculation logic

## Related Data
Team bonuses already documented in `src/data/civilizations.js` under `teamBonus` field.

## Files to Modify/Create
- `src/components/AllySelection.jsx` (new)
- `src/context/ArmyContext.jsx` (extend state)
- `src/components/CivilizationBonuses.jsx` (show team bonuses)
```

### Labels
`enhancement`, `feature`, `medium-priority`

---

## Issue #6: Unit Counter Relationship Visualization

### Title
```
Visualize Unit Counter Relationships
```

### Body
```markdown
## Description
Display counter relationships on unit cards and provide army composition analysis based on counters.

## Motivation
Unit data already includes `counters` and `weakTo` fields, but this valuable information isn't shown to users.

## Proposed Features

### 1. Unit Card Counter Badges
Show counter information directly on unit cards:
```
┌─────────────────────┐
│ Knight              │
│ Cost: 60F 75G       │
│                     │
│ ✅ Strong vs:       │
│   [Archer] [Skirm]  │
│                     │
│ ⚠️ Weak to:         │
│   [Spear] [Camel]   │
└─────────────────────┘
```

### 2. Army Composition Analysis
Analyze the current army and warn of vulnerabilities:
```
⚠️ Your army is weak to: Knights (60% vulnerable)
💡 Suggestion: Add Spearmen or Camels
```

### 3. Interactive Counter System
- Click counter icons to add suggested units
- Hover for counter relationship details
- Filter units by "counters X" or "weak to Y"

## Tasks
- [ ] Create CounterBadge component
- [ ] Add counter display to UnitCard
- [ ] Build army composition analyzer
  - Calculate vulnerability percentages
  - Suggest counter units
  - Highlight critical weaknesses
- [ ] Add counter-based filtering (see issue #3)
- [ ] Create counter relationship visualization
  - Optional: Interactive graph showing all counter relationships
- [ ] Add tooltips explaining why unit counters another

## Acceptance Criteria
- [ ] All unit cards show counter information
- [ ] Composition-level warnings for vulnerabilities
- [ ] Clickable suggestions to add counter units
- [ ] Color-coded badges (green/red for good/bad)
- [ ] Works with existing counter data (no data changes needed)

## Priority
🎯 **Medium** - Educational and strategic value

## Estimated Complexity
**Low-Medium** - UI work, data already exists

## Data Source
Counter relationships already in `src/data/units/*.js` files:
```javascript
counters: ['archer', 'skirmisher'],
weakTo: ['knight', 'cataphract']
```

## Files to Modify/Create
- `src/components/CounterBadge.jsx` (new)
- `src/components/UnitCard.jsx` (enhance)
- `src/components/CompositionAnalyzer.jsx` (new)
- `src/utils/counterAnalysis.js` (new)
```

### Labels
`enhancement`, `UX`, `medium-priority`

---

## Issue #7: Advanced Civilization Bonus Filtering

### Title
```
Add Filtering and Search to Civilization Bonuses Panel
```

### Body
```markdown
## Description
Enhance the existing `CivilizationBonuses.jsx` component with filtering and search capabilities.

## Current State
The bonuses panel shows all bonuses for selected civilization, which can be lengthy.

## Proposed Enhancements

### 1. Bonus Type Filters
```
┌─────────────────────────────────────────┐
│ Civilization Bonuses (Mayans)           │
│                                          │
│ Filter: ☑️ Military ☑️ Economic ☑️ Cost │
│         ☐ Active Only                   │
│                                          │
│ 🔍 [Search bonuses...]                  │
└─────────────────────────────────────────┘
```

### 2. Search Functionality
- Search by keyword (e.g., "archer", "gold", "cavalry")
- Highlight matching bonuses
- Show "no results" message

### 3. Active Only Toggle
- Show only bonuses affecting current army composition
- Highlight which units are benefiting from bonuses

### 4. Multi-Civ Comparison in Bonus Panel
- Compare bonuses across multiple civs
- Useful for deciding which civ to play

## Tasks
- [ ] Add filter checkboxes for bonus types
- [ ] Implement search input with live filtering
- [ ] Create "active only" logic
  - Detect which bonuses apply to current army
  - Highlight active bonuses
- [ ] Add multi-civ comparison view
- [ ] Persist filter state in session
- [ ] Mobile-responsive filter UI

## Acceptance Criteria
- [ ] Filter by Military/Economic/Cost bonus types
- [ ] Search highlights matching bonuses
- [ ] "Active only" shows bonuses affecting current units
- [ ] Filters can be combined
- [ ] Clear filters button
- [ ] Mobile-friendly UI

## Priority
🎯 **Medium** - QoL improvement for existing feature

## Estimated Complexity
**Low** - Enhancement to existing component

## Files to Modify
- `src/components/CivilizationBonuses.jsx` (enhance)
- `src/utils/bonusFilters.js` (new)
```

### Labels
`enhancement`, `UX`, `medium-priority`, `good-first-issue`

---

## Issue #8: Economic Planning Module

### Title
```
Add Economic Planning and Villager Distribution Calculator
```

### Body
```markdown
## Description
Help players plan villager distribution to afford their army composition.

## Motivation
Players often ask: "How many villagers do I need to sustain this army?" This tool would answer that.

## Proposed Features

### 1. Villager Distribution Calculator
Input: Desired army composition
Output: Required villagers per resource

```
┌──────────────────────────────────────────┐
│ To sustain this army:                    │
│                                           │
│ 👤 20 Farmers       (Food)                │
│ 👤 15 Lumberjacks   (Wood)                │
│ 👤 25 Gold Miners   (Gold)                │
│ 👤  5 Stone Miners  (Stone)               │
│                                           │
│ Total: 65 villagers on resources         │
│ (+ 5-10 for buildings/repairs)           │
└──────────────────────────────────────────┘
```

### 2. Production Timeline
"When can I afford this army?"
- Calculate time to gather resources
- Account for gather rates
- Show milestone timings

### 3. Continuous Production Calculator
"How many villagers to continuously produce Knights?"
- Account for production rate
- Calculate sustained production

### 4. Civilization-Specific Bonuses
- Apply eco bonuses (e.g., Franks berry bushes, Chinese start)
- Show efficiency differences

## Tasks
- [ ] Research AoE2 villager gather rates
- [ ] Create gather rate data (with civ bonuses)
- [ ] Build villager calculator logic
- [ ] Create EconomicPlanner component
- [ ] Add timeline visualization
- [ ] Account for upgrades (Wheelbarrow, Hand Cart, etc.)
- [ ] Mobile-responsive UI

## Acceptance Criteria
- [ ] Accurate villager distribution calculations
- [ ] Civilization eco bonuses applied
- [ ] Clear, actionable output
- [ ] Timeline shows when army is affordable
- [ ] Works with current army composition

## Priority
🎯 **Medium** - Useful for build order planning

## Estimated Complexity
**Medium-High** - Requires game knowledge and calculation logic

## Data Sources
- Villager gather rates: https://ageofempires.fandom.com/wiki/Villager_(Age_of_Empires_II)
- Production rates: https://ageofempires.fandom.com/wiki/Production

## Files to Create
- `src/components/EconomicPlanner.jsx` (new)
- `src/data/gatherRates.js` (new)
- `src/utils/economicCalculations.js` (new)
```

### Labels
`enhancement`, `feature`, `medium-priority`, `complex`

---

## Quick Issue Creation Checklist

When creating these issues on GitHub:

1. **Copy title and body** from above sections
2. **Add labels:**
   - `enhancement` - for new features
   - `documentation` - for docs
   - `high-priority`, `medium-priority`, `low-priority`
   - `good-first-issue` - for newcomer-friendly tasks
   - `complex` - for challenging implementations
3. **Assign to project** if you have a GitHub Project board
4. **Link related issues** in the description
5. **Add to milestone** if planning a release

---

## Issue Templates for Future Use

Consider creating `.github/ISSUE_TEMPLATE/` folder with:
- `feature_request.md`
- `bug_report.md`
- `documentation.md`

This will provide consistent issue formatting for contributors.

---

**Last Updated:** November 2025
