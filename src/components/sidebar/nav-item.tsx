import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  count?: number;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}

export function NavItem({ icon: Icon, label, count, active, collapsed, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors',
        active && 'bg-gray-100 text-blue-600 font-medium',
        collapsed ? 'w-10 justify-center' : 'w-full px-4'
      )}
      title={collapsed ? label : undefined}
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0', active && 'text-blue-600')} />
      {!collapsed && (
        <>
          <span className="flex-1 text-left">{label}</span>
          {count !== undefined && (
            <span className={cn('text-sm', active ? 'text-blue-600' : 'text-gray-500')}>
              {count}
            </span>
          )}
        </>
      )}
    </button>
  );
}