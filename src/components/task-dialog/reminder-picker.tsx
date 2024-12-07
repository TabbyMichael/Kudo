import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReminderPickerProps {
  reminder: boolean;
  onToggle: () => void;
}

export function ReminderPicker({ reminder, onToggle }: ReminderPickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center gap-2 px-3 py-1 text-sm hover:bg-gray-100 rounded",
            reminder ? "text-[#058527]" : "text-gray-600"
          )}
        >
          <Bell className="w-4 h-4" />
          Reminders
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-4" align="start">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Reminders</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded border">
            <button className="flex-1 text-left text-sm text-gray-600">
              Date & time
            </button>
            <span className="text-sm text-gray-400">Before task</span>
          </div>
          <div className="text-sm text-gray-500">
            Add a due time to the task first.
          </div>
          <button
            className="px-3 py-1.5 text-sm text-white bg-[#dc4c3e] hover:bg-[#dc4c3e]/90 rounded self-end"
            onClick={() => {
              onToggle();
              setIsOpen(false);
            }}
          >
            Add reminder
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
