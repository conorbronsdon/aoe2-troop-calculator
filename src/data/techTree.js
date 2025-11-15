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
      'hand-cannoneer',
      'imperial-skirmisher'
    ]
  },

  mayans: {
    missingUnits: [
      'scout-cavalry', 'light-cavalry', 'hussar',
      'knight', 'cavalier', 'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'cavalry-archer', 'heavy-cavalry-archer',
      'imperial-skirmisher'
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
      'hand-cannoneer',
      'imperial-skirmisher'
    ]
  },

  // European Civilizations
  britons: {
    missingUnits: [
      'paladin', 'battle-elephant', 'elite-battle-elephant',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  byzantines: {
    missingUnits: [
      'paladin', 'battle-elephant', 'elite-battle-elephant',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  celts: {
    missingUnits: [
      'hand-cannoneer',
      'cavalry-archer', 'heavy-cavalry-archer',
      'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  franks: {
    missingUnits: [
      'pikeman', 'halberdier',
      'arbalester',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  goths: {
    missingUnits: [
      'hand-cannoneer',
      'cavalry-archer', 'heavy-cavalry-archer',
      'camel', 'heavy-camel', 'imperial-camel',
      'paladin',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  teutons: {
    missingUnits: [
      'cavalry-archer', 'heavy-cavalry-archer',
      'hussar',
      'arbalester',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  vikings: {
    missingUnits: [
      'knight', 'cavalier', 'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'cavalry-archer', 'heavy-cavalry-archer',
      'hand-cannoneer',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  spanish: {
    missingUnits: [
      'heavy-cavalry-archer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  huns: {
    missingUnits: [
      'pikeman', 'halberdier',
      'hand-cannoneer',
      'camel', 'heavy-camel', 'imperial-camel',
      'paladin',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  italians: {
    missingUnits: [
      'halberdier',
      'heavy-cavalry-archer',
      'paladin',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  magyars: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'camel', 'heavy-camel', 'imperial-camel',
      'paladin',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  slavs: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'cavalry-archer', 'heavy-cavalry-archer',
      'camel', 'heavy-camel', 'imperial-camel',
      'paladin',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  portuguese: {
    missingUnits: [
      'halberdier',
      'heavy-cavalry-archer',
      'paladin',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  bulgarians: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'camel', 'heavy-camel', 'imperial-camel',
      'paladin',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  lithuanians: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'camel', 'heavy-camel', 'imperial-camel',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  cumans: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'champion',
      'paladin',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  bohemians: {
    missingUnits: [
      'cavalry-archer', 'heavy-cavalry-archer',
      'camel', 'heavy-camel', 'imperial-camel',
      'paladin',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  burgundians: {
    missingUnits: [
      'halberdier',
      'arbalester',
      'camel', 'heavy-camel', 'imperial-camel',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  poles: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'cavalry-archer', 'heavy-cavalry-archer',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  sicilians: {
    missingUnits: [
      'arbalester',
      'cavalry-archer', 'heavy-cavalry-archer',
      'camel', 'heavy-camel', 'imperial-camel',
      'hussar',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  romans: {
    missingUnits: [
      'cavalry-archer', 'heavy-cavalry-archer',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'paladin',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  // Asian Civilizations
  chinese: {
    missingUnits: [
      'paladin', 'imperial-camel',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  japanese: {
    missingUnits: [
      'cavalry-archer', 'heavy-cavalry-archer',
      'hand-cannoneer',
      'camel', 'heavy-camel', 'imperial-camel',
      'paladin',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  koreans: {
    missingUnits: [
      'paladin',
      'cavalry-archer', 'heavy-cavalry-archer',
      'camel', 'heavy-camel', 'imperial-camel',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  mongols: {
    missingUnits: [
      'champion',
      'halberdier',
      'hand-cannoneer',
      'camel', 'heavy-camel', 'imperial-camel',
      'paladin',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  vietnamese: {
    missingUnits: [
      'halberdier',
      'paladin',
      'hand-cannoneer',
      'camel', 'heavy-camel', 'imperial-camel',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior'
    ]
  },

  bengalis: {
    missingUnits: [
      'paladin',
      'hand-cannoneer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  burmese: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'paladin',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  dravidians: {
    missingUnits: [
      'cavalry-archer', 'heavy-cavalry-archer',
      'knight', 'cavalier', 'paladin',
      'hussar',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  gurjaras: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  hindustanis: {
    missingUnits: [
      'arbalester',
      'paladin',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  khmer: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'camel', 'heavy-camel', 'imperial-camel',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  malay: {
    missingUnits: [
      'halberdier',
      'arbalester',
      'hand-cannoneer',
      'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  tatars: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'halberdier',
      'paladin',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  // African Civilizations
  berbers: {
    missingUnits: [
      'halberdier',
      'arbalester',
      'hand-cannoneer',
      'paladin',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  ethiopians: {
    missingUnits: [
      'hand-cannoneer',
      'hussar',
      'paladin',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  malians: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'cavalry-archer', 'heavy-cavalry-archer',
      'paladin',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  // Middle Eastern Civilizations
  persians: {
    missingUnits: [
      'arbalester',
      'halberdier',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  saracens: {
    missingUnits: [
      'halberdier',
      'arbalester',
      'paladin',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  turks: {
    missingUnits: [
      'elite-skirmisher', 'imperial-skirmisher',
      'pikeman', 'halberdier',
      'arbalester',
      'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior'
    ]
  },

  armenians: {
    missingUnits: [
      'hussar',
      'hand-cannoneer',
      'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  georgians: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'camel', 'heavy-camel', 'imperial-camel',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  // The Three Kingdoms Civilizations
  jurchens: {
    missingUnits: [
      'longswordsman', 'two-handed-swordsman', 'champion',
      'knight', 'cavalier', 'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'arbalester',
      'hand-cannoneer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  khitans: {
    missingUnits: [
      'galleon',
      'heavy-demolition-ship',
      'elite-cannon-galleon',
      'heavy-scorpion',
      'paladin',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  shu: {
    missingUnits: [
      'knight', 'cavalier', 'paladin',
      'trebuchet',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  wei: {
    missingUnits: [
      'knight', 'cavalier', 'paladin',
      'trebuchet',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
    ]
  },

  wu: {
    missingUnits: [
      'knight', 'cavalier', 'paladin',
      'capped-ram', 'siege-ram',
      'trebuchet',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher'
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
