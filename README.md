# Age of Empires II: Army Composition Calculator

A comprehensive web-based calculator for planning army compositions in Age of Empires II: Definitive Edition. Plan your armies, compare civilizations, and optimize resource allocation with accurate costs and bonuses.

Inspired by pro players ([Hera vs. Lewis](https://youtu.be/6WyRs7SY0Tk?si=RHdJiWtagC0ZG1rA)) using Excel sheets for 200 unit battles.

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
- Node.js 18+ and npm

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

### Tech Stack
- **React 18**: UI framework with hooks and context
- **Vite**: Lightning-fast build tool
- **Tailwind CSS**: Utility-first styling
- **React Context API**: State management
- **Local Storage**: Composition persistence

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

### Recently Completed ✅
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

### Next Steps 🔜
1. **Complete Civilization Bonuses**
   - Add team bonuses for remaining civilizations
   - Document all military and economic bonuses for all 51 civs

2. **Unit Statistics**
   - Add HP, attack, armor stats
   - Show range, rate of fire, movement speed
   - Include training time and upgrade costs

3. **Technology System**
   - Add Blacksmith upgrades
   - Include unique technologies
   - Calculate upgraded unit stats

### Future Enhancements 💡
- Backend database for cloud saving
- User accounts and syncing
- Community shared compositions
- Tournament presets
- Mobile app version
- Real-time multiplayer planning

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

**Created by [Conor Bronsdon](https://conorbronsdon.com/)**

Connect with me:
- 🐙 GitHub: [@conorbronsdon](https://github.com/conorbronsdon/)
- 🐦 Twitter: [@ConorBronsdon](https://x.com/ConorBronsdon)
- 💼 LinkedIn: [conorbronsdon](https://www.linkedin.com/in/conorbronsdon/)
- 📝 Substack: [conorbronsdon.substack.com](https://conorbronsdon.substack.com/)
- 🌐 Website: [conorbronsdon.com](https://conorbronsdon.com/)

---

Built for Age of Empires II players who want to plan army compositions efficiently.

**Inspired by:**
- @faruksarihan's YouTube comment on [Hera's 200 Army vs 200 Army match](https://youtu.be/6WyRs7SY0Tk?si=RHdJiWtagC0ZG1rA)
- Pro players who meticulously plan compositions
- The amazing AoE2 community

**Special thanks to:**
- [aoe2techtree.net](https://aoe2techtree.net) for reference data
- [aoestats.io](https://aoestats.io) for civilization statistics
- All contributors and testers

## 🐛 Support & Feedback

Found a bug or have a suggestion?
- Open an issue on GitHub
- Contribute via Pull Request
- Share feedback on Discord/Reddit

---

**Version**: 2.2.0
**Last Updated**: November 2025
**Status**: Production Ready - 100+ Units, Fortifications, 101 Unique Units, 51 Civilizations, Tech Tree Restrictions
