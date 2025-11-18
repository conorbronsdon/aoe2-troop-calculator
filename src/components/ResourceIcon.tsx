import { useState } from 'react';
import { logger } from '../utils/errorHandler';

type ResourceType = 'food' | 'wood' | 'gold' | 'stone';
type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ResourceConfig {
  path: string;
  fallback: string;
  label: string;
}

interface Props {
  resource: ResourceType;
  size?: IconSize;
  className?: string;
}

/**
 * Resource icon configuration with paths and fallback emojis
 * Uses import.meta.env.BASE_URL to handle deployment to subdirectories
 * Icons sourced from SiegeEngineers/aoe2techtree (official AoE2 DE icons)
 * https://github.com/SiegeEngineers/aoe2techtree
 */
const RESOURCE_CONFIG: Record<ResourceType, ResourceConfig> = {
  food: {
    path: `${import.meta.env.BASE_URL}resource-icons/food.png`,
    fallback: '🌾',
    label: 'Food',
  },
  wood: {
    path: `${import.meta.env.BASE_URL}resource-icons/wood.png`,
    fallback: '🌲',
    label: 'Wood',
  },
  gold: {
    path: `${import.meta.env.BASE_URL}resource-icons/gold.png`,
    fallback: '💰',
    label: 'Gold',
  },
  stone: {
    path: `${import.meta.env.BASE_URL}resource-icons/stone.png`,
    fallback: '🗿',
    label: 'Stone',
  },
};

/**
 * ResourceIcon Component
 * Displays AoE2 DE style resource icons with emoji fallback
 *
 * @param {string} resource - The resource type (food, wood, gold, stone)
 * @param {string} size - Icon size: 'xs', 'sm', 'md', 'lg', 'xl' (default: 'md')
 * @param {string} className - Additional CSS classes
 */
export default function ResourceIcon({ resource, size = 'md', className = '' }: Props): React.ReactElement | null {
  const [imageError, setImageError] = useState<boolean>(false);

  const config = RESOURCE_CONFIG[resource];

  if (!config) {
    logger.warn(`Unknown resource type: ${resource}`);
    return null;
  }

  // Size mappings
  const sizeClasses: Record<IconSize, string> = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  const textSizeClasses: Record<IconSize, string> = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-2xl',
  };

  const iconSize = sizeClasses[size] || sizeClasses.md;
  const textSize = textSizeClasses[size] || textSizeClasses.md;

  // If image failed to load, show emoji fallback
  if (imageError) {
    return (
      <span
        className={`inline-flex items-center justify-center ${textSize} ${className}`}
        role="img"
        aria-label={config.label}
      >
        {config.fallback}
      </span>
    );
  }

  return (
    <img
      src={config.path}
      alt={config.label}
      className={`inline-block ${iconSize} ${className}`}
      onError={() => setImageError(true)}
      loading="lazy"
    />
  );
}

// Export the config for components that need direct access
export { RESOURCE_CONFIG };
export type { ResourceType, IconSize };
