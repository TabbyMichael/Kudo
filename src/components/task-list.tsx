import React from 'react';
import { useTaskStore } from '@/store/tasks';
import { Checkbox } from './ui/checkbox';
import { formatDate } from '@/lib/utils';

export function TaskList() {
  const tasks = useTaskStore((state) => state.tasks);
  const toggleTask = useTaskStore((state) => state.toggleTask);

  const groupedTasks = tasks.reduce((acc, task) => {
    const date = task.dueDate ? formatDate(task.dueDate) : 'No Date';
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(task);
    return acc;
  }, {} as Record<string, typeof tasks>);

  return (
    <div className="flex-1 p-8">
      {Object.entries(groupedTasks).map(([date, tasks]) => (
        <div key={date} className="mb-8">
          <h2 className="text-lg font-semibold mb-4">{date}</h2>
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg group"
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                />
                <span className={task.completed ? 'line-through text-gray-400' : ''}>
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}