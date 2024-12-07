import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
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
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Scatter,
  ScatterChart,
} from 'recharts';
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addDays,
  differenceInDays,
  isWithinInterval,
} from 'date-fns';
import { Task, User } from '../../types/board';

interface EnhancedAnalyticsProps {
  tasks: Task[];
  users: User[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function EnhancedAnalytics({ tasks, users }: EnhancedAnalyticsProps) {
  const today = new Date();
  const weekStart = startOfWeek(today);
  const weekEnd = endOfWeek(today);

  // Task Burndown Chart
  const burndownData = useMemo(() => {
    const totalTasks = tasks.length;
    const completedByDay = eachDayOfInterval({ start: weekStart, end: weekEnd }).map(
      (date) => {
        const completedTasks = tasks.filter(
          (task) =>
            task.completedAt &&
            isWithinInterval(new Date(task.completedAt), {
              start: weekStart,
              end: date,
            })
        ).length;

        return {
          date: format(date, 'EEE'),
          remaining: totalTasks - completedTasks,
          ideal: totalTasks - (totalTasks / 7) * differenceInDays(date, weekStart),
        };
      }
    );

    return completedByDay;
  }, [tasks, weekStart, weekEnd]);

  // Task Complexity vs Time Scatter Plot
  const complexityData = useMemo(() => {
    return tasks
      .filter((task) => task.completedAt)
      .map((task) => ({
        complexity: task.priority === 'High' ? 3 : task.priority === 'Medium' ? 2 : 1,
        timeToComplete: task.completedAt
          ? differenceInDays(new Date(task.completedAt), new Date(task.createdAt))
          : 0,
        name: task.title,
      }));
  }, [tasks]);

  // Team Skills Radar
  const skillsData = useMemo(() => {
    const skills = ['Frontend', 'Backend', 'Design', 'DevOps', 'Testing'];
    return skills.map((skill) => ({
      skill,
      value: Math.floor(Math.random() * 100), // Replace with actual skill data
    }));
  }, []);

  // Task Flow Analysis
  const flowData = useMemo(() => {
    const intervals = ['Morning', 'Afternoon', 'Evening', 'Night'];
    return intervals.map((interval) => ({
      name: interval,
      created: tasks.filter((task) => {
        const hour = new Date(task.createdAt).getHours();
        return (
          (interval === 'Morning' && hour >= 6 && hour < 12) ||
          (interval === 'Afternoon' && hour >= 12 && hour < 18) ||
          (interval === 'Evening' && hour >= 18 && hour < 24) ||
          (interval === 'Night' && hour >= 0 && hour < 6)
        );
      }).length,
      completed: tasks.filter((task) => {
        if (!task.completedAt) return false;
        const hour = new Date(task.completedAt).getHours();
        return (
          (interval === 'Morning' && hour >= 6 && hour < 12) ||
          (interval === 'Afternoon' && hour >= 12 && hour < 18) ||
          (interval === 'Evening' && hour >= 18 && hour < 24) ||
          (interval === 'Night' && hour >= 0 && hour < 6)
        );
      }).length,
    }));
  }, [tasks]);

  return (
    <div className="space-y-8 p-6">
      {/* Burndown Chart */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold">Sprint Burndown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={burndownData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="remaining"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="ideal"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Complexity vs Time Scatter Plot */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold">Task Complexity vs Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timeToComplete"
              name="Time to Complete (days)"
              type="number"
            />
            <YAxis dataKey="complexity" name="Complexity" type="number" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Tasks" data={complexityData} fill="#8884d8">
              {complexityData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Team Skills Radar */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold">Team Skills Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="Team Skills"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Task Flow Analysis */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold">Task Flow Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={flowData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="created" fill="#8884d8" name="Tasks Created" />
            <Bar dataKey="completed" fill="#82ca9d" name="Tasks Completed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
