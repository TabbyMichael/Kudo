import { useEffect, useState } from 'react';
import { KanbanBoard } from '../../components/board/KanbanBoard';
import { SearchFilterBar } from '../../components/board/SearchFilterBar';
import { TaskDialog } from '../../components/board/TaskDialog';
import { ProjectSidebar } from '../../components/project/ProjectSidebar';
import { useBoardStore } from '../../store/board-store';
import { Plus } from 'lucide-react';
import { type Task } from '../../types/board';

// Sample data
const sampleUsers = [
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

const sampleTags = [
  { id: '1', name: 'Feature', color: '#2563eb' },
  { id: '2', name: 'Bug', color: '#dc2626' },
  { id: '3', name: 'Enhancement', color: '#16a34a' },
  { id: '4', name: 'Documentation', color: '#9333ea' },
];

const sampleProjects = [
  {
    id: '1',
    name: 'Project Alpha',
    color: '#2563eb',
    children: [
      { id: '1-1', name: 'Frontend', color: '#16a34a' },
      { id: '1-2', name: 'Backend', color: '#dc2626' },
    ],
  },
  {
    id: '2',
    name: 'Project Beta',
    color: '#9333ea',
  },
];

const sampleBoard = {
  id: '1',
  title: 'Main Project Board',
  columns: [
    {
      id: 'todo',
      title: 'To Do',
      color: '#2563eb',
      limit: 5,
      tasks: [
        {
          id: '1',
          title: 'Implement authentication',
          description: 'Add user login and registration',
          status: 'To Do',
          priority: 'High',
          tags: [
            { id: '1', name: 'Feature', color: '#2563eb' },
            { id: '2', name: 'Security', color: '#dc2626' },
          ],
          assignee: {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
          },
          dueDate: new Date('2024-03-20'),
          createdAt: new Date(),
          updatedAt: new Date(),
          attachmentCount: 2,
          commentCount: 3,
        },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: '#ca8a04',
      limit: 3,
      tasks: [],
    },
    {
      id: 'review',
      title: 'In Review',
      color: '#9333ea',
      limit: 3,
      tasks: [],
    },
    {
      id: 'done',
      title: 'Done',
      color: '#16a34a',
      tasks: [],
    },
  ],
};

export default function BoardPage() {
  const { board, setBoard, moveTask, addTask, updateTask } = useBoardStore();
  const [selectedProjectId, setSelectedProjectId] = useState<string>();
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>();

  useEffect(() => {
    // Initialize board with sample data
    setBoard(sampleBoard);
  }, [setBoard]);

  const handleFilterChange = (filters: any) => {
    // Implement filtering logic
    console.log('Filters:', filters);
  };

  const handleSortChange = (field: string, direction: 'asc' | 'desc') => {
    // Implement sorting logic
    console.log('Sort:', field, direction);
  };

  const handleTaskSave = (task: Partial<Task>) => {
    if (selectedTask) {
      updateTask(selectedTask.id, task);
    } else {
      addTask(
        {
          ...task,
          id: Math.random().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
          attachmentCount: 0,
          commentCount: 0,
        } as Task,
        'todo'
      );
    }
  };

  if (!board) return null;

  return (
    <div className="flex h-screen">
      {/* Project Sidebar */}
      <ProjectSidebar
        projects={sampleProjects}
        selectedProjectId={selectedProjectId}
        onProjectSelect={setSelectedProjectId}
        onCreateProject={() => {
          // Implement project creation
          console.log('Create project');
        }}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Board Header */}
        <header className="border-b bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">
              {board.title}
            </h1>
            <button
              onClick={() => {
                setSelectedTask(undefined);
                setIsTaskDialogOpen(true);
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              Add Task
            </button>
          </div>

          {/* Search and Filters */}
          <SearchFilterBar
            users={sampleUsers}
            tags={sampleTags}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        </header>

        {/* Board Content */}
        <main className="flex-1 overflow-hidden bg-white">
          <KanbanBoard board={board} onTaskMove={moveTask} />
        </main>
      </div>

      {/* Task Dialog */}
      {isTaskDialogOpen && (
        <TaskDialog
          task={selectedTask}
          users={sampleUsers}
          tags={sampleTags}
          onSave={handleTaskSave}
          onClose={() => {
            setIsTaskDialogOpen(false);
            setSelectedTask(undefined);
          }}
        />
      )}
    </div>
  );
}
