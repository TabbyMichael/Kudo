import { create } from 'zustand';
import { useAuthStore } from './mock-auth-store';

// Mock user data for demonstration
const mockUsers = [
  { id: 'user1', name: 'John Doe', email: 'john@example.com' },
  { id: 'user2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: 'user3', name: 'Bob Johnson', email: 'bob@example.com' },
];

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
    
    // Simulate user coming online
    set((state) => ({
      onlineUsers: [...new Set([...state.onlineUsers, user.uid || 'current-user'])],
    }));
    
    console.log(`User ${user.email} is now online`);
  },

  stopPresenceTracking: () => {
    const { user } = useAuthStore.getState();
    if (!user) return;
    
    // Simulate user going offline
    set((state) => ({
      onlineUsers: state.onlineUsers.filter((id) => id !== (user.uid || 'current-user')),
    }));
    
    console.log(`User ${user.email} is now offline`);
  },

  initializeRealtimeUpdates: (boardId: string) => {
    // Simulate some online users (excluding current user)
    const randomUsers = mockUsers
      .filter(() => Math.random() > 0.5) // Randomly select some users
      .map((user) => user.id);
    
    set({ onlineUsers: [...randomUsers, 'current-user'] });
    
    // In a real implementation, this would return a cleanup function
    return () => {
      console.log('Cleaning up realtime updates for board:', boardId);
    };
  },
}));
