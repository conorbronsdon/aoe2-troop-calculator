/**
 * Unique units by civilization
 * Each civilization has one or more unique units
 */
export const uniqueUnits = [
  // Aztecs
  {
    id: 'jaguar-warrior',
    name: 'Jaguar Warrior',
    category: 'Unique',
    civilization: 'aztecs',
    age: 'castle',
    cost: { food: 60, wood: 0, gold: 30, stone: 0 },
    population: 1,
    counters: ['infantry', 'eagle-warrior'],
    weakTo: ['archer', 'cavalry']
  },
  {
    id: 'elite-jaguar-warrior',
    name: 'Elite Jaguar Warrior',
    category: 'Unique',
    civilization: 'aztecs',
    age: 'imperial',
    cost: { food: 60, wood: 0, gold: 30, stone: 0 },
    population: 1,
    counters: ['infantry', 'eagle-warrior', 'huskarl'],
    weakTo: ['archer', 'cavalry']
  },
  // Berbers
  {
    id: 'camel-archer',
    name: 'Camel Archer',
    category: 'Unique',
    civilization: 'berbers',
    age: 'castle',
    cost: { food: 50, wood: 60, gold: 0, stone: 0 },
    population: 1,
    counters: ['cavalry', 'archer'],
    weakTo: ['skirmisher', 'camel']
  },
  {
    id: 'elite-camel-archer',
    name: 'Elite Camel Archer',
    category: 'Unique',
    civilization: 'berbers',
    age: 'imperial',
    cost: { food: 50, wood: 60, gold: 0, stone: 0 },
    population: 1,
    counters: ['cavalry', 'archer', 'knight'],
    weakTo: ['skirmisher', 'elite-skirmisher']
  },
  // Britons
  {
    id: 'longbowman',
    name: 'Longbowman',
    category: 'Unique',
    civilization: 'britons',
    age: 'castle',
    cost: { food: 35, wood: 40, gold: 0, stone: 0 },
    population: 1,
    counters: ['infantry', 'archer'],
    weakTo: ['knight', 'skirmisher', 'huskarl']
  },
  {
    id: 'elite-longbowman',
    name: 'Elite Longbowman',
    category: 'Unique',
    civilization: 'britons',
    age: 'imperial',
    cost: { food: 35, wood: 40, gold: 0, stone: 0 },
    population: 1,
    counters: ['infantry', 'archer', 'siege'],
    weakTo: ['knight', 'skirmisher', 'huskarl']
  },
  // Byzantines
  {
    id: 'cataphract',
    name: 'Cataphract',
    category: 'Unique',
    civilization: 'byzantines',
    age: 'castle',
    cost: { food: 70, wood: 0, gold: 75, stone: 0 },
    population: 1,
    counters: ['infantry', 'cavalry'],
    weakTo: ['archer', 'monk']
  },
  {
    id: 'elite-cataphract',
    name: 'Elite Cataphract',
    category: 'Unique',
    civilization: 'byzantines',
    age: 'imperial',
    cost: { food: 70, wood: 0, gold: 75, stone: 0 },
    population: 1,
    counters: ['infantry', 'cavalry', 'camel'],
    weakTo: ['archer', 'monk']
  },
  // Celts
  {
    id: 'woad-raider',
    name: 'Woad Raider',
    category: 'Unique',
    civilization: 'celts',
    age: 'castle',
    cost: { food: 65, wood: 0, gold: 25, stone: 0 },
    population: 1,
    counters: ['siege', 'archer'],
    weakTo: ['cavalry', 'archer', 'cataphract']
  },
  {
    id: 'elite-woad-raider',
    name: 'Elite Woad Raider',
    category: 'Unique',
    civilization: 'celts',
    age: 'imperial',
    cost: { food: 65, wood: 0, gold: 25, stone: 0 },
    population: 1,
    counters: ['siege', 'archer', 'infantry'],
    weakTo: ['cavalry', 'cataphract']
  },
  // Chinese
  {
    id: 'chu-ko-nu',
    name: 'Chu Ko Nu',
    category: 'Unique',
    civilization: 'chinese',
    age: 'castle',
    cost: { food: 40, wood: 35, gold: 0, stone: 0 },
    population: 1,
    counters: ['infantry', 'archer'],
    weakTo: ['skirmisher', 'huskarl', 'siege']
  },
  {
    id: 'elite-chu-ko-nu',
    name: 'Elite Chu Ko Nu',
    category: 'Unique',
    civilization: 'chinese',
    age: 'imperial',
    cost: { food: 40, wood: 35, gold: 0, stone: 0 },
    population: 1,
    counters: ['infantry', 'archer', 'cavalry'],
    weakTo: ['skirmisher', 'huskarl', 'onager']
  },
  // Franks
  {
    id: 'throwing-axeman',
    name: 'Throwing Axeman',
    category: 'Unique',
    civilization: 'franks',
    age: 'castle',
    cost: { food: 55, wood: 0, gold: 25, stone: 0 },
    population: 1,
    counters: ['infantry', 'archer'],
    weakTo: ['cavalry', 'cataphract']
  },
  {
    id: 'elite-throwing-axeman',
    name: 'Elite Throwing Axeman',
    category: 'Unique',
    civilization: 'franks',
    age: 'imperial',
    cost: { food: 55, wood: 0, gold: 25, stone: 0 },
    population: 1,
    counters: ['infantry', 'archer', 'eagle-warrior'],
    weakTo: ['cavalry', 'cataphract']
  },
  // Goths
  {
    id: 'huskarl',
    name: 'Huskarl',
    category: 'Unique',
    civilization: 'goths',
    age: 'castle',
    cost: { food: 52, wood: 0, gold: 26, stone: 0 },
    population: 1,
    counters: ['archer', 'siege'],
    weakTo: ['infantry', 'cavalry', 'cataphract']
  },
  {
    id: 'elite-huskarl',
    name: 'Elite Huskarl',
    category: 'Unique',
    civilization: 'goths',
    age: 'imperial',
    cost: { food: 52, wood: 0, gold: 26, stone: 0 },
    population: 1,
    counters: ['archer', 'siege', 'hand-cannoneer'],
    weakTo: ['infantry', 'cavalry', 'jaguar-warrior']
  },
  // Japanese
  {
    id: 'samurai',
    name: 'Samurai',
    category: 'Unique',
    civilization: 'japanese',
    age: 'castle',
    cost: { food: 60, wood: 0, gold: 30, stone: 0 },
    population: 1,
    counters: ['unique', 'eagle-warrior'],
    weakTo: ['archer', 'cavalry']
  },
  {
    id: 'elite-samurai',
    name: 'Elite Samurai',
    category: 'Unique',
    civilization: 'japanese',
    age: 'imperial',
    cost: { food: 60, wood: 0, gold: 30, stone: 0 },
    population: 1,
    counters: ['unique', 'eagle-warrior', 'huskarl'],
    weakTo: ['archer', 'cavalry']
  },
  // Koreans
  {
    id: 'war-wagon',
    name: 'War Wagon',
    category: 'Unique',
    civilization: 'koreans',
    age: 'castle',
    cost: { food: 110, wood: 60, gold: 0, stone: 0 },
    population: 1,
    counters: ['infantry', 'archer'],
    weakTo: ['monk', 'siege', 'camel']
  },
  {
    id: 'elite-war-wagon',
    name: 'Elite War Wagon',
    category: 'Unique',
    civilization: 'koreans',
    age: 'imperial',
    cost: { food: 110, wood: 60, gold: 0, stone: 0 },
    population: 1,
    counters: ['infantry', 'archer', 'cavalry'],
    weakTo: ['monk', 'siege', 'heavy-camel']
  },
  {
    id: 'turtle-ship',
    name: 'Turtle Ship',
    category: 'Unique',
    civilization: 'koreans',
    age: 'castle',
    cost: { food: 0, wood: 190, gold: 180, stone: 0 },
    population: 1,
    counters: ['ship', 'fire-ship'],
    weakTo: ['demolition-ship', 'cannon-galleon']
  },
  {
    id: 'elite-turtle-ship',
    name: 'Elite Turtle Ship',
    category: 'Unique',
    civilization: 'koreans',
    age: 'imperial',
    cost: { food: 0, wood: 190, gold: 180, stone: 0 },
    population: 1,
    counters: ['ship', 'fire-ship', 'galleon'],
    weakTo: ['heavy-demolition-ship']
  },
  // Mayans
  {
    id: 'plumed-archer',
    name: 'Plumed Archer',
    category: 'Unique',
    civilization: 'mayans',
    age: 'castle',
    cost: { food: 46, wood: 46, gold: 0, stone: 0 },
    population: 1,
    counters: ['infantry', 'monk'],
    weakTo: ['skirmisher', 'cavalry']
  },
  {
    id: 'elite-plumed-archer',
    name: 'Elite Plumed Archer',
    category: 'Unique',
    civilization: 'mayans',
    age: 'imperial',
    cost: { food: 46, wood: 46, gold: 0, stone: 0 },
    population: 1,
    counters: ['infantry', 'monk', 'siege'],
    weakTo: ['skirmisher', 'cavalry', 'eagle-warrior']
  },
  // Mongols
  {
    id: 'mangudai',
    name: 'Mangudai',
    category: 'Unique',
    civilization: 'mongols',
    age: 'castle',
    cost: { food: 55, wood: 65, gold: 0, stone: 0 },
    population: 1,
    counters: ['siege', 'archer'],
    weakTo: ['skirmisher', 'camel']
  },
  {
    id: 'elite-mangudai',
    name: 'Elite Mangudai',
    category: 'Unique',
    civilization: 'mongols',
    age: 'imperial',
    cost: { food: 55, wood: 65, gold: 0, stone: 0 },
    population: 1,
    counters: ['siege', 'archer', 'infantry'],
    weakTo: ['skirmisher', 'camel', 'huskarl']
  },
  // Persians
  {
    id: 'war-elephant',
    name: 'War Elephant',
    category: 'Unique',
    civilization: 'persians',
    age: 'castle',
    cost: { food: 200, wood: 0, gold: 75, stone: 0 },
    population: 1,
    counters: ['infantry', 'cavalry', 'building'],
    weakTo: ['monk', 'halberdier', 'camel']
  },
  {
    id: 'elite-war-elephant',
    name: 'Elite War Elephant',
    category: 'Unique',
    civilization: 'persians',
    age: 'imperial',
    cost: { food: 200, wood: 0, gold: 75, stone: 0 },
    population: 1,
    counters: ['infantry', 'cavalry', 'building', 'siege'],
    weakTo: ['monk', 'halberdier', 'heavy-camel']
  },
  // Saracens
  {
    id: 'mameluke',
    name: 'Mameluke',
    category: 'Unique',
    civilization: 'saracens',
    age: 'castle',
    cost: { food: 55, wood: 0, gold: 85, stone: 0 },
    population: 1,
    counters: ['cavalry', 'camel'],
    weakTo: ['archer', 'infantry']
  },
  {
    id: 'elite-mameluke',
    name: 'Elite Mameluke',
    category: 'Unique',
    civilization: 'saracens',
    age: 'imperial',
    cost: { food: 55, wood: 0, gold: 85, stone: 0 },
    population: 1,
    counters: ['cavalry', 'camel', 'war-elephant'],
    weakTo: ['archer', 'infantry', 'eagle-warrior']
  },
  // Teutons
  {
    id: 'teutonic-knight',
    name: 'Teutonic Knight',
    category: 'Unique',
    civilization: 'teutons',
    age: 'castle',
    cost: { food: 85, wood: 0, gold: 40, stone: 0 },
    population: 1,
    counters: ['infantry', 'cavalry'],
    weakTo: ['archer', 'cavalry']
  },
  {
    id: 'elite-teutonic-knight',
    name: 'Elite Teutonic Knight',
    category: 'Unique',
    civilization: 'teutons',
    age: 'imperial',
    cost: { food: 85, wood: 0, gold: 40, stone: 0 },
    population: 1,
    counters: ['infantry', 'cavalry', 'eagle-warrior'],
    weakTo: ['archer', 'cavalry', 'scorpion']
  },
  // Turks
  {
    id: 'janissary',
    name: 'Janissary',
    category: 'Unique',
    civilization: 'turks',
    age: 'castle',
    cost: { food: 60, wood: 0, gold: 55, stone: 0 },
    population: 1,
    counters: ['infantry', 'ram'],
    weakTo: ['cavalry', 'skirmisher']
  },
  {
    id: 'elite-janissary',
    name: 'Elite Janissary',
    category: 'Unique',
    civilization: 'turks',
    age: 'imperial',
    cost: { food: 60, wood: 0, gold: 55, stone: 0 },
    population: 1,
    counters: ['infantry', 'ram', 'huskarl'],
    weakTo: ['cavalry', 'skirmisher']
  },
  // Vikings
  {
    id: 'berserk',
    name: 'Berserk',
    category: 'Unique',
    civilization: 'vikings',
    age: 'castle',
    cost: { food: 65, wood: 0, gold: 25, stone: 0 },
    population: 1,
    counters: ['infantry', 'eagle-warrior'],
    weakTo: ['archer', 'cavalry', 'cataphract']
  },
  {
    id: 'elite-berserk',
    name: 'Elite Berserk',
    category: 'Unique',
    civilization: 'vikings',
    age: 'imperial',
    cost: { food: 65, wood: 0, gold: 25, stone: 0 },
    population: 1,
    counters: ['infantry', 'eagle-warrior', 'cavalry'],
    weakTo: ['archer', 'cataphract']
  },
  {
    id: 'longboat',
    name: 'Longboat',
    category: 'Unique',
    civilization: 'vikings',
    age: 'castle',
    cost: { food: 0, wood: 100, gold: 50, stone: 0 },
    population: 1,
    counters: ['ship', 'transport'],
    weakTo: ['fire-ship', 'demolition-ship']
  },
  {
    id: 'elite-longboat',
    name: 'Elite Longboat',
    category: 'Unique',
    civilization: 'vikings',
    age: 'imperial',
    cost: { food: 0, wood: 100, gold: 50, stone: 0 },
    population: 1,
    counters: ['ship', 'transport', 'galleon'],
    weakTo: ['fast-fire-ship', 'heavy-demolition-ship']
  },
  // Spanish
  {
    id: 'conquistador',
    name: 'Conquistador',
    category: 'Unique',
    civilization: 'spanish',
    age: 'castle',
    cost: { food: 60, wood: 0, gold: 70, stone: 0 },
    population: 1,
    counters: ['infantry', 'archer'],
    weakTo: ['skirmisher', 'camel']
  },
  {
    id: 'elite-conquistador',
    name: 'Elite Conquistador',
    category: 'Unique',
    civilization: 'spanish',
    age: 'imperial',
    cost: { food: 60, wood: 0, gold: 70, stone: 0 },
    population: 1,
    counters: ['infantry', 'archer', 'eagle-warrior'],
    weakTo: ['skirmisher', 'camel', 'huskarl']
  },
  // Incas
  {
    id: 'kamayuk',
    name: 'Kamayuk',
    category: 'Unique',
    civilization: 'incas',
    age: 'castle',
    cost: { food: 60, wood: 0, gold: 30, stone: 0 },
    population: 1,
    counters: ['cavalry', 'eagle-warrior'],
    weakTo: ['archer', 'hand-cannoneer']
  },
  {
    id: 'elite-kamayuk',
    name: 'Elite Kamayuk',
    category: 'Unique',
    civilization: 'incas',
    age: 'imperial',
    cost: { food: 60, wood: 0, gold: 30, stone: 0 },
    population: 1,
    counters: ['cavalry', 'eagle-warrior', 'war-elephant'],
    weakTo: ['archer', 'hand-cannoneer', 'jaguar-warrior']
  },
  // Magyars
  {
    id: 'magyar-huszar',
    name: 'Magyar Huszar',
    category: 'Unique',
    civilization: 'magyars',
    age: 'castle',
    cost: { food: 80, wood: 0, gold: 10, stone: 0 },
    population: 1,
    counters: ['siege', 'archer'],
    weakTo: ['camel', 'halberdier']
  },
  {
    id: 'elite-magyar-huszar',
    name: 'Elite Magyar Huszar',
    category: 'Unique',
    civilization: 'magyars',
    age: 'imperial',
    cost: { food: 80, wood: 0, gold: 10, stone: 0 },
    population: 1,
    counters: ['siege', 'archer', 'monk'],
    weakTo: ['camel', 'halberdier', 'eagle-warrior']
  },
  // Slavs
  {
    id: 'boyar',
    name: 'Boyar',
    category: 'Unique',
    civilization: 'slavs',
    age: 'castle',
    cost: { food: 50, wood: 0, gold: 80, stone: 0 },
    population: 1,
    counters: ['infantry', 'archer'],
    weakTo: ['monk', 'camel']
  },
  {
    id: 'elite-boyar',
    name: 'Elite Boyar',
    category: 'Unique',
    civilization: 'slavs',
    age: 'imperial',
    cost: { food: 50, wood: 0, gold: 80, stone: 0 },
    population: 1,
    counters: ['infantry', 'archer', 'cavalry'],
    weakTo: ['monk', 'heavy-camel']
  },
  // Ethiopians
  {
    id: 'shotel-warrior',
    name: 'Shotel Warrior',
    category: 'Unique',
    civilization: 'ethiopians',
    age: 'castle',
    cost: { food: 50, wood: 0, gold: 35, stone: 0 },
    population: 1,
    counters: ['archer', 'eagle-warrior'],
    weakTo: ['cavalry', 'cataphract']
  },
  {
    id: 'elite-shotel-warrior',
    name: 'Elite Shotel Warrior',
    category: 'Unique',
    civilization: 'ethiopians',
    age: 'imperial',
    cost: { food: 50, wood: 0, gold: 35, stone: 0 },
    population: 1,
    counters: ['archer', 'eagle-warrior', 'infantry'],
    weakTo: ['cavalry', 'cataphract']
  },
  // Malians
  {
    id: 'gbeto',
    name: 'Gbeto',
    category: 'Unique',
    civilization: 'malians',
    age: 'castle',
    cost: { food: 50, wood: 0, gold: 40, stone: 0 },
    population: 1,
    counters: ['archer', 'infantry'],
    weakTo: ['cavalry', 'eagle-warrior']
  },
  {
    id: 'elite-gbeto',
    name: 'Elite Gbeto',
    category: 'Unique',
    civilization: 'malians',
    age: 'imperial',
    cost: { food: 50, wood: 0, gold: 40, stone: 0 },
    population: 1,
    counters: ['archer', 'infantry', 'siege'],
    weakTo: ['cavalry', 'huskarl']
  },
  // Portuguese
  {
    id: 'organ-gun',
    name: 'Organ Gun',
    category: 'Unique',
    civilization: 'portuguese',
    age: 'castle',
    cost: { food: 0, wood: 80, gold: 70, stone: 0 },
    population: 3,
    counters: ['infantry', 'archer'],
    weakTo: ['cavalry', 'siege']
  },
  {
    id: 'elite-organ-gun',
    name: 'Elite Organ Gun',
    category: 'Unique',
    civilization: 'portuguese',
    age: 'imperial',
    cost: { food: 0, wood: 80, gold: 70, stone: 0 },
    population: 3,
    counters: ['infantry', 'archer', 'ram'],
    weakTo: ['cavalry', 'onager']
  },
  // Khmer
  {
    id: 'ballista-elephant',
    name: 'Ballista Elephant',
    category: 'Unique',
    civilization: 'khmer',
    age: 'castle',
    cost: { food: 100, wood: 0, gold: 80, stone: 0 },
    population: 1,
    counters: ['infantry', 'archer', 'building'],
    weakTo: ['monk', 'halberdier', 'camel']
  },
  {
    id: 'elite-ballista-elephant',
    name: 'Elite Ballista Elephant',
    category: 'Unique',
    civilization: 'khmer',
    age: 'imperial',
    cost: { food: 100, wood: 0, gold: 80, stone: 0 },
    population: 1,
    counters: ['infantry', 'archer', 'building', 'cavalry'],
    weakTo: ['monk', 'halberdier', 'heavy-camel']
  },
  // Vietnamese
  {
    id: 'rattan-archer',
    name: 'Rattan Archer',
    category: 'Unique',
    civilization: 'vietnamese',
    age: 'castle',
    cost: { food: 45, wood: 50, gold: 0, stone: 0 },
    population: 1,
    counters: ['infantry', 'cavalry'],
    weakTo: ['scorpion', 'siege']
  },
  {
    id: 'elite-rattan-archer',
    name: 'Elite Rattan Archer',
    category: 'Unique',
    civilization: 'vietnamese',
    age: 'imperial',
    cost: { food: 45, wood: 50, gold: 0, stone: 0 },
    population: 1,
    counters: ['infantry', 'cavalry', 'skirmisher'],
    weakTo: ['scorpion', 'onager']
  },
];
