import { useState } from 'react';
import { useArmy, ACTION_TYPES } from '../context/ArmyContext';
import { getUnitById } from '../data/units';
import { calculateUnitCost } from '../utils/calculations';
import { ExportService } from '../services/export.service';
import { ShareService } from '../services/share.service';
import ResourceIcon from './ResourceIcon';

export default function ArmyCompositionSummary() {
  const { state, dispatch } = useArmy();
  const { composition, config } = state;
  const [shareMessage, setShareMessage] = useState('');
  const [exportMessage, setExportMessage] = useState('');

  const resetComposition = () => {
    dispatch({ type: ACTION_TYPES.RESET_COMPOSITION });
  };

  const handleExportCSV = () => {
    const csv = ExportService.toCSV(composition, config);
    ExportService.downloadCSV(csv);
    setExportMessage('✓ Downloaded!');
    setTimeout(() => setExportMessage(''), 2000);
  };

  const _handleCopyCSV = async () => {
    const csv = ExportService.toCSV(composition, config);
    const success = await ExportService.copyToClipboard(csv);
    setExportMessage(success ? '✓ Copied to clipboard!' : '✗ Copy failed');
    setTimeout(() => setExportMessage(''), 2000);
  };

  const handleExportJSON = () => {
    const json = ExportService.toJSON(composition, config);
    ExportService.downloadJSON(json);
    setExportMessage('✓ JSON Downloaded!');
    setTimeout(() => setExportMessage(''), 2000);
  };

  const handleShare = async () => {
    const url = ShareService.generateUrl(composition, config);
    if (url) {
      const success = await ShareService.copyToClipboard(url);
      setShareMessage(success ? '✓ Link copied to clipboard!' : '✗ Copy failed');
    } else {
      setShareMessage('✗ Failed to generate link');
    }
    setTimeout(() => setShareMessage(''), 2000);
  };

  const compositionEntries = Object.entries(composition).filter(([_, quantity]) => quantity > 0);

  if (compositionEntries.length === 0) {
    return null;
  }

  const totalUnits = Object.values(composition).reduce((sum, q) => sum + q, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Army Composition</h2>
        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
            title="Copy shareable link"
          >
            📋 Share
          </button>
          <div className="relative">
            <button
              onClick={handleExportCSV}
              className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors"
              title="Download as CSV"
            >
              📥 CSV
            </button>
          </div>
          <div className="relative">
            <button
              onClick={handleExportJSON}
              className="bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white px-4 py-2 rounded text-sm transition-colors"
              title="Download as JSON"
            >
              📥 JSON
            </button>
          </div>
          <button
            onClick={resetComposition}
            className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition-colors"
          >
            Reset All
          </button>
        </div>
      </div>

      {/* Status messages */}
      {(shareMessage || exportMessage) && (
        <div className="mb-4 text-sm text-center">
          {shareMessage && <span className="text-blue-600 dark:text-blue-400 mr-4">{shareMessage}</span>}
          {exportMessage && <span className="text-green-600 dark:text-green-400">{exportMessage}</span>}
        </div>
      )}

      <div className="space-y-2">
        {compositionEntries.map(([unitId, quantity]) => {
          const unit = getUnitById(unitId);
          if (!unit) {
            return null;
          }

          const adjustedCost = calculateUnitCost(unit, config.selectedCiv, config.selectedAge);
          const totalUnitCost = {
            food: adjustedCost.food * quantity,
            wood: adjustedCost.wood * quantity,
            gold: adjustedCost.gold * quantity,
            stone: adjustedCost.stone * quantity,
          };

          return (
            <div key={unitId} className="border border-gray-200 dark:border-gray-600 rounded p-3 flex justify-between items-center bg-white dark:bg-gray-700/50">
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">{quantity}x</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{unit.name}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                {totalUnitCost.food > 0 && (
                  <span className="mr-3 inline-flex items-center gap-1">
                    <ResourceIcon resource="food" size="xs" />
                    {totalUnitCost.food}
                  </span>
                )}
                {totalUnitCost.wood > 0 && (
                  <span className="mr-3 inline-flex items-center gap-1">
                    <ResourceIcon resource="wood" size="xs" />
                    {totalUnitCost.wood}
                  </span>
                )}
                {totalUnitCost.gold > 0 && (
                  <span className="mr-3 inline-flex items-center gap-1">
                    <ResourceIcon resource="gold" size="xs" />
                    {totalUnitCost.gold}
                  </span>
                )}
                <span className="ml-3 text-blue-600 dark:text-blue-400">Pop: {unit.population * quantity}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          <strong className="text-gray-900 dark:text-gray-100">Total Units:</strong> {totalUnits}
        </div>
      </div>
    </div>
  );
}
