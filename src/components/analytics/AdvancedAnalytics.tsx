import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { format, startOfWeek, eachDayOfInterval, addDays } from 'date-fns';
import { Task, User } from '../../types/board';

interface AdvancedAnalyticsProps {
  tasks: Task[];
  users: User[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function AdvancedAnalytics({ tasks, users }: AdvancedAnalyticsProps) {
  // Calculate task completion trends
  const today = new Date();
  const weekStart = startOfWeek(today);
  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, 6),
  });

  const completionTrend = weekDays.map((day) => {
    const dayTasks = tasks.filter(
      (task) =>
        task.completedAt &&
        format(new Date(task.completedAt), 'yyyy-MM-dd') ===
          format(day, 'yyyy-MM-dd')
    );

    return {
      date: format(day, 'EEE'),
      completed: dayTasks.length,
    };
  });

  // Calculate productivity by hour
  const hourlyProductivity = Array.from({ length: 24 }, (_, hour) => {
    const hourTasks = tasks.filter((task) => {
      if (!task.completedAt) return false;
      const taskHour = new Date(task.completedAt).getHours();
      return taskHour === hour;
    });

    return {
      hour: `${hour}:00`,
      tasks: hourTasks.length,
    };
  });

  // Calculate task distribution by priority
  const priorityDistribution = ['Low', 'Medium', 'High', 'Urgent'].map(
    (priority) => ({
      priority,
      tasks: tasks.filter((task) => task.priority === priority).length,
    })
  );

  // Calculate team velocity
  const teamVelocity = users.map((user) => {
    const userTasks = tasks.filter(
      (task) =>
        task.assigneeId === user.id &&
        task.completedAt &&
        new Date(task.completedAt) >= weekStart
    );

    return {
      name: user.name,
      completed: userTasks.length,
    };
  });

  return (
    <div className="space-y-8 p-6">
      {/* Task Completion Trend */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold">Weekly Completion Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={completionTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Hourly Productivity */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold">Productivity by Hour</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hourlyProductivity}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="tasks" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Priority Distribution */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold">Task Priority Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={priorityDistribution}
              dataKey="tasks"
              nameKey="priority"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {priorityDistribution.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Team Velocity */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold">Team Velocity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={teamVelocity}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
