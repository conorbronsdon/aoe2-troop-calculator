import { getUnitById } from '../data/units';
import { getCivilizationById } from '../data/civilizations';
import { calculateUnitCost } from '../utils/calculations';
import { logger } from '../utils/errorHandler';
import { APP_VERSION } from '../constants';
import { Age } from '../types';

/**
 * Export Service
 * Handles exporting army compositions to various formats
 */

// Types for export service
// Using a partial config interface that's compatible with ArmyConfig
interface ExportConfig {
  selectedCiv: string;
  selectedAge: Age;
  populationCap: number;
  // Optional fields to make compatible with ArmyConfig
  resourceLimitMode?: 'total' | 'individual';
  resourceLimits?: {
    food: number;
    wood: number;
    gold: number;
    stone: number;
  };
  totalResourceLimit?: number;
  previewCiv?: string;
  alliedCivs?: string[];
  displayMode?: string;
  showTechPanel?: boolean;
  showUnitCardStats?: boolean;
}

interface ExportTotals {
  units: number;
  food: number;
  wood: number;
  gold: number;
  stone: number;
  population: number;
}

interface UnitCost {
  food: number;
  wood: number;
  gold: number;
  stone: number;
}

interface ExportUnitData {
  id: string;
  name: string;
  category: string;
  quantity: number;
  costPerUnit: UnitCost;
  populationPerUnit: number;
  totalCost: UnitCost;
  totalPopulation: number;
}

interface ExportMeta {
  exportedAt: string;
  civilization: string;
  civilizationId: string;
  age: Age;
  populationCap: number;
  version: string;
}

interface ExportData {
  meta: ExportMeta;
  units: ExportUnitData[];
  totals: ExportTotals;
}

type CSVRow = (string | number)[];

interface ExportServiceInterface {
  toCSV(composition: Record<string, number>, config: ExportConfig): string;
  downloadCSV(csvContent: string, filename?: string | null): void;
  copyToClipboard(csvContent: string): Promise<boolean>;
  toJSON(composition: Record<string, number>, config: ExportConfig): string;
  downloadJSON(jsonContent: string, filename?: string | null): void;
}

export const ExportService: ExportServiceInterface = {
  /**
   * Export composition to CSV format
   * @param composition - Army composition { unitId: quantity }
   * @param config - Configuration (civ, age, etc.)
   * @returns CSV string
   */
  toCSV(composition: Record<string, number>, config: ExportConfig): string {
    const civ = getCivilizationById(config.selectedCiv);
    const rows: CSVRow[] = [
      ['Age of Empires II - Army Composition'],
      [''],
      ['Civilization', civ ? civ.name : 'Unknown'],
      ['Age', config.selectedAge.charAt(0).toUpperCase() + config.selectedAge.slice(1)],
      ['Population Cap', config.populationCap],
      ['Export Date', new Date().toLocaleDateString()],
      [''],
      [
        'Unit',
        'Quantity',
        'Food (each)',
        'Wood (each)',
        'Gold (each)',
        'Stone (each)',
        'Population (each)',
        'Total Food',
        'Total Wood',
        'Total Gold',
        'Total Stone',
        'Total Pop',
      ],
    ];

    const totals: ExportTotals = {
      units: 0,
      food: 0,
      wood: 0,
      gold: 0,
      stone: 0,
      population: 0,
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
            unit.population * quantity,
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
      totals.population,
    ]);

    // Convert to CSV string
    return rows
      .map((row) =>
        row
          .map((cell) => {
            // Escape cells containing commas or quotes
            const cellStr = String(cell);
            if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
              return `"${cellStr.replace(/"/g, '""')}"`;
            }
            return cellStr;
          })
          .join(',')
      )
      .join('\n');
  },

  /**
   * Download CSV file
   * @param csvContent - CSV string
   * @param filename - Filename (optional)
   */
  downloadCSV(csvContent: string, filename: string | null = null): void {
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
   * @param csvContent - CSV string
   * @returns Success status
   */
  async copyToClipboard(csvContent: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(csvContent);
      return true;
    } catch (error) {
      logger.error('Failed to copy to clipboard', error);
      return false;
    }
  },

  /**
   * Export composition to JSON format
   * @param composition - Army composition { unitId: quantity }
   * @param config - Configuration (civ, age, etc.)
   * @returns JSON string
   */
  toJSON(composition: Record<string, number>, config: ExportConfig): string {
    const civ = getCivilizationById(config.selectedCiv);
    const units: ExportUnitData[] = [];

    const totals: ExportTotals = {
      units: 0,
      food: 0,
      wood: 0,
      gold: 0,
      stone: 0,
      population: 0,
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
            quantity,
            costPerUnit: {
              food: cost.food,
              wood: cost.wood,
              gold: cost.gold,
              stone: cost.stone,
            },
            populationPerUnit: unit.population,
            totalCost: {
              food: cost.food * quantity,
              wood: cost.wood * quantity,
              gold: cost.gold * quantity,
              stone: cost.stone * quantity,
            },
            totalPopulation: unit.population * quantity,
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

    const exportData: ExportData = {
      meta: {
        exportedAt: new Date().toISOString(),
        civilization: civ ? civ.name : 'Unknown',
        civilizationId: config.selectedCiv,
        age: config.selectedAge,
        populationCap: config.populationCap,
        version: APP_VERSION,
      },
      units,
      totals,
    };

    return JSON.stringify(exportData, null, 2);
  },

  /**
   * Download JSON file
   * @param jsonContent - JSON string
   * @param filename - Filename (optional)
   */
  downloadJSON(jsonContent: string, filename: string | null = null): void {
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
  },
};
