import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { useState } from 'react';
import { type Board as BoardType, type Task } from '../../types/board';
import { Column } from './Column';
import { Card } from './Card';

interface BoardProps {
  board: BoardType;
  onTaskMove: (taskId: string, sourceColumn: string, targetColumn: string) => void;
}

export function KanbanBoard({ board, onTaskMove }: BoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const task = board.columns
      .flatMap((column) => column.tasks)
      .find((task) => task.id === event.active.id);
    
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeColumnId = board.columns.find((column) =>
        column.tasks.some((task) => task.id === active.id),
      )?.id;

      if (activeColumnId && over.id !== activeColumnId) {
        onTaskMove(active.id as string, activeColumnId, over.id as string);
      }
    }

    setActiveTask(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-full gap-6 overflow-x-auto p-6">
        {board.columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </div>

      <DragOverlay>
        {activeTask && (
          <div className="rotate-3 scale-105">
            <Card task={activeTask} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
