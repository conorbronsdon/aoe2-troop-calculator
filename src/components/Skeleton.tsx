import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  count?: number;
}

/**
 * Skeleton Loader Component
 * Displays a placeholder loading animation for content
 */
const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
  count = 1,
}) => {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700';

  const variantClasses: Record<string, string> = {
    text: 'rounded h-4',
    rectangular: 'rounded',
    circular: 'rounded-full',
  };

  const style: React.CSSProperties = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'circular' ? width : undefined),
  };

  const items = Array(count).fill(null);

  return (
    <>
      {items.map((_, index) => (
        <div
          key={index}
          className={`${baseClasses} ${variantClasses[variant]} ${className}`}
          style={style}
        />
      ))}
    </>
  );
};

// Preset skeleton patterns for common use cases
export const UnitCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 border border-gray-200 dark:border-gray-700">
    <div className="flex items-center gap-3 mb-2">
      <Skeleton variant="circular" width={40} height={40} />
      <div className="flex-1">
        <Skeleton className="mb-1" width="60%" />
        <Skeleton width="40%" height={12} />
      </div>
    </div>
    <div className="flex justify-between items-center">
      <Skeleton width="30%" height={12} />
      <Skeleton variant="rectangular" width={60} height={24} />
    </div>
  </div>
);

export const ConfigSectionSkeleton: React.FC = () => (
  <div className="space-y-3 p-4">
    <Skeleton className="mb-2" width="40%" height={20} />
    <Skeleton count={3} className="mb-2" />
    <Skeleton width="70%" />
  </div>
);

export const ListSkeleton: React.FC<{ items?: number }> = ({ items = 5 }) => (
  <div className="space-y-2">
    {Array(items)
      .fill(null)
      .map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton width={`${70 + Math.random() * 20}%`} />
        </div>
      ))}
  </div>
);

export default Skeleton;
