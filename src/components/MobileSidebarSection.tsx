import { useState, ReactNode } from 'react';

interface Props {
  title: string;
  icon?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  priority?: 'high' | 'normal' | 'low';
}

/**
 * Mobile Sidebar Section Component
 * Provides accordion-style collapsible sections for mobile sidebar navigation
 * Automatically collapses on mobile and expands on desktop
 */
const MobileSidebarSection: React.FC<Props> = ({
  title,
  icon,
  children,
  defaultOpen = false,
  priority = 'normal'
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  const priorityColors: Record<string, string> = {
    high: 'bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800',
    normal: 'bg-gradient-to-r from-gray-600 to-gray-700 dark:from-gray-700 dark:to-gray-800',
    low: 'bg-gradient-to-r from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700',
  };

  return (
    <div className="lg:contents">
      {/* Mobile accordion header - hidden on desktop */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          lg:hidden w-full flex items-center justify-between p-3 rounded-lg text-white font-medium
          ${priorityColors[priority]} shadow-md transition-all duration-200 hover:shadow-lg
        `}
        aria-expanded={isOpen}
        aria-controls={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          <span>{title}</span>
        </div>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Content - collapsible on mobile, always visible on desktop */}
      <div
        id={`section-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className={`
          lg:block transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? 'max-h-[2000px] opacity-100 mt-2 lg:mt-0' : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100'}
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default MobileSidebarSection;
