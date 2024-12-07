import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { format, addMonths, subMonths } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { TimePicker } from './time-picker';

interface DatePickerProps {
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

const quickOptions = [
  { 
    label: 'Today', 
    value: new Date(),
    icon: <div className="w-6 h-6 flex items-center justify-center bg-[#246fe0] rounded text-white text-xs">
      {format(new Date(), 'd')}
    </div>
  },
  { 
    label: 'Tomorrow',
    value: new Date(Date.now() + 24 * 60 * 60 * 1000),
    icon: <div className="w-6 h-6 flex items-center justify-center text-[#ff9a14]">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="6" fill="currentColor"/>
      </svg>
    </div>
  },
  { 
    label: 'Next week',
    value: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    icon: <div className="w-6 h-6 flex items-center justify-center">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="16" height="3" rx="1.5" fill="#692EC2"/>
        <rect x="4" y="13" width="16" height="3" rx="1.5" fill="#692EC2"/>
      </svg>
    </div>
  },
  { 
    label: 'Next weekend',
    value: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    icon: <div className="w-6 h-6 flex items-center justify-center">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="6" width="16" height="12" rx="2" fill="#246FE0"/>
      </svg>
    </div>
  }
];

const timePresets = [
  { label: 'Morning', time: { hours: 9, minutes: 0 } },
  { label: 'Afternoon', time: { hours: 13, minutes: 0 } },
  { label: 'Evening', time: { hours: 17, minutes: 0 } },
  { label: 'Night', time: { hours: 20, minutes: 0 } },
];

export function DatePicker({ date, onSelect }: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const [month, setMonth] = React.useState<Date>(date || new Date());
  const [sliding, setSliding] = React.useState<'left' | 'right' | null>(null);

  const handleTimeSelect = (newDate: Date) => {
    onSelect(newDate);
  };

  const handleMonthChange = (increment: boolean) => {
    setSliding(increment ? 'left' : 'right');
    const newMonth = increment ? addMonths(month, 1) : subMonths(month, 1);
    setTimeout(() => {
      setMonth(newMonth);
      setSliding(null);
    }, 200);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center gap-2 px-3 py-1 text-sm hover:bg-gray-100 rounded",
            date ? "text-[#058527]" : "text-gray-600"
          )}
        >
          <CalendarIcon className="w-4 h-4" />
          {date ? (
            <>
              {format(date, 'MMM d')}
              {format(date, ' @ h:mm a')}
            </>
          ) : (
            'Due date'
          )}
          {date && (
            <span 
              className="ml-1 text-gray-400 hover:text-gray-600" 
              onClick={(e) => {
                e.stopPropagation();
                onSelect(undefined);
              }}
            >
              ×
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[380px] p-0" 
        align="start" 
        side="left" 
        sideOffset={5}
        alignOffset={-14}
      >
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Type a due date"
            className="p-4 text-sm outline-none border-b"
          />
          {!showTimePicker ? (
            <>
              <div className="p-2 space-y-1">
                {quickOptions.map((option) => (
                  <button
                    key={option.label}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 rounded"
                    onClick={() => {
                      onSelect(option.value);
                      setIsOpen(false);
                    }}
                  >
                    {option.icon}
                    <span>{option.label}</span>
                    <span className="ml-auto text-gray-400">
                      {format(option.value, 'EEE')}
                    </span>
                  </button>
                ))}
              </div>
              <div className="p-4 border-t">
                <div className="relative">
                  <div className="flex justify-between items-center px-2 mb-2">
                    <button
                      onClick={() => handleMonthChange(false)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <div className="text-sm font-medium">
                      {format(month, 'MMMM yyyy')}
                    </div>
                    <button
                      onClick={() => handleMonthChange(true)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                      aria-label="Next month"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="relative overflow-hidden">
                    <div
                      className={cn(
                        "transition-transform duration-200 ease-in-out",
                        sliding === 'left' && "translate-x-[-100%]",
                        sliding === 'right' && "translate-x-[100%]"
                      )}
                    >
                      <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={onSelect}
                        month={month}
                        onMonthChange={setMonth}
                        showOutsideDays
                        className={cn("p-3")}
                        classNames={{
                          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                          month: "space-y-4",
                          caption: "flex justify-center pt-1 relative items-center",
                          caption_label: "hidden",
                          nav: "hidden",
                          nav_button: cn(
                            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                          ),
                          nav_button_previous: "absolute left-1",
                          nav_button_next: "absolute right-1",
                          table: "w-full border-collapse space-y-1",
                          head_row: "flex",
                          head_cell: "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
                          row: "flex w-full mt-2",
                          cell: "h-9 w-9 text-center text-sm p-0 relative",
                          day: cn(
                            "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 rounded-md"
                          ),
                          day_selected: "bg-[#dc4c3e] text-white hover:bg-[#dc4c3e]/90",
                          day_today: "bg-gray-100 text-gray-900",
                          day_outside: "text-gray-500 opacity-50",
                          day_disabled: "text-gray-500 opacity-50",
                          day_hidden: "invisible",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-2 border-t">
                <button 
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 rounded"
                  onClick={() => date && setShowTimePicker(true)}
                >
                  <Clock className="w-4 h-4" />
                  <span>{date ? format(date, 'h:mm a') : 'Add time'}</span>
                </button>
              </div>
            </>
          ) : (
            <TimePicker
              value={date}
              onChange={handleTimeSelect}
              onClose={() => setShowTimePicker(false)}
            />
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
