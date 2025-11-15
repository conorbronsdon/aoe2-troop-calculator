# Age of Empires II: Army Composition Calculator v2.0

A modern web-based calculator for planning army compositions in Age of Empires II: Definitive Edition. Built with React, Vite, and Tailwind CSS for scalability and maintainability.

## What's New in v2.0

### Architecture Improvements
- **Modular Structure**: Separated data, components, and utilities for better maintainability
- **React Context**: Proper state management with useReducer pattern
- **Data Validation**: Automatic validation of all game data on load
- **Testing Infrastructure**: Ready for unit and integration tests with Vitest
- **Service Layer**: Clean separation of concerns for future features

### Project Structure
```
aoe2-troop-calculator/
├── src/
│   ├── components/          # React components
│   │   ├── ConfigurationPanel.jsx
│   │   ├── ResourceTracker.jsx
│   │   ├── UnitSelection.jsx
│   │   ├── UnitCard.jsx
│   │   └── ArmyCompositionSummary.jsx
│   ├── context/             # State management
│   │   └── ArmyContext.jsx
│   ├── data/                # Game data
│   │   ├── units/
│   │   │   ├── archers.js
│   │   │   ├── infantry.js
│   │   │   ├── cavalry.js
│   │   │   ├── siege.js
│   │   │   ├── other.js
│   │   │   └── index.js
│   │   └── civilizations.js
│   ├── utils/               # Helper functions
│   │   ├── calculations.js
│   │   ├── validators.js
│   │   └── errorHandler.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/                  # Static assets
├── .github/workflows/       # CI/CD
│   └── deploy.yml
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Development

### Prerequisites
- Node.js 18+ and npm

### Getting Started
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test
```

### Adding New Units
1. Edit the appropriate file in `src/data/units/`
2. Follow the unit schema:
```javascript
{
  id: 'unit-id',
  name: 'Display Name',
  category: 'Category',
  age: 'feudal|castle|imperial',
  cost: { food: 0, wood: 0, gold: 0, stone: 0 },
  population: 1,
  counters: ['unit-id'],
  weakTo: ['unit-id']
}
```

### Adding New Civilizations
1. Edit `src/data/civilizations.js`
2. Follow the civilization schema:
```javascript
{
  id: 'civ-id',
  name: 'Display Name',
  region: 'European|Asian|etc',
  bonuses: [
    {
      type: 'cost',
      units: ['unit-id'] or 'all',
      resource: 'all|food|wood|gold',
      value: 0.20,  // or ages: { feudal: 0.10, castle: 0.20 }
      description: 'Bonus description'
    }
  ]
}
```

## Deployment

### GitHub Pages (Automatic)
Pushes to `main` branch automatically deploy via GitHub Actions.

**Setup:**
1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Push to main branch

**URL:** `https://yourusername.github.io/aoe2-troop-calculator`

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to any static hosting service
```

## Current Features ✅

- **Custom Resource Limits**: Individual or total resource modes
- **Population Cap Control**: Adjust from 200 to any custom value
- **Age Selection**: Feudal, Castle, and Imperial Age
- **8 Civilizations**: With accurate cost bonuses
- **19 Essential Units**: Across all categories
- **Real-Time Tracking**: Live resource and population counters
- **Civilization Bonuses**: Automatic cost adjustments
- **Visual Feedback**: Color-coded progress bars
- **Discount Display**: Shows both discounted and original prices

## Phase 2 Roadmap 🎯

See the [Phase 2 Implementation Plan](./PHASE2_PLAN.md) for details on upcoming features:

### Data Expansion
- All 42+ civilizations
- Complete unit roster (100+ units)
- Unique units for each civilization
- Enhanced civilization bonuses (team bonuses, tech tree)

### UI Enhancements
- Unit icons
- Side-by-side comparison mode

### Persistence & Sharing
- Save/load compositions to browser storage
- Export to CSV
- Shareable links

### Intelligence Features
- Unit counter suggestions
- Army composition optimization recommendations

## Contributing

Contributions welcome! Areas of focus:
- Adding missing units and civilizations
- Improving calculation accuracy
- UI/UX enhancements
- Test coverage
- Documentation

## Technology Stack

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **Vitest**: Testing framework
- **GitHub Actions**: CI/CD

## License & Attribution

**Age of Empires II © Microsoft Corporation**

This calculator is created under Microsoft's Game Content Usage Rules and is not endorsed by or affiliated with Microsoft.

Built with data inspired by community resources:
- aoe2techtree.net for reference data
- aoestats.io for civilization statistics
- Pro players who inspired this tool

---

**Version**: 2.0.0
**Status**: Production Ready
**Build Size**: ~165KB (gzipped: ~54KB)
