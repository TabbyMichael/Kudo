import React from 'react';
import { useCollaborationStore } from '../../store/collaboration-store';
import { format, formatDistanceToNow } from 'date-fns';

export function ActivityFeed() {
  const { activities } = useCollaborationStore();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'task':
        return '📋';
      case 'column':
        return '📊';
      case 'comment':
        return '💬';
      default:
        return '🔔';
    }
  };

  const getActivityColor = (action: string) => {
    if (action.includes('create')) return 'text-green-600';
    if (action.includes('delete')) return 'text-red-600';
    if (action.includes('update') || action.includes('edit')) return 'text-blue-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-500">Recent Activity</h3>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="text-2xl">{getActivityIcon(activity.targetType)}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm">
                  <span className="font-medium">{activity.userName}</span>{' '}
                  <span className={getActivityColor(activity.action)}>
                    {activity.action}
                  </span>
                </p>
                <time
                  className="text-xs text-gray-500"
                  title={format(activity.createdAt, 'PPpp')}
                >
                  {formatDistanceToNow(activity.createdAt, { addSuffix: true })}
                </time>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                {activity.targetType.charAt(0).toUpperCase() +
                  activity.targetType.slice(1)}{' '}
                ID: {activity.targetId}
              </p>
            </div>
          </div>
        ))}

        {activities.length === 0 && (
          <p className="text-center text-sm text-gray-500">
            No recent activity to show
          </p>
        )}
      </div>
    </div>
  );
}
