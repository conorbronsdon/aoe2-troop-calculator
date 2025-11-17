import { useEffect, useCallback, useRef } from 'react';

export type ShortcutHandler = (event: KeyboardEvent) => void;

export interface ShortcutMap {
  [key: string]: ShortcutHandler;
}

export interface KeyboardShortcutsOptions {
  disabled?: boolean;
  allowInInputs?: boolean;
}

export interface KeyboardShortcutsResult {
  formatShortcut: (shortcut: string) => string;
}

/**
 * Hook for registering global keyboard shortcuts
 *
 * @param shortcuts - Map of shortcut keys to handlers
 * @param options - Configuration options
 * @returns Shortcut utilities
 */
export function useKeyboardShortcuts(
  shortcuts: ShortcutMap,
  options: KeyboardShortcutsOptions = {}
): KeyboardShortcutsResult {
  const { disabled = false, allowInInputs = false } = options;
  const shortcutsRef = useRef<ShortcutMap>(shortcuts);

  // Keep shortcuts ref up to date
  useEffect(() => {
    shortcutsRef.current = shortcuts;
  }, [shortcuts]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      if (disabled) return;

      // Don't trigger shortcuts when typing in input fields (unless explicitly allowed)
      if (!allowInInputs) {
        const target = event.target as HTMLElement;
        const isInput =
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable;

        if (isInput) return;
      }

      // Build the shortcut key string
      const parts: string[] = [];
      if (event.ctrlKey || event.metaKey) parts.push('ctrl');
      if (event.shiftKey) parts.push('shift');
      if (event.altKey) parts.push('alt');

      // Normalize the key
      let key = event.key.toLowerCase();
      if (key === ' ') key = 'space';
      if (key === 'escape') key = 'esc';

      parts.push(key);
      const shortcutKey = parts.join('+');

      // Check if this shortcut is registered
      const handler = shortcutsRef.current[shortcutKey];
      if (handler) {
        event.preventDefault();
        event.stopPropagation();
        handler(event);
      }
    },
    [disabled, allowInInputs]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Utility to format shortcut for display
  const formatShortcut = useCallback((shortcut: string): string => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    return shortcut
      .split('+')
      .map((part) => {
        switch (part) {
          case 'ctrl':
            return isMac ? '⌘' : 'Ctrl';
          case 'shift':
            return isMac ? '⇧' : 'Shift';
          case 'alt':
            return isMac ? '⌥' : 'Alt';
          case 'esc':
            return 'Esc';
          case 'space':
            return 'Space';
          default:
            return part.toUpperCase();
        }
      })
      .join(isMac ? '' : '+');
  }, []);

  return { formatShortcut };
}

/**
 * Standard keyboard shortcuts for the application
 */
export const KEYBOARD_SHORTCUTS = {
  SAVE: 'ctrl+s',
  UNDO: 'ctrl+z',
  REDO: 'ctrl+shift+z',
  REDO_ALT: 'ctrl+y',
  EXPORT_JSON: 'ctrl+e',
  CLEAR: 'ctrl+shift+c',
  TOGGLE_DARK_MODE: 'ctrl+d',
  FOCUS_SEARCH: 'ctrl+/',
  HELP: '?',
  ESC: 'esc',
} as const;

export type KeyboardShortcutKey = keyof typeof KEYBOARD_SHORTCUTS;
export type KeyboardShortcutValue = (typeof KEYBOARD_SHORTCUTS)[KeyboardShortcutKey];

/**
 * Descriptions for keyboard shortcuts (for help modal)
 */
export const SHORTCUT_DESCRIPTIONS: Record<string, string> = {
  [KEYBOARD_SHORTCUTS.SAVE]: 'Save current composition',
  [KEYBOARD_SHORTCUTS.UNDO]: 'Undo last action',
  [KEYBOARD_SHORTCUTS.REDO]: 'Redo last undone action',
  [KEYBOARD_SHORTCUTS.REDO_ALT]: 'Redo last undone action (alternative)',
  [KEYBOARD_SHORTCUTS.EXPORT_JSON]: 'Export composition as JSON',
  [KEYBOARD_SHORTCUTS.CLEAR]: 'Clear current composition',
  [KEYBOARD_SHORTCUTS.TOGGLE_DARK_MODE]: 'Toggle dark/light mode',
  [KEYBOARD_SHORTCUTS.FOCUS_SEARCH]: 'Focus unit search',
  [KEYBOARD_SHORTCUTS.HELP]: 'Show keyboard shortcuts help',
  [KEYBOARD_SHORTCUTS.ESC]: 'Close modals / Clear filters',
};
