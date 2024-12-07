import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Flag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PriorityPickerProps {
  priority: number | undefined;
  onSelect: (priority: number | undefined) => void;
}

const priorities = [
  { level: 1, color: '#db4035', label: 'Priority 1' },
  { level: 2, color: '#ff9933', label: 'Priority 2' },
  { level: 3, color: '#4073ff', label: 'Priority 3' },
  { level: 4, color: '#808080', label: 'Priority 4' },
];

export function PriorityPicker({ priority, onSelect }: PriorityPickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedPriority = priorities.find(p => p.level === priority);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center gap-2 px-3 py-1 text-sm hover:bg-gray-100 rounded",
            priority ? `text-[${selectedPriority?.color}]` : "text-gray-600"
          )}
        >
          <Flag className="w-4 h-4" />
          Priority
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-1" align="start">
        {priorities.map((p) => (
          <button
            key={p.level}
            className="flex items-center gap-2 w-full px-3 py-1.5 text-sm hover:bg-gray-100 rounded"
            onClick={() => {
              onSelect(p.level);
              setIsOpen(false);
            }}
          >
            <Flag className="w-4 h-4" style={{ color: p.color }} />
            {p.label}
            {priority === p.level && (
              <span className="ml-auto">✓</span>
            )}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
