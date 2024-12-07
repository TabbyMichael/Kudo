import { useState } from 'react';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
  endOfWeek,
  startOfMonth,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type Task } from '../../types/board';

interface CalendarViewProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export function CalendarView({ tasks, onTaskClick }: CalendarViewProps) {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(firstDayCurrentMonth)),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  const tasksOnDay = (day: Date) =>
    tasks.filter((task) => task.dueDate && isSameDay(new Date(task.dueDate), day));

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {format(firstDayCurrentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={previousMonth}
            className="rounded-full p-1.5 hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="rounded-full p-1.5 hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="grid grid-cols-7 gap-px border-b bg-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="bg-white py-2 text-center text-sm font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="flex-1 divide-y divide-gray-200">
          {Array.from({ length: Math.ceil(days.length / 7) }).map((_, weekIndex) => (
            <div key={weekIndex} className="grid flex-1 grid-cols-7 divide-x divide-gray-200">
              {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day) => {
                const dayTasks = tasksOnDay(day);
                return (
                  <div
                    key={day.toString()}
                    className={`min-h-[120px] ${
                      !isSameMonth(day, firstDayCurrentMonth)
                        ? 'bg-gray-50'
                        : 'bg-white'
                    }`}
                    onClick={() => setSelectedDay(day)}
                  >
                    <div className="relative px-3 py-2">
                      <time
                        dateTime={format(day, 'yyyy-MM-dd')}
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-sm ${
                          isEqual(day, selectedDay)
                            ? 'bg-primary font-semibold text-white'
                            : isToday(day)
                            ? 'bg-primary/10 font-semibold text-primary'
                            : 'text-gray-900'
                        }`}
                      >
                        {format(day, 'd')}
                      </time>
                      <div className="mt-2 space-y-1">
                        {dayTasks.map((task) => (
                          <button
                            key={task.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              onTaskClick(task);
                            }}
                            className="block w-full truncate rounded bg-gray-50 px-2 py-1 text-left text-xs hover:bg-gray-100"
                          >
                            <div
                              className="h-1.5 w-1.5 rounded-full"
                              style={{
                                backgroundColor:
                                  task.priority === 'High'
                                    ? '#dc2626'
                                    : task.priority === 'Medium'
                                    ? '#ca8a04'
                                    : '#2563eb',
                              }}
                            />
                            {task.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
