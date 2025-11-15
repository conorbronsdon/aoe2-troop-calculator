/**
 * Naval units
 */
export const navalUnits = [
  // Galley line
  {
    id: 'galley',
    name: 'Galley',
    category: 'Naval',
    age: 'feudal',
    cost: { food: 0, wood: 90, gold: 30, stone: 0 },
    population: 1,
    counters: ['fire-galley', 'demolition-ship', 'transport'],
    weakTo: ['fire-galley', 'demolition-ship']
  },
  {
    id: 'war-galley',
    name: 'War Galley',
    category: 'Naval',
    age: 'castle',
    cost: { food: 0, wood: 90, gold: 30, stone: 0 },
    population: 1,
    counters: ['fire-galley', 'demolition-ship', 'transport'],
    weakTo: ['fire-ship', 'demolition-ship']
  },
  {
    id: 'galleon',
    name: 'Galleon',
    category: 'Naval',
    age: 'imperial',
    cost: { food: 0, wood: 90, gold: 30, stone: 0 },
    population: 1,
    counters: ['fire-ship', 'demolition-ship', 'transport'],
    weakTo: ['fast-fire-ship', 'heavy-demolition-ship']
  },
  // Fire Galley line
  {
    id: 'fire-galley',
    name: 'Fire Galley',
    category: 'Naval',
    age: 'feudal',
    cost: { food: 0, wood: 75, gold: 45, stone: 0 },
    population: 1,
    counters: ['galley', 'war-galley', 'transport'],
    weakTo: ['galley', 'demolition-ship']
  },
  {
    id: 'fire-ship',
    name: 'Fire Ship',
    category: 'Naval',
    age: 'castle',
    cost: { food: 0, wood: 75, gold: 45, stone: 0 },
    population: 1,
    counters: ['galley', 'war-galley', 'galleon', 'transport'],
    weakTo: ['war-galley', 'galleon', 'demolition-ship']
  },
  {
    id: 'fast-fire-ship',
    name: 'Fast Fire Ship',
    category: 'Naval',
    age: 'imperial',
    cost: { food: 0, wood: 75, gold: 45, stone: 0 },
    population: 1,
    counters: ['galleon', 'transport', 'turtle-ship'],
    weakTo: ['galleon', 'heavy-demolition-ship']
  },
  // Demolition Ship line
  {
    id: 'demolition-raft',
    name: 'Demolition Raft',
    category: 'Naval',
    age: 'feudal',
    cost: { food: 0, wood: 70, gold: 50, stone: 0 },
    population: 1,
    counters: ['galley', 'fire-galley', 'building'],
    weakTo: ['galley', 'war-galley']
  },
  {
    id: 'demolition-ship',
    name: 'Demolition Ship',
    category: 'Naval',
    age: 'castle',
    cost: { food: 0, wood: 70, gold: 50, stone: 0 },
    population: 1,
    counters: ['war-galley', 'fire-ship', 'building'],
    weakTo: ['galleon', 'fire-ship']
  },
  {
    id: 'heavy-demolition-ship',
    name: 'Heavy Demolition Ship',
    category: 'Naval',
    age: 'imperial',
    cost: { food: 0, wood: 70, gold: 50, stone: 0 },
    population: 1,
    counters: ['galleon', 'fast-fire-ship', 'building'],
    weakTo: ['galleon', 'fast-fire-ship']
  },
  // Cannon Galleon line
  {
    id: 'cannon-galleon',
    name: 'Cannon Galleon',
    category: 'Naval',
    age: 'imperial',
    cost: { food: 0, wood: 200, gold: 150, stone: 0 },
    population: 3,
    counters: ['building', 'land-units'],
    weakTo: ['galley', 'fire-ship', 'demolition-ship']
  },
  {
    id: 'elite-cannon-galleon',
    name: 'Elite Cannon Galleon',
    category: 'Naval',
    age: 'imperial',
    cost: { food: 0, wood: 200, gold: 150, stone: 0 },
    population: 3,
    counters: ['building', 'land-units', 'ships'],
    weakTo: ['galleon', 'fast-fire-ship', 'heavy-demolition-ship']
  },
  // Transport Ships
  {
    id: 'transport-ship',
    name: 'Transport Ship',
    category: 'Naval',
    age: 'feudal',
    cost: { food: 0, wood: 125, gold: 0, stone: 0 },
    population: 1,
    counters: [],
    weakTo: ['galley', 'fire-galley', 'demolition-ship']
  },
  // Trade Ships
  {
    id: 'trade-cog',
    name: 'Trade Cog',
    category: 'Naval',
    age: 'feudal',
    cost: { food: 0, wood: 100, gold: 50, stone: 0 },
    population: 1,
    counters: [],
    weakTo: ['galley', 'fire-galley']
  },
  // Fishing Ships
  {
    id: 'fishing-ship',
    name: 'Fishing Ship',
    category: 'Naval',
    age: 'dark',
    cost: { food: 0, wood: 75, gold: 0, stone: 0 },
    population: 1,
    counters: [],
    weakTo: ['galley', 'fire-galley']
  },
];
