import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { motion } from 'framer-motion';
import { MoreHorizontal } from 'lucide-react';
import { type Column as ColumnType, type Task } from '../../types/board';
import { Card } from './Card';
import { cn } from '../../lib/utils';

interface ColumnProps {
  column: ColumnType;
}

export function Column({ column }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const isOverLimit = column.limit ? column.tasks.length >= column.limit : false;

  return (
    <div className="flex h-full w-[350px] flex-col rounded-lg bg-gray-50 p-4">
      {/* Column Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: column.color }}
          />
          <h2 className="font-medium text-gray-900">
            {column.title}{' '}
            <span className="ml-1 text-sm text-gray-500">
              {column.tasks.length}
              {column.limit && ` / ${column.limit}`}
            </span>
          </h2>
        </div>
        <button className="rounded-full p-1 hover:bg-gray-200">
          <MoreHorizontal className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      {/* Tasks Container */}
      <div
        ref={setNodeRef}
        className={cn(
          'flex-1 space-y-3 overflow-y-auto',
          isOverLimit && 'relative',
        )}
      >
        {isOverLimit && (
          <div className="absolute inset-0 rounded-lg bg-gray-50/90 p-4">
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-sm font-medium text-gray-900">
                WIP Limit Reached
              </p>
              <p className="text-sm text-gray-500">
                Complete or move some items before adding more
              </p>
            </div>
          </div>
        )}
        <SortableContext
          items={column.tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.tasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card task={task} />
            </motion.div>
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
