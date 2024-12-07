import React from 'react';
import { Bell, Menu, Search } from 'lucide-react';
import { AddTaskButton } from './add-task-button';
import { Navigation } from './sidebar/navigation';
import { ProjectList } from './sidebar/project-list';

export function Sidebar() {
  return (
    <aside className="w-[305px] bg-gray-50 h-screen flex flex-col border-r">
      <div className="p-4 flex items-center justify-between">
        <button className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center">
          <Menu className="w-5 h-5" />
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
        <div className="px-2">
          <AddTaskButton />
          <Navigation />
          <ProjectList />
        </div>
      </div>

      <div className="p-4 border-t">
        <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-200 flex items-center gap-2">
          <span className="text-xl">+</span>
          Add team
        </button>
      </div>
    </aside>
  );
}