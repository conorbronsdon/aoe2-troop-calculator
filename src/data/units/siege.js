/**
 * Siege units
 */
export const siegeUnits = [
  {
    id: 'ram',
    name: 'Battering Ram',
    category: 'Siege',
    age: 'castle',
    cost: { food: 0, wood: 160, gold: 75, stone: 0 },
    population: 1,
    counters: ['building'],
    weakTo: ['infantry', 'cavalry']
  },
  {
    id: 'mangonel',
    name: 'Mangonel',
    category: 'Siege',
    age: 'castle',
    cost: { food: 0, wood: 160, gold: 135, stone: 0 },
    population: 3,
    counters: ['archer', 'infantry', 'building'],
    weakTo: ['knight', 'cavalry', 'onager']
  },
  {
    id: 'trebuchet',
    name: 'Trebuchet',
    category: 'Siege',
    age: 'imperial',
    cost: { food: 0, wood: 200, gold: 200, stone: 0 },
    population: 8,
    counters: ['building', 'castle'],
    weakTo: ['knight', 'cavalry', 'bombard-cannon']
  },
];
