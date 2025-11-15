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
      },
      {
        type: 'economic',
        description: 'Start with +1 villager, -50 food'
      },
      {
        type: 'stat',
        units: 'all',
        stat: 'resource-duration',
        value: 0.20,
        description: 'Resources last 20% longer'
      }
    ],
    teamBonus: {
      type: 'economic',
      description: 'Walls cost 50% less stone'
    }
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
      },
      {
        type: 'stat',
        units: ['archer', 'crossbowman', 'arbalester', 'longbowman', 'elite-longbowman'],
        stat: 'range',
        value: '+1 in Castle Age, +2 in Imperial Age',
        description: 'Archers have +1 range in Castle Age and +2 in Imperial Age'
      },
      {
        type: 'economic',
        description: 'Town Centers cost 50% less wood in Castle Age'
      }
    ],
    teamBonus: {
      type: 'stat',
      units: ['archery-range'],
      description: 'Archery Ranges work 20% faster'
    }
  },
  {
    id: 'franks',
    name: 'Franks',
    region: 'European',
    bonuses: [
      {
        type: 'stat',
        units: ['knight', 'cavalier', 'paladin'],
        stat: 'hp',
        value: 0.20,
        description: 'Cavalry have +20% HP'
      },
      {
        type: 'economic',
        description: 'Castles cost 25% less stone'
      },
      {
        type: 'economic',
        description: 'Farm upgrades free'
      }
    ],
    teamBonus: {
      type: 'stat',
      units: ['knight', 'cavalier', 'paladin'],
      description: 'Knights have +2 Line of Sight'
    }
  },
  {
    id: 'goths',
    name: 'Goths',
    region: 'European',
    bonuses: [
      {
        type: 'cost',
        units: ['militiaman', 'man-at-arms', 'longswordsman', 'two-handed-swordsman', 'champion'],
        resource: 'all',
        ages: { dark: 0.15, feudal: 0.20, castle: 0.25, imperial: 0.30 },
        description: 'Infantry costs 15%/20%/25%/30% less (Dark/Feudal/Castle/Imperial)'
      },
      {
        type: 'stat',
        units: ['huskarl', 'elite-huskarl'],
        stat: 'armor',
        value: '+10 pierce armor',
        description: 'Huskarls have +10 pierce armor'
      },
      {
        type: 'economic',
        description: '+10 to population cap in Imperial Age'
      }
    ],
    teamBonus: {
      type: 'stat',
      units: ['barracks'],
      description: 'Barracks work 20% faster'
    }
  },
  {
    id: 'byzantines',
    name: 'Byzantines',
    region: 'European',
    bonuses: [
      {
        type: 'cost',
        units: ['spearman', 'pikeman', 'halberdier', 'skirmisher', 'elite-skirmisher', 'camel', 'heavy-camel'],
        resource: 'all',
        value: 0.25,
        description: 'Counter units cost 25% less'
      },
      {
        type: 'stat',
        units: ['cataphract', 'elite-cataphract'],
        stat: 'trample',
        value: 'Trample damage',
        description: 'Cataphracts deal trample damage'
      },
      {
        type: 'economic',
        description: 'Imperial Age costs 33% less'
      }
    ],
    teamBonus: {
      type: 'stat',
      units: ['monk'],
      description: 'Monks heal 50% faster'
    }
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
      },
      {
        type: 'stat',
        units: 'all',
        stat: 'line-of-sight',
        value: '+1',
        description: 'All units have +1 Line of Sight'
      },
      {
        type: 'economic',
        description: 'Can build Feitorias in Imperial Age'
      }
    ],
    teamBonus: {
      type: 'economic',
      description: 'Free Cartography technology'
    }
  },
  {
    id: 'persians',
    name: 'Persians',
    region: 'Middle Eastern',
    bonuses: [
      {
        type: 'economic',
        description: 'Town Centers work 5% faster in Feudal/10% in Castle/15% in Imperial'
      },
      {
        type: 'stat',
        units: ['knight', 'cavalier', 'paladin'],
        stat: 'attack',
        value: '+2',
        description: 'Knight line has +2 attack vs Archers'
      },
      {
        type: 'economic',
        description: 'Start with +50 food and wood'
      }
    ],
    teamBonus: {
      type: 'stat',
      units: ['knight', 'cavalier', 'paladin'],
      description: 'Knights have +2 attack vs Archers'
    }
  },
  // African Civilizations
  {
    id: 'berbers',
    name: 'Berbers',
    region: 'African',
    bonuses: [
      {
        type: 'cost',
        units: ['knight', 'cavalier', 'paladin', 'light-cavalry', 'hussar'],
        resource: 'all',
        ages: { castle: 0.15, imperial: 0.20 },
        description: 'Cavalry units cost 15%/20% less (Castle/Imperial)'
      },
      {
        type: 'stat',
        units: 'all',
        stat: 'speed',
        value: '+5%',
        description: 'Villagers move 10% faster'
      }
    ],
    teamBonus: {
      type: 'stat',
      units: ['genitour', 'elite-genitour'],
      description: 'Genitour available in Archery Range'
    }
  },
  {
    id: 'ethiopians',
    name: 'Ethiopians',
    region: 'African',
    bonuses: [
      {
        type: 'economic',
        description: 'Archers fire 18% faster'
      }
    ]
  },
  {
    id: 'malians',
    name: 'Malians',
    region: 'African',
    bonuses: [
      {
        type: 'cost',
        units: ['militiaman', 'longswordsman', 'champion', 'spearman', 'pikeman', 'halberdier'],
        resource: 'all',
        ages: { feudal: 0.15, castle: 0.20, imperial: 0.25 },
        description: 'Barracks units cost 15%/20%/25% less (Feudal/Castle/Imperial)'
      }
    ]
  },
  // American Civilizations
  {
    id: 'aztecs',
    name: 'Aztecs',
    region: 'American',
    bonuses: [
      {
        type: 'economic',
        description: 'Military units created 11% faster'
      }
    ]
  },
  {
    id: 'incas',
    name: 'Incas',
    region: 'American',
    bonuses: [
      {
        type: 'economic',
        description: 'Start with llama instead of scout cavalry'
      }
    ]
  },
  // Asian Civilizations
  {
    id: 'bengalis',
    name: 'Bengalis',
    region: 'Asian',
    bonuses: [
      {
        type: 'cost',
        units: ['battle-elephant'],
        resource: 'food',
        value: 0.25,
        description: 'Elephant units cost 25% less food'
      }
    ]
  },
  {
    id: 'burmese',
    name: 'Burmese',
    region: 'Asian',
    bonuses: [
      {
        type: 'economic',
        description: 'Free infantry upgrades'
      }
    ]
  },
  {
    id: 'chinese',
    name: 'Chinese',
    region: 'Asian',
    bonuses: [
      {
        type: 'economic',
        description: 'Start with 3 villagers, but -200 food, -50 wood'
      }
    ]
  },
  {
    id: 'dravidians',
    name: 'Dravidians',
    region: 'Asian',
    bonuses: [
      {
        type: 'economic',
        description: 'Receive 50 wood when advancing ages'
      }
    ]
  },
  {
    id: 'gurjaras',
    name: 'Gurjaras',
    region: 'Asian',
    bonuses: [
      {
        type: 'cost',
        units: ['knight', 'cavalier', 'light-cavalry', 'hussar'],
        resource: 'food',
        value: 0.25,
        description: 'Mounted units (except camels) cost 25% less food'
      }
    ]
  },
  {
    id: 'hindustanis',
    name: 'Hindustanis',
    region: 'Asian',
    bonuses: [
      {
        type: 'cost',
        units: ['camel'],
        resource: 'all',
        ages: { feudal: 0.10, castle: 0.20, imperial: 0.30 },
        description: 'Camel units cost 10%/20%/30% less (Feudal/Castle/Imperial)'
      }
    ]
  },
  {
    id: 'japanese',
    name: 'Japanese',
    region: 'Asian',
    bonuses: [
      {
        type: 'economic',
        description: 'Infantry attack 33% faster'
      }
    ]
  },
  {
    id: 'khmer',
    name: 'Khmer',
    region: 'Asian',
    bonuses: [
      {
        type: 'economic',
        description: 'Battle elephants 11% faster'
      }
    ]
  },
  {
    id: 'koreans',
    name: 'Koreans',
    region: 'Asian',
    bonuses: [
      {
        type: 'stat',
        units: ['spearman', 'pikeman', 'halberdier'],
        stat: 'range',
        value: 2,
        description: 'Spearman line has +2 range'
      }
    ]
  },
  {
    id: 'malay',
    name: 'Malay',
    region: 'Asian',
    bonuses: [
      {
        type: 'economic',
        description: 'Unlimited fish trap limit'
      }
    ]
  },
  {
    id: 'mongols',
    name: 'Mongols',
    region: 'Asian',
    bonuses: [
      {
        type: 'economic',
        description: 'Cavalry archers fire 20% faster'
      }
    ]
  },
  {
    id: 'tatars',
    name: 'Tatars',
    region: 'Asian',
    bonuses: [
      {
        type: 'cost',
        units: ['cavalry-archer'],
        resource: 'food',
        value: 0.25,
        description: 'Cavalry archers cost 25% less food'
      }
    ]
  },
  {
    id: 'vietnamese',
    name: 'Vietnamese',
    region: 'Asian',
    bonuses: [
      {
        type: 'economic',
        description: 'Economic upgrades free'
      }
    ]
  },
  // European Civilizations (additional)
  {
    id: 'bohemians',
    name: 'Bohemians',
    region: 'European',
    bonuses: [
      {
        type: 'economic',
        description: 'Blacksmith and University techs cost -100 food'
      }
    ]
  },
  {
    id: 'bulgarians',
    name: 'Bulgarians',
    region: 'European',
    bonuses: [
      {
        type: 'economic',
        description: 'Militia line upgrades free'
      }
    ]
  },
  {
    id: 'burgundians',
    name: 'Burgundians',
    region: 'European',
    bonuses: [
      {
        type: 'economic',
        description: 'Economic upgrades available one age earlier'
      }
    ]
  },
  {
    id: 'celts',
    name: 'Celts',
    region: 'European',
    bonuses: [
      {
        type: 'economic',
        description: 'Infantry move 15% faster'
      }
    ]
  },
  {
    id: 'cumans',
    name: 'Cumans',
    region: 'European',
    bonuses: [
      {
        type: 'cost',
        units: ['cavalry-archer', 'knight', 'cavalier', 'light-cavalry', 'hussar'],
        resource: 'all',
        ages: { feudal: 0.05, castle: 0.10, imperial: 0.15 },
        description: 'Cavalry archers and mounted units cost 5%/10%/15% less (Feudal/Castle/Imperial)'
      }
    ]
  },
  {
    id: 'huns',
    name: 'Huns',
    region: 'European',
    bonuses: [
      {
        type: 'cost',
        units: ['cavalry-archer'],
        resource: 'wood',
        value: 0.25,
        description: 'Cavalry archers cost 25% less wood'
      }
    ]
  },
  {
    id: 'italians',
    name: 'Italians',
    region: 'European',
    bonuses: [
      {
        type: 'economic',
        description: 'Condottiero available, cheaper age advancements'
      }
    ]
  },
  {
    id: 'lithuanians',
    name: 'Lithuanians',
    region: 'European',
    bonuses: [
      {
        type: 'economic',
        description: 'Each Relic gives +1 attack to Knights and Leitis'
      }
    ]
  },
  {
    id: 'magyars',
    name: 'Magyars',
    region: 'European',
    bonuses: [
      {
        type: 'cost',
        units: ['scout-cavalry', 'light-cavalry', 'hussar'],
        resource: 'all',
        value: 0.15,
        description: 'Scout cavalry line costs 15% less'
      }
    ]
  },
  {
    id: 'poles',
    name: 'Poles',
    region: 'European',
    bonuses: [
      {
        type: 'economic',
        description: 'Folwarks replace mills'
      }
    ]
  },
  {
    id: 'romans',
    name: 'Romans',
    region: 'European',
    bonuses: [
      {
        type: 'cost',
        units: ['militiaman', 'longswordsman', 'champion'],
        resource: 'food',
        ages: { feudal: 0.10, castle: 0.15, imperial: 0.20 },
        description: 'Infantry costs 10%/15%/20% less food (Feudal/Castle/Imperial)'
      }
    ]
  },
  {
    id: 'sicilians',
    name: 'Sicilians',
    region: 'European',
    bonuses: [
      {
        type: 'economic',
        description: 'Castles cost 50% less stone'
      }
    ]
  },
  {
    id: 'slavs',
    name: 'Slavs',
    region: 'European',
    bonuses: [
      {
        type: 'economic',
        description: 'Supplies 15% cheaper'
      }
    ]
  },
  {
    id: 'spanish',
    name: 'Spanish',
    region: 'European',
    bonuses: [
      {
        type: 'economic',
        description: 'Blacksmith upgrades cost no gold'
      }
    ]
  },
  {
    id: 'teutons',
    name: 'Teutons',
    region: 'European',
    bonuses: [
      {
        type: 'economic',
        description: 'Farms cost 40% less'
      }
    ]
  },
  {
    id: 'vikings',
    name: 'Vikings',
    region: 'European',
    bonuses: [
      {
        type: 'cost',
        units: ['militiaman', 'longswordsman', 'champion'],
        resource: 'all',
        ages: { feudal: 0.15, castle: 0.20, imperial: 0.25 },
        description: 'Infantry costs 15%/20%/25% less (Feudal/Castle/Imperial)'
      }
    ]
  },
  // Middle Eastern Civilizations (additional)
  {
    id: 'armenians',
    name: 'Armenians',
    region: 'Middle Eastern',
    bonuses: [
      {
        type: 'cost',
        units: ['spearman', 'pikeman', 'halberdier'],
        resource: 'food',
        value: 0.25,
        description: 'Spearman line costs 25% less food'
      }
    ]
  },
  {
    id: 'georgians',
    name: 'Georgians',
    region: 'Middle Eastern',
    bonuses: [
      {
        type: 'cost',
        units: ['knight', 'cavalier'],
        resource: 'food',
        ages: { feudal: 0.10, castle: 0.15, imperial: 0.20 },
        description: 'Cavalry costs 10%/15%/20% less food (Feudal/Castle/Imperial)'
      }
    ]
  },
  {
    id: 'saracens',
    name: 'Saracens',
    region: 'Middle Eastern',
    bonuses: [
      {
        type: 'economic',
        description: 'Foot archers +3 attack vs buildings'
      }
    ]
  },
  {
    id: 'turks',
    name: 'Turks',
    region: 'Middle Eastern',
    bonuses: [
      {
        type: 'economic',
        description: 'Gunpowder units created 20% faster'
      }
    ]
  },
  // Asian Civilizations (The Three Kingdoms expansion)
  {
    id: 'jurchens',
    name: 'Jurchens',
    region: 'Asian',
    bonuses: [
      {
        type: 'economic',
        description: 'Animals killed by Jurchen units or buildings do not decay'
      },
      {
        type: 'stat',
        units: ['scout-cavalry', 'light-cavalry', 'hussar', 'cavalry-archer', 'heavy-cavalry-archer'],
        stat: 'attack-speed',
        value: 0.20,
        description: 'Mounted units and Fire Lancers attack 20% faster'
      }
    ],
    teamBonus: {
      type: 'stat',
      description: 'Gunpowder units +2 Line of Sight'
    }
  },
  {
    id: 'khitans',
    name: 'Khitans',
    region: 'Asian',
    bonuses: [
      {
        type: 'stat',
        description: 'Forging and Iron Casting effects doubled'
      },
      {
        type: 'economic',
        description: 'Skirmishers, Genitours, Spearman and Scout Cavalry lines trained 25% faster'
      },
      {
        type: 'economic',
        description: 'Heavy Cavalry Archer upgrade available in Castle Age, costs -50%'
      }
    ],
    teamBonus: {
      type: 'stat',
      description: 'Infantry units +2 attack vs ranged soldiers'
    }
  },
  {
    id: 'shu',
    name: 'Shu',
    region: 'Asian',
    bonuses: [
      {
        type: 'economic',
        description: 'Lumberjacks generate 0.9 food for every 10 wood'
      },
      {
        type: 'cost',
        description: 'Archery unit technologies at Archery Range and Blacksmith cost -25%'
      },
      {
        type: 'stat',
        description: 'Siege weapons, War Chariots, Lou Chuans move +10/15% faster in Castle/Imperial Age'
      }
    ],
    teamBonus: {
      type: 'stat',
      description: 'Foot archer units (except Skirmishers) +2 Line of Sight'
    }
  },
  {
    id: 'wei',
    name: 'Wei',
    region: 'Asian',
    bonuses: [
      {
        type: 'economic',
        description: 'Tuntian: Soldiers passively produce food'
      },
      {
        type: 'stat',
        description: 'Ming Guang Armor: Mounted units +4 melee armor'
      },
      {
        type: 'economic',
        description: 'Receive one free Villager for each economic technology researched'
      },
      {
        type: 'stat',
        description: 'Hei Guang Cavalry and Xianbei Raider +20/30% HP in Castle/Imperial Age'
      }
    ],
    teamBonus: {
      type: 'stat',
      description: 'Cavalry units +2 attack vs siege weapons'
    }
  },
  {
    id: 'wu',
    name: 'Wu',
    region: 'Asian',
    bonuses: [
      {
        type: 'economic',
        description: 'Barracks, Archery Ranges, Stables, Siege Workshops, Castles, Docks provide +55 food when constructed'
      },
      {
        type: 'stat',
        description: 'Infantry regenerate 10/20/30 HP per minute in Feudal/Castle/Imperial Age'
      }
    ],
    teamBonus: {
      type: 'economic',
      description: 'Houses built extremely fast'
    }
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
