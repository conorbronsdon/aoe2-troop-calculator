import { useState } from 'react';
import PropTypes from 'prop-types';
import { getFortificationImagePath } from '../utils/fortificationImageIds';

/**
 * Fortification Icon Component
 * Displays actual game building icons from local files, with fallback to emoji icons
 */

const FortificationIcon = ({ fortificationId, category, className = '', size = 'md' }) => {
  const [imageError, setImageError] = useState(false);

  // Size mappings for images
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
    '2xl': 'w-12 h-12',
  };

  // Size in pixels for img element
  const sizePx = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40,
    '2xl': 48,
  };

  // Fallback emoji icons by category
  const getCategoryEmoji = (cat) => {
    switch (cat) {
      case 'Walls':
        return '🧱';
      case 'Towers':
        return '🗼';
      case 'Castles':
        return '🏰';
      default:
        return '🏗️';
    }
  };

  // Try to get the local image path
  const imagePath = getFortificationImagePath(fortificationId);

  // If we have a local image and it hasn't errored, use it
  if (imagePath && !imageError) {
    return (
      <img
        src={imagePath}
        alt={`${fortificationId} icon`}
        width={sizePx[size]}
        height={sizePx[size]}
        className={`inline-block ${sizeClasses[size]} ${className}`}
        onError={() => setImageError(true)}
        loading="lazy"
      />
    );
  }

  // Fallback to emoji
  const emoji = getCategoryEmoji(category);

  return (
    <span
      className={`inline-block ${sizeClasses[size]} ${className} flex items-center justify-center`}
      role="img"
      aria-label={`${fortificationId} icon`}
    >
      {emoji}
    </span>
  );
};

FortificationIcon.propTypes = {
  fortificationId: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl']),
};

export default FortificationIcon;
