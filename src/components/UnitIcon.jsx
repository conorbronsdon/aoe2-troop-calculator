import React from 'react';
import { getUnitIcon } from '../utils/iconMappings';

/**
 * Unit Icon Component
 * Displays an icon representation for each unit type using game-icons.net
 */

const UnitIcon = ({ unitId, category, className = '', size = 'md' }) => {
  // Size mappings for icons
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
    '2xl': 'w-12 h-12'
  };

  // Get the icon component for this unit
  const IconComponent = getUnitIcon(unitId, category);

  return (
    <IconComponent
      className={`inline-block ${sizeClasses[size]} ${className}`}
      aria-label={`${unitId} icon`}
    />
  );
};

export default UnitIcon;
