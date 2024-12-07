import React from 'react';
import { useTaskStore } from '@/store/tasks';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';

export function InboxPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const inboxTasks = tasks.filter(task => task.projectId === 'inbox');

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
        <p className="text-gray-500 text-sm mt-1">
          {format(new Date(), 'EEEE, MMMM d')}
        </p>
      </div>

      <div className="space-y-2">
        {inboxTasks.map((task) => (
          <div 
            key={task.id} 
            className="p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <div className="flex-1">
                <p className="text-gray-900">{task.title}</p>
                {task.description && (
                  <p className="text-gray-500 text-sm mt-1">{task.description}</p>
                )}
              </div>
              {task.dueDate && (
                <span className="text-sm text-gray-500">
                  {format(task.dueDate, 'MMM d')}
                </span>
              )}
            </div>
          </div>
        ))}
        {inboxTasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No tasks in inbox</p>
          </div>
        )}
      </div>
    </div>
  );
}
