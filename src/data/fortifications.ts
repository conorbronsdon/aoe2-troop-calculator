/**
 * Fortification structures in Age of Empires II
 * Fortifications are defensive buildings that can be constructed to protect your base
 * Includes walls, gates, towers, and castles
 */
import type { Fortification, Age } from '../types';

export const fortifications: Fortification[] = [
  // Walls - Dark Age
  {
    id: 'palisade-wall',
    name: 'Palisade Wall',
    category: 'Walls',
    age: 'dark',
    cost: { food: 0, wood: 2, gold: 0, stone: 0 },
    population: 0,
    description: 'Basic wooden wall, provides early game defense',
    hp: 250,
  },
  {
    id: 'palisade-gate',
    name: 'Palisade Gate',
    category: 'Walls',
    age: 'dark',
    cost: { food: 0, wood: 30, gold: 0, stone: 0 },
    population: 0,
    description: 'Basic wooden gate, allows passage through palisade walls',
    hp: 250,
  },
  // Walls - Feudal Age
  {
    id: 'stone-wall',
    name: 'Stone Wall',
    category: 'Walls',
    age: 'feudal',
    cost: { food: 0, wood: 0, gold: 0, stone: 5 },
    population: 0,
    description: 'Strong stone wall, much more durable than palisades',
    hp: 1800,
  },
  {
    id: 'gate',
    name: 'Gate',
    category: 'Walls',
    age: 'feudal',
    cost: { food: 0, wood: 0, gold: 0, stone: 30 },
    population: 0,
    description: 'Stone gate, allows passage through stone walls',
    hp: 2750,
  },
  {
    id: 'fortified-wall',
    name: 'Fortified Wall',
    category: 'Walls',
    age: 'imperial',
    cost: { food: 0, wood: 0, gold: 0, stone: 5 },
    population: 0,
    description: 'Upgraded stone wall with increased durability (requires Masonry)',
    hp: 3000,
  },
  // Towers - Feudal Age
  {
    id: 'outpost',
    name: 'Outpost',
    category: 'Towers',
    age: 'dark',
    cost: { food: 0, wood: 25, gold: 0, stone: 5 },
    population: 0,
    description: 'Basic lookout tower, provides line of sight but no attack',
    hp: 500,
    attack: 0,
    range: 8,
  },
  {
    id: 'watch-tower',
    name: 'Watch Tower',
    category: 'Towers',
    age: 'feudal',
    cost: { food: 0, wood: 0, gold: 0, stone: 125 },
    population: 0,
    description: 'Basic defensive tower with arrow attack',
    hp: 700,
    attack: 3,
    range: 7,
  },
  {
    id: 'guard-tower',
    name: 'Guard Tower',
    category: 'Towers',
    age: 'castle',
    cost: { food: 0, wood: 0, gold: 0, stone: 125 },
    population: 0,
    description: 'Upgraded tower with increased range and attack',
    hp: 1020,
    attack: 4,
    range: 8,
  },
  {
    id: 'keep',
    name: 'Keep',
    category: 'Towers',
    age: 'imperial',
    cost: { food: 0, wood: 0, gold: 0, stone: 125 },
    population: 0,
    description: 'Most powerful tower with maximum range and attack',
    hp: 1500,
    attack: 5,
    range: 8,
  },
  {
    id: 'bombard-tower',
    name: 'Bombard Tower',
    category: 'Towers',
    age: 'imperial',
    cost: { food: 0, wood: 0, gold: 125, stone: 100 },
    population: 0,
    description: 'Artillery tower with cannon attack, devastating against units and buildings',
    hp: 1500,
    attack: 40,
    range: 8,
  },
  // Castles - Castle Age
  {
    id: 'castle',
    name: 'Castle',
    category: 'Castles',
    age: 'castle',
    cost: { food: 0, wood: 0, gold: 0, stone: 650 },
    population: 0,
    description: 'Powerful defensive structure that trains unique units and fires multiple arrows',
    hp: 4800,
    attack: 11,
    range: 8,
  },
  // Krepost (Bulgarians unique fortification)
  {
    id: 'krepost',
    name: 'Krepost',
    category: 'Castles',
    age: 'castle',
    cost: { food: 0, wood: 0, gold: 0, stone: 350 },
    population: 0,
    description: 'Bulgarian unique building, smaller castle with reduced stats',
    hp: 2400,
    attack: 6,
    range: 7,
    civilization: 'bulgarians',
  },
  // Donjon (Sicilians unique fortification)
  {
    id: 'donjon',
    name: 'Donjon',
    category: 'Castles',
    age: 'feudal',
    cost: { food: 0, wood: 0, gold: 0, stone: 75 },
    population: 0,
    description:
      'Sicilian unique building, can train Serjeants and provides defensive capabilities',
    hp: 2400,
    attack: 5,
    range: 7,
    civilization: 'sicilians',
  },
];

/**
 * Get fortifications available for a specific civilization and age
 * @param civId - Civilization identifier
 * @param age - Age identifier
 * @returns Array of fortifications available for that civ in that age
 */
export const getFortificationsForCiv = (civId: string, age: Age): Fortification[] => {
  const ageOrder: Record<Age, number> = { dark: 0, feudal: 1, castle: 2, imperial: 3 };
  const targetAgeValue = ageOrder[age];

  return fortifications.filter((fortification) => {
    // Check age requirement
    if (ageOrder[fortification.age] > targetAgeValue) {
      return false;
    }

    // Check civilization-specific buildings
    if (fortification.civilization && fortification.civilization !== civId) {
      return false;
    }

    return true;
  });
};
