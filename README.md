<div align="center">

# Age of Empires II: Army Composition Calculator

### 🏰 Plan Your Armies Like a Pro • No Excel Needed 🏰

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Try_Now-4F46E5?style=for-the-badge)](https://conorbronsdon.github.io/aoe2-troop-calculator/)
[![GitHub Stars](https://img.shields.io/github/stars/conorbronsdon/aoe2-troop-calculator?style=for-the-badge&logo=github)](https://github.com/conorbronsdon/aoe2-troop-calculator)
[![License](https://img.shields.io/badge/License-Game_Content_Usage-blue?style=for-the-badge)](https://www.xbox.com/en-US/developers/rules)

**A comprehensive web-based calculator for planning army compositions in Age of Empires II: Definitive Edition**

Plan your armies • Compare civilizations • Optimize resources • Calculate bonuses

![AoE2 Army Calculator](images/og-image.png)

---

💡 **Inspired by pro players** ([Hera vs. Lewis](https://youtu.be/6WyRs7SY0Tk?si=RHdJiWtagC0ZG1rA)) using Excel sheets for 200 unit battles.

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [📖 How to Use](#-how-to-use)
- [🚀 Development](#-development)
- [🧪 Testing](#-testing)
- [📊 Data Accuracy](#-data-accuracy)
- [🎯 Roadmap](#-roadmap)
- [🙏 Credits](#-credits)
- [🐛 Support & Feedback](#-support--feedback)

---

## ✨ Features

### 🎮 Complete Unit Roster (100+ Units)
- **Infantry** (12 units): Militia → Man-at-Arms → Longswordsman → Two-Handed Swordsman → Champion
  - Spearman → Pikeman → Halberdier
  - Eagle Scout → Eagle Warrior → Elite Eagle Warrior
- **Cavalry** (15 units): Scout → Light Cavalry → Hussar
  - Knight → Cavalier → Paladin
  - Camel Rider → Heavy Camel → Imperial Camel
  - Battle Elephant line, Steppe Lancer line
- **Archers** (13 units): Archer → Crossbowman → Arbalester
  - Skirmisher → Elite Skirmisher → Imperial Skirmisher
  - Cavalry Archer → Heavy Cavalry Archer
  - Hand Cannoneer, Slinger, Genitour line
- **Siege** (11 units): Ram → Capped Ram → Siege Ram
  - Mangonel → Onager → Siege Onager
  - Scorpion → Heavy Scorpion
  - Bombard Cannon, Trebuchet, Petard
- **Naval** (14 units): Galley → War Galley → Galleon
  - Fire Ship line, Demolition Ship line, Cannon Galleon line
  - Transport Ships, Trade Cogs, Fishing Ships
- **Monks** (2 units): Monk, Missionary
- **Unique Units** (50+ civilization-specific units)

### 🏛️ Civilization Features
- **51 Civilizations** from all regions (European, Asian, African, American, Middle Eastern)
- **Technology Tree Restrictions**: Units filtered by civilization-specific tech tree
  - Aztecs/Mayans/Incas cannot build cavalry (historically accurate)
  - Vikings restricted from cavalry units
  - Each civ shows only units they can actually build
- **Unique Units System**: Each civ's unique units automatically available when selected
  - Britons: Longbowman, Spanish: Conquistador, Goths: Huskarl, and 40+ more
- **Comprehensive Bonuses**:
  - 💰 **Cost Reduction Bonuses**: Automatic price adjustments (Mayans archers, Goths infantry, etc.)
  - ⚔️ **Military Bonuses**: HP, attack, armor, range improvements (Franks cavalry HP, Britons archer range)
  - 🌾 **Economic Bonuses**: Resource gathering, building costs, age advancement bonuses
  - 🤝 **Team Bonuses**: Allied team benefits displayed
- **Interactive Bonus Panel**: Expanded by default showing all active bonuses by category

### 🎯 Army Planning Tools
- **Custom Resource Limits**: Set available food, wood, gold, and stone
- **Population Cap Control**: Adjust from 200 to custom values
- **Age Selection**: Dark, Feudal, Castle, and Imperial Age filtering
- **Flexible Display Modes**: Choose what to display for optimal planning
  - ⚔️ **Units Only**: Focus on military unit composition
  - ⚔️🏰 **Units & Fortifications**: Plan comprehensive offense and defense strategies
  - 🏰 **Fortifications Only**: Focus on defensive structures (walls, gates, towers, castles)
  - Track stone requirements for fortifications
  - Unified resource tracking across all selections
- **Real-Time Tracking**: Live resource and population counters with visual progress bars
- **Visual Feedback**: Green/yellow/red progress bars based on resource usage
- **Discount Display**: Shows both discounted and original prices when bonuses apply

### 💾 Composition Management
- **Save/Load System**: Store multiple army compositions locally
- **Export to JSON**: Download your compositions for sharing
- **URL Sharing**: Share compositions via link
- **Comparison Mode**: Compare two different civilizations side-by-side

### 🔍 Unit Search & Filter System
- **Search Bar**: Find units instantly by typing their name
- **Category Filters**: Toggle Infantry, Cavalry, Archers, Siege, Naval, Unique, Other
- **Cost Filters**: Filter by Trash units (no gold), Gold units, or Low cost (<100 total)
- **Age Filters**: Show only units from specific ages
- **Real-Time Results**: See matching unit count as you filter
- **Clear Filters**: One-click reset for all filters
- **Mobile Friendly**: Responsive filter UI on all devices

### 🎯 Unit Counter Visualization
- **Counter Badges**: Each unit card shows "Strong Against" and "Weak To" relationships
- **Color-Coded**: Green badges for counters, red for weaknesses
- **Collapsible Info**: Expand/collapse to save space
- **Tooltips**: Additional context on hover
- **Strategic Planning**: Build balanced compositions by understanding counter relationships

### 🎨 User Experience
- **Official Unit Icons**: Real Age of Empires II unit icons from community sources
  - Automatic loading from Age of Empires wiki
  - Smart fallback to emoji icons if images fail to load
  - Smooth loading transitions with emoji placeholders
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Category Organization**: Units grouped by type for easy browsing
- **Unit Counters**: Each unit shows what it counters and what counters it
- **Social Sharing**: Share on Twitter, Reddit, Discord
- **Advanced Bonus Filtering**: Search and filter civilization bonuses
  - Filter by type: Military, Economic, Cost
  - Search bonuses by keyword
  - Show only active bonuses affecting current army

## 📖 How to Use

### Basic Usage
1. **Select Civilization**: Choose from 51 civilizations
2. **Choose Age**: Select Dark, Feudal, Castle, or Imperial Age
3. **Select Display Mode**: Choose between Units Only, Units & Fortifications, or Fortifications Only
4. **View Available Options**: Only units/fortifications available for your civ/age are shown
5. **Build Your Strategy**: Click +/- or type quantities directly
6. **Monitor Resources**: Watch real-time resource tracking (includes both units and fortifications)
7. **Review Bonuses**: View active bonuses (panel expanded by default)

### Display Modes
- **Units Only (⚔️)**: Focus on military composition - infantry, cavalry, archers, siege, naval, and monks
- **Units & Fortifications (⚔️🏰)**: Plan comprehensive strategies with both offense and defense visible
  - Ideal for balanced gameplay and defensive push strategies
  - See total resource allocation across military and structures
  - Plan castle drops, tower rushes, and wall positioning alongside army composition
- **Fortifications Only (🏰)**: Dedicated defensive planning mode
  - Select walls, gates, towers, and castles
  - Track stone and wood requirements for defensive structures
  - Perfect for planning wall layouts and tower placements

### Advanced Features
- **Save Compositions**: Click "Save Current Composition" to store your army
- **Load Compositions**: Select from saved compositions to quickly restore
- **Compare Civilizations**: Enable comparison mode to analyze two armies
- **Export Data**: Download your composition as JSON for external tools
- **Share Links**: Generate shareable URLs for your compositions

### Understanding Bonuses
- **Cost Bonuses** (💰): Automatically calculated and applied to unit prices
- **Stat Bonuses** (⚔️): Displayed for reference (HP, attack, armor improvements)
- **Economic Bonuses** (🌾): Game-start and economic advantages
- **Team Bonuses** (🤝): Benefits your allies receive when you're on their team

## 🚀 Development

### Prerequisites

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-latest-CB3837?style=flat&logo=npm&logoColor=white)

### Installation

```bash
# Clone the repository
git clone https://github.com/conorbronsdon/aoe2-troop-calculator.git
cd aoe2-troop-calculator

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks and context |
| **Vite** | Lightning-fast build tool |
| **Tailwind CSS** | Utility-first styling |
| **React Context API** | State management |
| **Local Storage** | Composition persistence |

### Project Structure
```
src/
├── components/          # React components
│   ├── ConfigurationPanel.jsx
│   ├── CivilizationBonuses.jsx  # Bonus display
│   ├── UnitSelection.jsx
│   ├── UnitCard.jsx
│   ├── FortificationSelection.jsx  # NEW: Fortification mode
│   ├── FortificationCard.jsx      # NEW: Fortification cards
│   └── ...
├── context/            # State management
│   ├── ArmyContext.jsx       # Updated: Fortification support
│   └── ThemeContext.jsx
├── data/              # Game data
│   ├── civilizations.js         # 51 civs with bonuses
│   ├── fortifications.js        # NEW: Walls, towers, castles
│   └── units/
│       ├── infantry.js
│       ├── cavalry.js
│       ├── archers.js
│       ├── siege.js
│       ├── naval.js
│       ├── unique.js            # 50+ unique units
│       └── other.js
├── utils/             # Helper functions
│   ├── calculations.js          # Updated: Fortification calculations
│   └── iconMappings.js          # Unit icon URL mappings
└── App.jsx
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage
- Unit filtering by civilization and age
- Cost calculation with bonuses
- Data validation for units and civilizations
- Component rendering tests

## 📊 Data Accuracy

All unit costs, population values, and civilization bonuses are based on Age of Empires II: Definitive Edition official data. Sources:
- Official game files and patch notes
- [aoe2techtree.net](https://aoe2techtree.net) for tech tree data
- [aoestats.io](https://aoestats.io) for civilization statistics
- [Age of Empires Fandom Wiki](https://ageofempires.fandom.com) for unit icons
- Community-verified data from competitive players

## 🎯 Roadmap

<details open>
<summary><b>✅ Recently Completed</b></summary>

- ✅ Complete unit roster (100+ units)
- ✅ All unique units (101 units for 51 civilizations)
- ✅ **Flexible Display Modes** (Units Only, Units & Fortifications, Fortifications Only)
- ✅ **Fortification System** (walls, towers, castles with resource tracking)
- ✅ Naval unit category
- ✅ Civilization bonuses panel
- ✅ Team bonuses display
- ✅ Conditional unique unit filtering
- ✅ Dark mode support
- ✅ **Technology Tree Restrictions** (filter units by civ tech tree)
- ✅ **Official Unit Icons** (real AoE2 icons with smart fallbacks)
- ✅ **Definitive Edition Alignment** (2025 content update)
- ✅ **Unit Search & Filter System** (search, category filters, cost filters, age filters)
- ✅ **Unit Counter Visualization** (Strong Against/Weak To badges on unit cards)
- ✅ **Advanced Bonus Filtering** (search, type filters, active-only toggle)

</details>

<details>
<summary><b>🔜 Next Steps</b></summary>

### 1. Unit Statistics Display
- [ ] Calculate and display actual unit stats (HP, attack, armor)
- [ ] Show stat comparisons between civilizations
- [ ] Highlight which bonuses are active for current army

### 2. Technology System
- [ ] Add Blacksmith upgrades
- [ ] Include unique technologies
- [ ] Calculate upgraded unit stats

### 3. Team Bonus System
- [ ] Select allied civilizations for team games
- [ ] Apply team bonus effects to calculations
- [ ] Show which ally provides which bonus

</details>

<details>
<summary><b>💡 Future Enhancements</b></summary>

- Backend database for cloud saving
- User accounts and syncing
- Community shared compositions
- Tournament presets
- Mobile app version
- Real-time multiplayer planning

</details>

## 🌐 Browser Compatibility

Works in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

**Not compatible with Internet Explorer**

## 📝 Contributing

Contributions welcome! Please feel free to submit a Pull Request. Areas where help is needed:
- Additional unique units for newer civilizations
- Verification of civilization bonuses
- UI/UX improvements
- Test coverage expansion
- Documentation improvements

## 📄 License & Attribution

**Age of Empires II © Microsoft Corporation**

This calculator is created under Microsoft's Game Content Usage Rules and is not endorsed by or affiliated with Microsoft.

## 🙏 Credits

<div align="center">

### Created by [Conor Bronsdon](https://conorbronsdon.com/)

[![GitHub](https://img.shields.io/badge/GitHub-conorbronsdon-181717?style=flat&logo=github)](https://github.com/conorbronsdon/)
[![Twitter](https://img.shields.io/badge/Twitter-@ConorBronsdon-1DA1F2?style=flat&logo=twitter)](https://x.com/ConorBronsdon)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-conorbronsdon-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/conorbronsdon/)
[![Substack](https://img.shields.io/badge/Substack-conorbronsdon-FF6719?style=flat&logo=substack)](https://conorbronsdon.substack.com/)
[![Website](https://img.shields.io/badge/Website-conorbronsdon.com-4F46E5?style=flat&logo=google-chrome)](https://conorbronsdon.com/)

</div>

---

### 💭 Inspiration

Built for Age of Empires II players who want to plan army compositions efficiently.

| Source | Description |
|--------|-------------|
| 💡 [@faruksarihan](https://youtu.be/6WyRs7SY0Tk?si=RHdJiWtagC0ZG1rA) | YouTube comment on Hera's 200 vs 200 Army match |
| 🎮 Pro Players | Meticulous composition planning strategies |
| 🏰 AoE2 Community | The amazing Age of Empires II community |

### 🌟 Special Thanks

| Resource | Purpose |
|----------|---------|
| [aoe2techtree.net](https://aoe2techtree.net) | Tech tree reference data |
| [aoestats.io](https://aoestats.io) | Civilization statistics |
| [AoE Fandom Wiki](https://ageofempires.fandom.com) | Unit icons |
| All Contributors | Testing and feedback |

## 🐛 Support & Feedback

Found a bug or have a suggestion?

| Channel | Action |
|---------|--------|
| 🐛 GitHub Issues | [Open an issue](https://github.com/conorbronsdon/aoe2-troop-calculator/issues) |
| 🔀 Pull Requests | [Contribute code](https://github.com/conorbronsdon/aoe2-troop-calculator/pulls) |
| 💬 Community | Share feedback on Discord/Reddit |

---

<div align="center">

### 📊 Project Stats

![Version](https://img.shields.io/badge/Version-2.3.0-brightgreen?style=flat)
![Last Updated](https://img.shields.io/badge/Last_Updated-November_2025-blue?style=flat)
![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=flat)

**100+ Units • 101 Unique Units • 51 Civilizations • Unit Search & Filters • Counter Visualization**

---

**Made with ❤️ for the Age of Empires II community**

[![Star this repo](https://img.shields.io/github/stars/conorbronsdon/aoe2-troop-calculator?style=social)](https://github.com/conorbronsdon/aoe2-troop-calculator)

</div>
