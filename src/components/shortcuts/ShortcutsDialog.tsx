import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface ShortcutInfo {
  combo: string;
  description: string;
}

interface ShortcutsDialogProps {
  shortcuts: ShortcutInfo[];
  onClose: () => void;
}

export function ShortcutsDialog({ shortcuts, onClose }: ShortcutsDialogProps) {
  // Group shortcuts by category based on their descriptions
  const categories = {
    Navigation: shortcuts.filter((s) => s.description.includes('Switch to')),
    Tasks: shortcuts.filter((s) => 
      s.description.includes('task') || 
      s.description.includes('Task')
    ),
    Projects: shortcuts.filter((s) => 
      s.description.includes('project') || 
      s.description.includes('Project')
    ),
    Views: shortcuts.filter((s) => 
      s.description.includes('view') && 
      !s.description.includes('Switch to')
    ),
    Other: shortcuts.filter((s) => 
      !s.description.includes('Switch to') &&
      !s.description.includes('task') &&
      !s.description.includes('Task') &&
      !s.description.includes('project') &&
      !s.description.includes('Project') &&
      !s.description.includes('view')
    ),
  };

  return (
    <Dialog.Root open={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-xl font-semibold">
              Keyboard Shortcuts
            </Dialog.Title>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 space-y-6">
            {Object.entries(categories).map(([category, categoryShortcuts]) => (
              categoryShortcuts.length > 0 && (
                <div key={category}>
                  <h3 className="mb-3 text-sm font-semibold uppercase text-gray-500">
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {categoryShortcuts.map((shortcut, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg p-2 hover:bg-gray-50"
                      >
                        <span className="text-gray-600">
                          {shortcut.description}
                        </span>
                        <kbd className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">
                          {shortcut.combo}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            Press '?' anytime to show this dialog
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
