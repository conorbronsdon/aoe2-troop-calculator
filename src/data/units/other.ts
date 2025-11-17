import type { Unit } from '../../types';

/**
 * Other units (Monks, etc.)
 */
export const otherUnits: Unit[] = [
  {
    id: 'monk',
    name: 'Monk',
    category: 'Monk',
    age: 'castle',
    cost: { food: 0, wood: 0, gold: 100, stone: 0 },
    population: 1,
    counters: ['cavalry', 'knight', 'elephant'],
    weakTo: ['archer', 'scout', 'eagle-warrior'],
  },
  {
    id: 'missionary',
    name: 'Missionary',
    category: 'Monk',
    age: 'castle',
    cost: { food: 0, wood: 0, gold: 100, stone: 0 },
    population: 1,
    counters: ['cavalry', 'knight'],
    weakTo: ['archer', 'skirmisher', 'eagle-warrior'],
  },
  // Petard - infantry kamikaze unit
  {
    id: 'petard',
    name: 'Petard',
    category: 'Siege',
    age: 'castle',
    cost: { food: 80, wood: 0, gold: 20, stone: 0 },
    population: 1,
    counters: ['building', 'wall', 'gate'],
    weakTo: ['archer', 'knight', 'cavalry'],
  },
];
