/**
 * Archer line units
 */
export const archerUnits = [
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
];
