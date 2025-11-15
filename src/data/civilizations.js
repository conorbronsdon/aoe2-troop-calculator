/**
 * Civilization data with bonuses
 * Each civilization has unique bonuses that affect unit costs and stats
 */
export const civilizations = [
  {
    id: 'generic',
    name: 'Generic (No Bonuses)',
    region: 'None',
    bonuses: []
  },
  {
    id: 'mayans',
    name: 'Mayans',
    region: 'American',
    bonuses: [
      {
        type: 'cost',
        units: ['archer', 'crossbowman', 'arbalester'],
        resource: 'all',
        ages: { feudal: 0.10, castle: 0.20, imperial: 0.30 },
        description: 'Archer line costs 10%/20%/30% less (Feudal/Castle/Imperial)'
      }
    ]
  },
  {
    id: 'britons',
    name: 'Britons',
    region: 'European',
    bonuses: [
      {
        type: 'cost',
        units: ['archer', 'crossbowman', 'arbalester'],
        resource: 'all',
        ages: { castle: 0.20, imperial: 0.20 },
        description: 'Archer line costs 20% less in Castle and Imperial Age'
      }
    ]
  },
  {
    id: 'franks',
    name: 'Franks',
    region: 'European',
    bonuses: [
      // Knights get +20% HP but no cost reduction
      {
        type: 'stat',
        units: ['knight', 'cavalier'],
        stat: 'hp',
        value: 0.20,
        description: 'Knights have +20% HP'
      }
    ]
  },
  {
    id: 'goths',
    name: 'Goths',
    region: 'European',
    bonuses: [
      {
        type: 'cost',
        units: ['militiaman', 'longswordsman', 'champion'],
        resource: 'all',
        ages: { dark: 0.15, feudal: 0.20, castle: 0.25, imperial: 0.30 },
        description: 'Infantry costs 15%/20%/25%/30% less (Dark/Feudal/Castle/Imperial)'
      }
    ]
  },
  {
    id: 'byzantines',
    name: 'Byzantines',
    region: 'European',
    bonuses: [
      {
        type: 'cost',
        units: ['spearman', 'pikeman', 'halberdier', 'skirmisher', 'elite-skirmisher', 'camel'],
        resource: 'all',
        value: 0.25,
        description: 'Counter units cost 25% less'
      }
    ]
  },
  {
    id: 'portuguese',
    name: 'Portuguese',
    region: 'European',
    bonuses: [
      {
        type: 'cost',
        units: 'all',
        resource: 'gold',
        value: 0.20,
        description: 'All units cost 20% less gold'
      }
    ]
  },
  {
    id: 'persians',
    name: 'Persians',
    region: 'Middle Eastern',
    bonuses: [
      // Town center bonus, not unit cost
      {
        type: 'economic',
        description: 'Town Centers work 5% faster in Feudal/10% in Castle/15% in Imperial'
      }
    ]
  }
];

/**
 * Get civilization by ID
 * @param {string} civId - Civilization identifier
 * @returns {Object|undefined} Civilization data or undefined if not found
 */
export const getCivilizationById = (civId) => {
  return civilizations.find(civ => civ.id === civId);
};

/**
 * Get civilizations by region
 * @param {string} region - Geographic region
 * @returns {Array} Array of civilizations in that region
 */
export const getCivilizationsByRegion = (region) => {
  return civilizations.filter(civ => civ.region === region);
};
