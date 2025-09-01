import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Inbox, Calendar, Hash } from 'lucide-react';
import { NavItem } from './nav-item';
import { useTaskStore } from '@/store/tasks';
import cn from 'classnames';

interface NavigationProps {
  collapsed?: boolean;
}

export function Navigation({ collapsed = false }: NavigationProps) {
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
    <nav className={cn("mt-2 space-y-1", collapsed && 'flex flex-col items-center')}>
      <NavItem
        icon={Inbox}
        label={collapsed ? '' : "Inbox"}
        count={collapsed ? undefined : inboxCount}
        active={location.pathname === '/inbox' || location.pathname === '/'}
        onClick={() => navigate('/inbox')}
        collapsed={collapsed}
      />
      <NavItem
        icon={Calendar}
        label={collapsed ? '' : "Today"}
        count={collapsed ? undefined : todayCount}
        active={location.pathname === '/today'}
        onClick={() => navigate('/today')}
        collapsed={collapsed}
      />
      <NavItem
        icon={Calendar}
        label={collapsed ? '' : "Upcoming"}
        active={location.pathname === '/upcoming'}
        onClick={() => navigate('/upcoming')}
        collapsed={collapsed}
      />
      <NavItem
        icon={Hash}
        label={collapsed ? '' : "Filters & Labels"}
        active={location.pathname === '/filters'}
        onClick={() => navigate('/filters')}
        collapsed={collapsed}
      />
    </nav>
  );
}