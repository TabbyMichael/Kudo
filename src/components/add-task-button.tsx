import React from 'react';
import { Plus } from 'lucide-react';
import { TaskDialog } from './task-dialog';
import { cn } from '@/lib/utils';

interface AddTaskButtonProps {
  collapsed?: boolean;
}

export function AddTaskButton({ collapsed = false }: AddTaskButtonProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'text-left py-2 rounded hover:bg-gray-200 flex items-center gap-2 text-primary',
          collapsed ? 'w-10 justify-center' : 'w-full px-4'
        )}
        title={collapsed ? 'Add task' : undefined}
      >
        <Plus className="w-5 h-5" />
        {!collapsed && <span>Add task</span>}
      </button>
      <TaskDialog open={open} onOpenChange={setOpen} />
    </>
  );
}