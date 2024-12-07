import { Shortcut } from '../hooks/useKeyboardShortcuts';

export const getDefaultShortcuts = (actions: {
  openCreateTask: () => void;
  openTaskSearch: () => void;
  toggleSidebar: () => void;
  focusFilter: () => void;
  toggleDarkMode: () => void;
  openNotifications: () => void;
  openSettings: () => void;
  undo: () => void;
  redo: () => void;
  saveChanges: () => void;
  refreshData: () => void;
  toggleHelp: () => void;
  switchView: (view: string) => void;
}): Shortcut[] => [
  // Navigation
  {
    key: 'b',
    ctrl: true,
    description: 'Switch to Board view',
    action: () => actions.switchView('board'),
  },
  {
    key: 'c',
    ctrl: true,
    description: 'Switch to Calendar view',
    action: () => actions.switchView('calendar'),
  },
  {
    key: 't',
    ctrl: true,
    description: 'Switch to Team view',
    action: () => actions.switchView('team'),
  },
  {
    key: 'a',
    ctrl: true,
    description: 'Switch to Analytics view',
    action: () => actions.switchView('analytics'),
  },

  // Task Management
  {
    key: 'n',
    ctrl: true,
    description: 'Create new task',
    action: actions.openCreateTask,
  },
  {
    key: 'f',
    ctrl: true,
    description: 'Search tasks',
    action: actions.openTaskSearch,
  },
  {
    key: '/',
    description: 'Focus filter input',
    action: actions.focusFilter,
  },

  // UI Controls
  {
    key: '\\',
    ctrl: true,
    description: 'Toggle sidebar',
    action: actions.toggleSidebar,
  },
  {
    key: 'd',
    ctrl: true,
    alt: true,
    description: 'Toggle dark mode',
    action: actions.toggleDarkMode,
  },
  {
    key: 'n',
    ctrl: true,
    shift: true,
    description: 'Open notifications',
    action: actions.openNotifications,
  },
  {
    key: ',',
    ctrl: true,
    description: 'Open settings',
    action: actions.openSettings,
  },

  // Edit Operations
  {
    key: 'z',
    ctrl: true,
    description: 'Undo',
    action: actions.undo,
  },
  {
    key: 'y',
    ctrl: true,
    description: 'Redo',
    action: actions.redo,
  },
  {
    key: 's',
    ctrl: true,
    description: 'Save changes',
    action: actions.saveChanges,
  },

  // System
  {
    key: 'r',
    ctrl: true,
    description: 'Refresh data',
    action: actions.refreshData,
  },
  {
    key: '?',
    description: 'Show keyboard shortcuts',
    action: actions.toggleHelp,
  },

  // Priority Shortcuts
  {
    key: '1',
    ctrl: true,
    description: 'Set Priority 1 (Urgent)',
    action: () => console.log('Set P1'),
  },
  {
    key: '2',
    ctrl: true,
    description: 'Set Priority 2 (High)',
    action: () => console.log('Set P2'),
  },
  {
    key: '3',
    ctrl: true,
    description: 'Set Priority 3 (Medium)',
    action: () => console.log('Set P3'),
  },
  {
    key: '4',
    ctrl: true,
    description: 'Set Priority 4 (Low)',
    action: () => console.log('Set P4'),
  },

  // Quick Actions
  {
    key: 'm',
    ctrl: true,
    description: 'Mark task complete',
    action: () => console.log('Mark complete'),
  },
  {
    key: 'i',
    ctrl: true,
    description: 'Show task info',
    action: () => console.log('Show info'),
  },
  {
    key: 'e',
    ctrl: true,
    description: 'Edit selected task',
    action: () => console.log('Edit task'),
  },
  {
    key: 'Delete',
    description: 'Delete selected task',
    action: () => console.log('Delete task'),
  },

  // View Controls
  {
    key: '+',
    ctrl: true,
    description: 'Zoom in',
    action: () => console.log('Zoom in'),
  },
  {
    key: '-',
    ctrl: true,
    description: 'Zoom out',
    action: () => console.log('Zoom out'),
  },
  {
    key: '0',
    ctrl: true,
    description: 'Reset zoom',
    action: () => console.log('Reset zoom'),
  },
];
