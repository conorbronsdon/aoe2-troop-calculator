/**
 * Cavalry line units
 */
export const cavalryUnits = [
  {
    id: 'scout',
    name: 'Scout Cavalry',
    category: 'Cavalry',
    age: 'feudal',
    cost: { food: 80, wood: 0, gold: 0, stone: 0 },
    population: 1,
    counters: ['archer', 'skirmisher', 'monk'],
    weakTo: ['spearman', 'pikeman', 'camel']
  },
  {
    id: 'knight',
    name: 'Knight',
    category: 'Cavalry',
    age: 'castle',
    cost: { food: 60, wood: 0, gold: 75, stone: 0 },
    population: 1,
    counters: ['archer', 'infantry', 'siege'],
    weakTo: ['pikeman', 'halberdier', 'camel', 'monk']
  },
  {
    id: 'cavalier',
    name: 'Cavalier',
    category: 'Cavalry',
    age: 'imperial',
    cost: { food: 60, wood: 0, gold: 75, stone: 0 },
    population: 1,
    counters: ['archer', 'infantry', 'siege'],
    weakTo: ['halberdier', 'camel', 'monk', 'kamayuk']
  },
  {
    id: 'camel',
    name: 'Camel Rider',
    category: 'Cavalry',
    age: 'castle',
    cost: { food: 55, wood: 0, gold: 60, stone: 0 },
    population: 1,
    counters: ['knight', 'cavalier', 'cavalry'],
    weakTo: ['archer', 'infantry', 'monk']
  },
];
