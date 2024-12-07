import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, Tag, MapPin, Puzzle } from 'lucide-react';

export function MoreActions() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="p-1 hover:bg-gray-100 rounded ml-auto"
        >
          <MoreHorizontal className="w-5 h-5 text-gray-500" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-1" align="end">
        <div className="flex flex-col">
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-gray-100 rounded">
            <Tag className="w-4 h-4" />
            Labels
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-gray-100 rounded">
            <MapPin className="w-4 h-4" />
            Location
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-gray-100 rounded">
            <Puzzle className="w-4 h-4" />
            Add extension...
          </button>
          <div className="h-px bg-gray-200 my-1" />
          <button className="px-3 py-1.5 text-sm text-red-500 hover:bg-gray-100 rounded text-left">
            Edit task actions
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
