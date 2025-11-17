import i18n from '../i18n';

/**
 * Get translated unit name
 * @param unitId - Unit identifier (e.g., 'archer', 'knight')
 * @returns Translated unit name
 */
export const getTranslatedUnitName = (unitId: string): string => {
  const key = `unitNames.${unitId}`;
  const translated = i18n.t(key);

  // If translation not found, return the key itself (fallback)
  return translated === key ? unitId : translated;
};

/**
 * Get translated civilization name
 * @param civId - Civilization identifier (e.g., 'britons', 'franks')
 * @returns Translated civilization name
 */
export const getTranslatedCivName = (civId: string): string => {
  const key = `civilizationNames.${civId}`;
  const translated = i18n.t(key);

  // If translation not found, return the key itself (fallback)
  return translated === key ? civId : translated;
};
