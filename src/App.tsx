import React, { useEffect } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/sidebar';
import { InboxPage } from './pages/inbox';
import { TodayPage } from './pages/today';
import { UpcomingPage } from './pages/upcoming';
import { FiltersPage } from './pages/filters';
import { LoginPage } from './pages/login';
import { useAuthStore } from './store/auth-store';
import { useCollaborationStore } from './store/collaboration-store';
import { auth } from './config/firebase';
import type { User } from 'firebase/auth';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}

const App: React.FC = () => {
  const { setUser } = useAuthStore();
  const { startPresenceTracking, stopPresenceTracking, initializeRealtimeUpdates } = useCollaborationStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setUser(user);
      
      if (user) {
        // Start tracking presence when user is authenticated
        startPresenceTracking();
        // Initialize real-time updates for the current board/project
        const cleanup = initializeRealtimeUpdates('default-board');
        return () => {
          stopPresenceTracking();
          cleanup();
        };
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppLayout>
                <div className="flex min-h-screen bg-gray-50">
                  <Sidebar />
                  <main className="flex-1 overflow-auto">
                    <Routes>
                      <Route path="/" element={<InboxPage />} />
                      <Route path="/inbox" element={<InboxPage />} />
                      <Route path="/today" element={<TodayPage />} />
                      <Route path="/upcoming" element={<UpcomingPage />} />
                      <Route path="/filters" element={<FiltersPage />} />
                    </Routes>
                  </main>
                </div>
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;