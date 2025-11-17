import React, { useState, useRef, useEffect } from 'react';
import { useArmy, ACTION_TYPES, ArmyConfig } from '../context/ArmyContext';
import { getUnitById } from '../data/units';
import { calculateUnitCost } from '../utils/calculations';
import { ExportService } from '../services/export.service';
import { ShareService } from '../services/share.service';
import { ImportService } from '../services/import.service';
import { StorageService } from '../services/storage.service';
import ResourceIcon from './ResourceIcon';
import ImportModal from './ImportModal';

interface ImportConfig {
  selectedAge: string;
  selectedCiv: string;
  previewCiv: string;
  populationCap: number;
  resourceLimitMode?: string;
  resourceLimits?: {
    food: number;
    wood: number;
    gold: number;
    stone: number;
  };
  totalResourceLimit?: number;
  version?: string;
}

interface ImportData {
  composition: Record<string, number>;
  config: ImportConfig;
}

interface UnitCost {
  food: number;
  wood: number;
  gold: number;
  stone: number;
}

export default function ArmyCompositionSummary(): React.ReactElement {
  const { state, dispatch } = useArmy();
  const { composition, config } = state;
  const [shareMessage, setShareMessage] = useState<string>('');
  const [exportMessage, setExportMessage] = useState<string>('');
  const [importMessage, setImportMessage] = useState<string>('');
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [showSaveDialog, setShowSaveDialog] = useState<boolean>(false);
  const [saveName, setSaveName] = useState<string>('');
  const [saveMessage, setSaveMessage] = useState<string>('');
  const [showExportMenu, setShowExportMenu] = useState<boolean>(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  // Close export menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setShowExportMenu(false);
      }
    };

    if (showExportMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showExportMenu]);

  const handleSaveComposition = (): void => {
    if (!saveName.trim()) {
      setSaveMessage('Please enter a name');
      setTimeout(() => setSaveMessage(''), 2000);
      return;
    }

    StorageService.save(saveName.trim(), composition, config);
    setSaveName('');
    setShowSaveDialog(false);
    setSaveMessage('✓ Saved!');
    setTimeout(() => setSaveMessage(''), 2000);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('savedCompositionsUpdated'));
  };

  const handleImport = (data: ImportData, mode: string, source: string, filename: string | null = null): void => {
    dispatch({
      type: ACTION_TYPES.IMPORT_COMPOSITION,
      composition: data.composition,
      config: data.config as Partial<ArmyConfig>,
      mode: mode as 'replace' | 'merge',
    });

    // Track import history
    const historyEntry = ImportService.createHistoryEntry(source as 'file' | 'paste' | 'url', filename, {
      success: true,
      data: {
        composition: data.composition,
        config: {
          selectedAge: data.config.selectedAge as 'dark' | 'feudal' | 'castle' | 'imperial',
          selectedCiv: data.config.selectedCiv,
          previewCiv: data.config.previewCiv,
          populationCap: data.config.populationCap,
          resourceLimitMode: data.config.resourceLimitMode as 'total' | 'individual' | undefined,
          resourceLimits: data.config.resourceLimits,
          totalResourceLimit: data.config.totalResourceLimit,
          version: data.config.version,
        },
      },
      errors: [],
      warnings: [],
    });
    StorageService.addImportHistory(historyEntry);

    const unitCount = Object.keys(data.composition).length;
    setImportMessage(`Imported ${unitCount} unit type${unitCount !== 1 ? 's' : ''}`);
    setTimeout(() => setImportMessage(''), 3000);
  };

  const handleExportCSV = (): void => {
    const csv = ExportService.toCSV(composition, config);
    ExportService.downloadCSV(csv);
    setExportMessage('✓ CSV Downloaded!');
    setShowExportMenu(false);
    setTimeout(() => setExportMessage(''), 2000);
  };

  const handleExportJSON = (): void => {
    const json = ExportService.toJSON(composition, config);
    ExportService.downloadJSON(json);
    setExportMessage('✓ JSON Downloaded!');
    setShowExportMenu(false);
    setTimeout(() => setExportMessage(''), 2000);
  };

  const handleShare = async (): Promise<void> => {
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
    return (
      <>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Army Composition</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setIsImportModalOpen(true)}
                className="bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm transition-colors"
                title="Import composition from file or URL"
              >
                📤 Import
              </button>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No units selected. Add units from the list above or import a composition.
          </p>
          {importMessage && (
            <div className="text-sm text-center">
              <span className="text-indigo-600 dark:text-indigo-400">{importMessage}</span>
            </div>
          )}
        </div>
        <ImportModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
          onImport={handleImport}
        />
      </>
    );
  }

  const totalUnits = Object.values(composition).reduce((sum, q) => sum + q, 0);

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Army Composition</h2>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm transition-colors"
              title="Import composition from file or URL"
            >
              📤 Import
            </button>
            <button
              onClick={() => setShowSaveDialog(!showSaveDialog)}
              className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
              title="Save current composition"
            >
              💾 Save
            </button>
            <button
              onClick={handleShare}
              className="bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white px-4 py-2 rounded text-sm transition-colors"
              title="Copy shareable link"
            >
              📋 Share
            </button>
            <div className="relative" ref={exportMenuRef}>
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors flex items-center gap-1"
                title="Export composition"
                aria-expanded={showExportMenu}
                aria-haspopup="true"
              >
                📥 Export
                <span className="text-xs">{showExportMenu ? '▲' : '▼'}</span>
              </button>
              {showExportMenu && (
                <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-10 overflow-hidden">
                  <button
                    onClick={handleExportCSV}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                  >
                    <span className="text-green-600 dark:text-green-400">📄</span>
                    Download CSV
                  </button>
                  <button
                    onClick={handleExportJSON}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                  >
                    <span className="text-purple-600 dark:text-purple-400">📋</span>
                    Download JSON
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status messages */}
        {(shareMessage || exportMessage || importMessage || saveMessage) && (
          <div className="mb-4 text-sm text-center">
            {shareMessage && <span className="text-blue-600 dark:text-blue-400 mr-4">{shareMessage}</span>}
            {exportMessage && <span className="text-green-600 dark:text-green-400 mr-4">{exportMessage}</span>}
            {importMessage && <span className="text-indigo-600 dark:text-indigo-400 mr-4">{importMessage}</span>}
            {saveMessage && <span className="text-green-600 dark:text-green-400">{saveMessage}</span>}
          </div>
        )}

        {/* Save Dialog */}
        {showSaveDialog && (
          <div className="mb-4 p-4 border border-gray-200 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Composition Name</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={saveName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSaveName(e.target.value)}
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSaveComposition()}
                placeholder="e.g., Knight Rush Build"
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                autoFocus
              />
              <button
                onClick={handleSaveComposition}
                className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowSaveDialog(false);
                  setSaveName('');
                }}
                className="bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500 text-white px-4 py-2 rounded text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

      <div className="space-y-2">
        {compositionEntries.map(([unitId, quantity]) => {
          const unit = getUnitById(unitId);
          if (!unit) {
            return null;
          }

          const adjustedCost = calculateUnitCost(unit, config.selectedCiv, config.selectedAge) as UnitCost;
          const totalUnitCost: UnitCost = {
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
      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImport}
      />
    </>
  );
}
