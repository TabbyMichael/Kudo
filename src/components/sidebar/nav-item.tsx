import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  count?: number;
  active?: boolean;
  onClick?: () => void;
}

export function NavItem({ icon: Icon, label, count, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors',
        active && 'bg-gray-100 text-blue-600 font-medium'
      )}
    >
      <Icon className={cn('w-5 h-5', active && 'text-blue-600')} />
      <span className="flex-1 text-left">{label}</span>
      {count !== undefined && (
        <span className={cn('text-sm', active ? 'text-blue-600' : 'text-gray-500')}>
          {count}
        </span>
      )}
    </button>
  );
}