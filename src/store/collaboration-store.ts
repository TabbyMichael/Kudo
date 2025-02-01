import { create } from 'zustand';
import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  deleteDoc,
  query,
  where,
  updateDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuthStore } from './auth-store';

interface CollaborationState {
  onlineUsers: string[];
  startPresenceTracking: () => void;
  stopPresenceTracking: () => void;
  initializeRealtimeUpdates: (boardId: string) => () => void;
}

export const useCollaborationStore = create<CollaborationState>((set) => ({
  onlineUsers: [],

  startPresenceTracking: () => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    const userStatusRef = doc(db, 'status', user.uid);
    setDoc(userStatusRef, {
      state: 'online',
      lastChanged: serverTimestamp(),
    });
  },

  stopPresenceTracking: () => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    const userStatusRef = doc(db, 'status', user.uid);
    deleteDoc(userStatusRef);
  },

  initializeRealtimeUpdates: (boardId: string) => {
    const q = query(
      collection(db, 'status'),
      where('boardId', '==', boardId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const onlineUsers = snapshot.docs.map((doc) => doc.id);
      set({ onlineUsers });
    });

    return unsubscribe;
  },
}));
