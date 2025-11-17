import React, { useState, useEffect } from 'react';
import { useArmy, ACTION_TYPES, ArmyConfig } from '../context/ArmyContext';
import { StorageService } from '../services/storage.service';

interface SaveLoadPanelProps {
  hideSaveButton?: boolean;
}

interface SavedComposition {
  id: string;
  name: string;
  composition: Record<string, number>;
  config: Partial<ArmyConfig>;
  createdAt: string;
}

export default function SaveLoadPanel({ hideSaveButton = false }: SaveLoadPanelProps): React.ReactElement | null {
  const { state, dispatch } = useArmy();
  const { composition, config } = state;
  const [savedCompositions, setSavedCompositions] = useState<SavedComposition[]>([]);
  const [saveName, setSaveName] = useState<string>('');
  const [showSaveDialog, setShowSaveDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  // Load saved compositions on mount
  useEffect(() => {
    if (StorageService.isAvailable()) {
      loadSavedCompositions();
    }
  }, []);

  const loadSavedCompositions = (): void => {
    const saved = StorageService.getAll();
    setSavedCompositions(saved as SavedComposition[]);
  };

  const handleSave = (): void => {
    if (!saveName.trim()) {
      setMessage('Please enter a name');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    StorageService.save(saveName.trim(), composition, config);
    setSaveName('');
    setShowSaveDialog(false);
    loadSavedCompositions();
    setMessage('✓ Saved!');
    setTimeout(() => setMessage(''), 2000);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('savedCompositionsUpdated'));
  };

  const handleLoad = (saved: SavedComposition): void => {
    dispatch({
      type: ACTION_TYPES.LOAD_COMPOSITION,
      composition: saved.composition,
      config: saved.config,
    });
    setMessage(`✓ Loaded: ${saved.name}`);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleDelete = (id: string, name: string): void => {
    if (window.confirm(`Delete "${name}"?`)) {
      StorageService.delete(id);
      loadSavedCompositions();
      setMessage('✓ Deleted');
      setTimeout(() => setMessage(''), 2000);
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('savedCompositionsUpdated'));
    }
  };

  const hasUnits = Object.keys(composition).length > 0;

  if (!StorageService.isAvailable()) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transition-colors duration-300">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">💾 Saved Compositions</h2>
        {hasUnits && !hideSaveButton && (
          <button
            onClick={() => setShowSaveDialog(!showSaveDialog)}
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm transition-colors"
          >
            Save Current
          </button>
        )}
      </div>

      {message && <div className="mb-4 text-sm text-center text-green-600 dark:text-green-400">{message}</div>}

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="mb-3 p-3 border border-gray-200 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700">
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Composition Name</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={saveName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSaveName(e.target.value)}
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSave()}
              placeholder="e.g., Knight Rush Build"
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded px-2 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              autoFocus
            />
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => {
                setShowSaveDialog(false);
                setSaveName('');
              }}
              className="bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500 text-white px-3 py-1.5 rounded text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Saved Compositions List */}
      {savedCompositions.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No saved compositions yet. Build an army and click &quot;Save Current&quot; to get
          started!
        </p>
      ) : (
        <div className="space-y-2">
          {savedCompositions.map((saved) => (
            <div
              key={saved.id}
              className="border border-gray-200 dark:border-gray-600 rounded p-3 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-gray-100">{saved.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {saved.config.selectedCiv} • {saved.config.selectedAge} Age •{' '}
                  {Object.values(saved.composition).reduce((sum, q) => sum + q, 0)} units •{' '}
                  {new Date(saved.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleLoad(saved)}
                  className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Load
                </button>
                <button
                  onClick={() => handleDelete(saved.id, saved.name)}
                  className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {savedCompositions.length > 0 && (
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
          {savedCompositions.length} saved composition{savedCompositions.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}
