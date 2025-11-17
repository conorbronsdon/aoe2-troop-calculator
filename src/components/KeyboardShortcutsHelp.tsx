import { useCallback } from 'react';
import {
  useKeyboardShortcuts,
  KEYBOARD_SHORTCUTS,
  SHORTCUT_DESCRIPTIONS,
} from '../hooks/useKeyboardShortcuts';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface ShortcutGroup {
  title: string;
  shortcuts: string[];
}

/**
 * Modal component displaying available keyboard shortcuts
 */
export default function KeyboardShortcutsHelp({ isOpen, onClose }: Props): React.ReactElement | null {
  const { formatShortcut } = useKeyboardShortcuts({});

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  if (!isOpen) {
    return null;
  }

  const shortcutGroups: ShortcutGroup[] = [
    {
      title: 'File Operations',
      shortcuts: [
        KEYBOARD_SHORTCUTS.SAVE,
        KEYBOARD_SHORTCUTS.EXPORT_JSON,
        KEYBOARD_SHORTCUTS.CLEAR,
      ],
    },
    {
      title: 'Edit Operations',
      shortcuts: [
        KEYBOARD_SHORTCUTS.UNDO,
        KEYBOARD_SHORTCUTS.REDO,
        KEYBOARD_SHORTCUTS.REDO_ALT,
      ],
    },
    {
      title: 'Navigation',
      shortcuts: [KEYBOARD_SHORTCUTS.FOCUS_SEARCH, KEYBOARD_SHORTCUTS.ESC],
    },
    {
      title: 'Display',
      shortcuts: [KEYBOARD_SHORTCUTS.TOGGLE_DARK_MODE, KEYBOARD_SHORTCUTS.HELP],
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2
              id="shortcuts-title"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              Keyboard Shortcuts
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
              aria-label="Close keyboard shortcuts help"
            >
              &times;
            </button>
          </div>

          <div className="space-y-6">
            {shortcutGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  {group.title}
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <table className="w-full">
                    <tbody>
                      {group.shortcuts.map((shortcut) => (
                        <tr key={shortcut} className="border-b border-gray-200 dark:border-gray-600 last:border-0">
                          <td className="py-2 pr-4">
                            <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm font-mono text-gray-900 dark:text-gray-100">
                              {formatShortcut(shortcut)}
                            </kbd>
                          </td>
                          <td className="py-2 text-gray-700 dark:text-gray-300">
                            {SHORTCUT_DESCRIPTIONS[shortcut]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Press <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-600 rounded text-xs font-mono">?</kbd> anytime to show this help.
              Press <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-600 rounded text-xs font-mono">Esc</kbd> to close.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
