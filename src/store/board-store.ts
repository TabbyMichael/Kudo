import { create } from 'zustand';
import { type Board, type Task } from '../types/board';

interface BoardState {
  board: Board | null;
  setBoard: (board: Board) => void;
  moveTask: (taskId: string, sourceColumnId: string, targetColumnId: string) => void;
  addTask: (task: Task, columnId: string) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: null,
  
  setBoard: (board) => set({ board }),
  
  moveTask: (taskId, sourceColumnId, targetColumnId) =>
    set((state) => {
      if (!state.board) return state;

      const sourceColumn = state.board.columns.find(col => col.id === sourceColumnId);
      if (!sourceColumn) return state;

      const taskToMove = sourceColumn.tasks.find(task => task.id === taskId);
      if (!taskToMove) return state;

      const newColumns = state.board.columns.map((column) => {
        if (column.id === sourceColumnId) {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== taskId),
          };
        }
        if (column.id === targetColumnId) {
          return {
            ...column,
            tasks: [...column.tasks, { ...taskToMove, status: column.title }],
          };
        }
        return column;
      });

      return {
        ...state,
        board: {
          ...state.board,
          columns: newColumns,
        },
      };
    }),

  addTask: (task, columnId) =>
    set((state) => {
      if (!state.board) return state;

      const targetColumn = state.board.columns.find(col => col.id === columnId);
      if (!targetColumn) return state;

      const newColumns = state.board.columns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            tasks: [...column.tasks, { ...task, status: column.title }],
          };
        }
        return column;
      });

      return {
        ...state,
        board: {
          ...state.board,
          columns: newColumns,
        },
      };
    }),

  updateTask: (taskId, updates) =>
    set((state) => {
      if (!state.board) return state;

      const newColumns = state.board.columns.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) =>
          task.id === taskId ? { ...task, ...updates } : task
        ),
      }));

      return {
        ...state,
        board: {
          ...state.board,
          columns: newColumns,
        },
      };
    }),

  deleteTask: (taskId) =>
    set((state) => {
      if (!state.board) return state;

      const newColumns = state.board.columns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.id !== taskId),
      }));

      return {
        ...state,
        board: {
          ...state.board,
          columns: newColumns,
        },
      };
    }),
}));
