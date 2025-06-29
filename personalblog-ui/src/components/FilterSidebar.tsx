import React from 'react';
import { BlogFilters } from '../types/blog';
import { Filter, X } from 'lucide-react';

interface FilterSidebarProps {
  filters: BlogFilters;
  onFilterChange: (filters: Partial<BlogFilters>) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
}) => {
  const clearFilters = () => {
    onFilterChange({
      title: '',
      author: '',
      createdStartDate: '',
      createdEndDate: '',
    });
  };

  const hasActiveFilters = filters.title || filters.author || filters.createdStartDate || filters.createdEndDate;

  return (
    <div className="p-6 rounded-xl shadow-sm border transition-colors duration-300 bg-white/70 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-blue-500 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Filters
          </h3>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-1 text-sm px-3 py-1.5 rounded-lg transition-colors duration-200 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <X className="w-4 h-4" />
            <span>Clear</span>
          </button>
        )}
      </div>

      <div className="space-y-8">
        {/* Author Filter */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Author
          </label>
          <input
            type="text"
            placeholder="Filter by author..."
            value={filters.author}
            onChange={(e) => onFilterChange({ author: e.target.value })}
            className="w-full px-3 py-2.5 rounded-lg border transition-colors duration-200 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Date Range Filters */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Date Range
          </label>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
                From
              </label>
              <input
                type="date"
                value={filters.createdStartDate}
                onChange={(e) => onFilterChange({ createdStartDate: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border text-sm transition-colors duration-200 bg-white border-gray-300 text-gray-900 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
                To
              </label>
              <input
                type="date"
                value={filters.createdEndDate}
                onChange={(e) => onFilterChange({ createdEndDate: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border text-sm transition-colors duration-200 bg-white border-gray-300 text-gray-900 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="p-4 rounded-lg border-l-4 bg-blue-50 border-blue-500 dark:bg-blue-900/20 dark:border-blue-500">
            <h4 className="text-sm font-medium mb-2 text-blue-700 dark:text-blue-400">
              Active Filters
            </h4>
            <div className="space-y-1 text-xs">
              {filters.author && (
                <div className="text-gray-600 dark:text-gray-300">
                  Author: <span className="font-medium">{filters.author}</span>
                </div>
              )}
              {filters.createdStartDate && (
                <div className="text-gray-600 dark:text-gray-300">
                  From: <span className="font-medium">{filters.createdStartDate}</span>
                </div>
              )}
              {filters.createdEndDate && (
                <div className="text-gray-600 dark:text-gray-300">
                  To: <span className="font-medium">{filters.createdEndDate}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};