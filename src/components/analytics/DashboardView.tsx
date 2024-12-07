import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { format, startOfWeek, eachDayOfInterval, addDays } from 'date-fns';
import {
  Calendar,
  Clock,
  TrendingUp,
  Users,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { type Task, type User } from '../../types/board';

interface DashboardViewProps {
  tasks: Task[];
  users: User[];
}

export function DashboardView({ tasks, users }: DashboardViewProps) {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === 'Done').length;
  const overdueTask = tasks.filter(
    (task) =>
      task.status !== 'Done' &&
      task.dueDate &&
      new Date(task.dueDate) < new Date()
  ).length;

  // Calculate completion rate
  const completionRate = Math.round((completedTasks / totalTasks) * 100) || 0;

  // Get tasks by priority
  const tasksByPriority = ['Low', 'Medium', 'High', 'Critical'].map(
    (priority) => ({
      name: priority,
      value: tasks.filter((task) => task.priority === priority).length,
    })
  );

  // Get tasks by status
  const tasksByStatus = ['To Do', 'In Progress', 'In Review', 'Done'].map(
    (status) => ({
      name: status,
      value: tasks.filter((task) => task.status === status).length,
    })
  );

  // Get tasks completed by day
  const startOfCurrentWeek = startOfWeek(new Date());
  const weekDays = eachDayOfInterval({
    start: startOfCurrentWeek,
    end: addDays(startOfCurrentWeek, 6),
  });

  const tasksByDay = weekDays.map((day) => ({
    name: format(day, 'EEE'),
    completed: tasks.filter(
      (task) =>
        task.status === 'Done' &&
        task.updatedAt &&
        format(new Date(task.updatedAt), 'yyyy-MM-dd') ===
          format(day, 'yyyy-MM-dd')
    ).length,
    created: tasks.filter(
      (task) =>
        task.createdAt &&
        format(new Date(task.createdAt), 'yyyy-MM-dd') ===
          format(day, 'yyyy-MM-dd')
    ).length,
  }));

  const COLORS = ['#2563eb', '#ca8a04', '#dc2626', '#9333ea'];

  return (
    <div className="space-y-6 p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CheckCircle2 className="h-4 w-4" />
            Completion Rate
          </div>
          <div className="mt-2 text-2xl font-semibold">{completionRate}%</div>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            Total Tasks
          </div>
          <div className="mt-2 text-2xl font-semibold">{totalTasks}</div>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <AlertCircle className="h-4 w-4" />
            Overdue Tasks
          </div>
          <div className="mt-2 text-2xl font-semibold">{overdueTask}</div>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="h-4 w-4" />
            Team Members
          </div>
          <div className="mt-2 text-2xl font-semibold">{users.length}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Tasks by Day */}
        <div className="rounded-lg border bg-white p-4">
          <h3 className="mb-4 font-medium">Tasks by Day</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tasksByDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#2563eb" name="Completed" />
                <Bar dataKey="created" fill="#9333ea" name="Created" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tasks by Priority */}
        <div className="rounded-lg border bg-white p-4">
          <h3 className="mb-4 font-medium">Tasks by Priority</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tasksByPriority}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    value,
                    index,
                  }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = 25 + innerRadius + (outerRadius - innerRadius);
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return (
                      <text
                        x={x}
                        y={y}
                        fill="#666"
                        textAnchor={x > cx ? 'start' : 'end'}
                        dominantBaseline="central"
                      >
                        {tasksByPriority[index].name} ({value})
                      </text>
                    );
                  }}
                >
                  {tasksByPriority.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tasks by Status */}
        <div className="rounded-lg border bg-white p-4">
          <h3 className="mb-4 font-medium">Tasks by Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tasksByStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    value,
                    index,
                  }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = 25 + innerRadius + (outerRadius - innerRadius);
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return (
                      <text
                        x={x}
                        y={y}
                        fill="#666"
                        textAnchor={x > cx ? 'start' : 'end'}
                        dominantBaseline="central"
                      >
                        {tasksByStatus[index].name} ({value})
                      </text>
                    );
                  }}
                >
                  {tasksByStatus.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Team Performance */}
        <div className="rounded-lg border bg-white p-4">
          <h3 className="mb-4 font-medium">Team Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={users.map((user) => ({
                  name: user.name.split(' ')[0],
                  completed: tasks.filter(
                    (task) =>
                      task.assignee?.id === user.id && task.status === 'Done'
                  ).length,
                  inProgress: tasks.filter(
                    (task) =>
                      task.assignee?.id === user.id &&
                      task.status === 'In Progress'
                  ).length,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#2563eb" name="Completed" />
                <Bar dataKey="inProgress" fill="#ca8a04" name="In Progress" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
