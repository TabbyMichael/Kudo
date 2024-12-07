import { useEffect, useCallback } from 'react';

interface Shortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  description: string;
  action: () => void;
}

export function useKeyboardShortcuts(shortcuts: Shortcut[]) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      shortcuts.forEach((shortcut) => {
        const ctrlMatch = shortcut.ctrl ? event.ctrlKey : !event.ctrlKey;
        const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const altMatch = shortcut.alt ? event.altKey : !event.altKey;
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();

        if (ctrlMatch && shiftMatch && altMatch && keyMatch) {
          event.preventDefault();
          shortcut.action();
        }
      });
    },
    [shortcuts]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const getShortcutList = useCallback(() => {
    return shortcuts.map((shortcut) => {
      const modifiers = [
        shortcut.ctrl && 'Ctrl',
        shortcut.shift && 'Shift',
        shortcut.alt && 'Alt',
      ]
        .filter(Boolean)
        .join(' + ');

      const key = shortcut.key.toUpperCase();
      const combo = modifiers ? `${modifiers} + ${key}` : key;

      return {
        combo,
        description: shortcut.description,
      };
    });
  }, [shortcuts]);

  return { getShortcutList };
}
