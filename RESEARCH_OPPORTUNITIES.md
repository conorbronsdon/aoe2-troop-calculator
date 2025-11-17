# AoE2 Ecosystem Research: Opportunities & Strategic Roadmap

A comprehensive analysis of the Age of Empires II tooling ecosystem, identifying gaps, opportunities, and strategic directions for this project and potential new projects.

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Current Project Analysis](#current-project-analysis)
3. [Ecosystem Landscape](#ecosystem-landscape)
4. [Critical Gap Analysis](#critical-gap-analysis)
5. [Improvement Opportunities for This Calculator](#improvement-opportunities-for-this-calculator)
6. [New Project Opportunities](#new-project-opportunities)
7. [Technical Infrastructure Opportunities](#technical-infrastructure-opportunities)
8. [Community & Competitive Scene Needs](#community--competitive-scene-needs)
9. [Strategic Recommendations](#strategic-recommendations)
10. [Implementation Priorities](#implementation-priorities)

---

## Executive Summary

After extensive research into the AoE2 tooling ecosystem (100+ resources analyzed), several key findings emerge:

### Key Findings
1. **Critical API Gap**: aoe2.net shutdown has created a significant void in community data infrastructure
2. **Fragmented Tools**: Many tools solve narrow problems; few provide integrated experiences
3. **Mobile Gap**: Despite strong AoE II Companion, opportunity exists for specialized mobile tools
4. **Combat Simulation Limitations**: Existing simulators lack DE support or comprehensive features
5. **Team Game Tools**: Severely underserved compared to 1v1 tools
6. **Learning Curve Solutions**: Tools exist but aren't well-integrated; beginners still struggle
7. **Our Position**: This calculator is well-positioned to expand into combat analysis and team planning

### Market Position of This Calculator
- **Strengths**: Modern React stack, comprehensive data (100+ units, 51 civs, 100+ techs), good UX
- **Unique Value**: Only tool with full civilization bonuses + technology integration + army cost planning
- **Expansion Opportunities**: Combat simulation, team game planning, API services, mobile companion

---

## Current Project Analysis

### What We Do Well (v2.8.0)
1. **Comprehensive Army Cost Planning** - Resource tracking for any composition
2. **Complete Game Data** - 100+ units, 51 civilizations, 90+ unique units, 100+ technologies
3. **Civilization Integration** - Bonuses automatically applied, tech tree restrictions enforced
4. **Modern UX** - Dark mode, responsive design, official icons
5. **Import/Export/Share** - Full composition portability
6. **Well-Tested** - 290 tests, 85%+ coverage on critical paths
7. **Good Documentation** - 12 comprehensive markdown files

### What's Missing (Compared to Ecosystem)
1. **Combat Simulation** - Can't predict fight outcomes
2. **Unit Stats Display** - Bonuses calculated but not visually shown
3. **Team Game Planning** - No pocket/flank roles, no team bonus planning
4. **Economy Planning** - No villager allocation recommendations
5. **Build Order Integration** - No connection to timing/economy
6. **Trade Calculations** - No gold generation planning for team games
7. **Live Data** - No API integration for meta statistics
8. **Training Integration** - No practice mode or improvement tracking

---

## Ecosystem Landscape

### Tool Categories & Saturation

| Category | Saturation | Quality | Gap Severity |
|----------|------------|---------|--------------|
| **Player Statistics** | High | Good | Low (aoestats, aoe2insights) |
| **Civilization Data** | High | Good | Low (wiki, aoe2techtree) |
| **Build Order Guides** | High | Good | Low (many options) |
| **Random Civ Pickers** | Medium | Good | Very Low |
| **Combat Simulators** | Medium | Medium | **Medium** (DE support lacking) |
| **Army Composition** | Low | Good | **Low** (this calculator fills it) |
| **Team Game Planning** | Very Low | Poor | **Critical** |
| **Replay Analysis** | Medium | Good | Low (libraries exist) |
| **Tournament Tools** | Medium | Good | Low |
| **Mobile Apps** | Low | Good | **Medium** |
| **Economy Planning** | Low | Poor | **High** |
| **Integrated Platforms** | Very Low | N/A | **Critical** |
| **API Services** | Very Low | N/A | **Critical** (aoe2.net gone) |

### Competitive Analysis: Combat Simulators

| Tool | Pros | Cons |
|------|------|------|
| **AoE Combat Simulator** (aoe-combatsim.com) | Web-based, dedicated | Limited DE support |
| **AoE4Fun** | Cost efficiency, speed/range | No upgrades/civ bonuses, Patch 5.7 only |
| **AoE2Calc** (gbts) | Accurate .dat parsing | No DE support, Elm stack |
| **Our Calculator** | Modern stack, full civ/tech support | **No combat simulation** |

**Opportunity**: Build the first comprehensive DE combat simulator with full civ bonuses and tech effects.

---

## Critical Gap Analysis

### 1. Community API Infrastructure
**Gap Level: CRITICAL**

**Problem**: aoe2.net shutdown removed the primary API for:
- Match history access
- Player statistics
- Leaderboard data
- Civilization win rates

**Current Workarounds**:
- aoestats.io (Relic endpoints)
- aoe2insights.com (manual updates)
- Official website (limited API)

**Opportunity**:
- Build open-source API layer on top of Relic endpoints
- Create standardized data access for community tools
- Cache and aggregate data for performance
- Provide historical data preservation

### 2. Team Game Planning Tools
**Gap Level: CRITICAL**

**Problem**:
- No tools for pocket vs flank role planning
- No team composition optimization
- No team bonus calculators
- No trade economy planning
- No communication/strategy coordination tools

**Current State**:
- All tools focus on 1v1
- Team strategy exists only in guides/videos
- No interactive planning tools

**Opportunity**:
- Build team army composition planner
- Pocket/flank role optimizer
- Team bonus synergy calculator
- Trade route gold generation calculator
- Civilization pairing recommendations

### 3. Integrated Learning Platform
**Gap Level: HIGH**

**Problem**:
- Build orders scattered across many sites
- Practice tools disconnected from strategy
- No skill progression tracking
- No personalized improvement recommendations

**Current State**:
- AOE Builds (video tutorials)
- Interactive Build Order Guide (in-game scenarios)
- AoE Companion (mobile reference)
- Hotkey trainers (isolated practice)
- None integrated together

**Opportunity**:
- Unified learning dashboard
- Build order → economy → army composition → combat outcome pipeline
- Progress tracking across skills
- Personalized recommendations based on weak areas

### 4. Modern Combat Simulator
**Gap Level: HIGH**

**Problem**:
- Existing simulators outdated or limited
- No comprehensive DE support
- Don't account for all bonuses and techs
- Limited micro simulation

**Missing Features**:
- Full DE civilization bonuses
- Complete technology effects
- Attack rate calculations
- Armor class interactions
- Bonus damage application
- Population efficiency metrics

### 5. Economy Planning & Optimization
**Gap Level: HIGH**

**Problem**:
- Villager allocation is complex
- No tools connect economy to army composition
- Trade gold calculations not integrated
- Resource balance optimization missing

**Current State**:
- Simple villager counters exist
- Trade formulas known but not toolified
- No "If I want this army, how many vills per resource?" calculator

---

## Improvement Opportunities for This Calculator

### Tier 1: High-Value, Medium Effort (2-4 weeks each)

#### 1. **Combat Statistics Display**
**Value**: High | **Effort**: Medium

Display calculated unit stats after all bonuses:
- Base stats + civilization bonuses + technology upgrades
- HP, Attack, Armor (melee/pierce), Rate of Fire, Range
- Compare before/after tech research
- Visual stat cards for each unit in composition

**Implementation**:
```javascript
// Already have: technologies.js, statCalculator.js, civilizations.js
// Need: Visual component to display calculated stats
// Add to: UnitCard or new UnitStatsPanel component
```

#### 2. **Basic Combat Outcome Prediction**
**Value**: Very High | **Effort**: High

Add "Simulate Battle" feature:
- Input two armies
- Calculate expected winner based on cost/pop efficiency
- Show time to kill, damage per second
- Factor in armor classes and bonus damage

**Technical Requirements**:
- Implement damage calculation formula: `(Attack - Armor) + (Bonus - BonusArmor)`
- Factor in attack rate, reload time
- Consider range advantages
- Apply all civ bonuses and tech effects (already have this data!)

#### 3. **Team Bonus Calculator**
**Value**: High | **Effort**: Low

Allow selection of allied civilizations:
- Show combined team bonuses
- Highlight synergies (e.g., Spanish trade + Italian cost reduction)
- Factor team bonuses into army calculations

**Implementation**:
- Add "Team Members" selector in ConfigurationPanel
- Filter team bonuses from civilizations.js
- Apply team bonuses to cost calculations

#### 4. **Villager Requirement Calculator**
**Value**: High | **Effort**: Medium

"For this army composition, you need X villagers on each resource":
- Based on production rates
- Factor in gather rates (with upgrades)
- Show ongoing production requirements
- Include trade cart recommendations for team games

### Tier 2: Medium-Value, Lower Effort (1-2 weeks)

#### 5. **Unit Comparison Mode**
Compare two units side-by-side:
- Full stats with all bonuses applied
- Cost efficiency
- Counter information
- Tech requirements

#### 6. **Build Order Integration**
Link to common build orders:
- "This composition fits Scout Rush timing"
- Show recommended build orders for target composition
- Link to external build order resources

#### 7. **Meta Statistics Integration**
Display win rates and pick rates:
- Pull data from aoestats.io or aoe2insights
- Show civilization performance by ELO bracket
- Display unit usage statistics

#### 8. **Mobile-Optimized View**
Create dedicated mobile layout:
- Touch-friendly unit selection
- Swipe between composition and stats
- Quick-access presets
- Shareable via QR code

### Tier 3: Future Enhancements (1+ months)

#### 9. **Full Combat Simulator**
Multi-unit battle simulation:
- Pathfinding and positioning
- Micro simulation (hit-and-run, etc.)
- Animated battle replay
- Multiple engagement scenarios

#### 10. **Backend & Cloud Features**
User accounts and cloud storage:
- Save compositions to cloud
- Community composition sharing
- Tournament preset library
- Version history

#### 11. **API Service Layer**
Expose calculator as API:
- Cost calculation endpoints
- Combat prediction API
- Civilization bonus queries
- Enable other tools to integrate

---

## New Project Opportunities

### 1. **AoE2 Community API (Replace aoe2.net)**
**Priority**: CRITICAL | **Effort**: Very High

**Problem Solved**: No central API after aoe2.net shutdown

**Features**:
- Proxy/cache Relic API endpoints
- Historical data preservation
- Player statistics aggregation
- Match history with analysis
- Leaderboard snapshots
- Open API for community tools

**Tech Stack Recommendation**:
- Backend: Node.js/Express or Python/FastAPI
- Database: PostgreSQL + Redis cache
- Hosting: Vercel/Railway/Fly.io
- Documentation: OpenAPI/Swagger

**Revenue Model**:
- Free tier (rate limited)
- Sponsored tier for high-volume users
- Community donations

### 2. **Team Game Strategy Planner**
**Priority**: High | **Effort**: High

**Features**:
- 2v2/3v3/4v4 composition planner
- Pocket vs Flank role optimizer
- Team bonus synergy calculator
- Trade economy planner (gold/minute)
- Civilization pairing recommendations
- Communication templates ("I'll go knights, you go archers")

**Target Users**: Competitive team players, clans

### 3. **AoE2 Progress Tracker**
**Priority**: High | **Effort**: High

**Features**:
- Skill assessment dashboard
- Build order execution scoring
- Hotkey mastery tracking
- Game analysis integration (link replays)
- Personalized improvement recommendations
- ELO prediction and goals
- Practice schedule generator

**Integrations**:
- Import from aoe2insights
- Build order timings from videos
- Hotkey trainer integration

### 4. **Real-Time Game Assistant (Overlay)**
**Priority**: Medium | **Effort**: Very High

**Features**:
- OBS/Stream overlay
- Live counter recommendations
- Economy status alerts
- Build order timing guide
- Voice-activated queries ("What counters arbalests?")
- Legal within game TOS (external only)

**Technical Challenge**: Real-time game state reading (if possible) or manual input

### 5. **AoE2 Tournament Manager**
**Priority**: Medium | **Effort**: High

**Features**:
- Bracket generation with seeding
- Civilization draft/ban system (integrate aoe2cm)
- Match scheduling
- Result tracking
- ELO calculation
- Replay archive
- Stream integration

**Differentiation**: All-in-one vs current fragmented tools

### 6. **Mobile Companion for Army Planning**
**Priority**: Medium | **Effort**: Medium

**Features**:
- This calculator as React Native app
- Offline support
- Quick unit lookup
- Counter suggestions
- Push notifications for meta changes
- Widget for quick reference

**Tech**: React Native (share code with web version)

---

## Technical Infrastructure Opportunities

### Open Source Libraries Needed

#### 1. **aoe2-damage-calc** (npm package)
```javascript
import { calculateDamage } from 'aoe2-damage-calc';

const damage = calculateDamage({
  attacker: { unit: 'knight', civ: 'franks', techs: ['forging', 'bloodlines'] },
  defender: { unit: 'crossbowman', civ: 'britons', techs: ['padded_archer_armor'] },
});
// Returns: { damagePerHit: 10, hitsToKill: 4, timeToKill: 7.2 }
```

**Value**: Reusable across simulators, overlays, learning tools

#### 2. **aoe2-civ-data** (npm package)
Standardized civilization data:
- All bonuses with effects
- Tech trees
- Unique units with stats
- Team bonuses

**Current State**: Every project reimplements this

#### 3. **aoe2-replay-parser** (JavaScript/WASM)
Browser-compatible replay parsing:
- Currently mostly Python/PHP
- WebAssembly port would enable web analysis
- Could integrate directly into tools

### Data Standardization

**Problem**: Every tool uses different data formats

**Solution**: Create standard schemas:
- Unit stats schema (JSON Schema)
- Civilization bonus schema
- Technology effects schema
- Match data schema

**Distribution**: npm packages, GitHub releases, CDN hosting

---

## Community & Competitive Scene Needs

### For Beginners (Sub-1000 ELO)
1. **Simplified counter charts** - "Just use this" recommendations
2. **Build order audio guides** - Hands-free while playing
3. **Replay analysis with coaching** - "Here's what went wrong"
4. **Civilization complexity ratings** - "Start with these civs"
5. **Practice mode integration** - Track improvement over time

### For Intermediate Players (1000-1400 ELO)
1. **Advanced build order variations** - Adapt to map/opponent
2. **Detailed matchup guides** - Civ vs Civ specifics
3. **Economy optimization tools** - Identify idle time, inefficiencies
4. **Team game role guides** - Master pocket or flank
5. **Meta tracking** - What's strong in current patch

### For Advanced Players (1400+ ELO)
1. **Micro simulation tools** - Practice specific engagements
2. **Tournament preparation** - Opponent analysis, draft strategies
3. **Streaming overlays** - Professional presentation
4. **Statistical analysis** - Deep dive into performance metrics
5. **Custom scenario tools** - Create training scenarios

### For Streamers/Content Creators
1. **Better overlays** - More customization, cleaner design
2. **Audience interaction** - Chat commands, polls
3. **Highlight detection** - Auto-clip big moments
4. **Educational tools** - Explain concepts visually

### For Tournament Organizers
1. **Integrated management** - Single platform for everything
2. **Fair seeding algorithms** - Better than current ATP system
3. **Automated enforcement** - Map pools, civ restrictions
4. **Spectator tools** - Better viewing experience

---

## Strategic Recommendations

### For This Calculator Project

#### Short-Term (Next 3 Months)
1. **Add unit stat display** - Show calculated combat stats
2. **Implement basic combat prediction** - "Army A beats Army B"
3. **Add team bonus support** - Multi-civilization planning
4. **Villager allocation calculator** - Economy planning

**Why**: These features differentiate from existing tools and serve core users better

#### Medium-Term (3-6 Months)
1. **Mobile optimization** - Responsive redesign or React Native app
2. **API layer** - Expose calculator logic as service
3. **Community presets** - Share popular compositions
4. **Integration with external tools** - Link to aoestats, build order guides

**Why**: Expand reach and become platform rather than standalone tool

#### Long-Term (6-12 Months)
1. **Full combat simulator** - Animated battles with micro
2. **Team game platform** - Complete team planning suite
3. **Learning path integration** - Track user improvement
4. **Cloud infrastructure** - User accounts, saved data

**Why**: Become the definitive AoE2 strategy planning platform

### For New Projects

#### Highest Impact: Community API
- Fills critical infrastructure gap
- Enables entire ecosystem
- Sustainable through community support
- Your team has technical capability

#### Highest Revenue Potential: Tournament Platform
- Subscription model viable
- Growing esports scene
- Currently fragmented solutions
- Could integrate all your tools

#### Best for Community: Team Game Planner
- Most underserved segment
- High engagement potential
- Natural extension of calculator
- Builds on existing data

---

## Implementation Priorities

### Immediate Actions (This Week)
1. Add unit stats display to current calculator
2. Create combat damage formula utility
3. Add team civilization selector UI
4. Document combat mechanics thoroughly

### Phase 1: Calculator Enhancement (1-2 Months)
1. Combat outcome predictor MVP
2. Team bonus integration
3. Villager requirement calculator
4. Mobile-responsive redesign

### Phase 2: Platform Expansion (2-4 Months)
1. Extract reusable npm packages (damage calc, civ data)
2. Build API service layer
3. Add community composition sharing
4. Integrate external data sources

### Phase 3: New Projects (4-8 Months)
1. Team Game Strategy Planner (separate app, shared components)
2. Community API service
3. Progress tracking dashboard
4. Mobile companion app

### Phase 4: Ecosystem Leadership (8-12 Months)
1. Full combat simulator
2. Tournament management integration
3. Overlay/streaming tools
4. Educational platform integration

---

## Success Metrics

### For Calculator Improvements
- User session duration increase
- Composition save/export frequency
- Mobile traffic percentage
- Community composition shares

### For New Projects
- API requests/month
- Active users
- Community contributions
- Integration by other tools

### For Ecosystem Impact
- Tools built on your infrastructure
- Community references
- Tournament adoption
- Pro player usage

---

## Conclusion

The AoE2 community tools ecosystem is mature in some areas (statistics, documentation) but has critical gaps in:
1. API infrastructure (post-aoe2.net)
2. Team game planning
3. Integrated learning platforms
4. Modern combat simulation

This calculator project is well-positioned to fill these gaps by:
1. Adding combat simulation to existing army planning
2. Expanding to team game scenarios
3. Building reusable infrastructure for the community
4. Creating an integrated strategy platform

The recommended path forward:
1. **Enhance core calculator** with combat stats and predictions
2. **Extract reusable libraries** for community benefit
3. **Expand to team games** (biggest underserved market)
4. **Consider API service** to fill infrastructure gap

By focusing on these areas, this project can become a central hub in the AoE2 tools ecosystem while providing genuine value to players of all skill levels.

---

*Research conducted: November 2025*
*Resources analyzed: 100+ tools, websites, libraries, and community resources*
*Methodology: Web research, API analysis, community forum review, GitHub exploration*
