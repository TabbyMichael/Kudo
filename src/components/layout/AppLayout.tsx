import { useState, type ReactNode } from 'react';
import { ProjectSidebar } from '../project/ProjectSidebar';
import { KanbanBoard } from '../board/KanbanBoard';
import { CalendarView } from '../calendar/CalendarView';
import { TeamView } from '../team/TeamView';
import { DashboardView } from '../analytics/DashboardView';
import { ShortcutsDialog } from '../shortcuts/ShortcutsDialog';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { useBoardStore } from '../../store/board-store';

type View = 'board' | 'calendar' | 'team' | 'analytics';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [currentView, setCurrentView] = useState<View>('board');
  const [showShortcuts, setShowShortcuts] = useState(false);
  const { board } = useBoardStore();

  // Sample data (replace with actual data from your backend)
  const users = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
  ];

  // Define keyboard shortcuts
  const shortcuts = [
    {
      key: 'b',
      ctrl: true,
      description: 'Switch to Board view',
      action: () => setCurrentView('board'),
    },
    {
      key: 'c',
      ctrl: true,
      description: 'Switch to Calendar view',
      action: () => setCurrentView('calendar'),
    },
    {
      key: 't',
      ctrl: true,
      description: 'Switch to Team view',
      action: () => setCurrentView('team'),
    },
    {
      key: 'a',
      ctrl: true,
      description: 'Switch to Analytics view',
      action: () => setCurrentView('analytics'),
    },
    {
      key: '?',
      description: 'Show keyboard shortcuts',
      action: () => setShowShortcuts(true),
    },
    {
      key: 'Escape',
      description: 'Close dialogs',
      action: () => setShowShortcuts(false),
    },
  ];

  // Initialize keyboard shortcuts
  const { getShortcutList } = useKeyboardShortcuts(shortcuts);

  // Render the current view
  const renderView = () => {
    if (!board) return null;

    switch (currentView) {
      case 'board':
        return <KanbanBoard board={board} onTaskMove={() => {}} />;
      case 'calendar':
        return (
          <CalendarView
            tasks={board.columns.flatMap((col) => col.tasks)}
            onTaskClick={() => {}}
          />
        );
      case 'team':
        return (
          <TeamView
            users={users}
            tasks={board.columns.flatMap((col) => col.tasks)}
            onAssignTask={() => {}}
          />
        );
      case 'analytics':
        return (
          <DashboardView
            tasks={board.columns.flatMap((col) => col.tasks)}
            users={users}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Project Sidebar */}
      <ProjectSidebar
        projects={[]}
        onProjectSelect={() => {}}
        onCreateProject={() => {}}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>

      {/* Keyboard Shortcuts Dialog */}
      {showShortcuts && (
        <ShortcutsDialog
          shortcuts={getShortcutList()}
          onClose={() => setShowShortcuts(false)}
        />
      )}
    </div>
  );
}
