/**
 * Mapping of our unit IDs to Age of Empires II game unit IDs
 * These IDs correspond to the local image files in /public/unit-icons/
 * Data sourced from: https://github.com/Dyleo12/aoe2-army-calculator
 */

export const unitToGameId = {
  // Infantry line
  'militiaman': 75,        // SWDMN (Militia/Swordsman line)
  'man-at-arms': 75,       // Same base model
  'longswordsman': 77,     // THSWD (Two-handed sword line starts here)
  'two-handed-swordsman': 473, // 2H Sword
  'champion': 567,         // Champion

  // Spearman line
  'spearman': 74,          // SPRMN
  'pikeman': 93,           // PKEMN
  'halberdier': 359,       // HLBDM

  // Eagle line
  'eagle-scout': 751,      // EAGLE
  'eagle-warrior': 752,    // EAGLEX
  'elite-eagle-warrior': 753, // EAGLEH

  // Archer line
  'archer': 4,             // ARCHR
  'crossbowman': 7,        // XBOWM
  'arbalester': 6,         // HXBOW

  // Skirmisher line
  'skirmisher': 39,        // CVRCH (Counter-archer)
  'elite-skirmisher': 39,  // Same base model
  'imperial-skirmisher': 1155, // IHXBOW

  // Cavalry archer line
  'cavalry-archer': 24,    // CARCH
  'heavy-cavalry-archer': 474, // HCVAR

  // Other archers
  'hand-cannoneer': 5,     // HCANR
  'slinger': 185,          // SLINGR
  'genitour': 1010,        // GENITO
  'elite-genitour': 1012,  // EGENITO

  // Scout line
  'scout-cavalry': 448,    // SCOUT
  'light-cavalry': 546,    // LTCAV
  'hussar': 441,           // HUSSAR
  'winged-hussar': 1707,   // WINGEDHUSSAR

  // Knight line
  'knight': 38,            // KNGHT
  'cavalier': 283,         // Cavalier
  'paladin': 207,          // SHCLRY (Shining Cavalry/Paladin)

  // Camel line
  'camel-rider': 329,      // CVLRY (Camel cavalry)
  'heavy-camel': 330,      // HCLRY
  'imperial-camel-rider': 1263, // FCAMEL

  // Battle elephant line
  'battle-elephant': 1132, // BATELE
  'elite-battle-elephant': 1134, // EBATELE

  // Steppe lancer line
  'steppe-lancer': 1370,   // SLANCER
  'elite-steppe-lancer': 1372, // ESLANCER

  // Siege units
  'ram': 548,              // SGRAM (Siege Ram)
  'capped-ram': 548,       // Same model
  'siege-ram': 548,        // Same model
  'mangonel': 280,         // MANGO
  'onager': 550,           // ONAGR
  'siege-onager': 588,     // SNAGR
  'scorpion': 279,         // SCBAL
  'heavy-scorpion': 542,   // HWBAL
  'bombard-cannon': 36,    // BCANN
  'trebuchet': 42,         // TREBU
  'petard': 440,           // PETARD

  // Naval units
  'galley': 21,            // GALLY
  'war-galley': 539,       // SGALY
  'galleon': 691,          // CNGAU (Cannon Galleon upgrade line)
  'fire-galley': 529,      // FRGAL
  'fire-ship': 532,        // HFGAL
  'fast-fire-ship': 1103,  // SFRGAL
  'demolition-raft': 527,  // RMSHP
  'demolition-ship': 528,  // CRMSH
  'heavy-demolition-ship': 1104, // SDGAL
  'cannon-galleon': 420,   // CANGA
  'elite-cannon-galleon': 691, // CNGAU
  'transport-ship': 545,   // XPORT
  'trade-cog': 17,         // COGXX
  'fishing-ship': 13,      // FSHSP

  // Other units
  'monk': 125,             // MONKX
  'missionary': 775,       // MONKY
  'villager': 83,          // VMBAS

  // Unique Units

  // Aztecs
  'jaguar-warrior': 725,        // JAGUAR
  'elite-jaguar-warrior': 726,  // JAGUARX

  // Berbers
  'camel-archer': 1007,         // CAMAR
  'elite-camel-archer': 1009,   // ECAMAR

  // Britons
  'longbowman': 8,              // LNGBW
  'elite-longbowman': 530,      // ULGBW

  // Bulgarians
  'konnik': 1254,               // KONNIK
  'elite-konnik': 1255,         // EKONNIK

  // Burgundians
  'coustillier': 1655,          // COUSTILLIER
  'elite-coustillier': 1657,    // ECOUSTILLIER

  // Burmese
  'arambai': 1126,              // ARAMBAI
  'elite-arambai': 1128,        // EARAMBAI

  // Byzantines
  'cataphract': 40,             // CATAP
  'elite-cataphract': 553,      // UCATA

  // Celts
  'woad-raider': 232,           // WBRSK
  'elite-woad-raider': 534,     // UWBRS

  // Chinese
  'chu-ko-nu': 73,              // CHUKN
  'elite-chu-ko-nu': 559,       // UCHUK

  // Cumans
  'kipchak': 1231,              // KIPCHAK
  'elite-kipchak': 1233,        // EKIPCHAK

  // Dravidians
  'urumi-swordsman': 1735,      // URUMI
  'elite-urumi-swordsman': 1737,// EURUMI
  'thirisadai': 1750,           // THIRISADAI

  // Ethiopians
  'shotel-warrior': 1016,       // SHOTEL
  'elite-shotel-warrior': 1018, // ESHOTEL

  // Franks
  'throwing-axeman': 281,       // TAXEM
  'elite-throwing-axeman': 531, // UTAXE

  // Goths
  'huskarl': 41,                // GBRSK
  'elite-huskarl': 555,         // UGBRS

  // Gurjaras
  'chakram-thrower': 1741,      // CHAKRAM
  'elite-chakram-thrower': 1743,// ECHAKRAM
  'shrivamsha-rider': 1751,     // SHRIVAMSHA
  'elite-shrivamsha-rider': 1753,// ESHRIVAMSHA
  'camel-scout': 1755,          // CAMELSC

  // Hindustanis
  'ghulam': 1747,               // GHULAM
  'elite-ghulam': 1749,         // EGHULAM

  // Huns
  'tarkan': 755,                // TARKAN
  'elite-tarkan': 757,          // UTARK

  // Incas
  'kamayuk': 879,               // KAMAY
  'elite-kamayuk': 881,         // EKAMA
  'slinger': 185,               // SLINGR (already defined above)

  // Indians / South Asian
  'elephant-archer': 873,       // ELEAR
  'elite-elephant-archer': 875, // UELEA

  // Italians
  'genoese-crossbowman': 866,   // GENOE
  'elite-genoese-crossbowman': 868, // GENOE_E
  'condottiero': 882,           // CONDO

  // Japanese
  'samurai': 291,               // SMURI
  'elite-samurai': 560,         // USMUR

  // Khmer
  'ballista-elephant': 1120,    // ELEBALI
  'elite-ballista-elephant': 1122, // EELEBALI

  // Koreans
  'war-wagon': 827,             // WAGON
  'elite-war-wagon': 829,       // UWAGO
  'turtle-ship': 831,           // TURTL
  'elite-turtle-ship': 832,     // UTURT

  // Lithuanians
  'leitis': 1234,               // LEITIS
  'elite-leitis': 1236,         // ELEITIS

  // Magyars
  'magyar-huszar': 869,         // UMAGYX
  'elite-magyar-huszar': 871,   // UMAGYX (same?)

  // Malay
  'karambit-warrior': 1123,     // KARAM
  'elite-karambit-warrior': 1125, // EKARAM

  // Malians
  'gbeto': 1013,                // GBETO
  'elite-gbeto': 1015,          // EGBETO

  // Mayans
  'plumed-archer': 763,         // PLUME
  'elite-plumed-archer': 765,   // UPLUM

  // Mongols
  'mangudai': 239,              // MPCAV
  'elite-mangudai': 558,        // UMPCAV

  // Persians
  'war-elephant': 331,          // PTREB (Persian elephant)
  'elite-war-elephant': 331,    // Same model

  // Poles
  'obuch': 1701,                // OBUCH
  'elite-obuch': 1703,          // EOBUCH
  'winged-hussar': 1707,        // WINGEDHUSSAR (already defined)

  // Portuguese
  'organ-gun': 1001,            // ORGAN
  'elite-organ-gun': 1003,      // EORGAN
  'caravel': 1004,              // CARAV
  'elite-caravel': 1006,        // CARAV

  // Romans
  'centurion': 1790,            // CENTURION
  'elite-centurion': 1792,      // ECENTURION
  'legionary': 1793,            // LEGIONARY
  'dromon': 1795,               // DROMON

  // Saracens
  'mameluke': 282,              // DERVI
  'elite-mameluke': 556,        // UDERV

  // Sicilians
  'serjeant': 1658,             // SERJEANT
  'elite-serjeant': 1659,       // ESERJEANT

  // Slavs
  'boyar': 876,                 // BOYAR
  'elite-boyar': 878,           // EBOYA

  // Spanish
  'conquistador': 771,          // CONQI
  'elite-conquistador': 773,    // UCONQ

  // Tatars
  'keshik': 1228,               // KESHIK
  'elite-keshik': 1230,         // EKESHIK
  'flaming-camel': 1263,        // FCAMEL

  // Teutons
  'teutonic-knight': 25,        // TKNIT
  'elite-teutonic-knight': 554, // UTKNI

  // Turks
  'janissary': 46,              // JANNI
  'elite-janissary': 557,       // UJANI

  // Vietnamese
  'rattan-archer': 1129,        // RATAN
  'elite-rattan-archer': 1131,  // ERATAN

  // Vikings
  'berserk': 692,               // VBRSK
  'elite-berserk': 694,         // UVBRK
  'longboat': 250,              // LNGBT
  'elite-longboat': 533,        // ULNGB

  // Bengalis
  'ratha': 1759,                // RATHA2 (chariot form)
  'elite-ratha': 1761,          // ERATHA2

  // Bohemians
  'hussite-wagon': 1704,        // HUSSITEWAGON
  'elite-hussite-wagon': 1706,  // EHUSSITEWAGON
  'houfnice': 1709,             // HOUFNICE

  // Georgians
  'monaspa': 1803,              // MONASPA
  'elite-monaspa': 1805,        // EMONASPA
  'warrior-priest': 1811,       // WARRIORPRIEST
  'savar': 1813,                // SAVAR

  // Armenians
  'composite-bowman': 1800,     // COMPBOW
  'elite-composite-bowman': 1802, // ECOMPBOW
};

/**
 * Get the game ID for a unit
 * @param {string} unitId - Our internal unit ID
 * @returns {number|null} The game unit ID or null if not found
 */
export const getGameUnitId = (unitId) => unitToGameId[unitId] || null;

/**
 * Get the image path for a unit
 * @param {string} unitId - Our internal unit ID
 * @returns {string} The path to the unit image
 */
export const getUnitImagePath = (unitId) => {
  const gameId = unitToGameId[unitId];
  if (gameId) {
    return `${import.meta.env.BASE_URL}unit-icons/${gameId}.png`;
  }
  return null;
};
