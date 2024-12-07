import React from 'react';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { useTaskStore } from '@/store/tasks';
import { DatePicker } from './task-dialog/date-picker';
import { PriorityPicker } from './task-dialog/priority-picker';
import { ReminderPicker } from './task-dialog/reminder-picker';
import { MoreActions } from './task-dialog/more-actions';

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaskDialog({ open, onOpenChange }: TaskDialogProps) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [dueDate, setDueDate] = React.useState<Date>();
  const [priority, setPriority] = React.useState<number>();
  const [reminder, setReminder] = React.useState(false);
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      description: description.trim(),
      completed: false,
      projectId: 'inbox',
      dueDate: dueDate || new Date(),
      priority: priority,
      reminder: reminder,
    });

    setTitle('');
    setDescription('');
    setDueDate(undefined);
    setPriority(undefined);
    setReminder(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-[550px] w-full rounded-xl overflow-hidden">
        <DialogTitle className="sr-only">Add Task</DialogTitle>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="p-4">
            <input
              type="text"
              placeholder="Task name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-base outline-none placeholder:text-gray-400"
              autoFocus
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-2 text-sm outline-none placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-1 px-4 py-2">
            <DatePicker date={dueDate} onSelect={setDueDate} />
            <PriorityPicker priority={priority} onSelect={setPriority} />
            <ReminderPicker reminder={reminder} onToggle={() => setReminder(!reminder)} />
            <MoreActions />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50">
            <div className="flex items-center">
              <button
                type="button"
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:bg-gray-100 px-2 py-1 rounded"
              >
                <span className="w-4 h-4 flex items-center justify-center text-xs">
                  📥
                </span>
                Inbox
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 text-sm text-white bg-[#dc4c3e] hover:bg-[#dc4c3e]/90 rounded"
              >
                Add task
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}