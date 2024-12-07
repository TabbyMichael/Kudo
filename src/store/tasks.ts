import { create } from 'zustand';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  projectId: string;
  dueDate?: Date;
  priority?: number;
  reminder?: boolean;
}

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
}

// Initial tasks for testing
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Welcome to Todoist!',
    description: 'This is your first task in Inbox',
    completed: false,
    projectId: 'inbox',
  },
  {
    id: '2',
    title: 'Task due today',
    description: 'This task is due today',
    completed: false,
    projectId: 'inbox',
    dueDate: new Date(),
  },
  {
    id: '3',
    title: 'Upcoming task',
    description: 'This task is due in 2 days',
    completed: false,
    projectId: 'inbox',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  },
];

export const useTaskStore = create<TaskState>((set) => ({
  tasks: initialTasks,
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...task, id: crypto.randomUUID() }],
    })),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));