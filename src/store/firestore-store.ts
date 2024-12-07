import { create } from 'zustand';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Task, Column, Board, User } from '../types/board';

interface FirestoreState {
  // Real-time data
  tasks: Task[];
  columns: Column[];
  users: User[];
  currentBoard: Board | null;
  
  // Actions
  initializeRealtimeListeners: (boardId: string) => void;
  createTask: (task: Task) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  moveTask: (taskId: string, sourceCol: string, targetCol: string) => Promise<void>;
  updateColumn: (columnId: string, updates: Partial<Column>) => Promise<void>;
}

export const useFirestoreStore = create<FirestoreState>((set, get) => ({
  tasks: [],
  columns: [],
  users: [],
  currentBoard: null,

  initializeRealtimeListeners: (boardId: string) => {
    // Listen to tasks
    const tasksQuery = query(
      collection(db, 'tasks'),
      where('boardId', '==', boardId)
    );

    const unsubTasks = onSnapshot(tasksQuery, (snapshot) => {
      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      set({ tasks });
    });

    // Listen to columns
    const columnsQuery = query(
      collection(db, 'columns'),
      where('boardId', '==', boardId)
    );

    const unsubColumns = onSnapshot(columnsQuery, (snapshot) => {
      const columns = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Column[];
      set({ columns });
    });

    // Listen to users
    const usersQuery = query(collection(db, 'users'));

    const unsubUsers = onSnapshot(usersQuery, (snapshot) => {
      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];
      set({ users });
    });

    // Cleanup function
    return () => {
      unsubTasks();
      unsubColumns();
      unsubUsers();
    };
  },

  createTask: async (task: Task) => {
    const taskRef = doc(collection(db, 'tasks'));
    await setDoc(taskRef, {
      ...task,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  },

  updateTask: async (taskId: string, updates: Partial<Task>) => {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  },

  deleteTask: async (taskId: string) => {
    const taskRef = doc(db, 'tasks', taskId);
    await deleteDoc(taskRef);
  },

  moveTask: async (taskId: string, sourceCol: string, targetCol: string) => {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, {
      columnId: targetCol,
      updatedAt: serverTimestamp(),
    });
  },

  updateColumn: async (columnId: string, updates: Partial<Column>) => {
    const columnRef = doc(db, 'columns', columnId);
    await updateDoc(columnRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  },
}));
