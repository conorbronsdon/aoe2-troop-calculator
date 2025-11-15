# Age of Empires II: Army Composition Calculator

A web-based calculator for planning army compositions in Age of Empires II: Definitive Edition, inspired by pro player's using Excel sheets for 200 unit battles.

## Features ✨

### ✅ Implemented in MVP
- **Custom Resource Limits**: Set your available food, wood, gold, and stone
- **Population Cap Control**: Adjust from 200 to any custom value
- **Age Selection**: Choose between Feudal, Castle, and Imperial Age
- **8 Civilizations**: Generic, Mayans, Britons, Franks, Goths, Byzantines, Portuguese, Persians
- **18 Essential Units**: Most common units across all categories
- **Real-Time Tracking**: Live resource and population counters with visual progress bars
- **Civilization Bonuses**: Automatic cost adjustments based on civ bonuses
  - Mayans: Archer line discount (10-30% based on age)
  - Britons: Archer line discount (20% in Castle/Imperial)
  - Goths: Infantry discount (15-30% based on age)
  - Byzantines: Counter units discount (25%)
  - Portuguese: Universal gold discount (20%)
- **Visual Feedback**: Green/yellow/red progress bars based on resource usage
- **Discount Display**: Shows both discounted and original prices when bonuses apply

## How to Use 📖

1. **Open the file**: Double-click `aoe2-calculator.html` in any modern web browser
2. **Configure Settings**:
   - Adjust resource limits (default: 20,000 each)
   - Set population cap (default: 200)
   - Select your Age (Feudal, Castle, or Imperial)
   - Choose your civilization
3. **Build Your Army**:
   - Click + to add units one at a time
   - Click - to remove units
   - Type directly in the quantity box for bulk adding
4. **Monitor Resources**:
   - Watch real-time resource consumption
   - Progress bars turn yellow at 80% capacity
   - Progress bars turn red when exceeding limits
5. **Review Composition**:
   - See your complete army summary at the bottom
   - View total costs per unit type
   - Check total population used

## Deployment Options 🚀

### Option 1: Local File (Easiest)
Just open the HTML file in your browser. No server needed!

### Option 2: Netlify (Free Hosting)
1. Sign up at [netlify.com](https://netlify.com)
2. Drag and drop `aoe2-calculator.html` into Netlify's deploy zone
3. Get a free public URL instantly

### Option 3: Vercel (Free Hosting)
1. Sign up at [vercel.com](https://vercel.com)
2. Create a new project
3. Upload `aoe2-calculator.html`
4. Deploy automatically

### Option 4: GitHub Pages (Free + Custom Domain)
1. Create a new GitHub repository
2. Upload `aoe2-calculator.html` and rename to `index.html`
3. Enable GitHub Pages in repository settings
4. Access at `https://yourusername.github.io/repository-name`

## Technical Details 🔧

### Technology Stack
- **React 18**: UI framework (via CDN)
- **Tailwind CSS**: Styling (via CDN)
- **Vanilla JavaScript**: Logic and calculations
- **Single HTML File**: Zero build process, works offline

### Data Structure
```javascript
// Units include:
{
  id: 'knight',
  name: 'Knight',
  category: 'Cavalry',
  age: 'castle',
  cost: { food: 60, wood: 0, gold: 75, stone: 0 },
  population: 1
}

// Bonuses include:
{
  type: 'cost',
  units: ['archer', 'crossbowman'],
  resource: 'all', // or specific resource
  value: 0.20 // 20% discount
}
```

### Calculation Logic
1. Base unit costs are fetched from the UNITS array
2. Selected civilization bonuses are applied
3. Age-specific bonuses are calculated if applicable
4. Final costs are rounded to nearest integer
5. Totals are summed across all units in composition

## Units Included 📋

### Archers (3)
- Archer (Feudal)
- Crossbowman (Castle)
- Arbalester (Imperial)

### Infantry (6)
- Militia (Dark)
- Longswordsman (Castle)
- Champion (Imperial)
- Spearman (Feudal)
- Pikeman (Castle)
- Halberdier (Imperial)

### Cavalry (4)
- Scout Cavalry (Feudal)
- Knight (Castle)
- Cavalier (Imperial)
- Camel Rider (Castle)

### Archers - Counter (2)
- Skirmisher (Feudal)
- Elite Skirmisher (Castle)

### Siege (3)
- Battering Ram (Castle)
- Mangonel (Castle)
- Trebuchet (Imperial)

### Other (1)
- Monk (Castle)

## Future Enhancements 🎯

**Phase 2 Features** (Not yet implemented):
- Save/Load compositions to browser storage
- Export to CSV or shareable link
- All 42+ civilizations
- Complete unit roster (100+ units)
- Unique units for each civilization
- More civilization bonuses (team bonuses, tech bonuses)
- Unit counter suggestions
- Army composition optimization recommendations
- Side-by-side comparison mode

**Phase 3 Features**:
- Backend database for saving compositions
- User accounts and cloud sync
- Community shared compositions
- Tournament presets
- Integration with real game data API
- Mobile app version

## Browser Compatibility ✅

Works in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

**Not compatible with Internet Explorer**

## File Size
- Single file: ~20KB
- No external dependencies required (CDNs load from cache)
- Works offline after first load

## License & Attribution

**Age of Empires II © Microsoft Corporation**

This calculator was created under Microsoft's Game Content Usage Rules and is not endorsed by or affiliated with Microsoft.

Built with data inspired by community resources:
- Unit costs and population values
- Civilization bonuses from game data
- Popular meta units from competitive play

## Support & Feedback

This is an MVP (Minimum Viable Product). Feedback welcome for:
- Additional civilizations to prioritize
- Missing units that should be included
- Bonus calculation errors
- UI/UX improvements
- Feature requests

## Credits

Created for Age of Empires II players who want to plan army compositions efficiently, inspired by pro players using Excel sheets for 200 vs 200 unit battles.

Special thanks to the AoE2 community for:
- aoe2techtree.net for reference data
- aoestats.io for civilization win rates
- Pro players who inspired this tool

---

**Version**: 1.0.0 (MVP)  
**Last Updated**: November 2025  
**Status**: Fully functional, ready for deployment
