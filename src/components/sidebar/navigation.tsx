import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Inbox, Calendar, Hash } from 'lucide-react';
import { NavItem } from './nav-item';
import { useTaskStore } from '@/store/tasks';

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const tasks = useTaskStore((state) => state.tasks);
  const inboxCount = tasks.filter(task => task.projectId === 'inbox').length;
  const todayCount = tasks.filter(task => {
    if (!task.dueDate) return false;
    const today = new Date();
    return task.dueDate.toDateString() === today.toDateString();
  }).length;

  return (
    <nav className="mt-2 space-y-1">
      <NavItem
        icon={Inbox}
        label="Inbox"
        count={inboxCount}
        active={location.pathname === '/inbox' || location.pathname === '/'}
        onClick={() => navigate('/inbox')}
      />
      <NavItem
        icon={Calendar}
        label="Today"
        count={todayCount}
        active={location.pathname === '/today'}
        onClick={() => navigate('/today')}
      />
      <NavItem
        icon={Calendar}
        label="Upcoming"
        active={location.pathname === '/upcoming'}
        onClick={() => navigate('/upcoming')}
      />
      <NavItem
        icon={Hash}
        label="Filters & Labels"
        active={location.pathname === '/filters'}
        onClick={() => navigate('/filters')}
      />
    </nav>
  );
}