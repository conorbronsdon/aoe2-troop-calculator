/**
 * Technology Tree Restrictions by Civilization
 * Defines which units each civilization CANNOT build
 * Based on Age of Empires II: Definitive Edition
 */

export const techTreeRestrictions = {
  // Generic has no restrictions
  generic: {
    missingUnits: []
  },

  // American Civilizations - No cavalry (except Eagle Warriors)
  aztecs: {
    missingUnits: [
      'scout-cavalry', 'light-cavalry', 'hussar',
      'knight', 'cavalier', 'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'cavalry-archer', 'heavy-cavalry-archer',
      'hand-cannoneer'
    ]
  },

  mayans: {
    missingUnits: [
      'scout-cavalry', 'light-cavalry', 'hussar',
      'knight', 'cavalier', 'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'cavalry-archer', 'heavy-cavalry-archer'
    ]
  },

  incas: {
    missingUnits: [
      'scout-cavalry', 'light-cavalry', 'hussar',
      'knight', 'cavalier', 'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'cavalry-archer', 'heavy-cavalry-archer',
      'hand-cannoneer'
    ]
  },

  // European Civilizations
  britons: {
    missingUnits: ['paladin', 'battle-elephant', 'elite-battle-elephant']
  },

  byzantines: {
    missingUnits: ['paladin', 'battle-elephant', 'elite-battle-elephant']
  },

  celts: {
    missingUnits: [
      'hand-cannoneer',
      'cavalry-archer', 'heavy-cavalry-archer',
      'paladin',
      'camel', 'heavy-camel', 'imperial-camel'
    ]
  },

  franks: {
    missingUnits: [
      'pikeman', 'halberdier',
      'arbalester',
      'imperial-skirmisher'
    ]
  },

  goths: {
    missingUnits: [
      'hand-cannoneer',
      'cavalry-archer', 'heavy-cavalry-archer',
      'camel', 'heavy-camel', 'imperial-camel',
      'paladin'
    ]
  },

  teutons: {
    missingUnits: [
      'cavalry-archer', 'heavy-cavalry-archer',
      'hussar',
      'arbalester'
    ]
  },

  vikings: {
    missingUnits: [
      'knight', 'cavalier', 'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'cavalry-archer', 'heavy-cavalry-archer',
      'hand-cannoneer',
      'steppe-lancer', 'elite-steppe-lancer'
    ]
  },

  spanish: {
    missingUnits: [
      'heavy-cavalry-archer',
      'imperial-skirmisher'
    ]
  },

  huns: {
    missingUnits: [
      'pikeman', 'halberdier',
      'hand-cannoneer',
      'camel', 'heavy-camel', 'imperial-camel',
      'paladin'
    ]
  },

  italians: {
    missingUnits: [
      'halberdier',
      'heavy-cavalry-archer',
      'paladin'
    ]
  },

  magyars: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'camel', 'heavy-camel', 'imperial-camel',
      'paladin'
    ]
  },

  slavs: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'cavalry-archer', 'heavy-cavalry-archer',
      'camel', 'heavy-camel', 'imperial-camel',
      'paladin'
    ]
  },

  portuguese: {
    missingUnits: [
      'halberdier',
      'heavy-cavalry-archer',
      'paladin'
    ]
  },

  bulgarians: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'camel', 'heavy-camel', 'imperial-camel',
      'paladin'
    ]
  },

  lithuanians: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'camel', 'heavy-camel', 'imperial-camel'
    ]
  },

  cumans: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'champion',
      'paladin'
    ]
  },

  bohemians: {
    missingUnits: [
      'cavalry-archer', 'heavy-cavalry-archer',
      'camel', 'heavy-camel', 'imperial-camel',
      'paladin'
    ]
  },

  burgundians: {
    missingUnits: [
      'halberdier',
      'arbalester',
      'camel', 'heavy-camel', 'imperial-camel'
    ]
  },

  poles: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'cavalry-archer', 'heavy-cavalry-archer',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant'
    ]
  },

  sicilians: {
    missingUnits: [
      'arbalester',
      'cavalry-archer', 'heavy-cavalry-archer',
      'camel', 'heavy-camel', 'imperial-camel',
      'hussar'
    ]
  },

  romans: {
    missingUnits: [
      'cavalry-archer', 'heavy-cavalry-archer',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'paladin'
    ]
  },

  // Asian Civilizations
  chinese: {
    missingUnits: ['paladin', 'imperial-camel']
  },

  japanese: {
    missingUnits: [
      'cavalry-archer', 'heavy-cavalry-archer',
      'hand-cannoneer',
      'camel', 'heavy-camel', 'imperial-camel',
      'paladin'
    ]
  },

  koreans: {
    missingUnits: [
      'paladin',
      'cavalry-archer', 'heavy-cavalry-archer',
      'camel', 'heavy-camel', 'imperial-camel'
    ]
  },

  mongols: {
    missingUnits: [
      'champion',
      'halberdier',
      'hand-cannoneer',
      'camel', 'heavy-camel', 'imperial-camel',
      'paladin'
    ]
  },

  vietnamese: {
    missingUnits: [
      'halberdier',
      'paladin',
      'hand-cannoneer',
      'camel', 'heavy-camel', 'imperial-camel'
    ]
  },

  bengalis: {
    missingUnits: [
      'paladin',
      'hand-cannoneer'
    ]
  },

  burmese: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'paladin'
    ]
  },

  dravidians: {
    missingUnits: [
      'cavalry-archer', 'heavy-cavalry-archer',
      'knight', 'cavalier', 'paladin',
      'hussar'
    ]
  },

  gurjaras: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer'
    ]
  },

  hindustanis: {
    missingUnits: [
      'arbalester',
      'paladin'
    ]
  },

  khmer: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'camel', 'heavy-camel', 'imperial-camel'
    ]
  },

  malay: {
    missingUnits: [
      'halberdier',
      'arbalester',
      'hand-cannoneer',
      'paladin',
      'camel', 'heavy-camel', 'imperial-camel'
    ]
  },

  tatars: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'halberdier',
      'paladin'
    ]
  },

  // African Civilizations
  berbers: {
    missingUnits: [
      'halberdier',
      'arbalester',
      'hand-cannoneer',
      'paladin'
    ]
  },

  ethiopians: {
    missingUnits: [
      'hand-cannoneer',
      'hussar',
      'paladin'
    ]
  },

  malians: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'cavalry-archer', 'heavy-cavalry-archer',
      'paladin'
    ]
  },

  // Middle Eastern Civilizations
  persians: {
    missingUnits: [
      'arbalester',
      'halberdier',
      'imperial-skirmisher'
    ]
  },

  saracens: {
    missingUnits: [
      'halberdier',
      'arbalester',
      'paladin'
    ]
  },

  turks: {
    missingUnits: [
      'elite-skirmisher', 'imperial-skirmisher',
      'pikeman', 'halberdier',
      'arbalester',
      'paladin',
      'camel', 'heavy-camel', 'imperial-camel'
    ]
  },

  armenians: {
    missingUnits: [
      'hussar',
      'hand-cannoneer',
      'paladin',
      'camel', 'heavy-camel', 'imperial-camel'
    ]
  },

  georgians: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'camel', 'heavy-camel', 'imperial-camel'
    ]
  },

  // The Three Kingdoms Civilizations
  jurchens: {
    missingUnits: [
      'longswordsman', 'two-handed-swordsman', 'champion',
      'knight', 'cavalier', 'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'arbalester',
      'hand-cannoneer'
    ]
  },

  khitans: {
    missingUnits: [
      'galleon',
      'heavy-demolition-ship',
      'elite-cannon-galleon',
      'heavy-scorpion',
      'paladin'
    ]
  },

  shu: {
    missingUnits: [
      'knight', 'cavalier', 'paladin',
      'trebuchet'
    ]
  },

  wei: {
    missingUnits: [
      'knight', 'cavalier', 'paladin',
      'trebuchet'
    ]
  },

  wu: {
    missingUnits: [
      'knight', 'cavalier', 'paladin',
      'capped-ram', 'siege-ram',
      'trebuchet'
    ]
  }
};

/**
 * Check if a civilization can build a specific unit
 * @param {string} civId - Civilization ID
 * @param {string} unitId - Unit ID
 * @returns {boolean} True if the civilization can build this unit
 */
export const canCivBuildUnit = (civId, unitId) => {
  // Generic civilization can build everything
  if (civId === 'generic' || !civId) {
    return true;
  }

  // Get tech tree restrictions for this civilization
  const restrictions = techTreeRestrictions[civId];

  // If no restrictions defined, assume they can build everything
  if (!restrictions) {
    return true;
  }

  // Check if unit is in the missing units list
  return !restrictions.missingUnits.includes(unitId);
};

/**
 * Get all units that a civilization cannot build
 * @param {string} civId - Civilization ID
 * @returns {Array<string>} Array of unit IDs that cannot be built
 */
export const getMissingUnitsForCiv = (civId) => {
  if (civId === 'generic' || !civId) {
    return [];
  }

  const restrictions = techTreeRestrictions[civId];
  return restrictions ? restrictions.missingUnits : [];
};
