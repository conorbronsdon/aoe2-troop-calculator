import { useState, useMemo } from 'react';
import { useArmy, ACTION_TYPES } from '../context/ArmyContext';
import {
  technologies,
  TECH_CATEGORIES,
  getTechById,
  canResearchTech,
  calculateTechCost,
  getUniqueTechsByCiv,
} from '../data/technologies';
import { AGE_ORDER } from '../constants';
import ResourceIcon from './ResourceIcon';

/**
 * TechnologyPanel - Allows users to select technologies and upgrades
 * Displays researched techs and their effects on unit stats
 */
export default function TechnologyPanel() {
  const { state, dispatch } = useArmy();
  const { researchedTechs, config } = state;

  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter technologies based on selected age
  const availableTechs = useMemo(
    () =>
      technologies.filter((tech) => {
        const techAgeOrder = AGE_ORDER[tech.age] || 0;
        const selectedAgeOrder = AGE_ORDER[config.selectedAge] || 3;

        // For unique techs, only show if they belong to the selected civilization
        if (tech.category === TECH_CATEGORIES.UNIQUE) {
          if (!tech.civilization || tech.civilization !== config.selectedCiv) {
            return false;
          }
        }

        return techAgeOrder <= selectedAgeOrder;
      }),
    [config.selectedAge, config.selectedCiv]
  );

  // Get unique techs for the selected civilization
  const civUniqueTechs = useMemo(
    () => getUniqueTechsByCiv(config.selectedCiv),
    [config.selectedCiv]
  );

  // Group technologies by category
  const techsByCategory = useMemo(() => {
    const grouped = {};
    Object.values(TECH_CATEGORIES).forEach((cat) => {
      grouped[cat] = availableTechs.filter((tech) => tech.category === cat);
    });
    return grouped;
  }, [availableTechs]);

  // Apply filters
  const filteredTechsByCategory = useMemo(() => {
    const result = {};
    Object.entries(techsByCategory).forEach(([category, techs]) => {
      // Filter by selected categories
      if (selectedCategories.length > 0 && !selectedCategories.includes(category)) {
        return;
      }

      // Filter by search term
      let filtered = techs;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = techs.filter(
          (tech) =>
            tech.name.toLowerCase().includes(term) || tech.description.toLowerCase().includes(term)
        );
      }

      if (filtered.length > 0) {
        result[category] = filtered;
      }
    });
    return result;
  }, [techsByCategory, selectedCategories, searchTerm]);

  // Calculate total tech cost
  const totalTechCost = useMemo(() => calculateTechCost(researchedTechs), [researchedTechs]);

  const handleTechToggle = (techId) => {
    if (researchedTechs.includes(techId)) {
      // Unresearch the tech and any dependent techs
      const techsToRemove = [techId];

      // Find techs that depend on this one
      technologies.forEach((t) => {
        if (t.prerequisites.includes(techId) && researchedTechs.includes(t.id)) {
          techsToRemove.push(t.id);
        }
      });

      const newTechs = researchedTechs.filter((id) => !techsToRemove.includes(id));
      dispatch({ type: ACTION_TYPES.SET_RESEARCHED_TECHS, techIds: newTechs });
    } else {
      // Research the tech (check prerequisites)
      if (canResearchTech(techId, researchedTechs)) {
        dispatch({ type: ACTION_TYPES.RESEARCH_TECH, techId });
      }
    }
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      }
      return [...prev, category];
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchTerm('');
  };

  const resetAllTechs = () => {
    dispatch({ type: ACTION_TYPES.RESET_TECHS });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      [TECH_CATEGORIES.BLACKSMITH]: '🔨',
      [TECH_CATEGORIES.UNIVERSITY]: '🎓',
      [TECH_CATEGORIES.MONASTERY]: '⛪',
      [TECH_CATEGORIES.STABLE]: '🐴',
      [TECH_CATEGORIES.ARCHERY_RANGE]: '🏹',
      [TECH_CATEGORIES.BARRACKS]: '🛡️',
      [TECH_CATEGORIES.CASTLE]: '🏰',
      [TECH_CATEGORIES.DOCK]: '⚓',
      [TECH_CATEGORIES.TOWN_CENTER]: '🏠',
      [TECH_CATEGORIES.UNIQUE]: '⭐',
    };
    return icons[category] || '⚙️';
  };

  const getAgeBadgeColor = (age) => {
    const colors = {
      dark: 'bg-gray-600',
      feudal: 'bg-green-600',
      castle: 'bg-blue-600',
      imperial: 'bg-purple-600',
    };
    return colors[age] || 'bg-gray-600';
  };

  const hasActiveFilters = searchTerm || selectedCategories.length > 0;

  return (
    <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-700/50 rounded-lg shadow-lg mb-6 dark:from-indigo-900/30 dark:to-purple-900/30 dark:border-indigo-600">
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-indigo-900/10 dark:hover:bg-indigo-800/20 transition-colors rounded-t-lg"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-xl font-semibold text-indigo-900 dark:text-indigo-100 flex items-center gap-2">
          <span role="img" aria-label="technology">
            ⚙️
          </span>
          Technologies & Upgrades
          <span className="text-sm font-normal text-indigo-600 dark:text-indigo-300">
            ({researchedTechs.length} researched)
          </span>
        </h3>
        <div className="flex items-center gap-4">
          {/* Tech Cost Summary */}
          {researchedTechs.length > 0 && (
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="text-indigo-700 dark:text-indigo-300 font-medium">Tech Cost:</span>
              {totalTechCost.food > 0 && (
                <span className="text-orange-600 dark:text-orange-400 flex items-center gap-0.5" title="Food">
                  <ResourceIcon resource="food" size="xs" />
                  {totalTechCost.food}
                </span>
              )}
              {totalTechCost.wood > 0 && (
                <span className="text-amber-700 dark:text-amber-400 flex items-center gap-0.5" title="Wood">
                  <ResourceIcon resource="wood" size="xs" />
                  {totalTechCost.wood}
                </span>
              )}
              {totalTechCost.gold > 0 && (
                <span className="text-yellow-600 dark:text-yellow-400 flex items-center gap-0.5" title="Gold">
                  <ResourceIcon resource="gold" size="xs" />
                  {totalTechCost.gold}
                </span>
              )}
            </div>
          )}
          <button
            className="text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-100 transition-colors"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Collapse technology panel' : 'Expand technology panel'}
          >
            {isExpanded ? '▼' : '▶'}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 pt-0">
          {/* Filter Controls */}
          <div className="mb-4 space-y-3">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-indigo-300 dark:border-indigo-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                aria-label="Search technologies"
              />
              <span className="absolute left-3 top-2.5 text-gray-400" role="img" aria-hidden="true">
                🔍
              </span>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {Object.values(TECH_CATEGORIES)
                .filter((cat) => {
                  // Only show UNIQUE category if a specific civ is selected and has unique techs
                  if (cat === TECH_CATEGORIES.UNIQUE) {
                    return civUniqueTechs.length > 0;
                  }
                  // Show first 6 standard categories
                  const standardCats = [
                    TECH_CATEGORIES.BLACKSMITH,
                    TECH_CATEGORIES.UNIVERSITY,
                    TECH_CATEGORIES.MONASTERY,
                    TECH_CATEGORIES.STABLE,
                    TECH_CATEGORIES.ARCHERY_RANGE,
                    TECH_CATEGORIES.BARRACKS,
                  ];
                  return standardCats.includes(cat);
                })
                .map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryToggle(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                      selectedCategories.includes(category)
                        ? category === TECH_CATEGORIES.UNIQUE
                          ? 'bg-yellow-500 text-white shadow-md'
                          : 'bg-indigo-600 text-white shadow-md'
                        : category === TECH_CATEGORIES.UNIQUE
                          ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800/50'
                          : 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/50'
                    }`}
                    aria-pressed={selectedCategories.includes(category)}
                  >
                    {getCategoryIcon(category)} {category}
                  </button>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Clear Filters
                </button>
              )}
              {researchedTechs.length > 0 && (
                <button
                  onClick={resetAllTechs}
                  className="px-3 py-1 text-sm bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors"
                >
                  Reset All Techs
                </button>
              )}
            </div>
          </div>

          {/* Technology List by Category */}
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {Object.entries(filteredTechsByCategory).map(([category, techs]) => (
              <div key={category} className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                  <span role="img" aria-label={category}>
                    {getCategoryIcon(category)}
                  </span>
                  {category}
                  <span className="text-xs font-normal text-gray-500">
                    ({techs.filter((t) => researchedTechs.includes(t.id)).length}/{techs.length})
                  </span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {techs.map((tech) => {
                    const isResearched = researchedTechs.includes(tech.id);
                    const canResearch = canResearchTech(tech.id, researchedTechs);
                    const isLocked = !isResearched && !canResearch;
                    const isUnique = tech.category === TECH_CATEGORIES.UNIQUE;

                    return (
                      <label
                        key={tech.id}
                        className={`flex items-start gap-2 p-2 rounded border transition-all cursor-pointer ${
                          isResearched
                            ? isUnique
                              ? 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-400 dark:border-yellow-600'
                              : 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-600'
                            : isLocked
                              ? 'bg-gray-100 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 opacity-60 cursor-not-allowed'
                              : isUnique
                                ? 'bg-yellow-50/50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700 hover:bg-yellow-100 dark:hover:bg-yellow-900/40'
                                : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
                        }`}
                        title={
                          isLocked ? `Requires: ${tech.prerequisites.join(', ')}` : tech.description
                        }
                      >
                        <input
                          type="checkbox"
                          checked={isResearched}
                          onChange={() => !isLocked && handleTechToggle(tech.id)}
                          disabled={isLocked}
                          className={`mt-1 rounded ${isUnique ? 'text-yellow-500 focus:ring-yellow-500' : 'text-indigo-600 focus:ring-indigo-500'}`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1 flex-wrap">
                            {isUnique && (
                              <span className="text-yellow-500" role="img" aria-label="unique">
                                ⭐
                              </span>
                            )}
                            <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                              {tech.name}
                            </span>
                            <span
                              className={`text-xs px-1.5 py-0.5 rounded text-white ${getAgeBadgeColor(tech.age)}`}
                            >
                              {tech.age.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-1">
                            {tech.cost.food > 0 && (
                              <span className="mr-1 inline-flex items-center gap-0.5">
                                <ResourceIcon resource="food" size="xs" />
                                {tech.cost.food}
                              </span>
                            )}
                            {tech.cost.wood > 0 && (
                              <span className="mr-1 inline-flex items-center gap-0.5">
                                <ResourceIcon resource="wood" size="xs" />
                                {tech.cost.wood}
                              </span>
                            )}
                            {tech.cost.gold > 0 && (
                              <span className="mr-1 inline-flex items-center gap-0.5">
                                <ResourceIcon resource="gold" size="xs" />
                                {tech.cost.gold}
                              </span>
                            )}
                          </div>
                          {isLocked && tech.prerequisites.length > 0 && (
                            <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                              Requires:{' '}
                              {tech.prerequisites.map((p) => getTechById(p)?.name || p).join(' → ')}
                            </div>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}

            {Object.keys(filteredTechsByCategory).length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                No technologies match your filters
              </div>
            )}
          </div>

          {/* Mobile Tech Cost Summary */}
          {researchedTechs.length > 0 && (
            <div className="sm:hidden mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
              <div className="text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-1">
                Total Technology Cost:
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="text-orange-600 dark:text-orange-400 inline-flex items-center gap-1">
                  <ResourceIcon resource="food" size="sm" />
                  {totalTechCost.food}
                </span>
                <span className="text-amber-700 dark:text-amber-400 inline-flex items-center gap-1">
                  <ResourceIcon resource="wood" size="sm" />
                  {totalTechCost.wood}
                </span>
                <span className="text-yellow-600 dark:text-yellow-400 inline-flex items-center gap-1">
                  <ResourceIcon resource="gold" size="sm" />
                  {totalTechCost.gold}
                </span>
                <span className="text-gray-600 dark:text-gray-400 inline-flex items-center gap-1">
                  <ResourceIcon resource="stone" size="sm" />
                  {totalTechCost.stone}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

TechnologyPanel.propTypes = {};
