/**
 * Helper functions for civilization icons
 * Icons sourced from SiegeEngineers/aoe2techtree repository
 */

const BASE_URL = 'https://raw.githubusercontent.com/SiegeEngineers/aoe2techtree/master/img/Civs';

/**
 * Maps civilization IDs to their icon file names
 * Most civilizations use their ID directly, but some need special handling
 */
const ICON_NAME_MAP = {
  generic: null, // No icon for generic
  // Standard civilizations - using their IDs directly
  mayans: 'mayans',
  britons: 'britons',
  franks: 'franks',
  goths: 'goths',
  teutons: 'teutons',
  japanese: 'japanese',
  chinese: 'chinese',
  byzantines: 'byzantines',
  persians: 'persians',
  saracens: 'saracens',
  turks: 'turks',
  vikings: 'vikings',
  mongols: 'mongols',
  celts: 'celts',
  spanish: 'spanish',
  aztecs: 'aztecs',
  huns: 'huns',
  koreans: 'koreans',
  italians: 'italians',
  indians: 'indians',
  incas: 'incas',
  magyars: 'magyars',
  slavs: 'slavs',
  portuguese: 'portuguese',
  ethiopians: 'ethiopians',
  malians: 'malians',
  berbers: 'berbers',
  khmer: 'khmer',
  malay: 'malay',
  burmese: 'burmese',
  vietnamese: 'vietnamese',
  bulgarians: 'bulgarians',
  cumans: 'cumans',
  lithuanians: 'lithuanians',
  tatars: 'tatars',
  burgundians: 'burgundians',
  sicilians: 'sicilians',
  poles: 'poles',
  bohemians: 'bohemians',
  dravidians: 'dravidians',
  bengalis: 'bengalis',
  gurjaras: 'gurjaras',
  romans: 'romans',
  armenians: 'armenians',
  georgians: 'georgians',
};

/**
 * Get the icon URL for a civilization
 * @param {string} civId - The civilization ID
 * @returns {string|null} The URL to the civilization's icon, or null for generic
 */
export const getCivilizationIconUrl = (civId) => {
  if (!civId || civId === 'generic') {
    return null;
  }

  const iconName = ICON_NAME_MAP[civId] || civId;
  return `${BASE_URL}/${iconName}.png`;
};

/**
 * Fallback emoji icon for civilizations without images
 */
export const FALLBACK_ICON = '🏛️';

/**
 * Generic/no civilization icon
 */
export const GENERIC_ICON = '⚔️';

/**
 * Region-based color schemes for visual grouping
 */
export const REGION_COLORS = {
  European: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
  },
  Asian: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
  },
  'Middle Eastern': {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
  },
  African: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-700',
  },
  American: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-700',
  },
  None: {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    text: 'text-gray-700',
  },
};

/**
 * Get region color classes for a civilization's region
 * @param {string} region - The region name
 * @returns {object} Tailwind color classes
 */
export const getRegionColors = (region) => {
  return REGION_COLORS[region] || REGION_COLORS.None;
};
