import { useState } from 'react';
import { getUnitIcon } from '../utils/iconMappings';
import { getUnitImagePath } from '../utils/unitImageIds';
import { UnitCategory } from '../types';
import { IconType } from 'react-icons';

/**
 * Unit Icon Component
 * Displays actual game unit icons from local files, with fallback to react-icons
 */

type IconSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface UnitIconProps {
  unitId: string;
  category: UnitCategory | string;
  className?: string;
  size?: IconSize;
}

const UnitIcon = ({ unitId, category, className = '', size = 'md' }: UnitIconProps): JSX.Element => {
  const [imageError, setImageError] = useState<boolean>(false);

  // Size mappings for both images and fallback icons
  const sizeClasses: Record<IconSize, string> = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
    '2xl': 'w-12 h-12',
  };

  // Size in pixels for img element
  const sizePx: Record<IconSize, number> = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40,
    '2xl': 48,
  };

  // Try to get the local image path
  const imagePath = getUnitImagePath(unitId);

  // If we have a local image and it hasn't errored, use it
  if (imagePath && !imageError) {
    return (
      <img
        src={imagePath}
        alt={`${unitId} icon`}
        width={sizePx[size]}
        height={sizePx[size]}
        className={`inline-block ${sizeClasses[size]} ${className}`}
        onError={() => setImageError(true)}
        loading="lazy"
      />
    );
  }

  // Fallback to react-icons
  const IconComponent: IconType = getUnitIcon(unitId, category as UnitCategory);

  return (
    <IconComponent
      className={`inline-block ${sizeClasses[size]} ${className}`}
      aria-label={`${unitId} icon`}
    />
  );
};

export default UnitIcon;
