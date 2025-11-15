/**
 * Icon Mappings for Age of Empires II Units
 * Uses game-icons.net library via react-icons
 * All icons are from the 'gi' (game-icons) collection
 */

import {
  // Infantry icons
  GiSwordman,
  GiBroadDagger,
  GiCrossedSwords,
  GiSpears,
  GiEagleEmblem,

  // Archer icons
  GiBowArrow,
  GiCrossbow,
  GiTargetArrows,
  GiHoodedFigure,
  GiPistolGun,
  GiSling,

  // Cavalry icons
  GiHorseHead,
  GiKnightBanner,
  GiCavalry,
  GiHorseshoe,
  GiCamel,
  GiElephant,
  GiSpearHook,

  // Siege icons
  GiRam,
  GiCatapult,
  GiScorpion,
  GiCannonShot,
  GiTrebuchet,
  GiMineExplosion,

  // Naval icons
  GiGalley,
  GiSailboat,
  GiBurningRoundShot,
  GiTreasureMap,
  GiFishingBoat,

  // Other icons
  GiMonkFace,
  GiFarmer,

  // Unique unit icons
  GiTiger,
  GiDesert,
  GiByzantinTemple,
  GiCrossShield,
  GiPagoda,
  GiAxeSword,
  GiBattleGear,
  GiKatana,
  GiCastle,
  GiFeather,
  GiMongolia,
  GiSaberSlash,
  GiSpain,
  GiTwoHandedSword,
  GiMusket,
  GiVikingHelmet,
  GiVikingLonghouse,
  GiHorseHead as GiHorsemanHead,
  GiIndianPalace,
  GiCrown,
} from 'react-icons/gi';

/**
 * Maps unit IDs to their React icon components from game-icons.net
 */
export const unitIconComponents = {
  // Infantry line
  'militiaman': GiBroadDagger,
  'man-at-arms': GiSwordman,
  'longswordsman': GiSwordman,
  'two-handed-swordsman': GiTwoHandedSword,
  'champion': GiCrossedSwords,

  // Spearman line
  'spearman': GiSpears,
  'pikeman': GiSpears,
  'halberdier': GiSpears,

  // Eagle line
  'eagle-scout': GiEagleEmblem,
  'eagle-warrior': GiEagleEmblem,
  'elite-eagle-warrior': GiEagleEmblem,

  // Archer line
  'archer': GiBowArrow,
  'crossbowman': GiCrossbow,
  'arbalester': GiCrossbow,

  // Skirmisher line
  'skirmisher': GiTargetArrows,
  'elite-skirmisher': GiTargetArrows,
  'imperial-skirmisher': GiTargetArrows,

  // Cavalry archer line
  'cavalry-archer': GiHorseshoe,
  'heavy-cavalry-archer': GiHorseshoe,

  // Other archers
  'hand-cannoneer': GiPistolGun,
  'slinger': GiSling,
  'genitour': GiHoodedFigure,
  'elite-genitour': GiHoodedFigure,

  // Knight line
  'knight': GiKnightBanner,
  'cavalier': GiCavalry,
  'paladin': GiCavalry,

  // Scout line
  'scout-cavalry': GiHorseHead,
  'light-cavalry': GiHorseHead,
  'hussar': GiHorseHead,
  'winged-hussar': GiHorseHead,

  // Camel line
  'camel-rider': GiCamel,
  'heavy-camel': GiCamel,
  'imperial-camel-rider': GiCamel,

  // Battle elephant line
  'battle-elephant': GiElephant,
  'elite-battle-elephant': GiElephant,

  // Steppe lancer line
  'steppe-lancer': GiSpearHook,
  'elite-steppe-lancer': GiSpearHook,

  // Siege units
  'ram': GiRam,
  'capped-ram': GiRam,
  'siege-ram': GiRam,
  'mangonel': GiCatapult,
  'onager': GiCatapult,
  'siege-onager': GiCatapult,
  'scorpion': GiScorpion,
  'heavy-scorpion': GiScorpion,
  'bombard-cannon': GiCannonShot,
  'trebuchet': GiTrebuchet,
  'petard': GiMineExplosion,

  // Naval units
  'galley': GiGalley,
  'war-galley': GiGalley,
  'galleon': GiGalley,
  'fire-galley': GiBurningRoundShot,
  'fire-ship': GiBurningRoundShot,
  'fast-fire-ship': GiBurningRoundShot,
  'demolition-raft': GiMineExplosion,
  'demolition-ship': GiMineExplosion,
  'heavy-demolition-ship': GiMineExplosion,
  'cannon-galleon': GiCannonShot,
  'elite-cannon-galleon': GiCannonShot,
  'transport-ship': GiSailboat,
  'trade-cog': GiTreasureMap,
  'fishing-ship': GiFishingBoat,

  // Other units
  'monk': GiMonkFace,
  'missionary': GiMonkFace,
  'villager': GiFarmer,

  // Unique units - Aztecs
  'jaguar-warrior': GiTiger,
  'elite-jaguar-warrior': GiTiger,

  // Unique units - Berbers
  'camel-archer': GiDesert,
  'elite-camel-archer': GiDesert,

  // Unique units - Britons
  'longbowman': GiBowArrow,
  'elite-longbowman': GiBowArrow,

  // Unique units - Byzantines
  'cataphract': GiByzantinTemple,
  'elite-cataphract': GiByzantinTemple,

  // Unique units - Celts
  'woad-raider': GiCrossShield,
  'elite-woad-raider': GiCrossShield,

  // Unique units - Chinese
  'chu-ko-nu': GiPagoda,
  'elite-chu-ko-nu': GiPagoda,

  // Unique units - Franks
  'throwing-axeman': GiAxeSword,
  'elite-throwing-axeman': GiAxeSword,

  // Unique units - Goths
  'huskarl': GiBattleGear,
  'elite-huskarl': GiBattleGear,

  // Unique units - Japanese
  'samurai': GiKatana,
  'elite-samurai': GiKatana,

  // Unique units - Koreans
  'war-wagon': GiCastle,
  'elite-war-wagon': GiCastle,
  'turtle-ship': GiGalley,
  'elite-turtle-ship': GiGalley,

  // Unique units - Mayans
  'plumed-archer': GiFeather,
  'elite-plumed-archer': GiFeather,

  // Unique units - Mongols
  'mangudai': GiMongolia,
  'elite-mangudai': GiMongolia,

  // Unique units - Persians
  'war-elephant': GiElephant,
  'elite-war-elephant': GiElephant,

  // Unique units - Saracens
  'mameluke': GiSaberSlash,
  'elite-mameluke': GiSaberSlash,

  // Unique units - Spanish
  'conquistador': GiSpain,
  'elite-conquistador': GiSpain,

  // Unique units - Teutons
  'teutonic-knight': GiTwoHandedSword,
  'elite-teutonic-knight': GiTwoHandedSword,

  // Unique units - Turks
  'janissary': GiMusket,
  'elite-janissary': GiMusket,

  // Unique units - Vikings
  'berserk': GiVikingHelmet,
  'elite-berserk': GiVikingHelmet,
  'longboat': GiVikingLonghouse,
  'elite-longboat': GiVikingLonghouse,

  // Additional unique units from expansions
  'tarkan': GiHorsemanHead,
  'elite-tarkan': GiHorsemanHead,
  'kamayuk': GiSpears,
  'elite-kamayuk': GiSpears,
  'elephant-archer': GiIndianPalace,
  'elite-elephant-archer': GiIndianPalace,
  'genoese-crossbowman': GiCrossbow,
  'elite-genoese-crossbowman': GiCrossbow,
  'magyar-huszar': GiCrown,
  'elite-magyar-huszar': GiCrown,
  'boyar': GiBattleGear,
  'elite-boyar': GiBattleGear,
};

/**
 * Category fallback icons
 */
export const categoryIcons = {
  'Infantry': GiSwordman,
  'Archer': GiBowArrow,
  'Cavalry': GiHorseHead,
  'Siege': GiCatapult,
  'Naval': GiGalley,
  'Other': GiFarmer,
  'Unique': GiCrossedSwords,
};

/**
 * Get the icon component for a unit
 * @param {string} unitId - Unit identifier
 * @param {string} category - Unit category (fallback)
 * @returns {React.Component} Icon component
 */
export const getUnitIcon = (unitId, category) => {
  return unitIconComponents[unitId] || categoryIcons[category] || GiSwordman;
};
