export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: Priority;
  assignee?: User;
  dueDate?: Date;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
  estimate?: number; // Story points or hours
  attachmentCount: number;
  commentCount: number;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
  limit?: number; // WIP limit
  color?: string;
}

export interface Board {
  id: string;
  title: string;
  columns: Column[];
}
