/**
 * Civilization data with bonuses
 * Each civilization has unique bonuses that affect unit costs and stats
 */
import type { Civilization } from '../types';

export const civilizations: Civilization[] = [
  {
    id: 'generic',
    name: 'Generic (No Bonuses)',
    region: 'None',
    bonuses: [],
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
        ages: { feudal: 0.1, castle: 0.2, imperial: 0.3 },
        description: 'Archer line costs 10%/20%/30% less (Feudal/Castle/Imperial)',
      },
      {
        type: 'economic',
        description: 'Start with +1 villager, -50 food',
      },
      {
        type: 'stat',
        units: 'all',
        stat: 'resource-duration',
        value: 0.2,
        description: 'Resources last 20% longer',
      },
    ],
    teamBonus: {
      type: 'economic',
      description: 'Walls cost 50% less stone',
    },
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
        ages: { castle: 0.2, imperial: 0.2 },
        description: 'Archer line costs 20% less in Castle and Imperial Age',
      },
      {
        type: 'stat',
        units: ['archer', 'crossbowman', 'arbalester', 'longbowman', 'elite-longbowman'],
        stat: 'range',
        value: '+1 in Castle Age, +2 in Imperial Age',
        description: 'Archers have +1 range in Castle Age and +2 in Imperial Age',
      },
      {
        type: 'economic',
        description: 'Town Centers cost 50% less wood in Castle Age',
      },
    ],
    teamBonus: {
      type: 'stat',
      units: ['archery-range'],
      description: 'Archery Ranges work 20% faster',
    },
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
        value: 0.2,
        description: 'Cavalry have +20% HP',
      },
      {
        type: 'economic',
        description: 'Castles cost 25% less stone',
      },
      {
        type: 'economic',
        description: 'Farm upgrades free',
      },
    ],
    teamBonus: {
      type: 'stat',
      units: ['knight', 'cavalier', 'paladin'],
      description: 'Knights have +2 Line of Sight',
    },
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
        ages: { dark: 0.15, feudal: 0.2, castle: 0.25, imperial: 0.3 },
        description: 'Infantry costs 15%/20%/25%/30% less (Dark/Feudal/Castle/Imperial)',
      },
      {
        type: 'stat',
        units: ['huskarl', 'elite-huskarl'],
        stat: 'armor',
        value: '+10 pierce armor',
        description: 'Huskarls have +10 pierce armor',
      },
      {
        type: 'economic',
        description: '+10 to population cap in Imperial Age',
      },
    ],
    teamBonus: {
      type: 'stat',
      units: ['barracks'],
      description: 'Barracks work 20% faster',
    },
  },
  {
    id: 'byzantines',
    name: 'Byzantines',
    region: 'European',
    bonuses: [
      {
        type: 'cost',
        units: [
          'spearman',
          'pikeman',
          'halberdier',
          'skirmisher',
          'elite-skirmisher',
          'camel',
          'heavy-camel',
        ],
        resource: 'all',
        value: 0.25,
        description: 'Counter units cost 25% less',
      },
      {
        type: 'stat',
        units: ['cataphract', 'elite-cataphract'],
        stat: 'trample',
        value: 'Trample damage',
        description: 'Cataphracts deal trample damage',
      },
      {
        type: 'economic',
        description: 'Imperial Age costs 33% less',
      },
    ],
    teamBonus: {
      type: 'stat',
      units: ['monk'],
      description: 'Monks heal 50% faster',
    },
  },
  {
    id: 'portuguese',
    name: 'Portuguese',
    region: 'European',
    bonuses: [
      {
        type: 'cost',
        units: 'all' as unknown as string[],
        resource: 'gold',
        value: 0.2,
        description: 'All units cost 20% less gold',
      },
      {
        type: 'stat',
        units: 'all',
        stat: 'line-of-sight',
        value: '+1',
        description: 'All units have +1 Line of Sight',
      },
      {
        type: 'economic',
        description: 'Can build Feitorias in Imperial Age',
      },
    ],
    teamBonus: {
      type: 'economic',
      description: 'Free Cartography technology',
    },
  },
  {
    id: 'persians',
    name: 'Persians',
    region: 'Middle Eastern',
    bonuses: [
      {
        type: 'economic',
        description: 'Town Centers work 5% faster in Feudal/10% in Castle/15% in Imperial',
      },
      {
        type: 'stat',
        units: ['knight', 'cavalier', 'paladin'],
        stat: 'attack',
        value: '+2',
        description: 'Knight line has +2 attack vs Archers',
      },
      {
        type: 'economic',
        description: 'Start with +50 food and wood',
      },
    ],
    teamBonus: {
      type: 'stat',
      units: ['knight', 'cavalier', 'paladin'],
      description: 'Knights have +2 attack vs Archers',
    },
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
        ages: { castle: 0.15, imperial: 0.2 },
        description: 'Cavalry units cost 15%/20% less (Castle/Imperial)',
      },
      {
        type: 'stat',
        units: 'all',
        stat: 'speed',
        value: '+5%',
        description: 'Villagers move 10% faster',
      },
    ],
    teamBonus: {
      type: 'stat',
      units: ['genitour', 'elite-genitour'],
      description: 'Genitour available in Archery Range',
    },
  },
  {
    id: 'ethiopians',
    name: 'Ethiopians',
    region: 'African',
    bonuses: [
      {
        type: 'stat',
        units: ['archer', 'crossbowman', 'arbalester'],
        stat: 'attack-speed',
        value: 0.18,
        description: 'Archers fire 18% faster',
      },
      {
        type: 'economic',
        description: 'Receive +100 food and +100 gold per age starting in Feudal Age',
      },
      {
        type: 'stat',
        units: ['scorpion', 'heavy-scorpion'],
        stat: 'attack-speed',
        value: 0.18,
        description: 'Siege weapons fire 18% faster',
      },
    ],
    teamBonus: {
      type: 'stat',
      units: ['watch-tower', 'guard-tower', 'keep'],
      description: 'Towers +3 line of sight',
    },
  },
  {
    id: 'malians',
    name: 'Malians',
    region: 'African',
    bonuses: [
      {
        type: 'cost',
        units: [
          'militiaman',
          'man-at-arms',
          'longswordsman',
          'two-handed-swordsman',
          'champion',
          'spearman',
          'pikeman',
          'halberdier',
        ],
        resource: 'all',
        ages: { feudal: 0.15, castle: 0.2, imperial: 0.25 },
        description: 'Barracks units cost 15%/20%/25% less (Feudal/Castle/Imperial)',
      },
      {
        type: 'stat',
        units: [
          'militiaman',
          'man-at-arms',
          'longswordsman',
          'two-handed-swordsman',
          'champion',
          'spearman',
          'pikeman',
          'halberdier',
        ],
        stat: 'armor',
        value: '+1 pierce armor per age (starting Feudal)',
        description: 'Infantry units +1 pierce armor per age',
      },
      {
        type: 'stat',
        units: [
          'militiaman',
          'man-at-arms',
          'longswordsman',
          'two-handed-swordsman',
          'champion',
          'spearman',
          'pikeman',
          'halberdier',
        ],
        stat: 'hp',
        value: '+5 HP per age',
        description: 'Barracks units +5 HP per age',
      },
      {
        type: 'economic',
        description: 'Buildings cost 15% less wood',
      },
      {
        type: 'economic',
        description: 'Gold Mining upgrades free',
      },
      {
        type: 'economic',
        description: 'Universities cost 80% less',
      },
    ],
    teamBonus: {
      type: 'economic',
      description: 'Universities work 80% faster',
    },
  },
  // American Civilizations
  {
    id: 'aztecs',
    name: 'Aztecs',
    region: 'American',
    bonuses: [
      {
        type: 'economic',
        description: 'Military units created 11% faster',
      },
      {
        type: 'stat',
        units: ['monk'],
        stat: 'hp',
        value: '+5 HP per relic',
        description: 'Monks gain +5 HP per collected relic',
      },
      {
        type: 'economic',
        description: 'Start with +50 gold',
      },
      {
        type: 'economic',
        description: 'Villagers carry +5 resources',
      },
      {
        type: 'economic',
        description: 'Loom free',
      },
    ],
    teamBonus: {
      type: 'economic',
      description: 'Relics generate +33% gold',
    },
  },
  {
    id: 'incas',
    name: 'Incas',
    region: 'American',
    bonuses: [
      {
        type: 'economic',
        description: 'Start with llama instead of scout cavalry',
      },
      {
        type: 'stat',
        units: ['skirmisher', 'elite-skirmisher'],
        stat: 'range',
        value: 'Minimum range reduced to 0',
        description: 'Slingers and Skirmishers minimum range reduced to 0',
      },
      {
        type: 'stat',
        units: ['villager'],
        stat: 'armor',
        value: 'Benefit from Blacksmith upgrades',
        description: 'Villagers benefit from Blacksmith upgrades',
      },
      {
        type: 'economic',
        description: 'Houses support 10 population',
      },
      {
        type: 'economic',
        description: 'Buildings cost 15% less stone',
      },
    ],
    teamBonus: {
      type: 'economic',
      description: 'Farms built 50% faster',
    },
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
        description: 'Elephant units cost 25% less food',
      },
      {
        type: 'stat',
        units: ['battle-elephant'],
        stat: 'conversion-resistance',
        value: 'Resist conversion',
        description: 'Elephant units resist conversion',
      },
      {
        type: 'economic',
        description: 'Town Centers spawn 2 villagers when destroyed by enemy (Dark to Castle Age)',
      },
      {
        type: 'economic',
        description: 'Monk technologies cost 50% less',
      },
    ],
    teamBonus: {
      type: 'economic',
      description: 'Trade units yield +10% food',
    },
  },
  {
    id: 'burmese',
    name: 'Burmese',
    region: 'Asian',
    bonuses: [
      {
        type: 'economic',
        description: 'Infantry upgrades (Man-at-Arms, Two-Handed Swordsman, Champion) free',
      },
      {
        type: 'stat',
        units: ['militiaman', 'man-at-arms', 'longswordsman', 'two-handed-swordsman', 'champion'],
        stat: 'attack',
        value: '+1 per relic (max +4)',
        description: 'Infantry +1 attack per relic owned (max +4)',
      },
      {
        type: 'stat',
        units: ['battle-elephant'],
        stat: 'armor',
        value: '+1/+1',
        description: 'Battle elephants +1/+1 armor',
      },
      {
        type: 'economic',
        description: 'Lumber Camp technologies free',
      },
      {
        type: 'economic',
        description: 'Monastery technologies cost 50% less',
      },
    ],
    teamBonus: {
      type: 'economic',
      description: 'Relic visibility on map',
    },
  },
  {
    id: 'chinese',
    name: 'Chinese',
    region: 'Asian',
    bonuses: [
      {
        type: 'economic',
        description: 'Start with 3 villagers, but -200 food, -50 wood',
      },
      {
        type: 'economic',
        description: 'Town Centers support +5 population (10 total)',
      },
      {
        type: 'stat',
        units: ['demolition-ship'],
        stat: 'hp',
        value: 0.5,
        description: 'Demolition Ships +50% HP',
      },
      {
        type: 'economic',
        description: 'Technologies cost -10% Feudal, -15% Castle, -20% Imperial',
      },
    ],
    teamBonus: {
      type: 'economic',
      description: 'Farms +45 food',
    },
  },
  {
    id: 'dravidians',
    name: 'Dravidians',
    region: 'Asian',
    bonuses: [
      {
        type: 'economic',
        description: 'Receive +200 wood when advancing to next age',
      },
      {
        type: 'stat',
        units: ['skirmisher', 'elite-skirmisher'],
        stat: 'attack-speed',
        value: 0.25,
        description: 'Skirmishers and Elephant Archers attack 25% faster',
      },
      {
        type: 'economic',
        description: 'Fishermen and Fishing Ships work 25% faster and carry +15',
      },
    ],
    teamBonus: {
      type: 'economic',
      description: 'Docks provide +5 population space',
    },
  },
  {
    id: 'gurjaras',
    name: 'Gurjaras',
    region: 'Asian',
    bonuses: [
      {
        type: 'cost',
        units: ['knight', 'cavalier', 'paladin', 'light-cavalry', 'hussar'],
        resource: 'food',
        value: 0.25,
        description: 'Cavalry units (except camels) cost 25% less food starting in Castle Age',
      },
      {
        type: 'stat',
        units: ['camel', 'heavy-camel'],
        stat: 'attack',
        value: '+1 vs camels',
        description: 'Camel units +1 attack vs other camel units',
      },
      {
        type: 'stat',
        units: ['light-cavalry', 'hussar'],
        stat: 'attack',
        value: 'Bonus damage vs archers',
        description: 'Light Cavalry and Hussar deal bonus damage to archers',
      },
      {
        type: 'economic',
        description: 'Start with 2 Forage Bushes',
      },
      {
        type: 'economic',
        description: 'Mills gather food from Forage Bushes 15% faster',
      },
      {
        type: 'economic',
        description: 'Can garrison mills with sheep and goats',
      },
      {
        type: 'economic',
        description: 'Docks work 15% faster',
      },
    ],
    teamBonus: {
      type: 'stat',
      units: ['camel', 'heavy-camel', 'light-cavalry', 'hussar'],
      description: 'Camel units and light cavalry +4 attack vs buildings',
    },
  },
  {
    id: 'hindustanis',
    name: 'Hindustanis',
    region: 'Asian',
    bonuses: [
      {
        type: 'cost',
        units: ['camel', 'heavy-camel'],
        resource: 'all',
        ages: { feudal: 0.1, castle: 0.2, imperial: 0.3 },
        description: 'Camel units cost 10%/20%/30% less (Feudal/Castle/Imperial)',
      },
      {
        type: 'stat',
        units: ['hand-cannoneer', 'bombard-cannon'],
        stat: 'armor',
        value: '+1/+1',
        description: 'Gunpowder units +1/+1 armor',
      },
      {
        type: 'cost',
        units: ['villager'],
        resource: 'all',
        ages: { castle: 0.1, imperial: 0.2 },
        description: 'Villagers cost 10% less in Castle Age, 20% less in Imperial Age',
      },
      {
        type: 'stat',
        units: ['camel', 'heavy-camel'],
        stat: 'regeneration',
        value: '30 HP/min',
        description: 'Camel units regenerate 30 HP per minute',
      },
    ],
    teamBonus: {
      type: 'stat',
      units: ['camel', 'heavy-camel'],
      description: 'Camel units +5 attack vs buildings',
    },
  },
  {
    id: 'japanese',
    name: 'Japanese',
    region: 'Asian',
    bonuses: [
      {
        type: 'stat',
        units: [
          'militiaman',
          'man-at-arms',
          'longswordsman',
          'two-handed-swordsman',
          'champion',
          'spearman',
          'pikeman',
          'halberdier',
        ],
        stat: 'attack-speed',
        value: 0.33,
        description: 'Infantry attack 33% faster',
      },
      {
        type: 'stat',
        units: ['fishing-ship'],
        stat: 'armor',
        value: '+2 pierce armor',
        description: 'Fishing Ships +2 pierce armor',
      },
      {
        type: 'economic',
        description: 'Fishing Ships work rate +5% Dark, +10% Feudal, +15% Castle, +20% Imperial',
      },
      {
        type: 'economic',
        description: 'Mill, Lumber Camp, Mining Camp cost 50% less',
      },
      {
        type: 'economic',
        description: 'Farms cost 50% less after researching Feudal Age',
      },
    ],
    teamBonus: {
      type: 'stat',
      units: ['galley', 'war-galley', 'galleon'],
      description: 'Galleys +50% line of sight',
    },
  },
  {
    id: 'khmer',
    name: 'Khmer',
    region: 'Asian',
    bonuses: [
      {
        type: 'stat',
        units: ['battle-elephant'],
        stat: 'speed',
        value: 0.15,
        description: 'Battle Elephants +15% faster',
      },
      {
        type: 'stat',
        units: ['scorpion', 'heavy-scorpion'],
        stat: 'range',
        value: '+1',
        description: 'Scorpions +1 range',
      },
      {
        type: 'economic',
        description: 'No building requirements to advance age or unlock other buildings',
      },
      {
        type: 'economic',
        description: 'Farmers work faster after researching lumberjack upgrades',
      },
    ],
    teamBonus: {
      type: 'stat',
      units: ['scorpion', 'heavy-scorpion'],
      description: 'Scorpions +1 range',
    },
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
        value: '+1',
        description: 'Spearman line has +1 range',
      },
      {
        type: 'economic',
        description: 'Tower upgrades free (Murder Holes, Arrowslits)',
      },
      {
        type: 'cost',
        units: 'all' as unknown as string[],
        resource: 'wood',
        value: 0.2,
        description: 'Military units (except siege) cost 20% less wood',
      },
      {
        type: 'stat',
        units: ['villager'],
        stat: 'line-of-sight',
        value: '+3',
        description: 'Villagers +3 line of sight',
      },
      {
        type: 'economic',
        description: 'Stone miners work 20% faster',
      },
    ],
    teamBonus: {
      type: 'stat',
      units: ['mangonel', 'onager', 'siege-onager'],
      description: 'Mangonel line minimum range reduced',
    },
  },
  {
    id: 'malay',
    name: 'Malay',
    region: 'Asian',
    bonuses: [
      {
        type: 'economic',
        description: 'Fish Traps provide unlimited food',
      },
      {
        type: 'economic',
        description: 'Advance to next age 66% faster',
      },
      {
        type: 'cost',
        units: ['battle-elephant'],
        resource: 'all',
        value: 0.25,
        description: 'Battle Elephants 25% cheaper',
      },
      {
        type: 'economic',
        description: 'Forced Levy available (makes militia line gold cost dropped)',
      },
    ],
    teamBonus: {
      type: 'stat',
      units: ['dock'],
      description: 'Docks +100% line of sight',
    },
  },
  {
    id: 'mongols',
    name: 'Mongols',
    region: 'Asian',
    bonuses: [
      {
        type: 'stat',
        units: ['cavalry-archer', 'heavy-cavalry-archer'],
        stat: 'attack-speed',
        value: 0.25,
        description: 'Cavalry Archers fire 25% faster',
      },
      {
        type: 'stat',
        units: ['light-cavalry', 'hussar'],
        stat: 'hp',
        value: 0.3,
        description: 'Light Cavalry and Hussars +30% HP',
      },
      {
        type: 'stat',
        units: [
          'mangonel',
          'onager',
          'siege-onager',
          'scorpion',
          'heavy-scorpion',
          'bombard-cannon',
        ],
        stat: 'speed',
        value: 0.5,
        description: 'Siege units move 50% faster',
      },
      {
        type: 'economic',
        description: 'Hunters work 50% faster',
      },
      {
        type: 'cost',
        units: [
          'mangonel',
          'onager',
          'siege-onager',
          'scorpion',
          'heavy-scorpion',
          'bombard-cannon',
        ],
        resource: 'wood',
        value: 0.35,
        description: 'Siege weapons cost 35% less wood (except rams)',
      },
    ],
    teamBonus: {
      type: 'stat',
      units: ['scout-cavalry', 'light-cavalry', 'hussar'],
      description: 'Scout Cavalry line +2 line of sight',
    },
  },
  {
    id: 'tatars',
    name: 'Tatars',
    region: 'Asian',
    bonuses: [
      {
        type: 'cost',
        units: ['cavalry-archer', 'heavy-cavalry-archer'],
        resource: 'food',
        value: 0.25,
        description: 'Cavalry Archers cost 25% food starting in Castle Age',
      },
      {
        type: 'stat',
        units: 'all',
        stat: 'attack',
        value: '+50% from higher elevation',
        description: 'Units deal +50% damage when fighting from higher elevation',
      },
      {
        type: 'economic',
        description: 'Herdables contain +50% food',
      },
      {
        type: 'economic',
        description: 'Thumb Ring free',
      },
    ],
    teamBonus: {
      type: 'stat',
      units: ['cavalry-archer', 'heavy-cavalry-archer'],
      description: 'Cavalry Archers +2 line of sight',
    },
  },
  {
    id: 'vietnamese',
    name: 'Vietnamese',
    region: 'Asian',
    bonuses: [
      {
        type: 'economic',
        description: 'Reveal enemy positions at start',
      },
      {
        type: 'stat',
        units: ['archer', 'crossbowman', 'arbalester'],
        stat: 'hp',
        value: 0.2,
        description: 'Archery Range units +20% HP',
      },
      {
        type: 'economic',
        description: 'Economic upgrades cost no wood',
      },
      {
        type: 'economic',
        description: 'Imperial Skirmisher upgrade available',
      },
    ],
    teamBonus: {
      type: 'economic',
      description: 'Imperial Skirmisher upgrade available',
    },
  },
  // European Civilizations (additional)
  {
    id: 'bohemians',
    name: 'Bohemians',
    region: 'European',
    bonuses: [
      {
        type: 'economic',
        description: 'Blacksmith and University technologies cost -100 food',
      },
      {
        type: 'economic',
        description: 'Chemistry available in Castle Age',
      },
      {
        type: 'stat',
        units: ['spearman'],
        stat: 'attack',
        value: 'Bonus damage vs cavalry in Feudal Age',
        description: 'Spearmen deal bonus damage vs cavalry in Feudal Age',
      },
      {
        type: 'economic',
        description: 'Mining Camp technologies cost 50% less',
      },
    ],
    teamBonus: {
      type: 'economic',
      description: 'Markets work 80% faster',
    },
  },
  {
    id: 'bulgarians',
    name: 'Bulgarians',
    region: 'European',
    bonuses: [
      {
        type: 'economic',
        description: 'Militia line upgrades free',
      },
      {
        type: 'cost',
        units: ['town-center'],
        resource: 'stone',
        value: 0.5,
        description: 'Town Centers cost 50% less stone',
      },
      {
        type: 'stat',
        units: ['knight', 'cavalier', 'paladin'],
        stat: 'food-from-attacking',
        value: '+50%',
        description: 'Cavalry units +50% food from attacking',
      },
      {
        type: 'economic',
        description: 'Blacksmith and Siege Workshop technologies cost 50% less',
      },
    ],
    teamBonus: {
      type: 'economic',
      description: 'Blacksmith and Siege Workshop technologies cost 50% less',
    },
  },
  {
    id: 'burgundians',
    name: 'Burgundians',
    region: 'European',
    bonuses: [
      {
        type: 'economic',
        description: 'Economic upgrades available one age earlier',
      },
      {
        type: 'stat',
        units: ['knight', 'cavalier', 'paladin'],
        stat: 'attack',
        value: '+2 in Imperial Age',
        description: 'Cavalry receive +2 attack in Imperial Age',
      },
      {
        type: 'economic',
        description: 'Stable technologies cost 50% less',
      },
      {
        type: 'economic',
        description: 'Relics generate food in addition to gold',
      },
    ],
    teamBonus: {
      type: 'economic',
      description: 'Relics generate food in addition to gold',
    },
  },
  {
    id: 'celts',
    name: 'Celts',
    region: 'European',
    bonuses: [
      {
        type: 'stat',
        units: [
          'militiaman',
          'man-at-arms',
          'longswordsman',
          'two-handed-swordsman',
          'champion',
          'spearman',
          'pikeman',
          'halberdier',
        ],
        stat: 'speed',
        value: 0.15,
        description: 'Infantry move 15% faster',
      },
      {
        type: 'stat',
        units: ['mangonel', 'onager', 'siege-onager', 'scorpion', 'heavy-scorpion'],
        stat: 'attack-speed',
        value: 0.25,
        description: 'Siege weapons fire 25% faster',
      },
      {
        type: 'economic',
        description: 'Lumberjacks work 15% faster',
      },
    ],
    teamBonus: {
      type: 'economic',
      description: 'Siege Workshops work 20% faster',
    },
  },
  {
    id: 'cumans',
    name: 'Cumans',
    region: 'European',
    bonuses: [
      {
        type: 'stat',
        units: [
          'cavalry-archer',
          'heavy-cavalry-archer',
          'knight',
          'cavalier',
          'paladin',
          'light-cavalry',
          'hussar',
        ],
        stat: 'speed',
        value: '+5% (Imperial: +10%)',
        description: 'Cavalry and Cavalry Archers move 5% faster (Imperial Age: 10%)',
      },
      {
        type: 'stat',
        units: ['battering-ram', 'capped-ram'],
        stat: 'speed',
        value: 0.15,
        description: 'Feudal Age Battering Rams and Capped Rams move 15% faster',
      },
      {
        type: 'economic',
        description: 'Can build second Town Center in Feudal Age',
      },
      {
        type: 'economic',
        description: 'Steppe Husbandry - Steppe Lancers and Cavalry Archers created 80% faster',
      },
    ],
    teamBonus: {
      type: 'stat',
      units: ['palisade-wall'],
      description: 'Palisade Walls +33% HP',
    },
  },
  {
    id: 'huns',
    name: 'Huns',
    region: 'European',
    bonuses: [
      {
        type: 'cost',
        units: ['cavalry-archer', 'heavy-cavalry-archer'],
        resource: 'wood',
        value: 0.25,
        description: 'Cavalry Archers cost 25% less wood',
      },
      {
        type: 'economic',
        description: 'Do not need Houses, but start with -100 wood',
      },
      {
        type: 'stat',
        units: ['trebuchet'],
        stat: 'accuracy',
        value: 0.35,
        description: 'Trebuchets +35% accuracy',
      },
    ],
    teamBonus: {
      type: 'economic',
      description: 'Stables work 20% faster',
    },
  },
  {
    id: 'italians',
    name: 'Italians',
    region: 'European',
    bonuses: [
      {
        type: 'economic',
        description: 'Age advances cost 15% less',
      },
      {
        type: 'economic',
        description: 'Dock and University technologies cost 33% less',
      },
      {
        type: 'cost',
        units: ['fishing-ship', 'trade-cog', 'trade-cart'],
        resource: 'all',
        value: 0.15,
        description: 'Fishing Ships and Trade units cost 15% less',
      },
      {
        type: 'economic',
        description: 'Condottiero available - anti-gunpowder infantry',
      },
    ],
    teamBonus: {
      type: 'economic',
      description: 'Condottiero available',
    },
  },
  {
    id: 'lithuanians',
    name: 'Lithuanians',
    region: 'European',
    bonuses: [
      {
        type: 'stat',
        units: ['knight', 'cavalier', 'paladin'],
        stat: 'attack',
        value: '+1 per relic (max +4)',
        description: 'Each relic garrisoned gives Knights, Leitis +1 attack (max +4)',
      },
      {
        type: 'stat',
        units: ['spearman', 'pikeman', 'halberdier', 'skirmisher', 'elite-skirmisher'],
        stat: 'speed',
        value: 0.1,
        description: 'Spearmen and Skirmishers move 10% faster',
      },
      {
        type: 'economic',
        description: 'Start with +150 food',
      },
      {
        type: 'economic',
        description: 'Town Centers work 25% faster (in Feudal and Castle Ages)',
      },
    ],
    teamBonus: {
      type: 'economic',
      description: 'Monasteries work 20% faster',
    },
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
        description: 'Scout Cavalry line costs 15% less',
      },
      {
        type: 'stat',
        units: ['archer', 'crossbowman', 'arbalester'],
        stat: 'range',
        value: '+1 per Age (starting Feudal)',
        description: 'Foot archers +1 range per Age (starting Feudal Age)',
      },
      {
        type: 'stat',
        units: ['scout-cavalry', 'light-cavalry', 'hussar'],
        stat: 'attack',
        value: '+3 vs siege',
        description: 'Scout Cavalry line +3 attack vs siege weapons',
      },
      {
        type: 'economic',
        description: 'Villagers kill wolves in one strike',
      },
      {
        type: 'economic',
        description: 'Forging, Iron Casting, Blast Furnace free',
      },
    ],
    teamBonus: {
      type: 'stat',
      units: ['archer', 'crossbowman', 'arbalester'],
      description: 'Foot archers +2 line of sight',
    },
  },
  {
    id: 'poles',
    name: 'Poles',
    region: 'European',
    bonuses: [
      {
        type: 'stat',
        units: ['knight', 'cavalier', 'paladin'],
        stat: 'attack',
        value: '+1 vs archers',
        description: 'Knight line +1 attack vs archers',
      },
      {
        type: 'economic',
        description: 'Stone Miners generate gold in addition to stone',
      },
      {
        type: 'economic',
        description: 'Folwark (replaces Mill) - generate gold from nearby farms',
      },
    ],
    teamBonus: {
      type: 'stat',
      units: ['scout-cavalry', 'light-cavalry', 'hussar'],
      description: 'Scout Cavalry line +1 attack vs archers',
    },
  },
  {
    id: 'romans',
    name: 'Romans',
    region: 'European',
    bonuses: [
      {
        type: 'cost',
        units: ['militiaman', 'man-at-arms', 'longswordsman', 'two-handed-swordsman', 'champion'],
        resource: 'food',
        ages: { feudal: 0.1, castle: 0.15, imperial: 0.2 },
        description: 'Infantry costs 10%/15%/20% less food (Feudal/Castle/Imperial)',
      },
      {
        type: 'stat',
        units: ['scorpion', 'heavy-scorpion'],
        stat: 'speed',
        value: 0.25,
        description: 'Scorpions +25% faster',
      },
      {
        type: 'economic',
        description: 'Buildings cost -5% wood Feudal, -10% Castle, -15% Imperial',
      },
    ],
    teamBonus: {
      type: 'stat',
      units: ['scorpion', 'heavy-scorpion'],
      description: 'Scorpions +2 line of sight',
    },
  },
  {
    id: 'sicilians',
    name: 'Sicilians',
    region: 'European',
    bonuses: [
      {
        type: 'stat',
        units: 'all',
        stat: 'damage-reduction',
        value: '50% of bonus damage',
        description: 'Land military units absorb 50% of incoming bonus damage',
      },
      {
        type: 'cost',
        units: ['castle'],
        resource: 'stone',
        value: 0.5,
        description: 'Castles cost 50% less stone',
      },
      {
        type: 'economic',
        description: 'Farm upgrades provide +100% additional food (not +50%)',
      },
      {
        type: 'economic',
        description: 'Can build Town Centers starting in Feudal Age with Serjeant',
      },
    ],
    teamBonus: {
      type: 'stat',
      units: ['transport-ship'],
      description: 'Transport Ships +5 carry capacity and +50% HP',
    },
  },
  {
    id: 'slavs',
    name: 'Slavs',
    region: 'European',
    bonuses: [
      {
        type: 'economic',
        description: 'Military buildings provide +5 population (instead of 0)',
      },
      {
        type: 'cost',
        units: [
          'mangonel',
          'onager',
          'siege-onager',
          'scorpion',
          'heavy-scorpion',
          'battering-ram',
          'capped-ram',
          'siege-ram',
        ],
        resource: 'all',
        value: 0.15,
        description: 'Siege units 15% cheaper',
      },
      {
        type: 'economic',
        description: 'Farmers work 10% faster',
      },
      {
        type: 'economic',
        description: 'Supplies (Man-at-Arms upgrade) free',
      },
    ],
    teamBonus: {
      type: 'economic',
      description: 'Military buildings provide +5 population',
    },
  },
  {
    id: 'spanish',
    name: 'Spanish',
    region: 'European',
    bonuses: [
      {
        type: 'economic',
        description: 'Blacksmith upgrades cost no gold',
      },
      {
        type: 'stat',
        units: ['hand-cannoneer', 'bombard-cannon'],
        stat: 'attack-speed',
        value: 0.18,
        description: 'Gunpowder units fire 18% faster',
      },
      {
        type: 'economic',
        description: 'Builders work 30% faster',
      },
    ],
    teamBonus: {
      type: 'economic',
      description: 'Trade units generate +25% gold (33% with Guilds)',
    },
  },
  {
    id: 'teutons',
    name: 'Teutons',
    region: 'European',
    bonuses: [
      {
        type: 'stat',
        units: ['monk'],
        stat: 'healing-range',
        value: '2x',
        description: 'Monks have 2x healing range',
      },
      {
        type: 'stat',
        units: ['town-center'],
        stat: 'garrison',
        value: '+10 units, +5 attack',
        description: 'Town Centers garrison +10 units and +5 attack',
      },
      {
        type: 'economic',
        description: 'Murder Holes free',
      },
      {
        type: 'economic',
        description: 'Farms cost 40% less',
      },
      {
        type: 'economic',
        description: 'Herbal Medicine free',
      },
    ],
    teamBonus: {
      type: 'stat',
      units: ['all'],
      description: 'Units resist conversion better',
    },
  },
  {
    id: 'vikings',
    name: 'Vikings',
    region: 'European',
    bonuses: [
      {
        type: 'cost',
        units: [
          'militiaman',
          'man-at-arms',
          'longswordsman',
          'two-handed-swordsman',
          'champion',
          'spearman',
          'pikeman',
          'halberdier',
        ],
        resource: 'all',
        ages: { feudal: 0.15, castle: 0.2, imperial: 0.25 },
        description: 'Infantry costs 15%/20%/25% less (Feudal/Castle/Imperial)',
      },
      {
        type: 'cost',
        units: ['galley', 'war-galley', 'galleon'],
        resource: 'all',
        ages: { feudal: 0.15, castle: 0.15, imperial: 0.2 },
        description: 'Warships cost 15% less Feudal/Castle, 20% less Imperial',
      },
      {
        type: 'economic',
        description: 'Wheelbarrow and Hand Cart free',
      },
    ],
    teamBonus: {
      type: 'economic',
      description: 'Docks cost 25% less',
    },
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
        description: 'Spearman line costs 25% less food',
      },
      {
        type: 'stat',
        units: ['knight', 'cavalier', 'paladin'],
        stat: 'hp',
        value: '+25% vs archers',
        description: 'Cavalry +25% HP against archers',
      },
      {
        type: 'economic',
        description: 'Mule Carts replace villagers for resource gathering (except food)',
      },
      {
        type: 'economic',
        description: 'Fortress upgrades cost 50% less',
      },
    ],
    teamBonus: {
      type: 'stat',
      units: ['monastery'],
      description: 'Fortified Churches (Monasteries have +3 range to convert)',
    },
  },
  {
    id: 'georgians',
    name: 'Georgians',
    region: 'Middle Eastern',
    bonuses: [
      {
        type: 'cost',
        units: ['knight', 'cavalier', 'paladin'],
        resource: 'food',
        ages: { feudal: 0.1, castle: 0.15, imperial: 0.2 },
        description: 'Cavalry cost 10%/15%/20% less food (Feudal/Castle/Imperial)',
      },
      {
        type: 'stat',
        units: ['knight', 'cavalier', 'paladin'],
        stat: 'attack',
        value: '+25% vs buildings',
        description: 'Cavalry deal +25% damage to buildings',
      },
      {
        type: 'economic',
        description: 'Start with +150 stone',
      },
      {
        type: 'economic',
        description: 'Fortifications cost 50% less stone starting in Castle Age',
      },
    ],
    teamBonus: {
      type: 'stat',
      units: ['wall', 'tower'],
      description: 'Walls and towers have +35% HP',
    },
  },
  {
    id: 'saracens',
    name: 'Saracens',
    region: 'Middle Eastern',
    bonuses: [
      {
        type: 'stat',
        units: ['archer', 'crossbowman', 'arbalester'],
        stat: 'attack',
        value: '+4 vs buildings (+7 after Siege Engineers)',
        description: 'Foot archers +4 attack vs buildings (+7 after Siege Engineers)',
      },
      {
        type: 'stat',
        units: ['cavalry-archer', 'heavy-cavalry-archer'],
        stat: 'attack',
        value: '+4 vs buildings',
        description: 'Cavalry Archers +4 attack vs buildings',
      },
      {
        type: 'stat',
        units: ['transport-ship'],
        stat: 'capacity',
        value: '+5',
        description: 'Transport Ships +5 carry capacity',
      },
      {
        type: 'stat',
        units: ['transport-ship'],
        stat: 'hp',
        value: '2x',
        description: 'Transport Ships 2x HP',
      },
      {
        type: 'stat',
        units: ['galley', 'war-galley', 'galleon'],
        stat: 'attack-speed',
        value: 0.2,
        description: 'Galleys attack 20% faster',
      },
      {
        type: 'economic',
        description: 'Market trade cost only 5%',
      },
    ],
    teamBonus: {
      type: 'stat',
      units: ['archer', 'crossbowman', 'arbalester'],
      description: 'Foot archers +2 attack vs buildings',
    },
  },
  {
    id: 'turks',
    name: 'Turks',
    region: 'Middle Eastern',
    bonuses: [
      {
        type: 'stat',
        units: ['hand-cannoneer', 'bombard-cannon'],
        stat: 'hp',
        value: 0.25,
        description: 'Gunpowder units +25% HP',
      },
      {
        type: 'economic',
        description: 'Gunpowder technologies free',
      },
      {
        type: 'economic',
        description: 'Gold Miners work 20% faster',
      },
      {
        type: 'economic',
        description: 'Light Cavalry and Hussar free upgrades',
      },
      {
        type: 'economic',
        description: 'Chemistry available in Castle Age',
      },
    ],
    teamBonus: {
      type: 'economic',
      description: 'Gunpowder units created 25% faster',
    },
  },
  // Asian Civilizations (The Three Kingdoms expansion)
  {
    id: 'jurchens',
    name: 'Jurchens',
    region: 'Asian',
    bonuses: [
      {
        type: 'economic',
        description: 'Animals killed by Jurchen units or buildings do not decay',
      },
      {
        type: 'stat',
        units: [
          'scout-cavalry',
          'light-cavalry',
          'hussar',
          'cavalry-archer',
          'heavy-cavalry-archer',
        ],
        stat: 'attack-speed',
        value: 0.2,
        description: 'Mounted units and Fire Lancers attack 20% faster',
      },
    ],
    teamBonus: {
      type: 'stat',
      description: 'Gunpowder units +2 Line of Sight',
    },
  },
  {
    id: 'khitans',
    name: 'Khitans',
    region: 'Asian',
    bonuses: [
      {
        type: 'stat',
        units: 'all',
        stat: 'attack',
        value: 'Forging and Iron Casting effects doubled',
        description: 'Forging and Iron Casting effects doubled',
      },
      {
        type: 'economic',
        description: 'Skirmishers, Genitours, Spearman and Scout Cavalry lines trained 25% faster',
      },
      {
        type: 'economic',
        description: 'Heavy Cavalry Archer upgrade available in Castle Age, costs -50%',
      },
    ],
    teamBonus: {
      type: 'stat',
      description: 'Infantry units +2 attack vs ranged soldiers',
    },
  },
  {
    id: 'shu',
    name: 'Shu',
    region: 'Asian',
    bonuses: [
      {
        type: 'economic',
        description: 'Lumberjacks generate 0.9 food for every 10 wood',
      },
      {
        type: 'cost',
        units: 'all' as unknown as string[],
        resource: 'all',
        value: 0.25,
        description: 'Archery unit technologies at Archery Range and Blacksmith cost -25%',
      },
      {
        type: 'stat',
        units: 'all',
        stat: 'speed',
        value: 0.1,
        description:
          'Siege weapons, War Chariots, Lou Chuans move +10/15% faster in Castle/Imperial Age',
      },
    ],
    teamBonus: {
      type: 'stat',
      description: 'Foot archer units (except Skirmishers) +2 Line of Sight',
    },
  },
  {
    id: 'wei',
    name: 'Wei',
    region: 'Asian',
    bonuses: [
      {
        type: 'economic',
        description: 'Tuntian: Soldiers passively produce food',
      },
      {
        type: 'stat',
        units: 'all',
        stat: 'armor',
        value: 'Ming Guang Armor: Mounted units +4 melee armor',
        description: 'Ming Guang Armor: Mounted units +4 melee armor',
      },
      {
        type: 'economic',
        description: 'Receive one free Villager for each economic technology researched',
      },
      {
        type: 'stat',
        units: 'all',
        stat: 'hp',
        value: 'Hei Guang Cavalry and Xianbei Raider +20/30% HP in Castle/Imperial Age',
        description: 'Hei Guang Cavalry and Xianbei Raider +20/30% HP in Castle/Imperial Age',
      },
    ],
    teamBonus: {
      type: 'stat',
      description: 'Cavalry units +2 attack vs siege weapons',
    },
  },
  {
    id: 'wu',
    name: 'Wu',
    region: 'Asian',
    bonuses: [
      {
        type: 'economic',
        description:
          'Barracks, Archery Ranges, Stables, Siege Workshops, Castles, Docks provide +55 food when constructed',
      },
      {
        type: 'stat',
        units: 'all',
        stat: 'hp',
        value: 'Infantry regenerate 10/20/30 HP per minute in Feudal/Castle/Imperial Age',
        description: 'Infantry regenerate 10/20/30 HP per minute in Feudal/Castle/Imperial Age',
      },
    ],
    teamBonus: {
      type: 'economic',
      description: 'Houses built extremely fast',
    },
  },
];

/**
 * Get civilization by ID
 * @param civId - Civilization identifier
 * @returns Civilization data or undefined if not found
 */
export const getCivilizationById = (civId: string): Civilization | undefined =>
  civilizations.find((civ) => civ.id === civId);

/**
 * Get civilizations by region
 * @param region - Geographic region
 * @returns Array of civilizations in that region
 */
export const getCivilizationsByRegion = (region: string): Civilization[] =>
  civilizations.filter((civ) => civ.region === region);
