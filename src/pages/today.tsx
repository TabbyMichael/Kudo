import React from 'react';
import { useTaskStore } from '../store/tasks';
import { format } from 'date-fns';

export function TodayPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const todayTasks = tasks.filter(task => {
    if (!task.dueDate) return false;
    const today = new Date();
    return task.dueDate.toDateString() === today.toDateString();
  });

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Today</h1>
        <p className="text-gray-500">{format(new Date(), 'EEEE, MMMM d')}</p>
      </div>
      <div className="space-y-2">
        {todayTasks.map((task) => (
          <div key={task.id} className="p-3 bg-white rounded-lg shadow">
            <div className="flex items-center gap-3">
              <input type="checkbox" className="rounded" />
              <span>{task.title}</span>
            </div>
          </div>
        ))}
        {todayTasks.length === 0 && (
          <p className="text-gray-500">No tasks due today</p>
        )}
      </div>
    </div>
  );
}
