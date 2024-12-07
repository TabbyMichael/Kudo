import React from 'react';
import { useTaskStore } from '@/store/tasks';
import { format, addDays, startOfDay, endOfDay } from 'date-fns';

export function UpcomingPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const upcomingTasks = tasks.filter(task => {
    if (!task.dueDate) return false;
    const today = startOfDay(new Date());
    const nextWeek = endOfDay(addDays(today, 7));
    return task.dueDate > today && task.dueDate <= nextWeek;
  });

  // Group tasks by date
  const tasksByDate = upcomingTasks.reduce((acc, task) => {
    const dateKey = format(task.dueDate!, 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(task);
    return acc;
  }, {} as Record<string, typeof tasks>);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upcoming</h1>
      <div className="space-y-6">
        {Object.entries(tasksByDate).map(([dateKey, dateTasks]) => (
          <div key={dateKey}>
            <h2 className="text-lg font-semibold mb-2">
              {format(new Date(dateKey), 'EEEE, MMMM d')}
            </h2>
            <div className="space-y-2">
              {dateTasks.map((task) => (
                <div key={task.id} className="p-3 bg-white rounded-lg shadow">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="rounded" />
                    <span>{task.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {upcomingTasks.length === 0 && (
          <p className="text-gray-500">No upcoming tasks</p>
        )}
      </div>
    </div>
  );
}
