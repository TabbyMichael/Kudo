import React from 'react';
import { useCollaborationStore } from '../../store/collaboration-store';

export function ActiveUsers() {
  const { activeUsers } = useCollaborationStore();

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-sm font-semibold text-gray-500">Active Users</h3>
      <div className="flex -space-x-2 overflow-hidden">
        {activeUsers.map((user) => (
          <div
            key={user.userId}
            className="group relative inline-block"
            title={`${user.userName} - ${user.currentView}`}
          >
            <div className="relative h-8 w-8 rounded-full bg-indigo-500 ring-2 ring-white">
              <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white">
                {user.userName.charAt(0)}
              </span>
              <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-400 ring-2 ring-white" />
            </div>
            <div className="absolute left-1/2 top-full z-10 mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white group-hover:block">
              {user.userName}
              <br />
              {user.currentView}
              {user.currentTask && (
                <>
                  <br />
                  Working on: {user.currentTask}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
