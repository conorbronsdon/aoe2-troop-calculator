import { useState, useEffect } from 'react';
import { trackDonationClick } from '../utils/analytics';

/**
 * Buy Me a Coffee CTA Component
 * Displays a floating button in the corner that expands on hover
 * Less intrusive than the previous centered CTA at the bottom
 */
const BuyMeCoffee: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  // Check if user has dismissed the button this session
  useEffect(() => {
    const dismissed = sessionStorage.getItem('bmc_dismissed');
    if (dismissed) {
      setIsDismissed(true);
    }
  }, []);

  const handleClick = (): void => {
    trackDonationClick();
  };

  const handleDismiss = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDismissed(true);
    sessionStorage.setItem('bmc_dismissed', 'true');
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
        className="absolute -top-2 -right-2 w-6 h-6 bg-gray-600 hover:bg-gray-700 text-white rounded-full flex items-center justify-center text-xs shadow-lg transition-opacity duration-200 opacity-0 group-hover:opacity-100 z-10"
        style={{ opacity: isExpanded ? 1 : 0 }}
        aria-label="Dismiss Buy Me a Coffee button"
      >
        ✕
      </button>

      <a
        href="https://buymeacoffee.com/conorbronsdon"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`
          flex items-center gap-2 bg-[#FFDD00] hover:bg-[#ffed4e] text-gray-800 font-semibold
          rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105
          ${isExpanded ? 'py-3 px-5' : 'p-4'}
        `}
        aria-label="Buy me a coffee to support development"
      >
        <svg
          className="w-6 h-6 flex-shrink-0"
          viewBox="0 0 884 1279"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M791.109 297.518L790.231 297.002L788.201 296.383C789.018 297.072 790.04 297.472 791.109 297.518Z"
            fill="#0D0C22"
          />
          <path d="M803.896 388.891L802.916 389.166L803.896 388.891Z" fill="#0D0C22" />
          <path
            d="M791.484 297.377C791.359 297.361 791.237 297.332 791.118 297.29C791.111 297.371 791.111 297.453 791.118 297.534C791.252 297.516 791.368 297.462 791.484 297.377Z"
            fill="#0D0C22"
          />
          <path d="M791.113 297.529H791.244V297.447L791.113 297.529Z" fill="#0D0C22" />
          <path d="M803.111 388.726L804.591 387.883L803.111 388.726Z" fill="#0D0C22" />
          <path
            d="M791.113 297.529C791.066 297.529 791.031 297.529 791.019 297.529H791.113Z"
            fill="#0D0C22"
          />
          <path d="M803.111 388.726L804.591 387.883L803.111 388.726Z" fill="#0D0C22" />
          <path
            d="M514.524 470.706C510.626 470.706 506.741 470.706 502.869 470.706C502.869 474.679 502.869 478.652 502.869 482.625C506.741 482.625 510.626 482.625 514.524 482.625C514.524 478.652 514.524 474.679 514.524 470.706Z"
            fill="#0D0C22"
          />
          <path d="M791.113 297.529H791.244V297.447L791.113 297.529Z" fill="#0D0C22" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M142.524 505.931C142.524 505.931 154.013 505.931 168.124 505.931C168.124 505.931 168.124 487.463 168.124 470.706C154.013 470.706 142.524 470.706 142.524 470.706C142.524 487.463 142.524 505.931 142.524 505.931Z"
            fill="#0D0C22"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M791.113 297.529C791.066 297.529 791.031 297.529 791.019 297.529H791.113ZM803.896 388.891L802.916 389.166L803.896 388.891Z"
            fill="#0D0C22"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M791.484 297.377C791.359 297.361 791.237 297.332 791.118 297.29C791.111 297.371 791.111 297.453 791.118 297.534C791.252 297.516 791.368 297.462 791.484 297.377Z"
            fill="#0D0C22"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M803.111 388.726L804.591 387.883L803.111 388.726Z"
            fill="#0D0C22"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M791.109 297.518L790.231 297.002L788.201 296.383C789.018 297.072 790.04 297.472 791.109 297.518Z"
            fill="#0D0C22"
          />
        </svg>
        {isExpanded && (
          <span className="whitespace-nowrap animate-fade-in">
            Support this tool!
          </span>
        )}
      </a>
    </div>
  );
};

export default BuyMeCoffee;
