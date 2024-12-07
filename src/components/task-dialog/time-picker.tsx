import React from 'react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Clock, ChevronLeft, X } from 'lucide-react';

interface TimePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  onClose: () => void;
}

const timePresets = [
  { label: 'Morning', time: { hours: 9, minutes: 0 } },
  { label: 'Afternoon', time: { hours: 13, minutes: 0 } },
  { label: 'Evening', time: { hours: 17, minutes: 0 } },
  { label: 'Night', time: { hours: 20, minutes: 0 } },
];

type ClockMode = 'hours' | 'minutes';

export function TimePicker({ value, onChange, onClose }: TimePickerProps) {
  const [mode, setMode] = React.useState<ClockMode>('hours');
  const [hours, setHours] = React.useState(value ? value.getHours() : 9);
  const [minutes, setMinutes] = React.useState(value ? value.getMinutes() : 0);
  const [period, setPeriod] = React.useState<'AM' | 'PM'>(hours >= 12 ? 'PM' : 'AM');

  const handleHourClick = (hour: number) => {
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    setHours(hour);
    updateTime(hour, minutes);
    setMode('minutes');
  };

  const handleMinuteClick = (minute: number) => {
    setMinutes(minute);
    updateTime(hours, minute);
  };

  const updateTime = (h: number, m: number) => {
    const date = value || new Date();
    date.setHours(h);
    date.setMinutes(m);
    onChange(date);
  };

  const togglePeriod = () => {
    const newPeriod = period === 'AM' ? 'PM' : 'AM';
    setPeriod(newPeriod);
    let newHours = hours;
    if (newPeriod === 'PM' && hours < 12) newHours += 12;
    if (newPeriod === 'AM' && hours >= 12) newHours -= 12;
    setHours(newHours);
    updateTime(newHours, minutes);
  };

  const formatTimeDisplay = (h: number, m: number) => {
    const date = new Date();
    date.setHours(h);
    date.setMinutes(m);
    return format(date, 'h:mm a');
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </button>
        <button
          onClick={() => {
            const date = new Date();
            date.setHours(0, 0, 0, 0);
            onChange(date);
            onClose();
          }}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <X className="w-4 h-4 mr-1" />
          Remove
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {timePresets.map((preset) => (
          <button
            key={preset.label}
            className="flex flex-col items-center justify-center p-3 text-sm border rounded hover:bg-gray-50"
            onClick={() => {
              const { hours: h, minutes: m } = preset.time;
              setHours(h);
              setMinutes(m);
              setPeriod(h >= 12 ? 'PM' : 'AM');
              updateTime(h, m);
              onClose();
            }}
          >
            <span className="font-medium">{preset.label}</span>
            <span className="text-gray-500">{formatTimeDisplay(preset.time.hours, preset.time.minutes)}</span>
          </button>
        ))}
      </div>

      <div className="flex justify-center mb-4">
        <button
          className={cn(
            "text-2xl font-medium mr-1",
            mode === 'hours' && "text-[#dc4c3e]"
          )}
          onClick={() => setMode('hours')}
        >
          {format(new Date().setHours(hours), 'h')}
        </button>
        <span className="text-2xl font-medium">:</span>
        <button
          className={cn(
            "text-2xl font-medium ml-1",
            mode === 'minutes' && "text-[#dc4c3e]"
          )}
          onClick={() => setMode('minutes')}
        >
          {minutes.toString().padStart(2, '0')}
        </button>
        <button
          onClick={togglePeriod}
          className="ml-2 text-lg text-gray-500 hover:text-gray-700"
        >
          {period}
        </button>
      </div>

      <div className="relative w-64 h-64 mx-auto mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-gray-200">
          {mode === 'hours' ? (
            // Hours
            Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => {
              const angle = ((hour % 12) / 12) * 360 - 90;
              const radius = 100;
              const x = radius * Math.cos((angle * Math.PI) / 180);
              const y = radius * Math.sin((angle * Math.PI) / 180);
              const isSelected = 
                (hours === hour || (hours === 0 && hour === 12) || (hours === 12 && hour === 12)) && period === 'AM' ||
                (hours === hour + 12 || (hours === 12 && hour === 12) || (hours === 24 && hour === 12)) && period === 'PM';
              
              return (
                <button
                  key={hour}
                  className={cn(
                    "absolute w-8 h-8 -mt-4 -ml-4 rounded-full flex items-center justify-center text-sm",
                    isSelected ? "bg-[#dc4c3e] text-white" : "hover:bg-gray-100"
                  )}
                  style={{
                    transform: `translate(${x + 128}px, ${y + 128}px)`,
                  }}
                  onClick={() => handleHourClick(hour)}
                >
                  {hour}
                </button>
              );
            })
          ) : (
            // Minutes
            Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => {
              const angle = (minute / 60) * 360 - 90;
              const radius = 100;
              const x = radius * Math.cos((angle * Math.PI) / 180);
              const y = radius * Math.sin((angle * Math.PI) / 180);
              const isSelected = minutes === minute;
              
              return (
                <button
                  key={minute}
                  className={cn(
                    "absolute w-8 h-8 -mt-4 -ml-4 rounded-full flex items-center justify-center text-sm",
                    isSelected ? "bg-[#dc4c3e] text-white" : "hover:bg-gray-100"
                  )}
                  style={{
                    transform: `translate(${x + 128}px, ${y + 128}px)`,
                  }}
                  onClick={() => handleMinuteClick(minute)}
                >
                  {minute.toString().padStart(2, '0')}
                </button>
              );
            })
          )}
          {/* Clock hand */}
          <div
            className="absolute w-1 bg-[#dc4c3e] rounded-full origin-bottom"
            style={{
              height: '90px',
              left: '127px',
              bottom: '128px',
              transform: `rotate(${
                mode === 'hours'
                  ? ((hours % 12) / 12) * 360 - 90
                  : (minutes / 60) * 360 - 90
              }deg)`,
              transformOrigin: '50% 100%',
            }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 text-sm text-white bg-[#dc4c3e] hover:bg-[#dc4c3e]/90 rounded"
          onClick={onClose}
        >
          Done
        </button>
      </div>
    </div>
  );
}
