import React from 'react';
import { useProjectStore } from '@/store/projects';
import { useTaskStore } from '@/store/tasks';

export function ProjectList() {
  const projects = useProjectStore((state) => state.projects);
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <div className="mt-4">
      <h2 className="px-4 py-2 text-gray-500 text-sm font-medium">My Projects</h2>
      <nav className="space-y-1">
        {projects.map((project) => {
          const projectTasks = tasks.filter(task => task.projectId === project.id);
          return (
            <a
              key={project.id}
              href="#"
              className="block px-4 py-2 rounded hover:bg-gray-200 flex items-center gap-2"
            >
              <span>{project.icon}</span>
              {project.name}
              {projectTasks.length > 0 && (
                <span className="ml-auto text-gray-500">
                  {projectTasks.length}
                </span>
              )}
            </a>
          );
        })}
      </nav>
    </div>
  );
}