# Feature Documentation

Comprehensive guide to all features in the AoE2 Army Calculator.

## Table of Contents
1. [Unit System](#unit-system)
2. [Civilization System](#civilization-system)
3. [Bonus System](#bonus-system)
4. [Army Planning](#army-planning)
5. [Composition Management](#composition-management)
6. [Comparison Mode](#comparison-mode)
7. [Progressive Web App (PWA)](#progressive-web-app-pwa---v2100)
8. [Technology System](#technology-system---v240-to-v270)
9. [Preset Army Compositions](#preset-army-compositions---v290)
10. [Limitations & Known Issues](#limitations--known-issues)

---

## Unit System

### Complete Unit Roster

The calculator includes **100+ units** across all categories:

#### Infantry Units (12 total)
**Militia Line:**
- Militia (Dark Age) - 60F, 20G
- Man-at-Arms (Feudal) - 60F, 20G
- Longswordsman (Castle) - 60F, 20G
- Two-Handed Swordsman (Imperial) - 60F, 20G
- Champion (Imperial) - 60F, 20G

**Spearman Line:**
- Spearman (Feudal) - 35F, 25W
- Pikeman (Castle) - 35F, 25W
- Halberdier (Imperial) - 35F, 25W

**Eagle Warrior Line:** (Mesoamerican civilizations only)
- Eagle Scout (Feudal) - 20F, 50G
- Eagle Warrior (Castle) - 20F, 50G
- Elite Eagle Warrior (Imperial) - 20F, 50G

#### Cavalry Units (15 total)
**Scout Line:**
- Scout Cavalry (Feudal) - 80F
- Light Cavalry (Castle) - 80F
- Hussar (Imperial) - 80F

**Knight Line:**
- Knight (Castle) - 60F, 75G
- Cavalier (Imperial) - 60F, 75G
- Paladin (Imperial) - 60F, 75G

**Camel Line:**
- Camel Rider (Castle) - 55F, 60G
- Heavy Camel Rider (Imperial) - 55F, 60G
- Imperial Camel Rider (Imperial) - 55F, 60G

**Battle Elephant Line:**
- Battle Elephant (Castle) - 120F, 70G
- Elite Battle Elephant (Imperial) - 120F, 70G

**Steppe Lancer Line:**
- Steppe Lancer (Castle) - 70F, 45G
- Elite Steppe Lancer (Imperial) - 70F, 45G

#### Archer Units (13 total)
**Archer Line:**
- Archer (Feudal) - 25F, 45W
- Crossbowman (Castle) - 25F, 45W
- Arbalester (Imperial) - 25F, 45W

**Skirmisher Line:**
- Skirmisher (Feudal) - 25F, 35W
- Elite Skirmisher (Castle) - 25F, 35W
- Imperial Skirmisher (Imperial) - 25F, 35W

**Cavalry Archer Line:**
- Cavalry Archer (Castle) - 40F, 70W
- Heavy Cavalry Archer (Imperial) - 40F, 70W

**Other Ranged Units:**
- Hand Cannoneer (Imperial) - 45F, 50G
- Slinger (Castle) - 30F, 40G
- Genitour (Castle) - 35F, 50W
- Elite Genitour (Imperial) - 35F, 50W

#### Siege Units (11 total)
**Ram Line:**
- Battering Ram (Castle) - 160W, 75G
- Capped Ram (Imperial) - 160W, 75G
- Siege Ram (Imperial) - 160W, 75G

**Mangonel Line:**
- Mangonel (Castle) - 160W, 135G (3 pop)
- Onager (Imperial) - 160W, 135G (3 pop)
- Siege Onager (Imperial) - 160W, 135G (3 pop)

**Scorpion Line:**
- Scorpion (Castle) - 75W, 75G (2 pop)
- Heavy Scorpion (Imperial) - 75W, 75G (2 pop)

**Other Siege:**
- Bombard Cannon (Imperial) - 225W, 225G (5 pop)
- Trebuchet (Imperial) - 200W, 200G (8 pop)
- Petard (Castle) - 80F, 20G

#### Naval Units (14 total)
**Galley Line:**
- Galley (Feudal) - 90W, 30G
- War Galley (Castle) - 90W, 30G
- Galleon (Imperial) - 90W, 30G

**Fire Ship Line:**
- Fire Galley (Feudal) - 75W, 45G
- Fire Ship (Castle) - 75W, 45G
- Fast Fire Ship (Imperial) - 75W, 45G

**Demolition Ship Line:**
- Demolition Raft (Feudal) - 70W, 50G
- Demolition Ship (Castle) - 70W, 50G
- Heavy Demolition Ship (Imperial) - 70W, 50G

**Cannon Galleon Line:**
- Cannon Galleon (Imperial) - 200W, 150G (3 pop)
- Elite Cannon Galleon (Imperial) - 200W, 150G (3 pop)

**Economic Naval:**
- Transport Ship (Feudal) - 125W
- Trade Cog (Feudal) - 100W, 50G
- Fishing Ship (Dark) - 75W

#### Monk Units (2 total)
- Monk (Castle) - 100G
- Missionary (Castle) - 100G

### Unique Units (50+)

Each civilization has one or more unique units only available to them:

**European Civs:**
- Britons: Longbowman / Elite Longbowman
- Byzantines: Cataphract / Elite Cataphract
- Celts: Woad Raider / Elite Woad Raider
- Franks: Throwing Axeman / Elite Throwing Axeman
- Goths: Huskarl / Elite Huskarl
- Spanish: Conquistador / Elite Conquistador
- Teutons: Teutonic Knight / Elite Teutonic Knight
- Vikings: Berserk / Elite Berserk, Longboat / Elite Longboat

**Asian Civs:**
- Chinese: Chu Ko Nu / Elite Chu Ko Nu
- Japanese: Samurai / Elite Samurai
- Koreans: War Wagon / Elite War Wagon, Turtle Ship / Elite Turtle Ship
- Mongols: Mangudai / Elite Mangudai
- Vietnamese: Rattan Archer / Elite Rattan Archer

**Middle Eastern Civs:**
- Persians: War Elephant / Elite War Elephant
- Saracens: Mameluke / Elite Mameluke
- Turks: Janissary / Elite Janissary

**American Civs:**
- Aztecs: Jaguar Warrior / Elite Jaguar Warrior
- Incas: Kamayuk / Elite Kamayuk
- Mayans: Plumed Archer / Elite Plumed Archer

**African Civs:**
- Berbers: Camel Archer / Elite Camel Archer
- Ethiopians: Shotel Warrior / Elite Shotel Warrior
- Malians: Gbeto / Elite Gbeto

**Other Civs:**
- Magyars: Magyar Huszar / Elite Magyar Huszar
- Portuguese: Organ Gun / Elite Organ Gun
- Slavs: Boyar / Elite Boyar
- Khmer: Ballista Elephant / Elite Ballista Elephant

### Unit Filtering

Units are intelligently filtered based on:
1. **Age**: Only units available in selected age or earlier
2. **Civilization**: Unique units only show for their specific civilization
3. **Category**: Organized by Infantry, Cavalry, Archer, Siege, Naval, Monk, Unique

### Unit Search and Filter System

With 100+ units available, finding specific units can be challenging. The comprehensive filter system provides:

**Search Bar:**
- Type to find units by name instantly
- Real-time filtering as you type
- Case-insensitive matching

**Category Filters:**
- Toggle buttons for: Infantry, Cavalry, Archer, Siege, Naval, Unique, Other
- Multiple categories can be selected simultaneously
- Active categories highlighted in blue

**Cost Type Filters:**
- **All Costs**: Show all units
- **Trash Units (No Gold)**: Units that don't require gold (Spearmen, Skirmishers, etc.)
- **Gold Units**: Units that require gold
- **Low Cost (<100 total)**: Units with total cost under 100 resources

**Age Filters:**
- Filter by specific age: Dark, Feudal, Castle, or Imperial
- Or show all ages

**Filter UI:**
```
┌─────────────────────────────────────────┐
│ Search: [Knight___________] 🔍          │
│ Categories: [Infantry] [Cavalry✓] [Archer] │
│ Cost Type: [Gold Units▼] Age: [All▼]   │
│                                         │
│ 3 units found        [Clear All Filters]│
└─────────────────────────────────────────┘
```

**Key Features:**
- Real-time results counter
- Clear all filters button
- Mobile-responsive design
- Filters persist during session

### Unit Counter Visualization

Each unit card displays strategic counter information:

**Collapsible Section:**
- Click "► Counters & Weaknesses" to expand
- Shows what the unit is strong and weak against

**Strong Against (Green Badges):**
- Lists units this unit counters effectively
- Example: Spearman shows "✅ Strong Against: Knight, Cavalier, Paladin"

**Weak To (Red Badges):**
- Lists units that counter this unit
- Example: Knight shows "⚠️ Weak To: Spearman, Pikeman, Halberdier"

**UI Example:**
```
┌─ Knight ────────────────────┐
│ Castle Age • Pop: 1         │
│ 🌾 60  🪙 75                │
│                             │
│ ► Counters & Weaknesses     │
│ ┌─────────────────────────┐ │
│ │ ✅ Strong Against:      │ │
│ │ [Archer] [Crossbowman]  │ │
│ │                         │ │
│ │ ⚠️ Weak To:             │ │
│ │ [Spearman] [Pikeman]    │ │
│ └─────────────────────────┘ │
│ [-] [__0__] [+]            │
└─────────────────────────────┘
```

**Benefits:**
- Helps plan balanced army compositions
- Shows counter relationships at a glance
- Color-coded for quick identification
- Tooltips provide additional context

---

## Civilization System

### 51 Civilizations

All civilizations from AoE2: Definitive Edition are included:

**Note**: With technology tree restrictions now implemented, each civilization only shows units they can actually build according to their historical tech tree.

**European** (13 civs): Britons, Byzantines, Celts, Franks, Goths, Italians, Portuguese, Spanish, Teutons, Vikings, Bulgarians, Lithuanians, Sicilians

**Asian** (17 civs): Chinese, Japanese, Koreans, Mongols, Vietnamese, Bengalis, Burmese, Dravidians, Gurjaras, Hindustanis, Khmer, Malay, Tatars

**African** (4 civs): Berbers, Ethiopians, Malians, Egyptians

**American** (4 civs): Aztecs, Incas, Mayans

**Middle Eastern** (4 civs): Persians, Saracens, Turks

### Civilization Selection Impact

When you select a civilization:
1. **Unique Units Appear**: Civ-specific units are added to the unit roster
2. **Bonuses Activate**: Cost reductions and stat bonuses automatically apply
3. **Bonus Panel Updates**: The civilization bonus panel shows all active bonuses

---

## Bonus System

### Types of Bonuses

#### 1. Cost Reduction Bonuses (💰)
**Automatically Calculated** and applied to unit costs.

Examples:
- **Mayans**: Archer line costs 10%/20%/30% less (Feudal/Castle/Imperial)
- **Goths**: Infantry costs 15%/20%/25%/30% less per age
- **Byzantines**: Counter units (Spearman, Skirmisher, Camel) cost 25% less
- **Portuguese**: All units cost 20% less gold

**How it works:**
- Bonus is applied to the base unit cost
- Discounted price is shown with a green checkmark
- Original price shown crossed out
- Calculation is automatic and real-time

#### 2. Military Bonuses (⚔️)
**Displayed for Reference** - not calculated in army cost.

Examples:
- **Franks**: Cavalry have +20% HP
- **Britons**: Archers have +1 range (Castle), +2 range (Imperial)
- **Goths**: Huskarls have +10 pierce armor
- **Persians**: Knights have +2 attack vs Archers

#### 3. Economic Bonuses (🌾)
**Informational** - affect gameplay but not army calculations.

Examples:
- **Mayans**: Start with +1 villager, -50 food
- **Britons**: Town Centers cost 50% less wood (Castle Age)
- **Franks**: Farm upgrades free
- **Byzantines**: Imperial Age costs 33% less

#### 4. Team Bonuses (🤝)
**Allied Benefits** - bonuses your teammates receive.

Examples:
- **Mayans**: Walls cost 50% less stone
- **Britons**: Archery Ranges work 20% faster
- **Franks**: Knights have +2 Line of Sight
- **Goths**: Barracks work 20% faster

### Bonus Panel UI

The **Civilization Bonuses** panel appears below the configuration section:

**Collapsed State:**
- Shows civilization name and region
- Displays count of active bonuses
- Click to expand

**Expanded State:**
- Organized into 4 sections with icons
- Each bonus clearly described
- Color-coded bullets (amber for civ bonuses, green for team)
- Info box explaining which bonuses are calculated

### Advanced Bonus Filtering

The bonus panel includes comprehensive filtering capabilities:

**Search Bonuses:**
- Type keywords to filter bonuses (e.g., "archer", "gold", "cavalry")
- Case-insensitive real-time search
- Filters across all bonus types

**Type Toggles:**
- **⚔️ Military** (Red button): Show/hide military stat bonuses
- **🌾 Economic** (Green button): Show/hide economic bonuses
- **💰 Cost** (Yellow button): Show/hide cost reduction bonuses
- Multiple types can be enabled simultaneously

**Active Only Filter:**
- Blue toggle button: "✓ Active Only"
- When enabled, shows only bonuses affecting your current army composition
- Great for seeing which bonuses are actually in use

**Filter UI Example:**
```
┌─────────────────────────────────────────┐
│ Search bonuses: [archer_______] 🔍     │
│                                         │
│ [⚔️ Military] [🌾 Economic] [💰 Cost]  │
│ [✓ Active Only]                         │
│                                         │
│ 2 bonuses shown        [Clear filters] │
└─────────────────────────────────────────┘
```

**Key Features:**
- Real-time filtering with count display
- Clear filters button for quick reset
- "No bonuses match your filters" message when needed
- Dark mode support for all controls
- Persistent filter state during session

---

## Army Planning

### Resource Management

**Custom Limits:**
- Set available Food, Wood, Gold, Stone
- Default: 20,000 each
- Adjustable from 0 to 999,999

**Population Cap:**
- Default: 200
- Adjustable from 1 to 500
- Shows current population used vs cap

**Visual Feedback:**
- **Green bars**: Under 80% capacity
- **Yellow bars**: 80-100% capacity
- **Red bars**: Over capacity

### Age Selection

Choose from 4 ages:
- **Dark Age**: Very limited units (mostly economic)
- **Feudal Age**: Basic military units
- **Castle Age**: Advanced units, most unique units
- **Imperial Age**: All units available

Units from previous ages remain available in later ages.

### Real-Time Tracking

As you add units, the calculator automatically updates:
1. **Resource Totals**: Shows cost of current army
2. **Resource Remaining**: Displays what's left
3. **Population Used**: Tracks army size
4. **Progress Bars**: Visual representation of usage

---

## Composition Management

### Saving Compositions

**Save Current Composition:**
1. Build your army
2. Click "Save Current Composition"
3. Enter a name (e.g., "Knights + Crossbows")
4. Composition saved to browser local storage

**What's Saved:**
- All unit quantities
- Selected civilization
- Selected age
- Resource limits
- Population cap

### Loading Compositions

**Quick Load:**
1. Click "Load Composition" dropdown
2. Select from saved compositions
3. Army instantly restored

**Data Persistence:**
- Stored in browser local storage
- Survives browser refresh
- Cleared if you clear browser data

### Exporting Compositions

**Export to JSON:**
1. Build your army
2. Click "Export to JSON"
3. Downloads a `.json` file
4. Contains all composition data

**Use Cases:**
- Share with teammates
- Backup compositions
- Import into other tools
- Version control

### URL Sharing

**Generate Share Link:**
1. Build your army
2. Click "Share" button
3. URL with composition data generated
4. Share link with others
5. They can load your exact composition

---

## Comparison Mode

### Side-by-Side Analysis

**Enable Comparison:**
1. Toggle "Enable Comparison Mode"
2. Two identical panels appear
3. Configure each army independently

**What You Can Compare:**
- Different civilizations
- Different ages
- Different unit compositions
- Resource efficiency

**Use Cases:**
- Test civilization matchups
- Compare unit cost efficiency
- Plan counter-strategies
- Optimize resource allocation

### Visual Differences

When in comparison mode:
- **Left Panel**: Primary army (blue theme)
- **Right Panel**: Comparison army (purple theme)
- **Clear Labels**: "Army 1" and "Army 2"
- **Independent Tracking**: Separate resource/population counts

---

## Tips & Best Practices

### Efficient Army Building

1. **Use Keyboard**:
   - Type quantities directly instead of clicking +/-
   - Much faster for large armies

2. **Save Often**:
   - Save compositions as you experiment
   - Name them descriptively

3. **Check Bonuses**:
   - Always expand the bonus panel
   - Verify cost bonuses are applying
   - Plan around civilization strengths

4. **Resource Balance**:
   - Watch all 4 resource types
   - Gold is often the bottleneck
   - Plan trash units (wood/food only) for late game

5. **Population Efficiency**:
   - Siege units use more population
   - Consider unit strength vs population cost
   - Elite units are usually worth it

### Common Workflows

**Tournament Preparation:**
1. Research opponent's favorite civilization
2. Build counter-composition
3. Save as "[Opponent] Counter"
4. Practice executing the composition

**Build Order Planning:**
1. Set resource limits to match build order
2. Plan army for specific timing (e.g., Castle Age rush)
3. Verify you can afford the army
4. Note population needed

**Civilization Comparison:**
1. Enable comparison mode
2. Build same army composition for both
3. Compare total costs
4. Identify which civ is more efficient

---

## Keyboard Shortcuts

Currently available:
- **Tab**: Navigate between input fields
- **Enter**: Confirm quantity input
- **Number keys**: Type quantities directly

Future shortcuts planned:
- **Ctrl+S**: Quick save
- **Ctrl+Z**: Undo last change
- **Ctrl+C**: Toggle comparison mode

---

## Progressive Web App (PWA) - v2.10.0

### Install & Offline Support

The app is now a full Progressive Web App:

1. **Installation**:
   - Click "Install App" when prompted
   - Or use browser's "Add to Home Screen"
   - Works on desktop, tablet, and mobile

2. **Offline Functionality**:
   - 251 precached assets for complete offline use
   - Plan armies without internet connection
   - Perfect for gaming sessions
   - Cache-first strategy for fast loads

3. **Auto Updates**:
   - Notified when new version available
   - One-click update
   - Service worker handles caching

4. **Install Prompt**:
   - Friendly UI with "Install App" button
   - "Not now" dismisses for 7 days
   - Automatic detection of installation status

---

## Technology System - v2.4.0 to v2.7.0

### Upgrades & Technologies

Full technology support with stat calculations:

1. **Blacksmith Upgrades**:
   - Fletching, Bodkin Arrow, Bracer (archer attack)
   - Forging, Iron Casting, Blast Furnace (melee attack)
   - Padded Archer Armor, Leather Archer Armor, Ring Archer Armor
   - Scale Mail Armor, Chain Mail Armor, Plate Mail Armor

2. **University Technologies**:
   - Ballistics, Chemistry, Siege Engineers
   - Masonry, Architecture, Heated Shot

3. **Monastery Upgrades**:
   - Redemption, Atonement, Sanctity
   - Fervor, Faith, Illumination

4. **Economic Upgrades**:
   - Wheelbarrow, Hand Cart
   - Double-Bit Axe, Bow Saw, Two-Man Saw

5. **Unique Technologies** (100+ techs):
   - Castle Age unique tech for each civ
   - Imperial Age unique tech for each civ
   - Yellow styling with ⭐ icons
   - Tech cost tracking included

---

## Preset Army Compositions - v2.9.0

### Meta Builds

24 pre-configured army compositions:

1. **Castle Age Rushes**:
   - Knight Rush (10 Knights + 4 Light Cav)
   - Crossbow Push (20 Crossbows + 4 Spears)
   - Eagle Rush (15 Eagle Warriors)
   - Camel Push (8 Camels + 4 Light Cav)
   - Monk Siege Push (5 Monks + 2 Mangonels)

2. **Imperial Compositions**:
   - Paladin + Siege (15 Paladins + siege support)
   - Arbalester + Halbs (30 Arbs + 15 Halbs)
   - Heavy Camel + Siege (12 Heavy Camels)
   - Cav Archer + Hussar (18 Heavy CA + Hussars)

3. **Civilization-Specific**:
   - Britons Longbow Army
   - Franks Paladin Spam
   - Mayans Plumes + Eagles
   - Mongols Mangudai Rush
   - Goths Infantry Flood

4. **Beginner Templates**:
   - Trash Army (no gold units)
   - Basic Gold Army
   - Balanced Composition
   - Defensive Turtle
   - Raiding Party

### Using Presets

1. Select category from dropdown
2. Choose specific build
3. Preview shows units, costs, recommended civs
4. Click "Load Preset" to replace current
5. Or "Merge with Current" to add

---

## Limitations & Known Issues

### Current Limitations

1. **Unit Stats Display**:
   - Stat calculation engine complete (14K LOC)
   - Visual HP bars not yet implemented
   - Side-by-side comparison modal pending
   - Rich tooltips with breakdowns pending

2. **Team Bonuses**:
   - Team bonus data exists in civ data
   - UI for selecting allies not implemented
   - Team bonus calculations not applied

3. **Battle Simulation**:
   - No combat outcome predictions
   - Requires complex micro/positioning calculations
   - Lower priority feature

### Reporting Issues

Found a bug? Please report:
- GitHub Issues: Most reliable
- Include browser and OS
- Describe steps to reproduce
- Share composition if relevant

---

**Last Updated**: November 2025
**Version**: 2.10.0
