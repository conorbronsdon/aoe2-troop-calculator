import React from 'react';

/**
 * Buy Me a Coffee CTA Component
 * Displays a call-to-action button linking to Buy Me a Coffee page
 */
const BuyMeCoffee = () => {
  return (
    <div className="mt-6 mb-4 text-center">
      <a
        href="https://buymeacoffee.com/conorbronsdon"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#FFDD00] hover:bg-[#ffed4e] text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 884 1279"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M791.109 297.518L790.231 297.002L788.201 296.383C789.018 297.072 790.04 297.472 791.109 297.518Z"
            fill="#0D0C22"
          />
          <path
            d="M803.896 388.891L802.916 389.166L803.896 388.891Z"
            fill="#0D0C22"
          />
          <path
            d="M791.484 297.377C791.359 297.361 791.237 297.332 791.118 297.29C791.111 297.371 791.111 297.453 791.118 297.534C791.252 297.516 791.368 297.462 791.484 297.377Z"
            fill="#0D0C22"
          />
          <path
            d="M791.113 297.529H791.244V297.447L791.113 297.529Z"
            fill="#0D0C22"
          />
          <path
            d="M803.111 388.726L804.591 387.883L803.111 388.726Z"
            fill="#0D0C22"
          />
          <path
            d="M791.113 297.529C791.066 297.529 791.031 297.529 791.019 297.529H791.113Z"
            fill="#0D0C22"
          />
          <path
            d="M803.111 388.726L804.591 387.883L803.111 388.726Z"
            fill="#0D0C22"
          />
          <path
            d="M514.524 470.706C510.626 470.706 506.741 470.706 502.869 470.706C502.869 474.679 502.869 478.652 502.869 482.625C506.741 482.625 510.626 482.625 514.524 482.625C514.524 478.652 514.524 474.679 514.524 470.706Z"
            fill="#0D0C22"
          />
          <path
            d="M791.113 297.529H791.244V297.447L791.113 297.529Z"
            fill="#0D0C22"
          />
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
        <span>Like this calculator? Buy me a coffee!</span>
      </a>
      <p className="text-xs text-gray-500 mt-2">
        Support the development of this tool
      </p>
    </div>
  );
};

export default BuyMeCoffee;
