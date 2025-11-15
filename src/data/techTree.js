/**
 * Technology Tree Restrictions by Civilization
 * Defines which units each civilization CANNOT build
 * Based on Age of Empires II: Definitive Edition (Updated November 2025)
 *
 * Regional units:
 * - Eagle Warriors: Aztecs, Mayans, Incas only
 * - Battle Elephants: Bengalis, Burmese, Dravidians, Khmer, Malay, Vietnamese only
 * - Steppe Lancers: Cumans, Mongols, Tatars, Jurchens, Khitans only
 * - Imperial Camel: Hindustanis only
 * - Slinger: Incas only
 * - Genitour: Berbers only
 * - Missionary: Spanish only
 * - Imperial Skirmisher: Vietnamese only (team bonus unit)
 * - Traction Trebuchet: Shu, Wei, Wu only (replaces Trebuchet)
 * - Hei Guang Cavalry: Shu, Wei, Wu only (replaces Knight line)
 * - Legionary: Romans only (replaces Two-Handed Swordsman/Champion)
 * - Savar: Persians only (replaces Paladin)
 */

export const techTreeRestrictions = {
  // Generic has no restrictions
  generic: {
    missingUnits: []
  },

  // American Civilizations - No cavalry (except Eagle Warriors)
  aztecs: {
    missingUnits: [
      'scout', 'light-cavalry', 'hussar',
      'knight', 'cavalier', 'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'cavalry-archer', 'heavy-cavalry-archer',
      'hand-cannoneer',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  mayans: {
    missingUnits: [
      'scout', 'light-cavalry', 'hussar',
      'knight', 'cavalier', 'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'cavalry-archer', 'heavy-cavalry-archer',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  incas: {
    missingUnits: [
      'scout', 'light-cavalry', 'hussar',
      'knight', 'cavalier', 'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'cavalry-archer', 'heavy-cavalry-archer',
      'hand-cannoneer',
      'imperial-skirmisher',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  // European Civilizations
  britons: {
    missingUnits: [
      'paladin',
      'hussar',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  byzantines: {
    missingUnits: [
      'paladin',
      'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  celts: {
    missingUnits: [
      'hand-cannoneer',
      'arbalester',
      'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  franks: {
    missingUnits: [
      'arbalester',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  goths: {
    missingUnits: [
      'camel', 'heavy-camel', 'imperial-camel',
      'paladin',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  teutons: {
    missingUnits: [
      'cavalry-archer', 'heavy-cavalry-archer',
      'light-cavalry', 'hussar',
      'arbalester',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  vikings: {
    missingUnits: [
      'paladin',
      'hussar',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'cavalry-archer', 'heavy-cavalry-archer',
      'hand-cannoneer',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  spanish: {
    missingUnits: [
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour'
    ]
  },

  huns: {
    missingUnits: [
      'halberdier',
      'hand-cannoneer',
      'arbalester',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  italians: {
    missingUnits: [
      'halberdier',
      'heavy-cavalry-archer',
      'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  magyars: {
    missingUnits: [
      'hand-cannoneer',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  slavs: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'camel', 'heavy-camel', 'imperial-camel',
      'paladin',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  portuguese: {
    missingUnits: [
      'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  bulgarians: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'champion',
      'camel', 'heavy-camel', 'imperial-camel',
      'paladin',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  lithuanians: {
    missingUnits: [
      'arbalester',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  cumans: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  bohemians: {
    missingUnits: [
      'cavalry-archer', 'heavy-cavalry-archer',
      'hussar',
      'camel', 'heavy-camel', 'imperial-camel',
      'paladin',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  burgundians: {
    missingUnits: [
      'arbalester',
      'heavy-cavalry-archer',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  poles: {
    missingUnits: [
      'hand-cannoneer',
      'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  sicilians: {
    missingUnits: [
      'heavy-cavalry-archer',
      'hand-cannoneer',
      'camel', 'heavy-camel', 'imperial-camel',
      'hussar',
      'paladin',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  romans: {
    missingUnits: [
      'cavalry-archer', 'heavy-cavalry-archer',
      'hand-cannoneer',
      'arbalester',
      'two-handed-swordsman', 'champion',
      'hussar',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'paladin',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  // Asian Civilizations
  chinese: {
    missingUnits: [
      'paladin', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  japanese: {
    missingUnits: [
      'camel', 'heavy-camel', 'imperial-camel',
      'paladin',
      'hussar',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  koreans: {
    missingUnits: [
      'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  mongols: {
    missingUnits: [
      'halberdier',
      'hand-cannoneer',
      'camel', 'heavy-camel', 'imperial-camel',
      'paladin',
      'battle-elephant', 'elite-battle-elephant',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  vietnamese: {
    missingUnits: [
      'paladin',
      'hussar',
      'hand-cannoneer',
      'camel', 'heavy-camel', 'imperial-camel',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  bengalis: {
    missingUnits: [
      'paladin',
      'hand-cannoneer',
      'camel', 'heavy-camel', 'imperial-camel',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  burmese: {
    missingUnits: [
      'arbalester',
      'hand-cannoneer',
      'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  dravidians: {
    missingUnits: [
      'cavalry-archer', 'heavy-cavalry-archer',
      'knight', 'cavalier', 'paladin',
      'hussar',
      'camel', 'heavy-camel', 'imperial-camel',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  gurjaras: {
    missingUnits: [
      'arbalester',
      'pikeman', 'halberdier',
      'knight', 'cavalier', 'paladin',
      'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  hindustanis: {
    missingUnits: [
      'arbalester',
      'knight', 'cavalier', 'paladin',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  khmer: {
    missingUnits: [
      'champion',
      'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  malay: {
    missingUnits: [
      'champion',
      'paladin',
      'hussar',
      'camel', 'heavy-camel', 'imperial-camel',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  tatars: {
    missingUnits: [
      'arbalester',
      'champion',
      'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  // African Civilizations
  berbers: {
    missingUnits: [
      'halberdier',
      'arbalester',
      'paladin',
      'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'missionary'
    ]
  },

  ethiopians: {
    missingUnits: [
      'hand-cannoneer',
      'champion',
      'paladin',
      'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  malians: {
    missingUnits: [
      'halberdier',
      'paladin',
      'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  // Middle Eastern Civilizations
  persians: {
    missingUnits: [
      'arbalester',
      'champion',
      'paladin',
      'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  saracens: {
    missingUnits: [
      'halberdier',
      'cavalier', 'paladin',
      'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  turks: {
    missingUnits: [
      'elite-skirmisher', 'imperial-skirmisher',
      'pikeman', 'halberdier',
      'arbalester',
      'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  armenians: {
    missingUnits: [
      'hussar',
      'hand-cannoneer',
      'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  georgians: {
    missingUnits: [
      'arbalester',
      'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
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
      'battle-elephant', 'elite-battle-elephant',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  khitans: {
    missingUnits: [
      'galleon',
      'heavy-demolition-ship',
      'elite-cannon-galleon',
      'heavy-scorpion',
      'halberdier',
      'paladin',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  shu: {
    missingUnits: [
      'knight', 'cavalier', 'paladin',
      'scorpion', 'heavy-scorpion',
      'trebuchet',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  wei: {
    missingUnits: [
      'knight', 'cavalier', 'paladin',
      'champion',
      'arbalester',
      'trebuchet',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
    ]
  },

  wu: {
    missingUnits: [
      'knight', 'cavalier', 'paladin',
      'capped-ram', 'siege-ram',
      'trebuchet',
      'camel', 'heavy-camel', 'imperial-camel',
      'battle-elephant', 'elite-battle-elephant',
      'steppe-lancer', 'elite-steppe-lancer',
      'eagle-scout', 'eagle-warrior', 'elite-eagle-warrior',
      'imperial-skirmisher',
      'slinger',
      'genitour', 'elite-genitour',
      'missionary'
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
