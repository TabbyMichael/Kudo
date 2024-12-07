import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Inbox, Calendar, Filter } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="w-64 bg-white border-r">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Menu</h2>
        <ul className="space-y-2">
          <li>
            <Link
              to="/inbox"
              className={`flex items-center gap-2 p-2 rounded-lg ${
                isActive('/inbox') ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'
              }`}
            >
              <Inbox className="h-5 w-5" />
              <span>Inbox</span>
            </Link>
          </li>
          <li>
            <Link
              to="/today"
              className={`flex items-center gap-2 p-2 rounded-lg ${
                isActive('/today') ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'
              }`}
            >
              <Calendar className="h-5 w-5" />
              <span>Today</span>
            </Link>
          </li>
          <li>
            <Link
              to="/filters"
              className={`flex items-center gap-2 p-2 rounded-lg ${
                isActive('/filters') ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'
              }`}
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
