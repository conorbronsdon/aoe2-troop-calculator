import { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ImportService } from '../services/import.service';
import { IMPORT_MODES } from '../constants';

export default function ImportModal({ isOpen, onClose, onImport }) {
  const [activeTab, setActiveTab] = useState('file'); // 'file', 'paste', 'url'
  const [importMode, setImportMode] = useState(IMPORT_MODES.REPLACE);
  const [pasteContent, setPasteContent] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [validationResult, setValidationResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const resetState = () => {
    setPasteContent('');
    setUrlInput('');
    setSelectedFile(null);
    setValidationResult(null);
    setIsProcessing(false);
    setIsDragging(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setValidationResult(null);
    }
  }, []);

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setValidationResult(null);
    }
  };

  const processFileImport = async () => {
    if (!selectedFile) {
      setValidationResult({
        success: false,
        errors: ['Please select a file to import'],
        warnings: [],
      });
      return;
    }

    setIsProcessing(true);
    const result = await ImportService.fromFile(selectedFile);
    setValidationResult(result);

    if (result.success) {
      const sanitizedData = ImportService.sanitizeData(result.data);
      onImport(sanitizedData, importMode, 'file', selectedFile.name);
      handleClose();
    }
    setIsProcessing(false);
  };

  const processPasteImport = () => {
    if (!pasteContent.trim()) {
      setValidationResult({
        success: false,
        errors: ['Please paste JSON content or a URL'],
        warnings: [],
      });
      return;
    }

    setIsProcessing(true);
    const result = ImportService.autoDetect(pasteContent);
    setValidationResult(result);

    if (result.success) {
      const sanitizedData = ImportService.sanitizeData(result.data);
      onImport(sanitizedData, importMode, 'paste');
      handleClose();
    }
    setIsProcessing(false);
  };

  const processUrlImport = () => {
    if (!urlInput.trim()) {
      setValidationResult({
        success: false,
        errors: ['Please enter a URL'],
        warnings: [],
      });
      return;
    }

    setIsProcessing(true);
    const result = ImportService.fromURL(urlInput);
    setValidationResult(result);

    if (result.success) {
      const sanitizedData = ImportService.sanitizeData(result.data);
      onImport(sanitizedData, importMode, 'url');
      handleClose();
    }
    setIsProcessing(false);
  };

  const handleImport = () => {
    switch (activeTab) {
      case 'file':
        processFileImport();
        break;
      case 'paste':
        processPasteImport();
        break;
      case 'url':
        processUrlImport();
        break;
      default:
        break;
    }
  };

  if (!isOpen) {return null;}

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Import Composition
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => { setActiveTab('file'); setValidationResult(null); }}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'file'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            File Upload
          </button>
          <button
            onClick={() => { setActiveTab('paste'); setValidationResult(null); }}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'paste'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            Paste JSON
          </button>
          <button
            onClick={() => { setActiveTab('url'); setValidationResult(null); }}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'url'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            Import from URL
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* File Upload Tab */}
          {activeTab === 'file' && (
            <div
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".json"
                className="hidden"
              />
              <svg
                className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {selectedFile ? (
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    {selectedFile.name}
                  </span>
                ) : (
                  <>
                    Drag and drop a JSON file here, or{' '}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      browse
                    </button>
                  </>
                )}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                JSON files up to 1MB
              </p>
              {selectedFile && (
                <button
                  onClick={() => setSelectedFile(null)}
                  className="mt-2 text-xs text-red-600 hover:text-red-500 dark:text-red-400"
                >
                  Clear selection
                </button>
              )}
            </div>
          )}

          {/* Paste JSON Tab */}
          {activeTab === 'paste' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Paste JSON or encoded army data
              </label>
              <textarea
                value={pasteContent}
                onChange={(e) => setPasteContent(e.target.value)}
                placeholder='{"meta": {...}, "units": [...], "totals": {...}}'
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 font-mono text-sm"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Paste exported JSON, a shareable URL, or encoded army data
              </p>
            </div>
          )}

          {/* URL Tab */}
          {activeTab === 'url' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Import from URL
              </label>
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/?army=..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Enter a URL containing shared army composition data
              </p>
            </div>
          )}

          {/* Import Mode Selection */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Import Mode
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value={IMPORT_MODES.REPLACE}
                  checked={importMode === IMPORT_MODES.REPLACE}
                  onChange={(e) => setImportMode(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Replace current composition
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value={IMPORT_MODES.MERGE}
                  checked={importMode === IMPORT_MODES.MERGE}
                  onChange={(e) => setImportMode(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Merge with current composition
                </span>
              </label>
            </div>
          </div>

          {/* Validation Messages */}
          {validationResult && (
            <div className="mt-4">
              {validationResult.errors.length > 0 && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3 mb-3">
                  <div className="flex">
                    <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                        Import Errors
                      </h3>
                      <ul className="mt-2 text-sm text-red-700 dark:text-red-300 list-disc list-inside">
                        {validationResult.errors.map((error, idx) => (
                          <li key={idx}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {validationResult.warnings.length > 0 && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-3">
                  <div className="flex">
                    <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        Warnings
                      </h3>
                      <ul className="mt-2 text-sm text-yellow-700 dark:text-yellow-300 list-disc list-inside">
                        {validationResult.warnings.map((warning, idx) => (
                          <li key={idx}>{warning}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={isProcessing}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isProcessing ? 'Processing...' : 'Import'}
          </button>
        </div>
      </div>
    </div>
  );
}

ImportModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
};
