/**
 * Infantry line units
 */
export const infantryUnits = [
  {
    id: 'militiaman',
    name: 'Militia',
    category: 'Infantry',
    age: 'dark',
    cost: { food: 60, wood: 0, gold: 20, stone: 0 },
    population: 1,
    counters: ['archer', 'skirmisher'],
    weakTo: ['knight', 'archer', 'cataphract']
  },
  {
    id: 'longswordsman',
    name: 'Longswordsman',
    category: 'Infantry',
    age: 'castle',
    cost: { food: 60, wood: 0, gold: 20, stone: 0 },
    population: 1,
    counters: ['archer', 'skirmisher', 'eagle-warrior'],
    weakTo: ['knight', 'cataphract', 'jaguar-warrior']
  },
  {
    id: 'champion',
    name: 'Champion',
    category: 'Infantry',
    age: 'imperial',
    cost: { food: 60, wood: 0, gold: 20, stone: 0 },
    population: 1,
    counters: ['archer', 'skirmisher', 'eagle-warrior', 'huskarl'],
    weakTo: ['knight', 'cataphract', 'jaguar-warrior', 'hand-cannoneer']
  },
  {
    id: 'spearman',
    name: 'Spearman',
    category: 'Infantry',
    age: 'feudal',
    cost: { food: 35, wood: 25, gold: 0, stone: 0 },
    population: 1,
    counters: ['knight', 'scout', 'camel'],
    weakTo: ['archer', 'crossbowman', 'cataphract']
  },
  {
    id: 'pikeman',
    name: 'Pikeman',
    category: 'Infantry',
    age: 'castle',
    cost: { food: 35, wood: 25, gold: 0, stone: 0 },
    population: 1,
    counters: ['knight', 'cavalier', 'camel'],
    weakTo: ['archer', 'crossbowman', 'hand-cannoneer', 'cataphract']
  },
  {
    id: 'halberdier',
    name: 'Halberdier',
    category: 'Infantry',
    age: 'imperial',
    cost: { food: 35, wood: 25, gold: 0, stone: 0 },
    population: 1,
    counters: ['knight', 'cavalier', 'paladin', 'war-elephant'],
    weakTo: ['archer', 'hand-cannoneer', 'jaguar-warrior']
  },
];
