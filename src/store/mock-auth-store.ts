import { create } from 'zustand';

type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  updateProfile: (displayName: string, photoURL?: string) => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({
        user: {
          uid: 'mock-user-123',
          email,
          displayName: 'Mock User',
          photoURL: null,
        },
        loading: false,
      });
    } catch (error) {
      set({ error: 'Failed to login', loading: false });
    }
  },

  signup: async (email: string, password: string, displayName: string) => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({
        user: {
          uid: 'mock-user-' + Math.random().toString(36).substr(2, 9),
          email,
          displayName,
          photoURL: null,
        },
        loading: false,
      });
    } catch (error) {
      set({ error: 'Failed to sign up', loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 200));
      set({ user: null, loading: false });
    } catch (error) {
      set({ error: 'Failed to logout', loading: false });
    }
  },

  googleSignIn: async () => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({
        user: {
          uid: 'google-user-' + Math.random().toString(36).substr(2, 9),
          email: 'mockuser@gmail.com',
          displayName: 'Google User',
          photoURL: 'https://via.placeholder.com/150',
        },
        loading: false,
      });
    } catch (error) {
      set({ error: 'Failed to sign in with Google', loading: false });
    }
  },

  updateProfile: async (displayName: string, photoURL?: string) => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      set((state) => ({
        user: state.user ? { 
          ...state.user, 
          displayName, 
          photoURL: photoURL || null 
        } : null,
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update profile', loading: false });
    }
  },
}));
