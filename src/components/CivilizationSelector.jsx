import { useState, useRef, useEffect } from 'react';
import { civilizations } from '../data/civilizations';
import {
  getCivilizationIconUrl,
  FALLBACK_ICON,
  GENERIC_ICON,
  getRegionColors,
} from '../data/civilizationIcons';

/**
 * Enhanced civilization selector with icons and search functionality
 */
export default function CivilizationSelector({
  selectedCivId,
  previewCivId,
  onPreviewChange,
  onApply,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [imageErrors, setImageErrors] = useState({});
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const currentCivId = previewCivId || selectedCivId;
  const currentCiv = civilizations.find((c) => c.id === currentCivId);
  const appliedCiv = civilizations.find((c) => c.id === selectedCivId);
  const isPreviewing = previewCivId && previewCivId !== selectedCivId;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Filter civilizations based on search term
  const filteredCivs = civilizations.filter((civ) => {
    const term = searchTerm.toLowerCase();
    return (
      civ.name.toLowerCase().includes(term) || civ.region.toLowerCase().includes(term)
    );
  });

  // Group civilizations by region for better organization
  const groupedCivs = filteredCivs.reduce((acc, civ) => {
    const region = civ.region || 'None';
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(civ);
    return acc;
  }, {});

  // Sort regions: Generic first, then alphabetically
  const sortedRegions = Object.keys(groupedCivs).sort((a, b) => {
    if (a === 'None') return -1;
    if (b === 'None') return 1;
    return a.localeCompare(b);
  });

  const handleSelect = (civId) => {
    onPreviewChange(civId);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleImageError = (civId) => {
    setImageErrors((prev) => ({ ...prev, [civId]: true }));
  };

  const renderCivIcon = (civ, size = 'w-8 h-8') => {
    if (civ.id === 'generic') {
      return (
        <span className={`${size} flex items-center justify-center text-2xl`}>
          {GENERIC_ICON}
        </span>
      );
    }

    const iconUrl = getCivilizationIconUrl(civ.id);

    if (!iconUrl || imageErrors[civ.id]) {
      return (
        <span className={`${size} flex items-center justify-center text-xl`}>
          {FALLBACK_ICON}
        </span>
      );
    }

    return (
      <img
        src={iconUrl}
        alt={`${civ.name} emblem`}
        className={`${size} object-contain rounded`}
        onError={() => handleImageError(civ.id)}
        loading="lazy"
      />
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main button showing current selection */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center gap-3 p-3 rounded-lg border-2
          transition-all duration-200
          ${
            isPreviewing
              ? 'border-amber-400 bg-amber-50 ring-2 ring-amber-200 shadow-lg'
              : 'border-gray-300 bg-white hover:border-amber-400 hover:shadow-md'
          }
        `}
      >
        {renderCivIcon(currentCiv, 'w-10 h-10')}

        <div className="flex-1 text-left">
          <div className="font-semibold text-gray-900">{currentCiv?.name || 'Select...'}</div>
          {currentCiv?.region && currentCiv.region !== 'None' && (
            <div className="text-xs text-gray-500">{currentCiv.region}</div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isPreviewing && (
            <span className="px-2 py-1 text-xs font-semibold bg-amber-200 text-amber-800 rounded-full animate-pulse">
              PREVIEW
            </span>
          )}
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white border-2 border-amber-300 rounded-lg shadow-2xl z-50 max-h-96 overflow-hidden">
          {/* Search input */}
          <div className="sticky top-0 bg-white border-b p-3">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search civilizations..."
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Civilization list */}
          <div className="overflow-y-auto max-h-72">
            {filteredCivs.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No civilizations found matching &quot;{searchTerm}&quot;
              </div>
            ) : (
              sortedRegions.map((region) => (
                <div key={region}>
                  {/* Region header */}
                  {region !== 'None' && (
                    <div
                      className={`sticky top-0 px-3 py-2 text-xs font-bold uppercase tracking-wider ${getRegionColors(region).bg} ${getRegionColors(region).text}`}
                    >
                      {region}
                    </div>
                  )}

                  {/* Civilizations in this region */}
                  {groupedCivs[region].map((civ) => (
                    <button
                      key={civ.id}
                      type="button"
                      onClick={() => handleSelect(civ.id)}
                      className={`
                        w-full flex items-center gap-3 p-3 text-left
                        transition-colors duration-150
                        ${civ.id === currentCivId ? 'bg-amber-100 border-l-4 border-amber-500' : 'hover:bg-gray-50 border-l-4 border-transparent'}
                        ${civ.id === selectedCivId && civ.id !== currentCivId ? 'bg-green-50' : ''}
                      `}
                    >
                      {renderCivIcon(civ)}

                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{civ.name}</div>
                        {civ.bonuses && civ.bonuses.length > 0 && (
                          <div className="text-xs text-gray-500">
                            {civ.bonuses.length} bonus{civ.bonuses.length !== 1 ? 'es' : ''}
                          </div>
                        )}
                      </div>

                      {civ.id === selectedCivId && (
                        <span className="px-2 py-1 text-xs font-semibold bg-green-200 text-green-800 rounded-full">
                          ACTIVE
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Apply button */}
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={onApply}
          disabled={!isPreviewing}
          className={`
            flex-1 px-6 py-3 rounded-lg font-bold text-lg
            transition-all duration-200
            ${
              isPreviewing
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }
          `}
          title={
            isPreviewing
              ? `Apply ${currentCiv?.name} bonuses to your army`
              : 'Select a different civilization to apply'
          }
        >
          {isPreviewing ? (
            <span className="flex items-center justify-center gap-2">
              <span>Apply {currentCiv?.name}</span>
              <span className="text-sm">→</span>
            </span>
          ) : (
            'Civilization Applied'
          )}
        </button>
      </div>

      {/* Status messages */}
      {isPreviewing && (
        <div className="mt-3 p-3 bg-amber-50 border border-amber-300 rounded-lg">
          <p className="text-amber-800 font-medium flex items-center gap-2">
            <span className="animate-pulse">⚠️</span>
            <span>
              Previewing <strong>{currentCiv?.name}</strong>
            </span>
          </p>
          <p className="text-sm text-amber-700 mt-1">
            Click &quot;Apply&quot; to activate bonuses and update all calculations.
          </p>
        </div>
      )}

      {!isPreviewing && appliedCiv && appliedCiv.id !== 'generic' && (
        <div className="mt-3 p-3 bg-green-50 border border-green-300 rounded-lg">
          <p className="text-green-800 font-medium flex items-center gap-2">
            <span>✓</span>
            <strong>{appliedCiv.name}</strong> bonuses are active
          </p>
        </div>
      )}

      {/* Warning for Generic selection */}
      {appliedCiv?.id === 'generic' && (
        <div className="mt-3 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
          <p className="text-red-800 font-bold flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            No Civilization Selected
          </p>
          <p className="text-sm text-red-700 mt-2">
            <strong>Important:</strong> Select and apply a civilization above to unlock unique
            bonuses and get accurate cost/stat calculations for your army composition.
          </p>
        </div>
      )}
    </div>
  );
}
