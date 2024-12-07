import { useState } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import * as Progress from '@radix-ui/react-progress';
import { BarChart2, Clock, CheckCircle2 } from 'lucide-react';
import { type Task, type User } from '../../types/board';

interface TeamMemberStats {
  tasksCompleted: number;
  tasksInProgress: number;
  totalTasks: number;
  averageCompletionTime: number; // in hours
}

interface TeamViewProps {
  users: User[];
  tasks: Task[];
  onAssignTask: (userId: string, taskId: string) => void;
}

export function TeamView({ users, tasks, onAssignTask }: TeamViewProps) {
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>();

  const getUserStats = (userId: string): TeamMemberStats => {
    const userTasks = tasks.filter((task) => task.assignee?.id === userId);
    const completedTasks = userTasks.filter((task) => task.status === 'Done');
    const inProgressTasks = userTasks.filter(
      (task) => task.status === 'In Progress'
    );

    // Calculate average completion time
    const completionTimes = completedTasks
      .map((task) => {
        const created = task.createdAt instanceof Date ? task.createdAt : new Date(task.createdAt);
        const updated = task.updatedAt instanceof Date ? task.updatedAt : new Date(task.updatedAt);
        return (updated.getTime() - created.getTime()) / (1000 * 60 * 60); // Convert to hours
      })
      .filter((time) => !isNaN(time));

    const averageTime =
      completionTimes.length > 0
        ? completionTimes.reduce((a, b) => a + b, 0) / completionTimes.length
        : 0;

    return {
      tasksCompleted: completedTasks.length,
      tasksInProgress: inProgressTasks.length,
      totalTasks: userTasks.length,
      averageCompletionTime: Math.round(averageTime),
    };
  };

  const getCompletionRate = (stats: TeamMemberStats) =>
    stats.totalTasks > 0
      ? Math.round((stats.tasksCompleted / stats.totalTasks) * 100)
      : 0;

  return (
    <div className="flex h-full">
      {/* Team Members List */}
      <div className="w-80 border-r bg-white">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">Team Members</h2>
        </div>
        <div className="divide-y">
          {users.map((user) => {
            const stats = getUserStats(user.id);
            const completionRate = getCompletionRate(stats);

            return (
              <button
                key={user.id}
                className={`block w-full space-y-3 p-4 text-left hover:bg-gray-50 ${
                  selectedUserId === user.id ? 'bg-gray-50' : ''
                }`}
                onClick={() => setSelectedUserId(user.id)}
              >
                <div className="flex items-center gap-3">
                  <Avatar.Root className="inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full bg-gray-100 align-middle">
                    <Avatar.Image
                      src={user.avatarUrl}
                      alt={user.name}
                      className="h-full w-full rounded-full object-cover"
                    />
                    <Avatar.Fallback
                      className="leading-1 flex h-full w-full items-center justify-center bg-white text-sm font-medium text-gray-700"
                      delayMs={600}
                    >
                      {user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Completion Rate</span>
                    <span className="font-medium">{completionRate}%</span>
                  </div>
                  <Progress.Root
                    className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200"
                    style={{ transform: 'translateZ(0)' }}
                    value={completionRate}
                  >
                    <Progress.Indicator
                      className="h-full w-full bg-indigo-600 transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
                      style={{ transform: `translateX(-${100 - completionRate}%)` }}
                    />
                  </Progress.Root>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="rounded-md bg-gray-100 p-2">
                    <div className="font-medium">{stats.tasksCompleted}</div>
                    <div className="text-gray-500">Completed</div>
                  </div>
                  <div className="rounded-md bg-gray-100 p-2">
                    <div className="font-medium">{stats.tasksInProgress}</div>
                    <div className="text-gray-500">In Progress</div>
                  </div>
                  <div className="rounded-md bg-gray-100 p-2">
                    <div className="font-medium">{stats.totalTasks}</div>
                    <div className="text-gray-500">Total</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Member Details */}
      {selectedUserId && (
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            {/* Performance Metrics */}
            <div>
              <h3 className="mb-4 text-lg font-medium">Performance Metrics</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg border bg-white p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CheckCircle2 className="h-4 w-4" />
                    Completion Rate
                  </div>
                  <div className="mt-2 text-2xl font-semibold">
                    {getCompletionRate(getUserStats(selectedUserId))}%
                  </div>
                </div>
                <div className="rounded-lg border bg-white p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    Avg. Completion Time
                  </div>
                  <div className="mt-2 text-2xl font-semibold">
                    {getUserStats(selectedUserId).averageCompletionTime}h
                  </div>
                </div>
                <div className="rounded-lg border bg-white p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <BarChart2 className="h-4 w-4" />
                    Tasks Completed
                  </div>
                  <div className="mt-2 text-2xl font-semibold">
                    {getUserStats(selectedUserId).tasksCompleted}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
