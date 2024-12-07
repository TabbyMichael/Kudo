import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import * as Avatar from '@radix-ui/react-avatar';
import * as HoverCard from '@radix-ui/react-hover-card';
import { Calendar, Paperclip, MessageSquare } from 'lucide-react';
import { type Task } from '../../types/board';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';

interface CardProps {
  task: Task;
}

export function Card({ task }: CardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColors = {
    Low: 'bg-blue-50 text-blue-700',
    Medium: 'bg-yellow-50 text-yellow-700',
    High: 'bg-orange-50 text-orange-700',
    Critical: 'bg-red-50 text-red-700',
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        'group relative rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md',
        isDragging && 'shadow-lg ring-2 ring-primary ring-offset-2',
      )}
    >
      {/* Priority Badge */}
      <div className="mb-2 flex items-center justify-between">
        <span
          className={cn(
            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
            priorityColors[task.priority],
          )}
        >
          {task.priority}
        </span>
        
        {/* Due Date */}
        {task.dueDate && (
          <span className="flex items-center text-xs text-gray-500">
            <Calendar className="mr-1 h-3 w-3" />
            {format(new Date(task.dueDate), 'MMM d')}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="mb-2 font-medium text-gray-900">{task.title}</h3>

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {task.tags.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center rounded-full px-2 py-0.5 text-xs"
              style={{
                backgroundColor: `${tag.color}20`,
                color: tag.color,
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        {/* Assignee */}
        {task.assignee && (
          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <Avatar.Root className="h-6 w-6 cursor-pointer">
                <Avatar.Image
                  src={task.assignee.avatarUrl}
                  alt={task.assignee.name}
                  className="h-full w-full rounded-full object-cover"
                />
                <Avatar.Fallback className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-xs font-medium">
                  {task.assignee.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </Avatar.Fallback>
              </Avatar.Root>
            </HoverCard.Trigger>
            <HoverCard.Portal>
              <HoverCard.Content
                className="w-64 rounded-lg border bg-white p-4 shadow-lg"
                sideOffset={5}
              >
                <div className="flex items-center gap-3">
                  <Avatar.Root className="h-10 w-10">
                    <Avatar.Image
                      src={task.assignee.avatarUrl}
                      alt={task.assignee.name}
                      className="h-full w-full rounded-full object-cover"
                    />
                    <Avatar.Fallback className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-sm font-medium">
                      {task.assignee.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <div>
                    <p className="font-medium text-gray-900">
                      {task.assignee.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {task.assignee.email}
                    </p>
                  </div>
                </div>
              </HoverCard.Content>
            </HoverCard.Portal>
          </HoverCard.Root>
        )}

        {/* Metadata */}
        <div className="flex items-center gap-3 text-gray-500">
          {task.attachmentCount > 0 && (
            <span className="flex items-center text-xs">
              <Paperclip className="mr-1 h-3 w-3" />
              {task.attachmentCount}
            </span>
          )}
          {task.commentCount > 0 && (
            <span className="flex items-center text-xs">
              <MessageSquare className="mr-1 h-3 w-3" />
              {task.commentCount}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
