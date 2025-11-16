import { useState } from 'react';
import { useArmy, ACTION_TYPES } from '../context/ArmyContext';
import { getUnitById } from '../data/units';
import { calculateUnitCost } from '../utils/calculations';
import { ExportService } from '../services/export.service';
import { ShareService } from '../services/share.service';

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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Army Composition</h2>
        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
            title="Copy shareable link"
          >
            📋 Share
          </button>
          <div className="relative">
            <button
              onClick={handleExportCSV}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
              title="Download as CSV"
            >
              📥 CSV
            </button>
          </div>
          <div className="relative">
            <button
              onClick={handleExportJSON}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded text-sm"
              title="Download as JSON"
            >
              📥 JSON
            </button>
          </div>
          <button
            onClick={resetComposition}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
          >
            Reset All
          </button>
        </div>
      </div>

      {/* Status messages */}
      {(shareMessage || exportMessage) && (
        <div className="mb-4 text-sm text-center">
          {shareMessage && <span className="text-blue-600 mr-4">{shareMessage}</span>}
          {exportMessage && <span className="text-green-600">{exportMessage}</span>}
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
            <div key={unitId} className="border rounded p-3 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-lg">{quantity}x</span>
                <span className="font-medium">{unit.name}</span>
              </div>
              <div className="text-sm text-gray-600">
                {totalUnitCost.food > 0 && <span className="mr-3">🌾 {totalUnitCost.food}</span>}
                {totalUnitCost.wood > 0 && <span className="mr-3">🪵 {totalUnitCost.wood}</span>}
                {totalUnitCost.gold > 0 && <span className="mr-3">🪙 {totalUnitCost.gold}</span>}
                <span className="ml-3 text-blue-600">Pop: {unit.population * quantity}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="text-sm text-gray-600">
          <strong>Total Units:</strong> {totalUnits}
        </div>
      </div>
    </div>
  );
}
