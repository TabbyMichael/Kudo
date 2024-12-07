import { useState } from 'react';
import { Search, Filter, SortAsc, User, Calendar, Tag } from 'lucide-react';
import * as Popover from '@radix-ui/react-popover';
import { motion, AnimatePresence } from 'framer-motion';
import { type Priority, type Tag as TagType, type User as UserType } from '../../types/board';

interface FilterState {
  search: string;
  assignees: string[];
  priorities: Priority[];
  tags: string[];
  dueDateRange: {
    start: Date | null;
    end: Date | null;
  };
}

type SortDirection = 'asc' | 'desc';

interface SortConfig {
  field: string;
  direction: SortDirection;
}

interface SearchFilterBarProps {
  users: UserType[];
  tags: TagType[];
  onFilterChange: (filters: FilterState) => void;
  onSortChange: (field: string, direction: SortDirection) => void;
}

export function SearchFilterBar({
  users,
  tags,
  onFilterChange,
  onSortChange,
}: SearchFilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    assignees: [],
    priorities: [],
    tags: [],
    dueDateRange: {
      start: null,
      end: null,
    },
  });

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'createdAt',
    direction: 'desc',
  });

  const updateFilters = (updates: Partial<FilterState>) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleSort = (field: string) => {
    const newDirection: SortDirection = 
      sortConfig.field === field && sortConfig.direction === 'desc' ? 'asc' : 'desc';
    setSortConfig({ field, direction: newDirection });
    onSortChange(field, newDirection);
  };

  return (
    <div className="flex items-center gap-2 p-4">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search tasks..."
          className="h-10 w-full rounded-lg border border-gray-300 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          value={filters.search}
          onChange={(e) => updateFilters({ search: e.target.value })}
        />
      </div>

      {/* Filters */}
      <Popover.Root>
        <Popover.Trigger asChild>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="w-80 rounded-lg border bg-white p-4 shadow-lg" sideOffset={5}>
            <div className="space-y-4">
              {/* Assignees */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <User className="h-4 w-4" />
                  Assignees
                </label>
                <div className="space-y-2">
                  {users.map((user) => (
                    <label key={user.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.assignees.includes(user.id)}
                        onChange={(e) => {
                          const newAssignees = e.target.checked
                            ? [...filters.assignees, user.id]
                            : filters.assignees.filter((id) => id !== user.id);
                          updateFilters({ assignees: newAssignees });
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{user.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                  Priority
                </label>
                <div className="space-y-2">
                  {['Low', 'Medium', 'High', 'Critical'].map((priority) => (
                    <label key={priority} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.priorities.includes(priority as Priority)}
                        onChange={(e) => {
                          const newPriorities = e.target.checked
                            ? [...filters.priorities, priority as Priority]
                            : filters.priorities.filter((p) => p !== priority);
                          updateFilters({ priorities: newPriorities });
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{priority}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Tag className="h-4 w-4" />
                  Tags
                </label>
                <div className="space-y-2">
                  {tags.map((tag) => (
                    <label key={tag.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.tags.includes(tag.id)}
                        onChange={(e) => {
                          const newTags = e.target.checked
                            ? [...filters.tags, tag.id]
                            : filters.tags.filter((id) => id !== tag.id);
                          updateFilters({ tags: newTags });
                        }}
                        className="rounded border-gray-300"
                      />
                      <span
                        className="text-sm"
                        style={{ color: tag.color }}
                      >
                        {tag.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Due Date Range */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Calendar className="h-4 w-4" />
                  Due Date Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    className="rounded-md border border-gray-300 px-2 py-1 text-sm"
                    onChange={(e) =>
                      updateFilters({
                        dueDateRange: {
                          ...filters.dueDateRange,
                          start: e.target.value ? new Date(e.target.value) : null,
                        },
                      })
                    }
                  />
                  <input
                    type="date"
                    className="rounded-md border border-gray-300 px-2 py-1 text-sm"
                    onChange={(e) =>
                      updateFilters({
                        dueDateRange: {
                          ...filters.dueDateRange,
                          end: e.target.value ? new Date(e.target.value) : null,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {/* Sort */}
      <Popover.Root>
        <Popover.Trigger asChild>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">
            <SortAsc className="h-4 w-4" />
            Sort
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content className="w-64 rounded-lg border bg-white p-4 shadow-lg" sideOffset={5}>
            <div className="space-y-2">
              {[
                { field: 'createdAt', label: 'Created Date' },
                { field: 'dueDate', label: 'Due Date' },
                { field: 'priority', label: 'Priority' },
                { field: 'title', label: 'Title' },
              ].map(({ field, label }) => (
                <button
                  key={field}
                  className={`flex w-full items-center justify-between rounded-md px-2 py-1 text-sm hover:bg-gray-50 ${
                    sortConfig.field === field ? 'text-primary' : ''
                  }`}
                  onClick={() => toggleSort(field)}
                >
                  {label}
                  {sortConfig.field === field && (
                    <span className="text-xs">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
