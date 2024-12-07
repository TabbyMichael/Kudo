import { create } from 'zustand';
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
  DocumentData,
} from '@firebase/firestore';
import { db } from '../config/firebase';
import { useAuthStore } from './auth-store';

interface UserPresence {
  userId: string;
  userName: string;
  lastActive: Date;
  currentView: string;
  currentTask?: string;
}

interface Comment {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
  mentions: string[];
}

interface Activity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  targetId: string;
  targetType: 'task' | 'column' | 'comment';
  createdAt: Date;
}

interface CollaborationState {
  activeUsers: UserPresence[];
  comments: Comment[];
  activities: Activity[];
  currentUserPresence: UserPresence | null;
  
  // Presence
  updatePresence: (view: string, taskId?: string) => Promise<void>;
  startPresenceTracking: () => void;
  stopPresenceTracking: () => void;
  
  // Comments
  addComment: (taskId: string, content: string, mentions: string[]) => Promise<void>;
  editComment: (commentId: string, content: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  
  // Activity Tracking
  trackActivity: (
    action: string,
    targetId: string,
    targetType: 'task' | 'column' | 'comment'
  ) => Promise<void>;
  
  // Real-time Updates
  initializeRealtimeUpdates: (boardId: string) => () => void;
}

export const useCollaborationStore = create<CollaborationState>((set, get) => ({
  activeUsers: [],
  comments: [],
  activities: [],
  currentUserPresence: null,

  updatePresence: async (view: string, taskId?: string) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const presence: UserPresence = {
      userId: user.uid,
      userName: user.displayName || 'Anonymous',
      lastActive: new Date(),
      currentView: view,
      currentTask: taskId,
    };

    await setDoc(
      doc(db, 'presence', user.uid),
      {
        ...presence,
        lastActive: serverTimestamp(),
      },
      { merge: true }
    );

    set({ currentUserPresence: presence });
  },

  startPresenceTracking: () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    // Update presence every 30 seconds
    const intervalId = setInterval(() => {
      const presence = get().currentUserPresence;
      if (presence) {
        get().updatePresence(presence.currentView, presence.currentTask);
      }
    }, 30000);

    // Cleanup presence on window close
    const handleBeforeUnload = () => {
      const presenceRef = doc(db, 'presence', user.uid);
      updateDoc(presenceRef, {
        lastActive: serverTimestamp(),
        currentView: 'offline',
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  },

  stopPresenceTracking: () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const presenceRef = doc(db, 'presence', user.uid);
    updateDoc(presenceRef, {
      lastActive: serverTimestamp(),
      currentView: 'offline',
    });
  },

  addComment: async (taskId: string, content: string, mentions: string[]) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const comment: Omit<Comment, 'id'> = {
      taskId,
      userId: user.uid,
      userName: user.displayName || 'Anonymous',
      content,
      mentions,
      createdAt: new Date(),
    };

    const commentRef = doc(collection(db, 'comments'));
    await setDoc(commentRef, {
      ...comment,
      createdAt: serverTimestamp(),
    });

    // Notify mentioned users
    mentions.forEach(async (userId) => {
      const notificationRef = doc(collection(db, 'notifications'));
      await setDoc(notificationRef, {
        userId,
        type: 'mention',
        content: `${user.displayName} mentioned you in a comment`,
        taskId,
        createdAt: serverTimestamp(),
        read: false,
      });
    });
  },

  editComment: async (commentId: string, content: string) => {
    const commentRef = doc(db, 'comments', commentId);
    await updateDoc(commentRef, {
      content,
      updatedAt: serverTimestamp(),
    });
  },

  deleteComment: async (commentId: string) => {
    const commentRef = doc(db, 'comments', commentId);
    await updateDoc(commentRef, {
      deleted: true,
      deletedAt: serverTimestamp(),
    });
  },

  trackActivity: async (
    action: string,
    targetId: string,
    targetType: 'task' | 'column' | 'comment'
  ) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    const activity: Omit<Activity, 'id'> = {
      userId: user.uid,
      userName: user.displayName || 'Anonymous',
      action,
      targetId,
      targetType,
      createdAt: new Date(),
    };

    const activityRef = doc(collection(db, 'activities'));
    await setDoc(activityRef, {
      ...activity,
      createdAt: serverTimestamp(),
    });
  },

  initializeRealtimeUpdates: (boardId: string) => {
    // Listen to presence changes
    const presenceQuery = query(collection(db, 'presence'));
    const unsubPresence = onSnapshot(presenceQuery, (snapshot) => {
      const users = snapshot.docs
        .map((doc) => {
          const data = doc.data();
          return {
            ...data,
            lastActive: data.lastActive?.toDate() || new Date(),
          } as UserPresence;
        })
        .filter((user) => user.currentView !== 'offline');
      
      set({ activeUsers: users });
    });

    // Listen to comments
    const commentsQuery = query(
      collection(db, 'comments'),
      where('taskId', '==', boardId)
    );
    const unsubComments = onSnapshot(commentsQuery, (snapshot) => {
      const comments = snapshot.docs
        .map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
          } as Comment;
        })
        .filter((comment) => !comment.deleted);
      
      set({ comments });
    });

    // Listen to activities
    const activitiesQuery = query(
      collection(db, 'activities'),
      where('boardId', '==', boardId)
    );
    const unsubActivities = onSnapshot(activitiesQuery, (snapshot) => {
      const activities = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
        } as Activity;
      });
      
      set({ activities });
    });

    // Return cleanup function
    return () => {
      unsubPresence();
      unsubComments();
      unsubActivities();
    };
  },
}));
