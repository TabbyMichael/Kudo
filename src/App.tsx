import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/sidebar';
import { InboxPage } from './pages/inbox';
import { TodayPage } from './pages/today';
import { UpcomingPage } from './pages/upcoming';
import { FiltersPage } from './pages/filters';

export function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}