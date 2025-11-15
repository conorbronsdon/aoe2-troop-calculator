import React from 'react';

/**
 * Unit Icon Component
 * Displays an icon representation for each unit type
 * Uses emoji/symbols for visual representation
 */

// Icon mappings for unit categories and specific units
const unitIcons = {
  // Specific units
  'militiaman': '🗡️',
  'longswordsman': '⚔️',
  'champion': '⚔️',
  'spearman': '🔱',
  'pikeman': '🔱',
  'halberdier': '🔱',
  'archer': '🏹',
  'crossbowman': '🏹',
  'arbalester': '🏹',
  'skirmisher': '🎯',
  'elite-skirmisher': '🎯',
  'cavalry-archer': '🏇',
  'heavy-cavalry-archer': '🏇',
  'knight': '🐴',
  'cavalier': '🐴',
  'paladin': '🐴',
  'scout-cavalry': '🐎',
  'light-cavalry': '🐎',
  'hussar': '🐎',
  'camel': '🐫',
  'heavy-camel': '🐫',
  'battle-elephant': '🐘',
  'elite-battle-elephant': '🐘',
  'ram': '🛡️',
  'siege-ram': '🛡️',
  'capped-ram': '🛡️',
  'mangonel': '⚙️',
  'onager': '⚙️',
  'siege-onager': '⚙️',
  'scorpion': '🦂',
  'heavy-scorpion': '🦂',
  'bombard-cannon': '💣',
  'trebuchet': '🎯',
  'battering-ram': '🛡️',
  'monk': '✝️',
  'missionary': '✝️',
  'petard': '💣',
  'villager': '🧑',

  // Category fallbacks
  'Infantry': '⚔️',
  'Archer': '🏹',
  'Cavalry': '🐴',
  'Siege': '⚙️',
  'Other': '👤'
};

const UnitIcon = ({ unitId, category, className = '', size = 'md' }) => {
  // Size mappings
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  };

  // Get icon for specific unit or fallback to category
  const icon = unitIcons[unitId] || unitIcons[category] || '❓';

  return (
    <span
      className={`inline-block ${sizeClasses[size]} ${className}`}
      role="img"
      aria-label={`${unitId} icon`}
    >
      {icon}
    </span>
  );
};

export default UnitIcon;
