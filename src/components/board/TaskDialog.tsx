import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Avatar from '@radix-ui/react-avatar';
import { X, Calendar, Tag, User, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Task, type User as UserType, type Tag as TagType, type Priority } from '../../types/board';

interface TaskDialogProps {
  task?: Task;
  users: UserType[];
  tags: TagType[];
  onSave: (task: Partial<Task>) => void;
  onClose: () => void;
}

export function TaskDialog({ task, users, tags, onSave, onClose }: TaskDialogProps) {
  const [formData, setFormData] = useState<Partial<Task>>(
    task || {
      title: '',
      description: '',
      priority: 'Medium',
      assignee: undefined,
      dueDate: undefined,
      tags: [],
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const priorityColors = {
    Low: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
    Medium: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100',
    High: 'bg-orange-50 text-orange-700 hover:bg-orange-100',
    Critical: 'bg-red-50 text-red-700 hover:bg-red-100',
  };

  return (
    <Dialog.Root open={true} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 space-y-4 rounded-lg bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold">
              {task ? 'Edit Task' : 'Create Task'}
            </Dialog.Title>
            <Dialog.Close className="rounded-full p-1 hover:bg-gray-100">
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  {Object.keys(priorityColors).map((priority) => (
                    <button
                      key={priority}
                      type="button"
                      className={`rounded-md px-3 py-2 text-sm ${
                        priorityColors[priority as Priority]
                      } ${
                        formData.priority === priority
                          ? 'ring-2 ring-offset-2'
                          : ''
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, priority: priority as Priority })
                      }
                    >
                      {priority}
                    </button>
                  ))}
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <input
                  type="date"
                  value={
                    formData.dueDate
                      ? new Date(formData.dueDate)
                          .toISOString()
                          .split('T')[0]
                      : ''
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dueDate: e.target.value ? new Date(e.target.value) : undefined,
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Assignee */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Assignee
              </label>
              <div className="mt-1 grid grid-cols-4 gap-2">
                {users.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    className={`flex items-center gap-2 rounded-md border p-2 text-sm ${
                      formData.assignee?.id === user.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, assignee: user })
                    }
                  >
                    <Avatar.Root className="h-6 w-6">
                      <Avatar.Image
                        src={user.avatarUrl}
                        alt={user.name}
                        className="h-full w-full rounded-full object-cover"
                      />
                      <Avatar.Fallback className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-xs font-medium">
                        {user.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </Avatar.Fallback>
                    </Avatar.Root>
                    <span className="truncate">{user.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <div className="mt-1 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    className={`rounded-full px-3 py-1 text-sm ${
                      formData.tags?.some((t) => t.id === tag.id)
                        ? 'ring-2 ring-offset-2'
                        : ''
                    }`}
                    style={{
                      backgroundColor: `${tag.color}20`,
                      color: tag.color,
                    }}
                    onClick={() => {
                      const newTags = formData.tags?.some((t) => t.id === tag.id)
                        ? formData.tags?.filter((t) => t.id !== tag.id)
                        : [...(formData.tags || []), tag];
                      setFormData({ ...formData, tags: newTags });
                    }}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90"
              >
                {task ? 'Save Changes' : 'Create Task'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
