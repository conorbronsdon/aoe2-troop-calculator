import React, { useState, useEffect } from 'react';
import { useArmy, ACTION_TYPES } from '../context/ArmyContext';
import { StorageService } from '../services/storage.service';

export default function SaveLoadPanel() {
  const { state, dispatch } = useArmy();
  const { composition, config } = state;
  const [savedCompositions, setSavedCompositions] = useState([]);
  const [saveName, setSaveName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [message, setMessage] = useState('');

  // Load saved compositions on mount
  useEffect(() => {
    if (StorageService.isAvailable()) {
      loadSavedCompositions();
    }
  }, []);

  const loadSavedCompositions = () => {
    const saved = StorageService.getAll();
    setSavedCompositions(saved);
  };

  const handleSave = () => {
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
  };

  const handleLoad = (saved) => {
    dispatch({
      type: ACTION_TYPES.LOAD_COMPOSITION,
      composition: saved.composition,
      config: saved.config
    });
    setMessage(`✓ Loaded: ${saved.name}`);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}"?`)) {
      StorageService.delete(id);
      loadSavedCompositions();
      setMessage('✓ Deleted');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const hasUnits = Object.keys(composition).length > 0;

  if (!StorageService.isAvailable()) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Saved Compositions</h2>
        {hasUnits && (
          <button
            onClick={() => setShowSaveDialog(!showSaveDialog)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
          >
            💾 Save Current
          </button>
        )}
      </div>

      {message && (
        <div className="mb-4 text-sm text-center text-green-600">
          {message}
        </div>
      )}

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="mb-4 p-4 border rounded bg-gray-50">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Composition Name
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSave()}
              placeholder="e.g., Knight Rush Build"
              className="flex-1 border rounded px-3 py-2 text-sm"
              autoFocus
            />
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
            >
              Save
            </button>
            <button
              onClick={() => {
                setShowSaveDialog(false);
                setSaveName('');
              }}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Saved Compositions List */}
      {savedCompositions.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No saved compositions yet. Build an army and click &quot;Save Current&quot; to get started!
        </p>
      ) : (
        <div className="space-y-2">
          {savedCompositions.map((saved) => (
            <div
              key={saved.id}
              className="border rounded p-3 flex justify-between items-center hover:bg-gray-50"
            >
              <div className="flex-1">
                <div className="font-medium">{saved.name}</div>
                <div className="text-xs text-gray-500">
                  {saved.config.selectedCiv} • {saved.config.selectedAge} Age •{' '}
                  {Object.values(saved.composition).reduce((sum, q) => sum + q, 0)} units •{' '}
                  {new Date(saved.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleLoad(saved)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                >
                  Load
                </button>
                <button
                  onClick={() => handleDelete(saved.id, saved.name)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {savedCompositions.length > 0 && (
        <div className="mt-4 text-xs text-gray-500 text-center">
          {savedCompositions.length} saved composition{savedCompositions.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}
