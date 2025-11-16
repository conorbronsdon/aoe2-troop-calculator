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
  TOWN_CENTER: 'Town Center'
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
  CONVERSION_RESISTANCE: 'conversionResistance'
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
    effects: [
      { type: EFFECT_TYPES.ATTACK, value: 1, affectsUnits: ['Infantry', 'Cavalry'] }
    ],
    description: '+1 attack for infantry and cavalry'
  },
  {
    id: 'iron-casting',
    name: 'Iron Casting',
    category: TECH_CATEGORIES.BLACKSMITH,
    age: 'castle',
    cost: { food: 220, wood: 0, gold: 120, stone: 0 },
    researchTime: 75,
    prerequisites: ['forging'],
    effects: [
      { type: EFFECT_TYPES.ATTACK, value: 1, affectsUnits: ['Infantry', 'Cavalry'] }
    ],
    description: '+1 attack for infantry and cavalry'
  },
  {
    id: 'blast-furnace',
    name: 'Blast Furnace',
    category: TECH_CATEGORIES.BLACKSMITH,
    age: 'imperial',
    cost: { food: 275, wood: 0, gold: 225, stone: 0 },
    researchTime: 100,
    prerequisites: ['iron-casting'],
    effects: [
      { type: EFFECT_TYPES.ATTACK, value: 2, affectsUnits: ['Infantry', 'Cavalry'] }
    ],
    description: '+2 attack for infantry and cavalry'
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
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 1, affectsUnits: ['Infantry'] }
    ],
    description: '+1/+1 armor for infantry'
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
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 1, affectsUnits: ['Infantry'] }
    ],
    description: '+1/+1 armor for infantry'
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
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 2, affectsUnits: ['Infantry'] }
    ],
    description: '+1/+2 armor for infantry'
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
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 1, affectsUnits: ['Cavalry'] }
    ],
    description: '+1/+1 armor for cavalry'
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
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 1, affectsUnits: ['Cavalry'] }
    ],
    description: '+1/+1 armor for cavalry'
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
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 2, affectsUnits: ['Cavalry'] }
    ],
    description: '+1/+2 armor for cavalry'
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
      { type: EFFECT_TYPES.RANGE, value: 1, affectsUnits: ['Archer', 'Siege'] }
    ],
    description: '+1 attack and +1 range for archers and siege'
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
      { type: EFFECT_TYPES.RANGE, value: 1, affectsUnits: ['Archer', 'Siege'] }
    ],
    description: '+1 attack and +1 range for archers and siege'
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
      { type: EFFECT_TYPES.RANGE, value: 1, affectsUnits: ['Archer', 'Siege'] }
    ],
    description: '+1 attack and +1 range for archers and siege'
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
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 1, affectsUnits: ['Archer'] }
    ],
    description: '+1/+1 armor for archers'
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
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 1, affectsUnits: ['Archer'] }
    ],
    description: '+1/+1 armor for archers'
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
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 2, affectsUnits: ['Archer'] }
    ],
    description: '+1/+2 armor for archers'
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
    effects: [
      { type: EFFECT_TYPES.HP, value: 20, affectsUnits: ['Cavalry'] }
    ],
    description: '+20 HP for cavalry'
  },
  {
    id: 'husbandry',
    name: 'Husbandry',
    category: TECH_CATEGORIES.STABLE,
    age: 'castle',
    cost: { food: 150, wood: 0, gold: 0, stone: 0 },
    researchTime: 40,
    prerequisites: [],
    effects: [
      { type: EFFECT_TYPES.SPEED, value: 0.1, affectsUnits: ['Cavalry'] }
    ],
    description: '+10% speed for cavalry'
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
      { type: EFFECT_TYPES.ATTACK_SPEED, value: 0.18, affectsUnits: ['Archer'] }
    ],
    description: '100% accuracy and +18% attack speed for archers'
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
      { type: EFFECT_TYPES.MELEE_ARMOR, value: 1, affectsUnits: ['cavalry-archer', 'heavy-cavalry-archer'] },
      { type: EFFECT_TYPES.PIERCE_ARMOR, value: 2, affectsUnits: ['cavalry-archer', 'heavy-cavalry-archer'] },
      { type: EFFECT_TYPES.ATTACK, value: 2, affectsUnits: ['cavalry-archer', 'heavy-cavalry-archer'] }
    ],
    description: '+1/+2 armor and +2 attack vs spearmen for cavalry archers'
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
    effects: [
      { type: EFFECT_TYPES.ACCURACY, value: 100, affectsUnits: ['Archer', 'Siege'] }
    ],
    description: 'Ranged units hit moving targets'
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    category: TECH_CATEGORIES.UNIVERSITY,
    age: 'imperial',
    cost: { food: 300, wood: 0, gold: 200, stone: 0 },
    researchTime: 100,
    prerequisites: [],
    effects: [
      { type: EFFECT_TYPES.ATTACK, value: 1, affectsUnits: ['Archer', 'Siege'] }
    ],
    description: '+1 attack for ranged units and enables gunpowder units'
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
      { type: EFFECT_TYPES.ATTACK, value: 20, affectsUnits: ['Siege'] } // +20% vs buildings
    ],
    description: '+1 range for siege, +20% attack vs buildings'
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
    effects: [
      { type: EFFECT_TYPES.SPEED, value: 0.1, affectsUnits: ['Infantry'] }
    ],
    description: '+10% speed for infantry'
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
      { type: EFFECT_TYPES.ATTACK, value: 2, affectsUnits: ['Infantry'] } // vs buildings
    ],
    description: '+2 attack vs buildings for infantry'
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
    description: 'Military units created 33% faster'
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
    description: 'Monks can convert buildings and siege weapons'
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
    description: 'Monks can convert other monks'
  },
  {
    id: 'sanctity',
    name: 'Sanctity',
    category: TECH_CATEGORIES.MONASTERY,
    age: 'castle',
    cost: { food: 0, wood: 0, gold: 120, stone: 0 },
    researchTime: 60,
    prerequisites: [],
    effects: [
      { type: EFFECT_TYPES.HP, value: 15, affectsUnits: ['Monk'] }
    ],
    description: '+15 HP for monks'
  },
  {
    id: 'fervor',
    name: 'Fervor',
    category: TECH_CATEGORIES.MONASTERY,
    age: 'castle',
    cost: { food: 0, wood: 0, gold: 140, stone: 0 },
    researchTime: 50,
    prerequisites: [],
    effects: [
      { type: EFFECT_TYPES.SPEED, value: 0.15, affectsUnits: ['Monk'] }
    ],
    description: '+15% speed for monks'
  },
  {
    id: 'faith',
    name: 'Faith',
    category: TECH_CATEGORIES.MONASTERY,
    age: 'imperial',
    cost: { food: 0, wood: 0, gold: 750, stone: 0 },
    researchTime: 60,
    prerequisites: [],
    effects: [
      { type: EFFECT_TYPES.CONVERSION_RESISTANCE, value: 50, affectsUnits: ['all'] }
    ],
    description: 'Units resist conversion'
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
    description: '+15 HP and +1/+2 armor for villagers'
  }
];

/**
 * Get technologies by category
 * @param {string} category - The category to filter by
 * @returns {Array} Technologies in that category
 */
export const getTechsByCategory = (category) => {
  return technologies.filter(tech => tech.category === category);
};

/**
 * Get technologies by age
 * @param {string} age - The age to filter by (dark, feudal, castle, imperial)
 * @returns {Array} Technologies available in that age
 */
export const getTechsByAge = (age) => {
  return technologies.filter(tech => tech.age === age);
};

/**
 * Get a technology by ID
 * @param {string} id - The technology ID
 * @returns {Object|undefined} The technology object
 */
export const getTechById = (id) => {
  return technologies.find(tech => tech.id === id);
};

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

  return tech.prerequisites.every(prereq => researchedTechs.includes(prereq));
};

/**
 * Calculate total cost of selected technologies
 * @param {Array} techIds - Array of technology IDs
 * @returns {Object} Total cost { food, wood, gold, stone }
 */
export const calculateTechCost = (techIds = []) => {
  const totalCost = { food: 0, wood: 0, gold: 0, stone: 0 };

  techIds.forEach(id => {
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
