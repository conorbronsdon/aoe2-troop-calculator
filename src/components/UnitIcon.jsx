import React, { useState } from 'react';
import { getWikiIconUrl } from '../utils/iconMappings';

/**
 * Unit Icon Component
 * Displays an icon representation for each unit type
 * Uses official AoE2 icons from wiki with emoji fallback
 */

// Emoji fallbacks for unit categories and specific units
const unitEmojiIcons = {
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
  'camel-rider': '🐫',
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
  'Naval': '⛵',
  'Other': '👤',
  'Unique': '⭐'
};

const UnitIcon = ({ unitId, category, className = '', size = 'md', useEmoji = false }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Size mappings for images
  const imageSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
    '2xl': 'w-12 h-12'
  };

  // Size mappings for emojis
  const emojiSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  };

  // Get emoji fallback
  const emoji = unitEmojiIcons[unitId] || unitEmojiIcons[category] || '❓';

  // If emoji mode is forced or image failed to load, show emoji
  if (useEmoji || imageError) {
    return (
      <span
        className={`inline-block ${emojiSizeClasses[size]} ${className}`}
        role="img"
        aria-label={`${unitId} icon`}
      >
        {emoji}
      </span>
    );
  }

  // Try to get icon URL
  const iconUrl = getWikiIconUrl(unitId);

  // If no icon URL available, fallback to emoji
  if (!iconUrl) {
    return (
      <span
        className={`inline-block ${emojiSizeClasses[size]} ${className}`}
        role="img"
        aria-label={`${unitId} icon`}
      >
        {emoji}
      </span>
    );
  }

  // Show image with loading state
  return (
    <div className={`inline-block ${className} relative`}>
      {/* Show emoji while loading */}
      {!imageLoaded && (
        <span
          className={`inline-block ${emojiSizeClasses[size]}`}
          role="img"
          aria-label={`${unitId} icon loading`}
        >
          {emoji}
        </span>
      )}

      {/* Actual image */}
      <img
        src={iconUrl}
        alt={`${unitId} icon`}
        className={`${imageSizeClasses[size]} object-contain ${
          imageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
        } transition-opacity duration-200`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        loading="lazy"
      />
    </div>
  );
};

export default UnitIcon;
