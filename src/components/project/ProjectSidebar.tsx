import { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Settings,
  Layout,
  Calendar,
  Users,
  BarChart2,
} from 'lucide-react';
import { Root, Trigger, Content } from '@radix-ui/react-collapsible';

interface Project {
  id: string;
  name: string;
  color?: string;
  children?: Project[];
}

interface ProjectSidebarProps {
  projects: Project[];
  selectedProjectId?: string;
  onProjectSelect: (projectId: string) => void;
  onCreateProject: () => void;
}

export function ProjectSidebar({
  projects,
  selectedProjectId,
  onProjectSelect,
  onCreateProject,
}: ProjectSidebarProps) {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
    new Set()
  );

  const toggleProject = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const renderProject = (project: Project, level = 0) => {
    const hasChildren = project.children && project.children.length > 0;
    const isExpanded = expandedProjects.has(project.id);

    return (
      <div key={project.id}>
        <button
          className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-gray-100 ${
            selectedProjectId === project.id ? 'bg-gray-100' : ''
          }`}
          style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }}
          onClick={() => onProjectSelect(project.id)}
        >
          {hasChildren ? (
            <button
              className="rounded-sm hover:bg-gray-200"
              onClick={(e) => {
                e.stopPropagation();
                toggleProject(project.id);
              }}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          ) : (
            <div className="w-4" />
          )}
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: project.color || '#6366f1' }}
          />
          <span className="flex-1 truncate">{project.name}</span>
        </button>

        {hasChildren && (
          <Root open={isExpanded} onOpenChange={() => toggleProject(project.id)}>
            <Content>
              <div className="ml-2">
                {project.children?.map((child) => renderProject(child, level + 1))}
              </div>
            </Content>
          </Root>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="font-semibold">Projects</h2>
        <button
          onClick={onCreateProject}
          className="rounded-full p-1 hover:bg-gray-100"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Project List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {projects.map((project) => renderProject(project))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t p-4">
        <ul className="space-y-2">
          <li>
            <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-gray-100">
              <Layout className="h-4 w-4" />
              <span>Board View</span>
            </button>
          </li>
          <li>
            <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-gray-100">
              <Calendar className="h-4 w-4" />
              <span>Calendar</span>
            </button>
          </li>
          <li>
            <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-gray-100">
              <Users className="h-4 w-4" />
              <span>Team</span>
            </button>
          </li>
          <li>
            <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-gray-100">
              <BarChart2 className="h-4 w-4" />
              <span>Reports</span>
            </button>
          </li>
          <li>
            <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-gray-100">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
