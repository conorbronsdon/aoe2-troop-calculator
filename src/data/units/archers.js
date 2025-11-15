/**
 * Archer line units
 */
export const archerUnits = [
  // Archer line
  {
    id: 'archer',
    name: 'Archer',
    category: 'Archer',
    age: 'feudal',
    cost: { food: 25, wood: 45, gold: 0, stone: 0 },
    population: 1,
    counters: ['spearman', 'skirmisher'],
    weakTo: ['knight', 'mangonel', 'skirmisher', 'eagle-warrior']
  },
  {
    id: 'crossbowman',
    name: 'Crossbowman',
    category: 'Archer',
    age: 'castle',
    cost: { food: 25, wood: 45, gold: 0, stone: 0 },
    population: 1,
    counters: ['spearman', 'skirmisher'],
    weakTo: ['knight', 'mangonel', 'skirmisher', 'eagle-warrior']
  },
  {
    id: 'arbalester',
    name: 'Arbalester',
    category: 'Archer',
    age: 'imperial',
    cost: { food: 25, wood: 45, gold: 0, stone: 0 },
    population: 1,
    counters: ['spearman', 'infantry'],
    weakTo: ['knight', 'huskarl', 'skirmisher', 'eagle-warrior', 'onager']
  },
  // Skirmisher line
  {
    id: 'skirmisher',
    name: 'Skirmisher',
    category: 'Archer',
    age: 'feudal',
    cost: { food: 25, wood: 35, gold: 0, stone: 0 },
    population: 1,
    counters: ['archer', 'crossbowman'],
    weakTo: ['knight', 'scout', 'mangonel']
  },
  {
    id: 'elite-skirmisher',
    name: 'Elite Skirmisher',
    category: 'Archer',
    age: 'castle',
    cost: { food: 25, wood: 35, gold: 0, stone: 0 },
    population: 1,
    counters: ['archer', 'crossbowman', 'arbalester'],
    weakTo: ['knight', 'cavalier', 'mangonel']
  },
  {
    id: 'imperial-skirmisher',
    name: 'Imperial Skirmisher',
    category: 'Archer',
    age: 'imperial',
    cost: { food: 25, wood: 35, gold: 0, stone: 0 },
    population: 1,
    counters: ['archer', 'crossbowman', 'arbalester', 'hand-cannoneer'],
    weakTo: ['knight', 'cavalier', 'paladin', 'onager']
  },
  // Cavalry Archer line
  {
    id: 'cavalry-archer',
    name: 'Cavalry Archer',
    category: 'Archer',
    age: 'castle',
    cost: { food: 40, wood: 70, gold: 0, stone: 0 },
    population: 1,
    counters: ['spearman', 'skirmisher', 'infantry'],
    weakTo: ['skirmisher', 'camel', 'eagle-warrior']
  },
  {
    id: 'heavy-cavalry-archer',
    name: 'Heavy Cavalry Archer',
    category: 'Archer',
    age: 'imperial',
    cost: { food: 40, wood: 70, gold: 0, stone: 0 },
    population: 1,
    counters: ['spearman', 'infantry', 'siege'],
    weakTo: ['skirmisher', 'camel', 'eagle-warrior', 'huskarl']
  },
  // Hand Cannoneer
  {
    id: 'hand-cannoneer',
    name: 'Hand Cannoneer',
    category: 'Archer',
    age: 'imperial',
    cost: { food: 45, wood: 0, gold: 50, stone: 0 },
    population: 1,
    counters: ['infantry', 'archer', 'spearman'],
    weakTo: ['knight', 'skirmisher', 'onager', 'huskarl']
  },
  // Slinger (Mesoamerican ranged unit)
  {
    id: 'slinger',
    name: 'Slinger',
    category: 'Archer',
    age: 'castle',
    cost: { food: 30, wood: 0, gold: 40, stone: 0 },
    population: 1,
    counters: ['infantry', 'archer'],
    weakTo: ['knight', 'scout', 'eagle-warrior']
  },
  // Genitour line (Berbers and allies)
  {
    id: 'genitour',
    name: 'Genitour',
    category: 'Archer',
    age: 'castle',
    cost: { food: 35, wood: 50, gold: 0, stone: 0 },
    population: 1,
    counters: ['archer', 'cavalry-archer'],
    weakTo: ['knight', 'eagle-warrior', 'huskarl']
  },
  {
    id: 'elite-genitour',
    name: 'Elite Genitour',
    category: 'Archer',
    age: 'imperial',
    cost: { food: 35, wood: 50, gold: 0, stone: 0 },
    population: 1,
    counters: ['archer', 'cavalry-archer', 'hand-cannoneer'],
    weakTo: ['knight', 'eagle-warrior', 'huskarl']
  },
];
