/**
 * Technologies and Upgrades for Age of Empires II
 * Based on Age of Empires II: Definitive Edition
 *
 * Structure:
 * - Each technology has an ID, name, category, age requirement, cost, and effects
 * - Effects modify unit stats (attack, armor, HP, speed, etc.)
 * - Prerequisites define which techs must be researched first
 * - affectsUnits defines which unit categories or specific units benefit
 */

/**
 * Technology categories for filtering
 */
export const TECH_CATEGORIES = {
  BLACKSMITH: 'Blacksmith',
  UNIVERSITY: 'University',
  MONASTERY: 'Monastery',
  STABLE: 'Stable',
  ARCHERY_RANGE: 'Archery Range',
  BARRACKS: 'Barracks',
  CASTLE: 'Castle',
  DOCK: 'Dock',
  TOWN_CENTER: 'Town Center',
  UNIQUE: 'Unique Technology',
};

/**
 * Effect types for technologies
 */
export const EFFECT_TYPES = {
  ATTACK: 'attack',
  MELEE_ARMOR: 'meleeArmor',
  PIERCE_ARMOR: 'pierceArmor',
  HP: 'hp',
  RANGE: 'range',
  SPEED: 'speed',
  ACCURACY: 'accuracy',
  LINE_OF_SIGHT: 'lineOfSight',
  ATTACK_SPEED: 'attackSpeed',
  CONVERSION_RESISTANCE: 'conversionResistance',
};

/**
 * All technologies organized by building/category
 */
export const technologies = [
  // ==========================================================================
  // BLACKSMITH - Infantry Attack
  // ==========================================================================
  {
    id: 'forging',
    name: 'Forging',
    category: TECH_CATEGORIES.BLACKSMITH,
    age: 'feudal',
    cost: { food: 150, wood: 0, gold: 0, stone: 0 },
    researchTime: 50,
    prerequisites: [],
    effects: [{ type: EFFECT_TYPES.ATTACK, value: 1, affectsUnits: ['Infantry', 'Cavalry'] }],
    description: '+1 attack for infantry and cavalry',
  },
  {
    id: 'iron-casting',
    name: 'Iron Casting',
    category: TECH_CATEGORIES.BLACKSMITH,
    age: 'castle',
    cost: { food: 220, wood: 0, gold: 120, stone: 0 },
    researchTime: 75,
    prerequisites: ['forging'],
    effects: [{ type: EFFECT_TYPES.ATTACK, value: 1, affectsUnits: ['Infantry', 'Cavalry'] }],
    description: '+1 attack for infantry and cavalry',
  },
  {
    id: 'blast-furnace',
    name: 'Blast Furnace',
    category: TECH_CATEGORIES.BLACKSMITH,
    age: 'imperial',
    cost: { food: 275, wood: 0, gold: 225, stone: 0 },
    researchTime: 100,
    prerequisites: ['iron-casting'],
    effects: [{ type: EFFECT_TYPES.ATTACK, value: 2, affectsUnits: ['Infantry', 'Cavalry'] }],
    description: '+2 attack for infantry and cavalry',
  },

  // ==========================================================================
  // BLACKSMITH - Infantry Armor
  // ==========================================================================
  {
    id: 'scale-mail-armor',
    name: 'Scale Mail Armor',
    category: TECH_CATEGORIES.BLACKSMITH,
    age: 'feudal',
    cost: { food: 100, wood: 0, gold: 0, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [
      { type: EFFECT_TYPES.MELEE_ARMOR, value: 1, affectsUnits: ['Infantry'] },
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 1, affectsUnits: ['Infantry'] },
    ],
    description: '+1/+1 armor for infantry',
  },
  {
    id: 'chain-mail-armor',
    name: 'Chain Mail Armor',
    category: TECH_CATEGORIES.BLACKSMITH,
    age: 'castle',
    cost: { food: 200, wood: 0, gold: 100, stone: 0 },
    researchTime: 55,
    prerequisites: ['scale-mail-armor'],
    effects: [
      { type: EFFECT_TYPES.MELEE_ARMOR, value: 1, affectsUnits: ['Infantry'] },
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 1, affectsUnits: ['Infantry'] },
    ],
    description: '+1/+1 armor for infantry',
  },
  {
    id: 'plate-mail-armor',
    name: 'Plate Mail Armor',
    category: TECH_CATEGORIES.BLACKSMITH,
    age: 'imperial',
    cost: { food: 300, wood: 0, gold: 150, stone: 0 },
    researchTime: 70,
    prerequisites: ['chain-mail-armor'],
    effects: [
      { type: EFFECT_TYPES.MELEE_ARMOR, value: 1, affectsUnits: ['Infantry'] },
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 2, affectsUnits: ['Infantry'] },
    ],
    description: '+1/+2 armor for infantry',
  },

  // ==========================================================================
  // BLACKSMITH - Cavalry Armor
  // ==========================================================================
  {
    id: 'scale-barding-armor',
    name: 'Scale Barding Armor',
    category: TECH_CATEGORIES.BLACKSMITH,
    age: 'feudal',
    cost: { food: 150, wood: 0, gold: 0, stone: 0 },
    researchTime: 45,
    prerequisites: [],
    effects: [
      { type: EFFECT_TYPES.MELEE_ARMOR, value: 1, affectsUnits: ['Cavalry'] },
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 1, affectsUnits: ['Cavalry'] },
    ],
    description: '+1/+1 armor for cavalry',
  },
  {
    id: 'chain-barding-armor',
    name: 'Chain Barding Armor',
    category: TECH_CATEGORIES.BLACKSMITH,
    age: 'castle',
    cost: { food: 250, wood: 0, gold: 150, stone: 0 },
    researchTime: 60,
    prerequisites: ['scale-barding-armor'],
    effects: [
      { type: EFFECT_TYPES.MELEE_ARMOR, value: 1, affectsUnits: ['Cavalry'] },
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 1, affectsUnits: ['Cavalry'] },
    ],
    description: '+1/+1 armor for cavalry',
  },
  {
    id: 'plate-barding-armor',
    name: 'Plate Barding Armor',
    category: TECH_CATEGORIES.BLACKSMITH,
    age: 'imperial',
    cost: { food: 350, wood: 0, gold: 200, stone: 0 },
    researchTime: 75,
    prerequisites: ['chain-barding-armor'],
    effects: [
      { type: EFFECT_TYPES.MELEE_ARMOR, value: 1, affectsUnits: ['Cavalry'] },
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 2, affectsUnits: ['Cavalry'] },
    ],
    description: '+1/+2 armor for cavalry',
  },

  // ==========================================================================
  // BLACKSMITH - Archer Attack
  // ==========================================================================
  {
    id: 'fletching',
    name: 'Fletching',
    category: TECH_CATEGORIES.BLACKSMITH,
    age: 'feudal',
    cost: { food: 100, wood: 0, gold: 50, stone: 0 },
    researchTime: 30,
    prerequisites: [],
    effects: [
      { type: EFFECT_TYPES.ATTACK, value: 1, affectsUnits: ['Archer', 'Siege'] },
      { type: EFFECT_TYPES.RANGE, value: 1, affectsUnits: ['Archer', 'Siege'] },
    ],
    description: '+1 attack and +1 range for archers and siege',
  },
  {
    id: 'bodkin-arrow',
    name: 'Bodkin Arrow',
    category: TECH_CATEGORIES.BLACKSMITH,
    age: 'castle',
    cost: { food: 200, wood: 0, gold: 100, stone: 0 },
    researchTime: 50,
    prerequisites: ['fletching'],
    effects: [
      { type: EFFECT_TYPES.ATTACK, value: 1, affectsUnits: ['Archer', 'Siege'] },
      { type: EFFECT_TYPES.RANGE, value: 1, affectsUnits: ['Archer', 'Siege'] },
    ],
    description: '+1 attack and +1 range for archers and siege',
  },
  {
    id: 'bracer',
    name: 'Bracer',
    category: TECH_CATEGORIES.BLACKSMITH,
    age: 'imperial',
    cost: { food: 300, wood: 0, gold: 150, stone: 0 },
    researchTime: 70,
    prerequisites: ['bodkin-arrow'],
    effects: [
      { type: EFFECT_TYPES.ATTACK, value: 1, affectsUnits: ['Archer', 'Siege'] },
      { type: EFFECT_TYPES.RANGE, value: 1, affectsUnits: ['Archer', 'Siege'] },
    ],
    description: '+1 attack and +1 range for archers and siege',
  },

  // ==========================================================================
  // BLACKSMITH - Archer Armor
  // ==========================================================================
  {
    id: 'padded-archer-armor',
    name: 'Padded Archer Armor',
    category: TECH_CATEGORIES.BLACKSMITH,
    age: 'feudal',
    cost: { food: 100, wood: 0, gold: 0, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [
      { type: EFFECT_TYPES.MELEE_ARMOR, value: 1, affectsUnits: ['Archer'] },
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 1, affectsUnits: ['Archer'] },
    ],
    description: '+1/+1 armor for archers',
  },
  {
    id: 'leather-archer-armor',
    name: 'Leather Archer Armor',
    category: TECH_CATEGORIES.BLACKSMITH,
    age: 'castle',
    cost: { food: 150, wood: 0, gold: 150, stone: 0 },
    researchTime: 55,
    prerequisites: ['padded-archer-armor'],
    effects: [
      { type: EFFECT_TYPES.MELEE_ARMOR, value: 1, affectsUnits: ['Archer'] },
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 1, affectsUnits: ['Archer'] },
    ],
    description: '+1/+1 armor for archers',
  },
  {
    id: 'ring-archer-armor',
    name: 'Ring Archer Armor',
    category: TECH_CATEGORIES.BLACKSMITH,
    age: 'imperial',
    cost: { food: 250, wood: 0, gold: 250, stone: 0 },
    researchTime: 70,
    prerequisites: ['leather-archer-armor'],
    effects: [
      { type: EFFECT_TYPES.MELEE_ARMOR, value: 1, affectsUnits: ['Archer'] },
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 2, affectsUnits: ['Archer'] },
    ],
    description: '+1/+2 armor for archers',
  },

  // ==========================================================================
  // STABLE
  // ==========================================================================
  {
    id: 'bloodlines',
    name: 'Bloodlines',
    category: TECH_CATEGORIES.STABLE,
    age: 'feudal',
    cost: { food: 150, wood: 0, gold: 100, stone: 0 },
    researchTime: 50,
    prerequisites: [],
    effects: [{ type: EFFECT_TYPES.HP, value: 20, affectsUnits: ['Cavalry'] }],
    description: '+20 HP for cavalry',
  },
  {
    id: 'husbandry',
    name: 'Husbandry',
    category: TECH_CATEGORIES.STABLE,
    age: 'castle',
    cost: { food: 150, wood: 0, gold: 0, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [{ type: EFFECT_TYPES.SPEED, value: 0.1, affectsUnits: ['Cavalry'] }],
    description: '+10% speed for cavalry',
  },

  // ==========================================================================
  // ARCHERY RANGE
  // ==========================================================================
  {
    id: 'thumb-ring',
    name: 'Thumb Ring',
    category: TECH_CATEGORIES.ARCHERY_RANGE,
    age: 'castle',
    cost: { food: 300, wood: 250, gold: 0, stone: 0 },
    researchTime: 45,
    prerequisites: [],
    effects: [
      { type: EFFECT_TYPES.ACCURACY, value: 100, affectsUnits: ['Archer'] },
      { type: EFFECT_TYPES.ATTACK_SPEED, value: 0.18, affectsUnits: ['Archer'] },
    ],
    description: '100% accuracy and +18% attack speed for archers',
  },
  {
    id: 'parthian-tactics',
    name: 'Parthian Tactics',
    category: TECH_CATEGORIES.ARCHERY_RANGE,
    age: 'imperial',
    cost: { food: 200, wood: 0, gold: 250, stone: 0 },
    researchTime: 65,
    prerequisites: [],
    effects: [
      {
        type: EFFECT_TYPES.MELEE_ARMOR,
        value: 1,
        affectsUnits: ['cavalry-archer', 'heavy-cavalry-archer'],
      },
      {
        type: EFFECT_TYPES.PIERCE_ARMOR,
        value: 2,
        affectsUnits: ['cavalry-archer', 'heavy-cavalry-archer'],
      },
      {
        type: EFFECT_TYPES.ATTACK,
        value: 2,
        affectsUnits: ['cavalry-archer', 'heavy-cavalry-archer'],
      },
    ],
    description: '+1/+2 armor and +2 attack vs spearmen for cavalry archers',
  },

  // ==========================================================================
  // UNIVERSITY
  // ==========================================================================
  {
    id: 'ballistics',
    name: 'Ballistics',
    category: TECH_CATEGORIES.UNIVERSITY,
    age: 'castle',
    cost: { food: 0, wood: 300, gold: 175, stone: 0 },
    researchTime: 60,
    prerequisites: [],
    effects: [{ type: EFFECT_TYPES.ACCURACY, value: 100, affectsUnits: ['Archer', 'Siege'] }],
    description: 'Ranged units hit moving targets',
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    category: TECH_CATEGORIES.UNIVERSITY,
    age: 'imperial',
    cost: { food: 300, wood: 0, gold: 200, stone: 0 },
    researchTime: 100,
    prerequisites: [],
    effects: [{ type: EFFECT_TYPES.ATTACK, value: 1, affectsUnits: ['Archer', 'Siege'] }],
    description: '+1 attack for ranged units and enables gunpowder units',
  },
  {
    id: 'siege-engineers',
    name: 'Siege Engineers',
    category: TECH_CATEGORIES.UNIVERSITY,
    age: 'imperial',
    cost: { food: 500, wood: 600, gold: 0, stone: 0 },
    researchTime: 45,
    prerequisites: [],
    effects: [
      { type: EFFECT_TYPES.RANGE, value: 1, affectsUnits: ['Siege'] },
      { type: EFFECT_TYPES.ATTACK, value: 20, affectsUnits: ['Siege'] }, // +20% vs buildings
    ],
    description: '+1 range for siege, +20% attack vs buildings',
  },

  // ==========================================================================
  // BARRACKS
  // ==========================================================================
  {
    id: 'squires',
    name: 'Squires',
    category: TECH_CATEGORIES.BARRACKS,
    age: 'castle',
    cost: { food: 100, wood: 0, gold: 0, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [{ type: EFFECT_TYPES.SPEED, value: 0.1, affectsUnits: ['Infantry'] }],
    description: '+10% speed for infantry',
  },
  {
    id: 'arson',
    name: 'Arson',
    category: TECH_CATEGORIES.BARRACKS,
    age: 'castle',
    cost: { food: 150, wood: 0, gold: 50, stone: 0 },
    researchTime: 25,
    prerequisites: [],
    effects: [
      { type: EFFECT_TYPES.ATTACK, value: 2, affectsUnits: ['Infantry'] }, // vs buildings
    ],
    description: '+2 attack vs buildings for infantry',
  },

  // ==========================================================================
  // CASTLE - Common Unique Technologies (examples)
  // ==========================================================================
  {
    id: 'conscription',
    name: 'Conscription',
    category: TECH_CATEGORIES.CASTLE,
    age: 'imperial',
    cost: { food: 150, wood: 0, gold: 150, stone: 0 },
    researchTime: 60,
    prerequisites: [],
    effects: [],
    description: 'Military units created 33% faster',
  },

  // ==========================================================================
  // MONASTERY
  // ==========================================================================
  {
    id: 'redemption',
    name: 'Redemption',
    category: TECH_CATEGORIES.MONASTERY,
    age: 'castle',
    cost: { food: 0, wood: 475, gold: 0, stone: 0 },
    researchTime: 50,
    prerequisites: [],
    effects: [],
    description: 'Monks can convert buildings and siege weapons',
  },
  {
    id: 'atonement',
    name: 'Atonement',
    category: TECH_CATEGORIES.MONASTERY,
    age: 'castle',
    cost: { food: 0, wood: 0, gold: 500, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [],
    description: 'Monks can convert other monks',
  },
  {
    id: 'sanctity',
    name: 'Sanctity',
    category: TECH_CATEGORIES.MONASTERY,
    age: 'castle',
    cost: { food: 0, wood: 0, gold: 120, stone: 0 },
    researchTime: 60,
    prerequisites: [],
    effects: [{ type: EFFECT_TYPES.HP, value: 15, affectsUnits: ['Monk'] }],
    description: '+15 HP for monks',
  },
  {
    id: 'fervor',
    name: 'Fervor',
    category: TECH_CATEGORIES.MONASTERY,
    age: 'castle',
    cost: { food: 0, wood: 0, gold: 140, stone: 0 },
    researchTime: 50,
    prerequisites: [],
    effects: [{ type: EFFECT_TYPES.SPEED, value: 0.15, affectsUnits: ['Monk'] }],
    description: '+15% speed for monks',
  },
  {
    id: 'faith',
    name: 'Faith',
    category: TECH_CATEGORIES.MONASTERY,
    age: 'imperial',
    cost: { food: 0, wood: 0, gold: 750, stone: 0 },
    researchTime: 60,
    prerequisites: [],
    effects: [{ type: EFFECT_TYPES.CONVERSION_RESISTANCE, value: 50, affectsUnits: ['all'] }],
    description: 'Units resist conversion',
  },

  // ==========================================================================
  // TOWN CENTER - Economic (relevant to army planning)
  // ==========================================================================
  {
    id: 'loom',
    name: 'Loom',
    category: TECH_CATEGORIES.TOWN_CENTER,
    age: 'dark',
    cost: { food: 0, wood: 0, gold: 50, stone: 0 },
    researchTime: 25,
    prerequisites: [],
    effects: [],
    description: '+15 HP and +1/+2 armor for villagers',
  },

  // ==========================================================================
  // UNIQUE TECHNOLOGIES - Civilization Specific
  // Each civilization has two unique techs: Castle Age and Imperial Age
  // ==========================================================================

  // AZTECS
  {
    id: 'atlatl',
    name: 'Atlatl',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 400, wood: 0, gold: 350, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [
      { type: EFFECT_TYPES.ATTACK, value: 1, affectsUnits: ['skirmisher', 'elite-skirmisher'] },
      { type: EFFECT_TYPES.RANGE, value: 1, affectsUnits: ['skirmisher', 'elite-skirmisher'] },
    ],
    description: '+1 attack and +1 range for Skirmishers',
    civilization: 'aztecs',
  },
  {
    id: 'garland-wars',
    name: 'Garland Wars',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 450, wood: 0, gold: 750, stone: 0 },
    researchTime: 60,
    prerequisites: ['atlatl'],
    effects: [{ type: EFFECT_TYPES.ATTACK, value: 4, affectsUnits: ['Infantry'] }],
    description: '+4 attack for infantry',
    civilization: 'aztecs',
  },

  // BERBERS
  {
    id: 'kasbah',
    name: 'Kasbah',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 250, wood: 0, gold: 250, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [],
    description: 'Castles work 25% faster',
    civilization: 'berbers',
  },
  {
    id: 'maghrebi-camels',
    name: 'Maghrebi Camels',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 700, wood: 0, gold: 300, stone: 0 },
    researchTime: 60,
    prerequisites: ['kasbah'],
    effects: [],
    description: 'Camel units regenerate 15 HP per minute',
    civilization: 'berbers',
  },

  // BRITONS
  {
    id: 'yeomen',
    name: 'Yeomen',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 750, wood: 0, gold: 450, stone: 0 },
    researchTime: 60,
    prerequisites: [],
    effects: [
      { type: EFFECT_TYPES.RANGE, value: 1, affectsUnits: ['archer', 'crossbowman', 'arbalester', 'longbowman', 'elite-longbowman'] },
    ],
    description: '+1 range for foot archers, +2 attack for towers',
    civilization: 'britons',
  },
  {
    id: 'warwolf',
    name: 'Warwolf',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 500, wood: 0, gold: 250, stone: 0 },
    researchTime: 40,
    prerequisites: ['yeomen'],
    effects: [{ type: EFFECT_TYPES.ATTACK, value: 15, affectsUnits: ['trebuchet'] }],
    description: 'Trebuchets do blast damage',
    civilization: 'britons',
  },

  // BULGARIANS
  {
    id: 'stirrups',
    name: 'Stirrups',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 400, wood: 0, gold: 200, stone: 0 },
    researchTime: 45,
    prerequisites: [],
    effects: [{ type: EFFECT_TYPES.ATTACK_SPEED, value: 0.33, affectsUnits: ['Cavalry'] }],
    description: 'Cavalry attacks 33% faster',
    civilization: 'bulgarians',
  },
  {
    id: 'bagains',
    name: 'Bagains',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 900, wood: 0, gold: 450, stone: 0 },
    researchTime: 40,
    prerequisites: ['stirrups'],
    effects: [{ type: EFFECT_TYPES.MELEE_ARMOR, value: 5, affectsUnits: ['two-handed-swordsman', 'champion'] }],
    description: '+5 melee armor for Two-Handed Swordsman and Champion',
    civilization: 'bulgarians',
  },

  // BURGUNDIANS
  {
    id: 'burgundian-vineyards',
    name: 'Burgundian Vineyards',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 400, wood: 0, gold: 300, stone: 0 },
    researchTime: 45,
    prerequisites: [],
    effects: [],
    description: 'Convert food into gold at 2:1 ratio',
    civilization: 'burgundians',
  },
  {
    id: 'flemish-revolution',
    name: 'Flemish Revolution',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 1200, wood: 0, gold: 650, stone: 0 },
    researchTime: 15,
    prerequisites: ['burgundian-vineyards'],
    effects: [],
    description: 'All existing villagers become Flemish Militia',
    civilization: 'burgundians',
  },

  // BURMESE
  {
    id: 'howdah',
    name: 'Howdah',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 400, wood: 0, gold: 300, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [
      { type: EFFECT_TYPES.MELEE_ARMOR, value: 1, affectsUnits: ['battle-elephant', 'elite-battle-elephant'] },
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 1, affectsUnits: ['battle-elephant', 'elite-battle-elephant'] },
    ],
    description: '+1/+1 armor for Battle Elephants',
    civilization: 'burmese',
  },
  {
    id: 'manipur-cavalry',
    name: 'Manipur Cavalry',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 650, wood: 0, gold: 400, stone: 0 },
    researchTime: 40,
    prerequisites: ['howdah'],
    effects: [{ type: EFFECT_TYPES.ATTACK, value: 3, affectsUnits: ['Cavalry', 'arambai', 'elite-arambai'] }],
    description: '+3 attack vs buildings for cavalry and Arambai',
    civilization: 'burmese',
  },

  // BYZANTINES
  {
    id: 'greek-fire',
    name: 'Greek Fire',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 250, wood: 0, gold: 300, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [{ type: EFFECT_TYPES.RANGE, value: 1, affectsUnits: ['fire-galley', 'fire-ship', 'fast-fire-ship'] }],
    description: '+1 range for Fire Ships',
    civilization: 'byzantines',
  },
  {
    id: 'logistica',
    name: 'Logistica',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 800, wood: 0, gold: 600, stone: 0 },
    researchTime: 50,
    prerequisites: ['greek-fire'],
    effects: [{ type: EFFECT_TYPES.ATTACK, value: 6, affectsUnits: ['cataphract', 'elite-cataphract'] }],
    description: 'Cataphracts deal trample damage',
    civilization: 'byzantines',
  },

  // CELTS
  {
    id: 'stronghold',
    name: 'Stronghold',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 250, wood: 0, gold: 200, stone: 0 },
    researchTime: 30,
    prerequisites: [],
    effects: [],
    description: 'Castles and towers fire 25% faster',
    civilization: 'celts',
  },
  {
    id: 'furor-celtica',
    name: 'Furor Celtica',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 750, wood: 0, gold: 450, stone: 0 },
    researchTime: 50,
    prerequisites: ['stronghold'],
    effects: [{ type: EFFECT_TYPES.HP, value: 40, affectsUnits: ['Siege'] }],
    description: '+40% HP for siege weapons',
    civilization: 'celts',
  },

  // CHINESE
  {
    id: 'great-wall',
    name: 'Great Wall',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 400, wood: 0, gold: 200, stone: 0 },
    researchTime: 60,
    prerequisites: [],
    effects: [],
    description: 'Walls and towers gain +30% HP',
    civilization: 'chinese',
  },
  {
    id: 'rocketry',
    name: 'Rocketry',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 600, wood: 0, gold: 600, stone: 0 },
    researchTime: 60,
    prerequisites: ['great-wall'],
    effects: [
      { type: EFFECT_TYPES.ATTACK, value: 2, affectsUnits: ['chu-ko-nu', 'elite-chu-ko-nu'] },
      { type: EFFECT_TYPES.ATTACK, value: 4, affectsUnits: ['scorpion', 'heavy-scorpion'] },
    ],
    description: '+2 attack for Chu Ko Nu, +4 for Scorpions',
    civilization: 'chinese',
  },

  // CUMANS
  {
    id: 'steppe-husbandry',
    name: 'Steppe Husbandry',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 200, wood: 0, gold: 300, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [],
    description: 'Stables work 100% faster',
    civilization: 'cumans',
  },
  {
    id: 'cuman-mercenaries',
    name: 'Cuman Mercenaries',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 650, wood: 0, gold: 400, stone: 0 },
    researchTime: 40,
    prerequisites: ['steppe-husbandry'],
    effects: [],
    description: 'Allies can train 10 free Elite Kipchaks',
    civilization: 'cumans',
  },

  // DRAVIDIANS
  {
    id: 'medical-corps',
    name: 'Medical Corps',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 350, wood: 0, gold: 300, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [],
    description: 'Elephant units regenerate 20 HP per minute',
    civilization: 'dravidians',
  },
  {
    id: 'wootz-steel',
    name: 'Wootz Steel',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 800, wood: 0, gold: 400, stone: 0 },
    researchTime: 75,
    prerequisites: ['medical-corps'],
    effects: [],
    description: 'Infantry and cavalry ignore armor',
    civilization: 'dravidians',
  },

  // ETHIOPIANS
  {
    id: 'royal-heirs',
    name: 'Royal Heirs',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 300, wood: 0, gold: 300, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [],
    description: 'Shotel Warriors train nearly instantly',
    civilization: 'ethiopians',
  },
  {
    id: 'torsion-engines',
    name: 'Torsion Engines',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 1000, wood: 0, gold: 600, stone: 0 },
    researchTime: 40,
    prerequisites: ['royal-heirs'],
    effects: [{ type: EFFECT_TYPES.RANGE, value: 0.5, affectsUnits: ['Siege'] }],
    description: 'Siege weapons have increased blast radius',
    civilization: 'ethiopians',
  },

  // FRANKS
  {
    id: 'bearded-axe',
    name: 'Bearded Axe',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 400, wood: 0, gold: 400, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [{ type: EFFECT_TYPES.RANGE, value: 1, affectsUnits: ['throwing-axeman', 'elite-throwing-axeman'] }],
    description: '+1 range for Throwing Axemen',
    civilization: 'franks',
  },
  {
    id: 'chivalry',
    name: 'Chivalry',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 400, wood: 0, gold: 400, stone: 0 },
    researchTime: 40,
    prerequisites: ['bearded-axe'],
    effects: [],
    description: 'Stables work 40% faster',
    civilization: 'franks',
  },

  // GOTHS
  {
    id: 'anarchy',
    name: 'Anarchy',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 450, wood: 0, gold: 250, stone: 0 },
    researchTime: 60,
    prerequisites: [],
    effects: [],
    description: 'Huskarls can be created at Barracks',
    civilization: 'goths',
  },
  {
    id: 'perfusion',
    name: 'Perfusion',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 400, wood: 0, gold: 600, stone: 0 },
    researchTime: 40,
    prerequisites: ['anarchy'],
    effects: [],
    description: 'Barracks work 100% faster',
    civilization: 'goths',
  },

  // GURJARAS
  {
    id: 'kshatriyas',
    name: 'Kshatriyas',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 200, wood: 0, gold: 450, stone: 0 },
    researchTime: 45,
    prerequisites: [],
    effects: [],
    description: 'Military units cost 25% less food',
    civilization: 'gurjaras',
  },
  {
    id: 'frontier-guards',
    name: 'Frontier Guards',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 800, wood: 0, gold: 400, stone: 0 },
    researchTime: 50,
    prerequisites: ['kshatriyas'],
    effects: [{ type: EFFECT_TYPES.MELEE_ARMOR, value: 4, affectsUnits: ['camel', 'heavy-camel', 'imperial-camel'] }],
    description: '+4 melee armor for camel units',
    civilization: 'gurjaras',
  },

  // HINDUSTANIS
  {
    id: 'grand-trunk-road',
    name: 'Grand Trunk Road',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 200, wood: 0, gold: 300, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [],
    description: 'All gold income +10%',
    civilization: 'hindustanis',
  },
  {
    id: 'shatagni',
    name: 'Shatagni',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 500, wood: 0, gold: 300, stone: 0 },
    researchTime: 45,
    prerequisites: ['grand-trunk-road'],
    effects: [{ type: EFFECT_TYPES.RANGE, value: 2, affectsUnits: ['hand-cannoneer'] }],
    description: '+2 range for Hand Cannoneers',
    civilization: 'hindustanis',
  },

  // HUNS
  {
    id: 'marauders',
    name: 'Marauders',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 300, wood: 0, gold: 200, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [],
    description: 'Tarkans can be created at Stables',
    civilization: 'huns',
  },
  {
    id: 'atheism',
    name: 'Atheism',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 500, wood: 0, gold: 500, stone: 0 },
    researchTime: 60,
    prerequisites: ['marauders'],
    effects: [],
    description: '+100 years to Relic/Wonder victories, Spies cost halved',
    civilization: 'huns',
  },

  // INCAS
  {
    id: 'andean-sling',
    name: 'Andean Sling',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 200, wood: 0, gold: 300, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [],
    description: 'Skirmishers and Slingers have no minimum range',
    civilization: 'incas',
  },
  {
    id: 'fabric-shields',
    name: 'Fabric Shields',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 600, wood: 0, gold: 600, stone: 0 },
    researchTime: 60,
    prerequisites: ['andean-sling'],
    effects: [
      { type: EFFECT_TYPES.MELEE_ARMOR, value: 1, affectsUnits: ['eagle-scout', 'eagle-warrior', 'elite-eagle-warrior', 'kamayuk', 'elite-kamayuk', 'slinger'] },
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 2, affectsUnits: ['eagle-scout', 'eagle-warrior', 'elite-eagle-warrior', 'kamayuk', 'elite-kamayuk', 'slinger'] },
    ],
    description: '+1/+2 armor for Eagles, Kamayuks, and Slingers',
    civilization: 'incas',
  },

  // ITALIANS
  {
    id: 'pavise',
    name: 'Pavise',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 300, wood: 0, gold: 150, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [
      { type: EFFECT_TYPES.MELEE_ARMOR, value: 1, affectsUnits: ['archer', 'crossbowman', 'arbalester', 'genoese-crossbowman', 'elite-genoese-crossbowman'] },
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 1, affectsUnits: ['archer', 'crossbowman', 'arbalester', 'genoese-crossbowman', 'elite-genoese-crossbowman'] },
    ],
    description: '+1/+1 armor for foot archers',
    civilization: 'italians',
  },
  {
    id: 'silk-road',
    name: 'Silk Road',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 500, wood: 0, gold: 250, stone: 0 },
    researchTime: 30,
    prerequisites: ['pavise'],
    effects: [],
    description: 'Trade units cost 50% less',
    civilization: 'italians',
  },

  // JAPANESE
  {
    id: 'yasama',
    name: 'Yasama',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 300, wood: 0, gold: 300, stone: 0 },
    researchTime: 60,
    prerequisites: [],
    effects: [],
    description: 'Towers fire extra arrows',
    civilization: 'japanese',
  },
  {
    id: 'kataparuto',
    name: 'Kataparuto',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 750, wood: 0, gold: 400, stone: 0 },
    researchTime: 60,
    prerequisites: ['yasama'],
    effects: [{ type: EFFECT_TYPES.ATTACK_SPEED, value: 0.33, affectsUnits: ['trebuchet'] }],
    description: 'Trebuchets fire and pack faster',
    civilization: 'japanese',
  },

  // KHMER
  {
    id: 'tusk-swords',
    name: 'Tusk Swords',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 300, wood: 0, gold: 450, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [{ type: EFFECT_TYPES.ATTACK, value: 3, affectsUnits: ['battle-elephant', 'elite-battle-elephant'] }],
    description: '+3 attack for Battle Elephants',
    civilization: 'khmer',
  },
  {
    id: 'double-crossbow',
    name: 'Double Crossbow',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 700, wood: 0, gold: 400, stone: 0 },
    researchTime: 50,
    prerequisites: ['tusk-swords'],
    effects: [],
    description: 'Ballista Elephants and Scorpions fire two projectiles',
    civilization: 'khmer',
  },

  // KOREANS
  {
    id: 'eupseong',
    name: 'Eupseong',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 300, wood: 0, gold: 300, stone: 0 },
    researchTime: 50,
    prerequisites: [],
    effects: [],
    description: 'Watch Towers, Guard Towers, Keeps +2 range',
    civilization: 'koreans',
  },
  {
    id: 'shinkichon',
    name: 'Shinkichon',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 800, wood: 0, gold: 500, stone: 0 },
    researchTime: 60,
    prerequisites: ['eupseong'],
    effects: [{ type: EFFECT_TYPES.RANGE, value: 1, affectsUnits: ['mangonel', 'onager', 'siege-onager'] }],
    description: '+1 range for Mangonels',
    civilization: 'koreans',
  },

  // LITHUANIANS
  {
    id: 'hill-forts',
    name: 'Hill Forts',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 250, wood: 0, gold: 250, stone: 0 },
    researchTime: 30,
    prerequisites: [],
    effects: [],
    description: 'Town Centers +3 range',
    civilization: 'lithuanians',
  },
  {
    id: 'tower-shields',
    name: 'Tower Shields',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 800, wood: 0, gold: 200, stone: 0 },
    researchTime: 60,
    prerequisites: ['hill-forts'],
    effects: [{ type: EFFECT_TYPES.PIERCE_ARMOR, value: 2, affectsUnits: ['spearman', 'pikeman', 'halberdier'] }],
    description: '+2 pierce armor for Spearmen',
    civilization: 'lithuanians',
  },

  // MAGYARS
  {
    id: 'corvinian-army',
    name: 'Corvinian Army',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 200, wood: 0, gold: 300, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [],
    description: 'Magyar Huszars cost no gold',
    civilization: 'magyars',
  },
  {
    id: 'recurve-bow',
    name: 'Recurve Bow',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 600, wood: 0, gold: 400, stone: 0 },
    researchTime: 40,
    prerequisites: ['corvinian-army'],
    effects: [
      { type: EFFECT_TYPES.ATTACK, value: 1, affectsUnits: ['cavalry-archer', 'heavy-cavalry-archer'] },
      { type: EFFECT_TYPES.RANGE, value: 1, affectsUnits: ['cavalry-archer', 'heavy-cavalry-archer'] },
    ],
    description: '+1 attack and +1 range for Cavalry Archers',
    civilization: 'magyars',
  },

  // MALAY
  {
    id: 'thalassocracy',
    name: 'Thalassocracy',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 300, wood: 0, gold: 300, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [],
    description: 'Docks upgraded to Harbors',
    civilization: 'malay',
  },
  {
    id: 'forced-levy',
    name: 'Forced Levy',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 850, wood: 0, gold: 500, stone: 0 },
    researchTime: 40,
    prerequisites: ['thalassocracy'],
    effects: [],
    description: 'Militia line costs no gold',
    civilization: 'malay',
  },

  // MALIANS
  {
    id: 'tigui',
    name: 'Tigui',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 200, wood: 0, gold: 300, stone: 0 },
    researchTime: 30,
    prerequisites: [],
    effects: [],
    description: 'Town Centers fire arrows without garrison',
    civilization: 'malians',
  },
  {
    id: 'farimba',
    name: 'Farimba',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 650, wood: 0, gold: 400, stone: 0 },
    researchTime: 40,
    prerequisites: ['tigui'],
    effects: [{ type: EFFECT_TYPES.ATTACK, value: 5, affectsUnits: ['Cavalry'] }],
    description: '+5 attack for cavalry',
    civilization: 'malians',
  },

  // MAYANS
  {
    id: 'obsidian-arrows',
    name: 'Obsidian Arrows',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 300, wood: 0, gold: 300, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [{ type: EFFECT_TYPES.ATTACK, value: 6, affectsUnits: ['archer', 'crossbowman', 'arbalester'] }],
    description: '+6 attack vs buildings for Archers',
    civilization: 'mayans',
  },
  {
    id: 'el-dorado',
    name: 'El Dorado',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 750, wood: 0, gold: 450, stone: 0 },
    researchTime: 70,
    prerequisites: ['obsidian-arrows'],
    effects: [{ type: EFFECT_TYPES.HP, value: 40, affectsUnits: ['eagle-scout', 'eagle-warrior', 'elite-eagle-warrior'] }],
    description: '+40 HP for Eagle Warriors',
    civilization: 'mayans',
  },

  // MONGOLS
  {
    id: 'nomads',
    name: 'Nomads',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 300, wood: 0, gold: 150, stone: 0 },
    researchTime: 30,
    prerequisites: [],
    effects: [],
    description: 'Houses retain population when destroyed',
    civilization: 'mongols',
  },
  {
    id: 'drill',
    name: 'Drill',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 500, wood: 0, gold: 450, stone: 0 },
    researchTime: 60,
    prerequisites: ['nomads'],
    effects: [{ type: EFFECT_TYPES.SPEED, value: 0.5, affectsUnits: ['Siege'] }],
    description: 'Siege weapons move 50% faster',
    civilization: 'mongols',
  },

  // PERSIANS
  {
    id: 'kamandaran',
    name: 'Kamandaran',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 200, wood: 0, gold: 200, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [],
    description: 'Archers cost wood instead of gold',
    civilization: 'persians',
  },
  {
    id: 'citadels',
    name: 'Citadels',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 400, wood: 0, gold: 350, stone: 0 },
    researchTime: 45,
    prerequisites: ['kamandaran'],
    effects: [],
    description: 'Castles +25% attack vs Rams',
    civilization: 'persians',
  },

  // POLES
  {
    id: 'szlachta-privileges',
    name: 'Szlachta Privileges',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 500, wood: 0, gold: 300, stone: 0 },
    researchTime: 45,
    prerequisites: [],
    effects: [],
    description: 'Knights cost 60% less gold',
    civilization: 'poles',
  },
  {
    id: 'lechitic-legacy',
    name: 'Lechitic Legacy',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 700, wood: 0, gold: 750, stone: 0 },
    researchTime: 40,
    prerequisites: ['szlachta-privileges'],
    effects: [],
    description: 'Light Cavalry +1 attack, Scouts +2 gold when killing villager',
    civilization: 'poles',
  },

  // PORTUGUESE
  {
    id: 'carrack',
    name: 'Carrack',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 200, wood: 0, gold: 300, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [
      { type: EFFECT_TYPES.MELEE_ARMOR, value: 1, affectsUnits: ['galley', 'war-galley', 'galleon', 'fire-galley', 'fire-ship', 'fast-fire-ship', 'demolition-raft', 'demolition-ship', 'heavy-demolition-ship'] },
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 1, affectsUnits: ['galley', 'war-galley', 'galleon', 'fire-galley', 'fire-ship', 'fast-fire-ship', 'demolition-raft', 'demolition-ship', 'heavy-demolition-ship'] },
    ],
    description: '+1/+1 armor for ships',
    civilization: 'portuguese',
  },
  {
    id: 'arquebus',
    name: 'Arquebus',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 700, wood: 0, gold: 400, stone: 0 },
    researchTime: 40,
    prerequisites: ['carrack'],
    effects: [{ type: EFFECT_TYPES.ACCURACY, value: 100, affectsUnits: ['hand-cannoneer', 'bombard-cannon'] }],
    description: 'Gunpowder units are more accurate',
    civilization: 'portuguese',
  },

  // ROMANS
  {
    id: 'ballistas',
    name: 'Ballistas',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 300, wood: 0, gold: 250, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [],
    description: 'Scorpions and Galleys fire faster',
    civilization: 'romans',
  },
  {
    id: 'comitatenses',
    name: 'Comitatenses',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 700, wood: 0, gold: 700, stone: 0 },
    researchTime: 50,
    prerequisites: ['ballistas'],
    effects: [
      { type: EFFECT_TYPES.SPEED, value: 0.15, affectsUnits: ['knight', 'cavalier', 'paladin', 'legionary'] },
      { type: EFFECT_TYPES.ATTACK, value: 2, affectsUnits: ['knight', 'cavalier', 'paladin', 'legionary'] },
    ],
    description: 'Knights and Legionaries charge and deal bonus damage',
    civilization: 'romans',
  },

  // SARACENS
  {
    id: 'bimaristan',
    name: 'Bimaristan',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 0, wood: 0, gold: 350, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [],
    description: 'Monks heal units in an area',
    civilization: 'saracens',
  },
  {
    id: 'counterweights',
    name: 'Counterweights',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 400, wood: 0, gold: 300, stone: 0 },
    researchTime: 45,
    prerequisites: ['bimaristan'],
    effects: [{ type: EFFECT_TYPES.ATTACK, value: 15, affectsUnits: ['trebuchet', 'mangonel', 'onager', 'siege-onager'] }],
    description: '+15% attack for Trebuchets and Mangonels',
    civilization: 'saracens',
  },

  // SICILIANS
  {
    id: 'first-crusade',
    name: 'First Crusade',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 300, wood: 0, gold: 600, stone: 0 },
    researchTime: 35,
    prerequisites: [],
    effects: [],
    description: 'Each TC spawns 7 Serjeants once',
    civilization: 'sicilians',
  },
  {
    id: 'hauberk',
    name: 'Hauberk',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 700, wood: 0, gold: 600, stone: 0 },
    researchTime: 60,
    prerequisites: ['first-crusade'],
    effects: [
      { type: EFFECT_TYPES.MELEE_ARMOR, value: 1, affectsUnits: ['knight', 'cavalier'] },
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 2, affectsUnits: ['knight', 'cavalier'] },
    ],
    description: '+1/+2 armor for Knights',
    civilization: 'sicilians',
  },

  // SLAVS
  {
    id: 'detinets',
    name: 'Detinets',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 200, wood: 0, gold: 200, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [],
    description: 'Castles and towers cost 40% less stone',
    civilization: 'slavs',
  },
  {
    id: 'druzhina',
    name: 'Druzhina',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 1200, wood: 0, gold: 500, stone: 0 },
    researchTime: 40,
    prerequisites: ['detinets'],
    effects: [{ type: EFFECT_TYPES.ATTACK, value: 5, affectsUnits: ['Infantry'] }],
    description: 'Infantry deal trample damage',
    civilization: 'slavs',
  },

  // SPANISH
  {
    id: 'inquisition',
    name: 'Inquisition',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 100, wood: 0, gold: 300, stone: 0 },
    researchTime: 45,
    prerequisites: [],
    effects: [],
    description: 'Monks convert faster',
    civilization: 'spanish',
  },
  {
    id: 'supremacy',
    name: 'Supremacy',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 400, wood: 0, gold: 250, stone: 0 },
    researchTime: 60,
    prerequisites: ['inquisition'],
    effects: [
      { type: EFFECT_TYPES.HP, value: 40, affectsUnits: ['villager'] },
      { type: EFFECT_TYPES.ATTACK, value: 6, affectsUnits: ['villager'] },
      { type: EFFECT_TYPES.MELEE_ARMOR, value: 2, affectsUnits: ['villager'] },
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 2, affectsUnits: ['villager'] },
    ],
    description: 'Villagers have combat stats of Militia',
    civilization: 'spanish',
  },

  // TATARS
  {
    id: 'silk-armor',
    name: 'Silk Armor',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 400, wood: 0, gold: 300, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [
      { type: EFFECT_TYPES.MELEE_ARMOR, value: 1, affectsUnits: ['scout-cavalry', 'light-cavalry', 'hussar', 'steppe-lancer', 'elite-steppe-lancer', 'cavalry-archer', 'heavy-cavalry-archer'] },
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 1, affectsUnits: ['scout-cavalry', 'light-cavalry', 'hussar', 'steppe-lancer', 'elite-steppe-lancer', 'cavalry-archer', 'heavy-cavalry-archer'] },
    ],
    description: '+1/+1 armor for light cavalry and cavalry archers',
    civilization: 'tatars',
  },
  {
    id: 'timurid-siegecraft',
    name: 'Timurid Siegecraft',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 400, wood: 0, gold: 500, stone: 0 },
    researchTime: 50,
    prerequisites: ['silk-armor'],
    effects: [{ type: EFFECT_TYPES.RANGE, value: 2, affectsUnits: ['trebuchet'] }],
    description: '+2 range for Trebuchets',
    civilization: 'tatars',
  },

  // TEUTONS
  {
    id: 'ironclad',
    name: 'Ironclad',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 400, wood: 0, gold: 350, stone: 0 },
    researchTime: 60,
    prerequisites: [],
    effects: [{ type: EFFECT_TYPES.MELEE_ARMOR, value: 4, affectsUnits: ['Siege'] }],
    description: '+4 melee armor for siege weapons',
    civilization: 'teutons',
  },
  {
    id: 'crenellations',
    name: 'Crenellations',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 600, wood: 0, gold: 400, stone: 0 },
    researchTime: 60,
    prerequisites: ['ironclad'],
    effects: [{ type: EFFECT_TYPES.RANGE, value: 3, affectsUnits: ['castle'] }],
    description: 'Castles +3 range, garrisoned infantry fire arrows',
    civilization: 'teutons',
  },

  // TURKS
  {
    id: 'sipahi',
    name: 'Sipahi',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 350, wood: 0, gold: 150, stone: 0 },
    researchTime: 60,
    prerequisites: [],
    effects: [{ type: EFFECT_TYPES.HP, value: 20, affectsUnits: ['cavalry-archer', 'heavy-cavalry-archer'] }],
    description: '+20 HP for Cavalry Archers',
    civilization: 'turks',
  },
  {
    id: 'artillery',
    name: 'Artillery',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 500, wood: 0, gold: 450, stone: 0 },
    researchTime: 40,
    prerequisites: ['sipahi'],
    effects: [{ type: EFFECT_TYPES.RANGE, value: 2, affectsUnits: ['bombard-cannon', 'bombard-tower'] }],
    description: '+2 range for Bombard Cannons and Bombard Towers',
    civilization: 'turks',
  },

  // VIETNAMESE
  {
    id: 'chatras',
    name: 'Chatras',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 250, wood: 0, gold: 250, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [{ type: EFFECT_TYPES.HP, value: 50, affectsUnits: ['battle-elephant', 'elite-battle-elephant'] }],
    description: '+50 HP for Battle Elephants',
    civilization: 'vietnamese',
  },
  {
    id: 'paper-money',
    name: 'Paper Money',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 800, wood: 0, gold: 200, stone: 0 },
    researchTime: 60,
    prerequisites: ['chatras'],
    effects: [],
    description: 'Each player in team receives 500 gold',
    civilization: 'vietnamese',
  },

  // VIKINGS
  {
    id: 'chieftains',
    name: 'Chieftains',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 400, wood: 0, gold: 300, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [{ type: EFFECT_TYPES.ATTACK, value: 5, affectsUnits: ['Infantry'] }],
    description: '+5 attack vs cavalry for infantry',
    civilization: 'vikings',
  },
  {
    id: 'bogsveigar',
    name: 'Bogsveigar',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 750, wood: 0, gold: 450, stone: 0 },
    researchTime: 40,
    prerequisites: ['chieftains'],
    effects: [{ type: EFFECT_TYPES.ATTACK, value: 1, affectsUnits: ['archer', 'crossbowman', 'arbalester'] }],
    description: '+1 attack for foot archers',
    civilization: 'vikings',
  },

  // ARMENIANS
  {
    id: 'cilician-fleet',
    name: 'Cilician Fleet',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 300, wood: 0, gold: 300, stone: 0 },
    researchTime: 45,
    prerequisites: [],
    effects: [],
    description: 'Galleys and Dromons are created with +4 bonus damage vs Galley-line ships',
    civilization: 'armenians',
  },
  {
    id: 'fereters',
    name: 'Fereters',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 900, wood: 0, gold: 500, stone: 0 },
    researchTime: 50,
    prerequisites: ['cilician-fleet'],
    effects: [],
    description: 'Warrior Priests increase nearby units HP regen',
    civilization: 'armenians',
  },

  // BENGALIS
  {
    id: 'paiks',
    name: 'Paiks',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 400, wood: 0, gold: 350, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [],
    description: 'Rathas and Elephant Archers attack 20% faster',
    civilization: 'bengalis',
  },
  {
    id: 'mahayana',
    name: 'Mahayana',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 400, wood: 0, gold: 600, stone: 0 },
    researchTime: 60,
    prerequisites: ['paiks'],
    effects: [],
    description: 'Villagers take 10% less population space',
    civilization: 'bengalis',
  },

  // BOHEMIANS
  {
    id: 'wagenburg-tactics',
    name: 'Wagenburg Tactics',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 300, wood: 0, gold: 300, stone: 0 },
    researchTime: 45,
    prerequisites: [],
    effects: [{ type: EFFECT_TYPES.SPEED, value: 0.15, affectsUnits: ['gunpowder'] }],
    description: 'Gunpowder units move 15% faster',
    civilization: 'bohemians',
  },
  {
    id: 'hussite-reforms',
    name: 'Hussite Reforms',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 800, wood: 0, gold: 450, stone: 0 },
    researchTime: 60,
    prerequisites: ['wagenburg-tactics'],
    effects: [],
    description: 'Monks and Monasteries cost no gold',
    civilization: 'bohemians',
  },

  // GEORGIANS
  {
    id: 'svan-towers',
    name: 'Svan Towers',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 250, wood: 0, gold: 250, stone: 0 },
    researchTime: 35,
    prerequisites: [],
    effects: [],
    description: 'Towers deal pass-through damage',
    civilization: 'georgians',
  },
  {
    id: 'aznauri-cavalry',
    name: 'Aznauri Cavalry',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 650, wood: 0, gold: 550, stone: 0 },
    researchTime: 50,
    prerequisites: ['svan-towers'],
    effects: [],
    description: 'Cavalry units +2 attack',
    civilization: 'georgians',
  },

  // JURCHENS
  {
    id: 'song-husbandry',
    name: 'Song Husbandry',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 200, wood: 0, gold: 300, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [],
    description: 'Cavalry units trained faster',
    civilization: 'jurchens',
  },
  {
    id: 'tiefutu',
    name: 'Tiefutu',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 800, wood: 0, gold: 500, stone: 0 },
    researchTime: 50,
    prerequisites: ['song-husbandry'],
    effects: [{ type: EFFECT_TYPES.MELEE_ARMOR, value: 3, affectsUnits: ['knight', 'cavalier', 'paladin'] }],
    description: '+3 melee armor for cavalry',
    civilization: 'jurchens',
  },

  // KHITANS
  {
    id: 'shamanism',
    name: 'Shamanism',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 300, wood: 0, gold: 200, stone: 0 },
    researchTime: 35,
    prerequisites: [],
    effects: [],
    description: 'Monks convert faster',
    civilization: 'khitans',
  },
  {
    id: 'leather-sinan',
    name: 'Leather Sinan',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 700, wood: 0, gold: 400, stone: 0 },
    researchTime: 45,
    prerequisites: ['shamanism'],
    effects: [{ type: EFFECT_TYPES.PIERCE_ARMOR, value: 3, affectsUnits: ['cavalry-archer', 'heavy-cavalry-archer'] }],
    description: '+3 pierce armor for cavalry archers',
    civilization: 'khitans',
  },

  // SHU
  {
    id: 'burning-oil',
    name: 'Burning Oil',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 350, wood: 0, gold: 250, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [],
    description: 'Scorpions do additional fire damage',
    civilization: 'shu',
  },
  {
    id: 'five-tiger-generals',
    name: 'Five Tiger Generals',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 700, wood: 0, gold: 600, stone: 0 },
    researchTime: 50,
    prerequisites: ['burning-oil'],
    effects: [{ type: EFFECT_TYPES.HP, value: 30, affectsUnits: ['Cavalry'] }],
    description: '+30 HP for cavalry',
    civilization: 'shu',
  },

  // WEI
  {
    id: 'tuntian',
    name: 'Tuntian',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 250, wood: 0, gold: 350, stone: 0 },
    researchTime: 45,
    prerequisites: [],
    effects: [],
    description: 'Farms cost less and villagers carry more',
    civilization: 'wei',
  },
  {
    id: 'wei-martial-order',
    name: 'Wei Martial Order',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 900, wood: 0, gold: 550, stone: 0 },
    researchTime: 55,
    prerequisites: ['tuntian'],
    effects: [{ type: EFFECT_TYPES.ATTACK, value: 3, affectsUnits: ['Infantry'] }],
    description: '+3 attack for infantry',
    civilization: 'wei',
  },

  // WU
  {
    id: 'riverine-navy',
    name: 'Riverine Navy',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'castle',
    cost: { food: 300, wood: 0, gold: 300, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [],
    description: 'Ships built faster and cheaper',
    civilization: 'wu',
  },
  {
    id: 'wu-naval-supremacy',
    name: 'Wu Naval Supremacy',
    category: TECH_CATEGORIES.UNIQUE,
    age: 'imperial',
    cost: { food: 750, wood: 0, gold: 500, stone: 0 },
    researchTime: 50,
    prerequisites: ['riverine-navy'],
    effects: [{ type: EFFECT_TYPES.ATTACK, value: 4, affectsUnits: ['galley', 'war-galley', 'galleon'] }],
    description: '+4 attack for Galleys',
    civilization: 'wu',
  },
];

/**
 * Get technologies by category
 * @param {string} category - The category to filter by
 * @returns {Array} Technologies in that category
 */
export const getTechsByCategory = (category) =>
  technologies.filter((tech) => tech.category === category);

/**
 * Get technologies by age
 * @param {string} age - The age to filter by (dark, feudal, castle, imperial)
 * @returns {Array} Technologies available in that age
 */
export const getTechsByAge = (age) => technologies.filter((tech) => tech.age === age);

/**
 * Get a technology by ID
 * @param {string} id - The technology ID
 * @returns {Object|undefined} The technology object
 */
export const getTechById = (id) => technologies.find((tech) => tech.id === id);

/**
 * Check if prerequisites are met for a technology
 * @param {string} techId - The technology ID to check
 * @param {Array} researchedTechs - Array of already researched tech IDs
 * @returns {boolean} Whether prerequisites are met
 */
export const canResearchTech = (techId, researchedTechs = []) => {
  const tech = getTechById(techId);
  if (!tech) {
    return false;
  }

  return tech.prerequisites.every((prereq) => researchedTechs.includes(prereq));
};

/**
 * Calculate total cost of selected technologies
 * @param {Array} techIds - Array of technology IDs
 * @returns {Object} Total cost { food, wood, gold, stone }
 */
export const calculateTechCost = (techIds = []) => {
  const totalCost = { food: 0, wood: 0, gold: 0, stone: 0 };

  techIds.forEach((id) => {
    const tech = getTechById(id);
    if (tech) {
      totalCost.food += tech.cost.food;
      totalCost.wood += tech.cost.wood;
      totalCost.gold += tech.cost.gold;
      totalCost.stone += tech.cost.stone;
    }
  });

  return totalCost;
};

/**
 * Get unique technologies for a specific civilization
 * @param {string} civId - The civilization ID
 * @returns {Array} Array of unique technologies for that civilization
 */
export const getUniqueTechsByCiv = (civId) => {
  if (!civId || civId === 'generic') {
    return [];
  }
  return technologies.filter((tech) => tech.civilization === civId);
};

/**
 * Check if a technology is a unique technology
 * @param {string} techId - The technology ID
 * @returns {boolean} Whether the technology is unique
 */
export const isUniqueTech = (techId) => {
  const tech = getTechById(techId);
  return tech && tech.category === TECH_CATEGORIES.UNIQUE;
};
