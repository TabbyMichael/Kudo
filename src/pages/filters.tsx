import React from 'react';

export function FiltersPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Filters & Labels</h1>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Create new filter</h2>
          <button className="text-blue-600 hover:text-blue-700">
            + Add Filter
          </button>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Labels</h2>
          <button className="text-blue-600 hover:text-blue-700">
            + Add Label
          </button>
        </div>
      </div>
    </div>
  );
}
