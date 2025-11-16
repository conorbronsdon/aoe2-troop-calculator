/**
 * Preset Army Compositions (Meta Builds)
 *
 * Pre-configured army compositions for common strategies and builds.
 * Organized by category: Castle Age Rushes, Imperial Age Compositions,
 * Civilization-Specific Builds, and Beginner Templates.
 */

export const presetCategories = [
  {
    id: 'castle-age-rushes',
    name: 'Castle Age Rushes',
    description: 'Aggressive early compositions for Castle Age timing pushes',
  },
  {
    id: 'imperial-compositions',
    name: 'Imperial Age Compositions',
    description: 'Late-game army compositions for Imperial Age battles',
  },
  {
    id: 'civ-specific',
    name: 'Civilization-Specific',
    description: 'Optimized builds leveraging unique civilization strengths',
  },
  {
    id: 'beginner',
    name: 'Beginner Templates',
    description: 'Simple, balanced compositions for learning the game',
  },
];

export const presets = [
  // ========== CASTLE AGE RUSHES ==========
  {
    id: 'knight-rush',
    name: 'Knight Rush',
    category: 'castle-age-rushes',
    description:
      'Classic Castle Age aggression with heavy cavalry. Best with Franks, Teutons, or Lithuanians.',
    recommendedCivs: ['franks', 'teutons', 'lithuanians'],
    composition: {
      knight: 10,
      'light-cavalry': 4,
    },
    config: {
      selectedAge: 'castle',
      populationCap: 200,
    },
  },
  {
    id: 'crossbow-push',
    name: 'Crossbow Push',
    category: 'castle-age-rushes',
    description: 'Mass crossbows with pike support. Excellent with Britons, Mayans, or Ethiopians.',
    recommendedCivs: ['britons', 'mayans', 'ethiopians'],
    composition: {
      crossbowman: 25,
      pikeman: 8,
    },
    config: {
      selectedAge: 'castle',
      populationCap: 200,
    },
  },
  {
    id: 'eagle-rush',
    name: 'Eagle Warrior Rush',
    category: 'castle-age-rushes',
    description: 'Fast raiding with Eagle Warriors. Meso-American civilizations only.',
    recommendedCivs: ['aztecs', 'mayans', 'incas'],
    composition: {
      'eagle-warrior': 15,
      'elite-skirmisher': 10,
    },
    config: {
      selectedAge: 'castle',
      populationCap: 200,
    },
  },
  {
    id: 'camel-push',
    name: 'Camel Counter Push',
    category: 'castle-age-rushes',
    description: 'Anti-cavalry composition with camels and crossbows. Great against knight civs.',
    recommendedCivs: ['saracens', 'berbers', 'hindustanis'],
    composition: {
      camel: 12,
      crossbowman: 15,
    },
    config: {
      selectedAge: 'castle',
      populationCap: 200,
    },
  },
  {
    id: 'monk-siege-push',
    name: 'Monk Siege Push',
    category: 'castle-age-rushes',
    description: 'Defensive monk/siege strategy. Monks convert while siege provides support.',
    recommendedCivs: ['aztecs', 'spanish', 'burmese'],
    composition: {
      monk: 8,
      mangonel: 4,
      pikeman: 10,
    },
    config: {
      selectedAge: 'castle',
      populationCap: 200,
    },
  },

  // ========== IMPERIAL AGE COMPOSITIONS ==========
  {
    id: 'paladin-siege',
    name: 'Paladin + Siege',
    category: 'imperial-compositions',
    description:
      'Heavy cavalry with siege support. Paladins tank while siege clears infantry masses.',
    recommendedCivs: ['franks', 'teutons', 'persians', 'lithuanians'],
    composition: {
      paladin: 30,
      'siege-ram': 6,
      onager: 4,
    },
    config: {
      selectedAge: 'imperial',
      populationCap: 200,
    },
  },
  {
    id: 'arbalester-halbs',
    name: 'Arbalester + Halberdiers',
    category: 'imperial-compositions',
    description:
      'Gold-efficient composition. Halbs protect arbs from cavalry while arbs deal damage.',
    recommendedCivs: ['britons', 'ethiopians', 'vietnamese'],
    composition: {
      arbalester: 35,
      halberdier: 25,
      'siege-ram': 4,
    },
    config: {
      selectedAge: 'imperial',
      populationCap: 200,
    },
  },
  {
    id: 'heavy-camel-siege',
    name: 'Heavy Camel + Siege',
    category: 'imperial-compositions',
    description: 'Anti-cavalry specialist composition with siege backup for infantry.',
    recommendedCivs: ['saracens', 'berbers', 'hindustanis', 'malians'],
    composition: {
      'heavy-camel': 20,
      'siege-onager': 3,
      'heavy-scorpion': 6,
    },
    config: {
      selectedAge: 'imperial',
      populationCap: 200,
    },
  },
  {
    id: 'champion-siege',
    name: 'Champion + Siege Onager',
    category: 'imperial-compositions',
    description:
      'Infantry-heavy composition. Champions are cost-effective, siege onagers devastate armies.',
    recommendedCivs: ['goths', 'japanese', 'slavs', 'vikings'],
    composition: {
      champion: 40,
      'siege-onager': 5,
      'siege-ram': 4,
    },
    config: {
      selectedAge: 'imperial',
      populationCap: 200,
    },
  },
  {
    id: 'cav-archer-hussar',
    name: 'Heavy Cav Archer + Hussar',
    category: 'imperial-compositions',
    description:
      'Mobile hit-and-run composition. Hussars raid while cav archers provide firepower.',
    recommendedCivs: ['mongols', 'huns', 'magyars', 'tatars'],
    composition: {
      'heavy-cavalry-archer': 25,
      hussar: 20,
    },
    config: {
      selectedAge: 'imperial',
      populationCap: 200,
    },
  },
  {
    id: 'hand-cannon-halbs',
    name: 'Hand Cannoneer + Halberdiers',
    category: 'imperial-compositions',
    description: 'Anti-infantry specialists. Hand cannons shred infantry, halbs protect from cav.',
    recommendedCivs: ['spanish', 'turks', 'portuguese', 'bohemians'],
    composition: {
      'hand-cannoneer': 30,
      halberdier: 20,
      'bombard-cannon': 4,
    },
    config: {
      selectedAge: 'imperial',
      populationCap: 200,
    },
  },

  // ========== CIVILIZATION-SPECIFIC BUILDS ==========
  {
    id: 'britons-longbow',
    name: 'Britons Longbow Army',
    category: 'civ-specific',
    description:
      'Maximum range Longbowmen with halbs and trebs. Leverages Briton range bonus (+2).',
    recommendedCivs: ['britons'],
    composition: {
      'elite-longbowman': 40,
      halberdier: 15,
      trebuchet: 4,
    },
    config: {
      selectedAge: 'imperial',
      selectedCiv: 'britons',
      populationCap: 200,
    },
  },
  {
    id: 'franks-paladin-spam',
    name: 'Franks Paladin Spam',
    category: 'civ-specific',
    description:
      'Pure Paladin power. Frank Paladins have extra HP (+20%) and cheaper Castles for production.',
    recommendedCivs: ['franks'],
    composition: {
      paladin: 50,
    },
    config: {
      selectedAge: 'imperial',
      selectedCiv: 'franks',
      populationCap: 200,
    },
  },
  {
    id: 'mayans-plumes-eagles',
    name: 'Mayans Plumes + Eagles',
    category: 'civ-specific',
    description:
      'Fast Plumed Archers with Elite Eagle support. Cost-effective gold units with mobility.',
    recommendedCivs: ['mayans'],
    composition: {
      'elite-plumed-archer': 30,
      'elite-eagle-warrior': 20,
    },
    config: {
      selectedAge: 'imperial',
      selectedCiv: 'mayans',
      populationCap: 200,
    },
  },
  {
    id: 'mongols-mangudai-rams',
    name: 'Mongols Mangudai + Rams',
    category: 'civ-specific',
    description:
      'Elite Mangudai with Siege Rams. Mangudai have bonus vs siege, rams tank and siege buildings.',
    recommendedCivs: ['mongols'],
    composition: {
      'elite-mangudai': 35,
      'siege-ram': 8,
      hussar: 10,
    },
    config: {
      selectedAge: 'imperial',
      selectedCiv: 'mongols',
      populationCap: 200,
    },
  },
  {
    id: 'goths-infantry-flood',
    name: 'Goths Infantry Flood',
    category: 'civ-specific',
    description:
      'Mass cheap infantry spam. Goth Champions cost -35% and Huskarls counter archers.',
    recommendedCivs: ['goths'],
    composition: {
      champion: 40,
      'elite-huskarl': 30,
    },
    config: {
      selectedAge: 'imperial',
      selectedCiv: 'goths',
      populationCap: 200,
    },
  },
  {
    id: 'ethiopians-arbalester-push',
    name: 'Ethiopians Arbalester Push',
    category: 'civ-specific',
    description:
      'Fast-firing Arbalesters with Torsion Engines Siege Onagers for area damage.',
    recommendedCivs: ['ethiopians'],
    composition: {
      arbalester: 40,
      'siege-onager': 4,
      halberdier: 10,
    },
    config: {
      selectedAge: 'imperial',
      selectedCiv: 'ethiopians',
      populationCap: 200,
    },
  },
  {
    id: 'byzantines-trash-defense',
    name: 'Byzantines Trash Defense',
    category: 'civ-specific',
    description:
      'Cost-effective counter units. Byzantine trash units are cheaper (-25%) and versatile.',
    recommendedCivs: ['byzantines'],
    composition: {
      halberdier: 30,
      'elite-skirmisher': 25,
      hussar: 20,
      'elite-cataphract': 10,
    },
    config: {
      selectedAge: 'imperial',
      selectedCiv: 'byzantines',
      populationCap: 200,
    },
  },
  {
    id: 'teutons-slow-push',
    name: 'Teutons Slow Push',
    category: 'civ-specific',
    description:
      'Heavy armor composition. Teutonic Knights with siege support for unstoppable advance.',
    recommendedCivs: ['teutons'],
    composition: {
      'elite-teutonic-knight': 15,
      paladin: 20,
      'siege-ram': 6,
      'bombard-cannon': 4,
    },
    config: {
      selectedAge: 'imperial',
      selectedCiv: 'teutons',
      populationCap: 200,
    },
  },

  // ========== BEGINNER TEMPLATES ==========
  {
    id: 'trash-army',
    name: 'Trash Army (No Gold)',
    category: 'beginner',
    description:
      'Gold-free composition using only food/wood units. Great when gold is depleted.',
    recommendedCivs: [],
    composition: {
      halberdier: 35,
      'elite-skirmisher': 30,
      hussar: 25,
    },
    config: {
      selectedAge: 'imperial',
      populationCap: 200,
    },
  },
  {
    id: 'basic-gold-army',
    name: 'Basic Gold Army',
    category: 'beginner',
    description: 'Simple composition with gold units. Knights for damage, archers for support.',
    recommendedCivs: [],
    composition: {
      knight: 15,
      crossbowman: 20,
      'light-cavalry': 5,
    },
    config: {
      selectedAge: 'castle',
      populationCap: 200,
    },
  },
  {
    id: 'balanced-composition',
    name: 'Balanced Composition',
    category: 'beginner',
    description:
      'Well-rounded army with units for every situation. Good for learning unit counters.',
    recommendedCivs: [],
    composition: {
      paladin: 15,
      arbalester: 20,
      halberdier: 15,
      'siege-ram': 3,
      onager: 2,
    },
    config: {
      selectedAge: 'imperial',
      populationCap: 200,
    },
  },
  {
    id: 'defensive-turtle',
    name: 'Defensive Turtle',
    category: 'beginner',
    description:
      'Defensive composition focused on holding ground. Monks heal, siege defends, infantry tanks.',
    recommendedCivs: ['byzantines', 'teutons', 'koreans'],
    composition: {
      halberdier: 20,
      'elite-skirmisher': 15,
      monk: 6,
      onager: 3,
      trebuchet: 3,
    },
    config: {
      selectedAge: 'imperial',
      populationCap: 200,
    },
  },
  {
    id: 'raiding-party',
    name: 'Raiding Party',
    category: 'beginner',
    description:
      'Fast units for economic harassment. Hussars raid villagers while archers pick off defenders.',
    recommendedCivs: ['mongols', 'huns', 'magyars'],
    composition: {
      hussar: 30,
      'heavy-cavalry-archer': 15,
      'light-cavalry': 10,
    },
    config: {
      selectedAge: 'imperial',
      populationCap: 200,
    },
  },
];

/**
 * Get presets by category
 * @param {string} categoryId - Category identifier
 * @returns {Array} Array of presets in that category
 */
export const getPresetsByCategory = (categoryId) => {
  return presets.filter((preset) => preset.category === categoryId);
};

/**
 * Get a preset by ID
 * @param {string} presetId - Preset identifier
 * @returns {Object|undefined} Preset data or undefined if not found
 */
export const getPresetById = (presetId) => {
  return presets.find((preset) => preset.id === presetId);
};

/**
 * Get presets recommended for a specific civilization
 * @param {string} civId - Civilization identifier
 * @returns {Array} Array of presets recommended for that civilization
 */
export const getPresetsForCiv = (civId) => {
  if (!civId || civId === 'generic') {
    return presets.filter(
      (preset) => preset.recommendedCivs.length === 0 || preset.category === 'beginner'
    );
  }
  return presets.filter(
    (preset) => preset.recommendedCivs.includes(civId) || preset.recommendedCivs.length === 0
  );
};
