# Priority Features & Quick Wins

A prioritized list of the most impactful features and improvements based on ecosystem research.

---

## Legend
- 🔥 **Critical** - Fills major ecosystem gap
- ⭐ **High Value** - Significant competitive advantage
- 🚀 **Quick Win** - High value, low effort
- 💰 **Revenue Potential** - Could generate sustainable income
- 🌍 **Community Impact** - Benefits broader ecosystem

---

## Tier 1: Immediate Implementation (1-2 weeks each)

### 🚀 1. Unit Combat Stats Display
**Effort**: Low | **Value**: High | **Impact**: User Experience

Display actual calculated stats for units in your composition:
```
Paladin (Franks) with Bloodlines, Blacksmith techs:
HP: 200 → 220 | Attack: 14 → 18 | Melee Armor: 2 → 5 | Pierce Armor: 3 → 6
```

**Why First**: We already calculate these stats internally (statCalculator.js), just need UI

**Implementation**:
- Add stats display to UnitCard or create UnitStatsPanel component
- Show before/after tech research comparison
- Mobile-friendly stat cards

---

### 🚀 2. Team Bonus Calculator
**Effort**: Low | **Value**: High | **Impact**: Team Game Players

Select allied civilizations, see combined bonuses:
- Spanish trade + Chinese farm bonus + Viking economy
- Highlight synergies and conflicts
- Apply team bonuses to cost calculations

**Why Second**: Simple UI addition to ConfigurationPanel, data already exists

**Implementation**:
- Add "Allied Civilizations" multi-select (max 3)
- Filter teamBonuses from civilizations.js
- Display combined bonus effects
- Apply cost reductions where applicable

---

### 🚀 3. Quick Counter Reference
**Effort**: Very Low | **Value**: Medium | **Impact**: Beginners

Show counters for units in current composition:
```
Your Army Contains: Knights (20)
⚠️ Countered by: Halberdiers, Camels, Monks
✅ Counters: Archers, Skirmishers, Villagers
```

**Why Third**: Simple lookup table, helps players learn

**Implementation**:
- Add counter data to unit definitions (already partially have this)
- Create small warning/info panel
- Link to detailed counter guide

---

## Tier 2: High-Value Features (2-4 weeks each)

### ⭐ 4. Basic Combat Outcome Calculator
**Effort**: Medium | **Value**: Very High | **Impact**: Core Feature

"Army A vs Army B: Who wins?"

**Core Calculation**:
```javascript
// Damage per hit
damage = Math.max(1, (attack - armor) + (bonusDamage - bonusArmor));
// DPS
dps = damage / reloadTime;
// Time to kill
timeToKill = totalEnemyHP / (totalDPS * effectiveness);
```

**Display**:
- Winner prediction (by cost efficiency, pop efficiency, raw outcome)
- Time to elimination
- Remaining army value
- "Close fight" vs "Decisive victory" indicators

**Why Important**: Differentiation from all other tools. No DE combat sim does this with full tech/civ support.

---

### ⭐ 5. Villager Allocation Calculator
**Effort**: Medium | **Value**: High | **Impact**: Economy Planning

"To sustain this army production, you need:"
- 24 Farmers, 18 on Gold, 8 on Wood
- Trade carts recommendation for team games
- Idle TC warning
- Gather rate with/without upgrades

**Data Needed**:
- Gather rates (farmers: 0.32/sec, woodcutters: 0.39/sec, etc.)
- Production rates (Knight: 30sec = 60 food + 75 gold every 30 sec)
- Tech bonuses (Wheelbarrow, Hand Cart, Guilds, etc.)

---

### ⭐ 6. Trade Economy Calculator
**Effort**: Medium | **Value**: High | **Impact**: Team Game

"To generate 500 gold/minute with trade carts:"
- Distance calculator (tiles)
- Number of trade carts needed
- Spanish team bonus calculation
- Grand Trunk Road / Silk Road effects

**Formula** (already documented in research):
```
Gold ≈ 0.46 × (Distance in tiles) × (1 + bonusMultipliers)
```

---

## Tier 3: Platform Features (1-2 months)

### 🔥 7. Combat Simulator Mode
**Effort**: High | **Value**: Very High | **Impact**: Killer Feature

Full battle simulation with:
- Multiple engagement scenarios
- Micro simulation (hit-and-run effectiveness)
- Formation effects
- Visual representation (canvas or SVG)
- Historical battle recreation

**Differentiation**: First modern DE combat simulator with complete data

---

### 🔥 8. API Service Layer
**Effort**: High | **Value**: Critical | **Impact**: 🌍 Community

Expose calculator logic as REST/GraphQL API:
```
POST /api/combat
{
  "armyA": { "units": [...], "civ": "franks", "techs": [...] },
  "armyB": { "units": [...], "civ": "britons", "techs": [...] }
}

Response:
{
  "winner": "armyA",
  "costEfficiency": 1.3,
  "popEfficiency": 1.1,
  "timeToKill": 45
}
```

**Benefits**:
- Enable other tools to integrate your calculations
- Fill aoe2.net API gap (partially)
- Revenue potential through API keys
- Community contribution to ecosystem

---

### ⭐ 9. Community Composition Sharing
**Effort**: Medium | **Value**: High | **Impact**: Engagement

Share and discover compositions:
- Public composition gallery
- Voting/rating system
- Tags: "Anti-Knight", "Fast Castle", "Imperial Deathball"
- Pro player presets
- Tournament compositions

**Requires**: Backend database (can use Firebase/Supabase for quick setup)

---

## Tier 4: New Projects

### 🔥 10. Team Game Strategy Platform
**Effort**: Very High | **Value**: Critical | **Impact**: 🌍 Underserved Market

Dedicated tool for 2v2/3v3/4v4 planning:
- Pocket vs Flank role optimizer
- Team composition synergy calculator
- Communication templates
- Strategy coordination tools
- Voice chat integration (optional)

**Why Critical**: Most underserved segment of AoE2 tools. Could become essential for competitive teams.

---

### 💰 11. Tournament Management Suite
**Effort**: Very High | **Value**: High | **Impact**: Competitive Scene

All-in-one tournament platform:
- Bracket generation with seeding algorithms
- Integrated civ draft (import aoe2cm)
- Match scheduling with timezone support
- Result tracking and ELO calculation
- Replay archive
- Stream integration
- Subscription model viable

---

### 🌍 12. Community Data API
**Effort**: Very High | **Value**: Critical | **Impact**: Entire Ecosystem

Replace aoe2.net functionality:
- Proxy Relic API endpoints
- Cache and aggregate data
- Historical data preservation
- Open API for all community tools
- Match history, player stats, leaderboards

**Revenue**: Freemium API access, sponsorships

---

## Quick Reference: What To Build Next

### If Goal = Improve Current Calculator:
1. Unit Stats Display (1 week)
2. Team Bonus Calculator (1 week)
3. Combat Outcome Calculator (3 weeks)

### If Goal = Maximum User Growth:
1. Combat Outcome Calculator (killer feature)
2. Mobile Optimization (bigger market)
3. Community Sharing (engagement)

### If Goal = Revenue Generation:
1. API Service Layer (subscription model)
2. Tournament Management (B2B opportunity)
3. Mobile App (app store)

### If Goal = Community Impact:
1. Community Data API (infrastructure)
2. Open Source Libraries (reusable code)
3. Team Game Platform (underserved market)

---

## Implementation Checklist

### This Week
- [ ] Add stats display to UnitCard component
- [ ] Create team civilization selector
- [ ] Add counter reference data
- [ ] Document combat damage formula

### This Month
- [ ] Implement basic combat outcome calculator
- [ ] Add villager allocation recommendations
- [ ] Mobile-responsive improvements
- [ ] Extract damage calculation as npm package

### This Quarter
- [ ] Full combat simulator MVP
- [ ] API service layer
- [ ] Community composition sharing
- [ ] Trade economy calculator

### This Year
- [ ] Team game strategy platform
- [ ] Tournament management tools
- [ ] Mobile companion app
- [ ] Community data API

---

## ROI Analysis

| Feature | Dev Time | User Value | Ecosystem Value | Priority Score |
|---------|----------|------------|-----------------|----------------|
| Stats Display | 1 week | High | Low | 9/10 |
| Team Bonus Calc | 1 week | High | Medium | 9/10 |
| Combat Calculator | 3 weeks | Very High | High | 10/10 |
| Villager Calc | 2 weeks | High | Medium | 8/10 |
| API Service | 1 month | Medium | Very High | 8/10 |
| Mobile App | 1 month | High | Medium | 7/10 |
| Full Simulator | 2 months | Very High | Very High | 9/10 |
| Team Platform | 3 months | High | Critical | 10/10 |

---

## Final Recommendation

**Start with**: Unit Stats Display + Team Bonus Calculator (2 weeks)
- Quick wins that improve UX immediately
- Build momentum and user trust
- Foundation for combat calculator

**Then**: Combat Outcome Calculator (3-4 weeks)
- Killer feature that differentiates from all competitors
- Uses existing data infrastructure
- High visibility, shareable results

**Finally**: Consider API Service Layer
- Enables community to build on your work
- Creates sustainable revenue model
- Positions you as ecosystem leader

This path transforms the calculator from "army cost planning tool" to "comprehensive AoE2 strategy platform" while building reusable infrastructure for the community.

---

*Priority rankings based on: user research, ecosystem gap analysis, technical feasibility, competitive advantage*
