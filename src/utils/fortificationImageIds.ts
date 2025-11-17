/**
 * Mapping of fortification IDs to Age of Empires II game building IDs
 * These IDs correspond to the local image files in /public/fortification-icons/
 * Data sourced from: https://github.com/SiegeEngineers/aoe2techtree
 */

export const fortificationToGameId: Record<string, number> = {
  // Walls
  'palisade-wall': 72,
  'palisade-gate': 72, // Uses same icon as palisade wall
  'stone-wall': 117,
  gate: 487,
  'fortified-wall': 1806,

  // Towers
  outpost: 598,
  'watch-tower': 79,
  'guard-tower': 234,
  keep: 235,
  'bombard-tower': 236,

  // Castles
  castle: 82,
  krepost: 1251,
  donjon: 1665,
};

/**
 * Get the game ID for a fortification
 * @param fortificationId - Our internal fortification ID
 * @returns The game building ID or null if not found
 */
export const getGameFortificationId = (fortificationId: string): number | null =>
  fortificationToGameId[fortificationId] || null;

/**
 * Get the image path for a fortification
 * @param fortificationId - Our internal fortification ID
 * @returns The path to the fortification image or null if not found
 */
export const getFortificationImagePath = (fortificationId: string): string | null => {
  const gameId = fortificationToGameId[fortificationId];
  if (gameId) {
    return `${import.meta.env.BASE_URL}fortification-icons/${gameId}.png`;
  }
  return null;
};
