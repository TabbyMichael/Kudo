import { create } from 'zustand';

export interface Project {
  id: string;
  name: string;
  icon: string;
  color?: string;
}

interface ProjectState {
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  removeProject: (id: string) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [
    { id: 'inbox', name: 'Inbox', icon: '📥' },
    { id: 'work', name: 'My work', icon: '🎯' },
    { id: 'home', name: 'Home', icon: '🏠' },
    { id: 'education', name: 'Education', icon: '📚' },
  ],
  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, { ...project, id: crypto.randomUUID() }],
    })),
  removeProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id),
    })),
}));