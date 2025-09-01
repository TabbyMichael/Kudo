import React from 'react';
import { useProjectStore } from '@/store/projects';
import { useTaskStore } from '@/store/tasks';
import { cn } from '@/lib/utils';

interface ProjectListProps {
  collapsed?: boolean;
}

export function ProjectList({ collapsed = false }: ProjectListProps) {
  const projects = useProjectStore((state) => state.projects);
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <div className="mt-4">
      {!collapsed && (
        <h2 className="px-4 py-2 text-gray-500 text-sm font-medium">My Projects</h2>
      )}
      <nav className={cn("space-y-1", collapsed && 'flex flex-col items-center')}>
        {projects.map((project) => {
          const projectTasks = tasks.filter(task => task.projectId === project.id);
          return (
            <a
              key={project.id}
              href="#"
              className={cn(
                'block py-2 rounded hover:bg-gray-200 flex items-center gap-2',
                collapsed ? 'w-10 justify-center' : 'w-full px-4'
              )}
              title={collapsed ? project.name : undefined}
            >
              <span>{project.icon}</span>
              {!collapsed && (
                <>
                  <span className="truncate">{project.name}</span>
                  {projectTasks.length > 0 && (
                    <span className="ml-auto text-gray-500">
                      {projectTasks.length}
                    </span>
                  )}
                </>
              )}
            </a>
          );
        })}
      </nav>
    </div>
  );
}