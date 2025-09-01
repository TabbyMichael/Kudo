import React from 'react';
import { Bell, Menu, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { AddTaskButton } from './add-task-button';
import { Navigation } from './sidebar/navigation';
import { ProjectList } from './sidebar/project-list';
import { useUIStore } from '@/store/ui-store';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const { isSidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <aside className={cn(
      'bg-gray-50 h-screen flex flex-col border-r transition-all duration-300 ease-in-out',
      isSidebarCollapsed ? 'w-16' : 'w-[305px]'
    )}>
      <div className="p-4 flex items-center justify-between">
        <button 
          onClick={toggleSidebar}
          className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center"
        >
          {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </button>
          <button className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className={cn("px-2", isSidebarCollapsed && 'flex flex-col items-center')}>
          <AddTaskButton collapsed={isSidebarCollapsed} />
          <Navigation collapsed={isSidebarCollapsed} />
          <ProjectList collapsed={isSidebarCollapsed} />
        </div>
      </div>

      <div className="p-4 border-t">
        <button 
          className={cn(
            "w-full text-left py-2 rounded hover:bg-gray-200 flex items-center gap-2",
            isSidebarCollapsed ? 'justify-center px-0 w-8 mx-auto' : 'px-4'
          )}
        >
          <span className="text-xl">+</span>
          {!isSidebarCollapsed && <span>Add team</span>}
        </button>
      </div>
    </aside>
  );
}