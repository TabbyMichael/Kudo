import React from 'react';
import { Plus } from 'lucide-react';
import { TaskDialog } from './task-dialog';

export function AddTaskButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full text-left px-4 py-2 rounded hover:bg-gray-200 flex items-center gap-2 text-primary"
      >
        <Plus className="w-5 h-5" />
        Add task
      </button>
      <TaskDialog open={open} onOpenChange={setOpen} />
    </>
  );
}