# Quick Start Guide: AoE2 Army Calculator

> **⚠️ DEPRECATED DOCUMENTATION**
>
> This guide is for the deprecated standalone version (aoe2-calculator.html) with only 18 units and 8 civilizations.
>
> **For current usage, please refer to [README.md](./README.md)** which documents the full version with:
> - 100+ units across all categories
> - 51 civilizations with accurate bonuses
> - Fortifications system
> - Tech tree restrictions
> - Save/Load compositions (already implemented)
> - Export to JSON/CSV
> - Comparison mode
>
> This file is kept for historical reference only.

---

## Example Scenario: Planning a 200 Pop Knight & Crossbow Push

Let's recreate a common pro strategy - the Castle Age power spike with Knights and Crossbowmen.

### Step-by-Step Walkthrough

**1. Open the Calculator**
- Double-click `aoe2-calculator.html`
- The app loads instantly in your browser

**2. Configure Your Settings**
```
Resources: 20,000 Food, 20,000 Wood, 20,000 Gold, 20,000 Stone
Population Cap: 200
Age: Castle Age
Civilization: Britons (for archer bonus)
```

**3. Build Your Army**

Add these units:
- 30x Knight (Click + button 30 times, or type "30" directly)
  - Cost per unit: 60 food, 75 gold
  - Total: 1,800 food, 2,250 gold, 30 population
  
- 50x Crossbowman (with Briton bonus!)
  - Original cost: 25 food, 45 wood
  - Briton discount: 20 food, 36 wood (20% off in Castle Age)
  - Total: 1,000 food, 1,800 wood, 50 population

- 10x Mangonel
  - Cost per unit: 160 wood, 135 gold
  - Total: 1,600 wood, 1,350 gold, 30 population

- 5x Monk
  - Cost per unit: 100 gold
  - Total: 500 gold, 5 population

**4. Check Your Resources**

Your real-time tracker shows:
```
Food:  2,800 / 20,000  (14.0%) [Green bar]
Wood:  3,400 / 20,000  (17.0%) [Green bar]
Gold:  4,100 / 20,000  (20.5%) [Green bar]
Population: 115 / 200  (57.5%) [Green bar]
```

**5. Adjust and Optimize**

You have tons of resources left! Let's max out:
- Add 20 more Knights (total: 50)
- Add 30 more Crossbowmen (total: 80)
- Add 5 more Mangonels (total: 15)

New totals:
```
Food:  6,600 / 20,000  (33.0%) [Green bar]
Wood:  6,280 / 20,000  (31.4%) [Green bar]
Gold:  8,450 / 20,000  (42.3%) [Green bar]
Population: 185 / 200  (92.5%) [Yellow bar - getting close!]
```

**6. Final Army Composition**
- 50x Knight (mobile power)
- 80x Crossbowman (ranged damage)
- 15x Mangonel (splash damage)
- 5x Monk (conversion utility)

This is a balanced, professional army composition ready for battle!

---

## Example 2: Mayan Archer Rush (Imperial Age)

**Settings:**
```
Civilization: Mayans
Age: Imperial Age
Resources: 20,000 each
```

**Strategy: Max out archers with Mayan discount**

In Imperial Age, Mayans get 30% discount on archers!

- 100x Arbalester
  - Original cost: 25 food, 45 wood
  - Mayan discount: 18 food, 32 wood (rounded)
  - Total: 1,800 food, 3,200 wood, 100 population

- 50x Elite Skirmisher
  - Original: 25 food, 35 wood
  - Mayan discount: 18 food, 25 wood
  - Total: 900 food, 1,250 wood, 50 population

- 20x Trebuchet
  - Cost: 200 wood, 200 gold each
  - Total: 4,000 wood, 4,000 gold, 160 population (8 pop each!)

**Total army: 210 population** - Oops! Over cap!

The calculator shows **red bars** when you exceed limits. Remove some units to stay under 200.

---

## Example 3: Gothic Infantry Spam

**Settings:**
```
Civilization: Goths
Age: Imperial Age
```

Goths get 30% discount on infantry in Imperial Age!

- 150x Champion
  - Original: 60 food, 20 gold
  - Goth discount: 42 food, 14 gold
  - Total: 6,300 food, 2,100 gold, 150 population

- 50x Halberdier
  - Original: 35 food, 25 wood
  - Goth discount: 25 food, 18 wood
  - Total: 1,250 food, 900 wood, 50 population

**Total: 200 population of pure infantry flood!**

Resources used:
- Food: 7,550 (38%)
- Wood: 900 (4.5%)
- Gold: 2,100 (10.5%)

You have 12,450 food, 19,100 wood, and 17,900 gold leftover!

---

## Pro Tips 💡

1. **Age-based bonuses matter!**
   - Mayans: 10% (Feudal) → 20% (Castle) → 30% (Imperial)
   - Always check if moving to a later age gives you better discounts

2. **Population efficiency**
   - Trebuchets cost 8 pop each - use sparingly!
   - Scouts, Knights, Archers = 1 pop (most efficient)

3. **Color coding**
   - Green bar: Safe (< 80% capacity)
   - Yellow bar: Warning (80-100% capacity)
   - Red bar: Over budget! (> 100%)

4. **Civilization synergies**
   - Britons: Spam archers (20% discount)
   - Portuguese: Gold-heavy armies (20% gold discount)
   - Byzantines: Counter units (25% discount on spears, skirms, camels)

5. **Quick editing**
   - Click number field and type directly
   - Use +/- buttons for fine-tuning
   - Reset All to start fresh

---

## Common Army Compositions

### 1. **Knight & Crossbow** (Classic Castle Age)
- 40 Knights, 60 Crossbowmen
- 100 pop, versatile and mobile

### 2. **Archer Mass** (Imperial)
- 120 Arbalester, 30 Skirmishers, 10 Siege
- 160 pop, long-range dominance

### 3. **Cavalry Heavy** (Late Game)
- 80 Cavalier, 40 Camel Rider, 5 Trebuchet
- 165 pop, mobile and devastating

### 4. **Infantry Flood** (Goths specialty)
- 180 Champions + 20 Halberdiers
- 200 pop, overwhelming numbers

### 5. **Siege Push** (Siege-focused)
- 20 Trebuchet, 40 Knights, 40 Crossbowmen
- 240 pop (need to adjust!) - great for breaking fortifications

---

## Troubleshooting

**Q: My resource bars are red!**
A: You're over budget. Remove some units or increase resource limits.

**Q: I selected Imperial Age but can't see some units**
A: Only 18 units are in the MVP. Full version will have all units.

**Q: The discount isn't showing**
A: Check:
1. Is the civilization bonus active for that unit?
2. Are you in the correct age for the bonus?
3. Some bonuses only apply to specific unit types

**Q: How do I save my composition?**
A: Save/load feature coming in Phase 2. For now, take a screenshot!

---

## Next Steps

1. **Experiment** with different civilizations
2. **Compare** Mayans vs Britons archer strategies
3. **Test** if you can fit 200 Trebuchets (you can't - they're 8 pop each!)
4. **Share** your favorite army compositions

Happy planning! 🏰⚔️
