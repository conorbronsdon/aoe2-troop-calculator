import { getUnitById } from '../data/units';
import { getCivilizationById } from '../data/civilizations';
import { calculateUnitCost } from '../utils/calculations';

/**
 * Export Service
 * Handles exporting army compositions to various formats
 */

export const ExportService = {
  /**
   * Export composition to CSV format
   * @param {Object} composition - Army composition { unitId: quantity }
   * @param {Object} config - Configuration (civ, age, etc.)
   * @returns {string} CSV string
   */
  toCSV(composition, config) {
    const civ = getCivilizationById(config.selectedCiv);
    const rows = [
      ['Age of Empires II - Army Composition'],
      [''],
      ['Civilization', civ ? civ.name : 'Unknown'],
      ['Age', config.selectedAge.charAt(0).toUpperCase() + config.selectedAge.slice(1)],
      ['Population Cap', config.populationCap],
      ['Export Date', new Date().toLocaleDateString()],
      [''],
      ['Unit', 'Quantity', 'Food (each)', 'Wood (each)', 'Gold (each)', 'Stone (each)', 'Population (each)', 'Total Food', 'Total Wood', 'Total Gold', 'Total Stone', 'Total Pop']
    ];

    let totals = {
      units: 0,
      food: 0,
      wood: 0,
      gold: 0,
      stone: 0,
      population: 0
    };

    Object.entries(composition).forEach(([unitId, quantity]) => {
      if (quantity > 0) {
        const unit = getUnitById(unitId);
        if (unit) {
          const cost = calculateUnitCost(unit, config.selectedCiv, config.selectedAge);

          rows.push([
            unit.name,
            quantity,
            cost.food,
            cost.wood,
            cost.gold,
            cost.stone,
            unit.population,
            cost.food * quantity,
            cost.wood * quantity,
            cost.gold * quantity,
            cost.stone * quantity,
            unit.population * quantity
          ]);

          totals.units += quantity;
          totals.food += cost.food * quantity;
          totals.wood += cost.wood * quantity;
          totals.gold += cost.gold * quantity;
          totals.stone += cost.stone * quantity;
          totals.population += unit.population * quantity;
        }
      }
    });

    // Add totals row
    rows.push([]);
    rows.push([
      'TOTAL',
      totals.units,
      '',
      '',
      '',
      '',
      '',
      totals.food,
      totals.wood,
      totals.gold,
      totals.stone,
      totals.population
    ]);

    // Convert to CSV string
    return rows.map(row =>
      row.map(cell => {
        // Escape cells containing commas or quotes
        const cellStr = String(cell);
        if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
          return `"${cellStr.replace(/"/g, '""')}"`;
        }
        return cellStr;
      }).join(',')
    ).join('\n');
  },

  /**
   * Download CSV file
   * @param {string} csvContent - CSV string
   * @param {string} filename - Filename (optional)
   */
  downloadCSV(csvContent, filename = null) {
    const timestamp = new Date().toISOString().split('T')[0];
    const name = filename || `aoe2-army-composition-${timestamp}.csv`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  },

  /**
   * Copy CSV to clipboard
   * @param {string} csvContent - CSV string
   * @returns {Promise<boolean>} Success status
   */
  async copyToClipboard(csvContent) {
    try {
      await navigator.clipboard.writeText(csvContent);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  },

  /**
   * Export composition to JSON format
   * @param {Object} composition - Army composition { unitId: quantity }
   * @param {Object} config - Configuration (civ, age, etc.)
   * @returns {string} JSON string
   */
  toJSON(composition, config) {
    const civ = getCivilizationById(config.selectedCiv);
    const units = [];

    let totals = {
      units: 0,
      food: 0,
      wood: 0,
      gold: 0,
      stone: 0,
      population: 0
    };

    Object.entries(composition).forEach(([unitId, quantity]) => {
      if (quantity > 0) {
        const unit = getUnitById(unitId);
        if (unit) {
          const cost = calculateUnitCost(unit, config.selectedCiv, config.selectedAge);

          units.push({
            id: unitId,
            name: unit.name,
            category: unit.category,
            quantity: quantity,
            costPerUnit: {
              food: cost.food,
              wood: cost.wood,
              gold: cost.gold,
              stone: cost.stone
            },
            populationPerUnit: unit.population,
            totalCost: {
              food: cost.food * quantity,
              wood: cost.wood * quantity,
              gold: cost.gold * quantity,
              stone: cost.stone * quantity
            },
            totalPopulation: unit.population * quantity
          });

          totals.units += quantity;
          totals.food += cost.food * quantity;
          totals.wood += cost.wood * quantity;
          totals.gold += cost.gold * quantity;
          totals.stone += cost.stone * quantity;
          totals.population += unit.population * quantity;
        }
      }
    });

    const exportData = {
      meta: {
        exportedAt: new Date().toISOString(),
        civilization: civ ? civ.name : 'Unknown',
        civilizationId: config.selectedCiv,
        age: config.selectedAge,
        populationCap: config.populationCap,
        version: '2.2.1'
      },
      units: units,
      totals: totals
    };

    return JSON.stringify(exportData, null, 2);
  },

  /**
   * Download JSON file
   * @param {string} jsonContent - JSON string
   * @param {string} filename - Filename (optional)
   */
  downloadJSON(jsonContent, filename = null) {
    const timestamp = new Date().toISOString().split('T')[0];
    const name = filename || `aoe2-army-composition-${timestamp}.json`;

    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }
};
