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
    <div className="p-6 rounded-xl shadow-sm border transition-colors duration-300 bg-light-card border-light-border dark:bg-dark-card dark:border-dark-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-primary-500 dark:text-primary-400" />
          <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">
            Filters
          </h3>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-1 text-sm px-3 py-1.5 rounded-lg transition-colors duration-200 text-light-text-secondary hover:text-light-text hover:bg-light-border dark:text-dark-text-secondary dark:hover:text-dark-text dark:hover:bg-dark-border"
          >
            <X className="w-4 h-4" />
            <span>Clear</span>
          </button>
        )}
      </div>

      <div className="space-y-8">
        {/* Author Filter */}
        <div>
          <label className="block text-sm font-medium mb-2 text-light-text dark:text-dark-text">
            Author
          </label>
          <input
            type="text"
            placeholder="Filter by author..."
            value={filters.author}
            onChange={(e) => onFilterChange({ author: e.target.value })}
            className="w-full px-3 py-2.5 rounded-lg border transition-colors duration-200 bg-light-card border-light-border text-light-text placeholder-light-text-secondary focus:border-primary-400 dark:bg-dark-bg dark:border-dark-border dark:text-dark-text dark:placeholder-dark-text-secondary dark:focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400/20"
          />
        </div>

        {/* Date Range Filters */}
        <div>
          <label className="block text-sm font-medium mb-2 text-light-text dark:text-dark-text">
            Date Range
          </label>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1 text-light-text-secondary dark:text-dark-text-secondary">
                From
              </label>
              <input
                type="date"
                value={filters.createdStartDate}
                onChange={(e) => onFilterChange({ createdStartDate: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border text-sm transition-colors duration-200 bg-light-card border-light-border text-light-text focus:border-primary-400 dark:bg-dark-bg dark:border-dark-border dark:text-dark-text dark:focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400/20"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1 text-light-text-secondary dark:text-dark-text-secondary">
                To
              </label>
              <input
                type="date"
                value={filters.createdEndDate}
                onChange={(e) => onFilterChange({ createdEndDate: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border text-sm transition-colors duration-200 bg-light-card border-light-border text-light-text focus:border-primary-400 dark:bg-dark-bg dark:border-dark-border dark:text-dark-text dark:focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400/20"
              />
            </div>
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="p-4 rounded-lg border-l-4 bg-primary-50 border-primary-500 dark:bg-primary-900/20 dark:border-primary-500">
            <h4 className="text-sm font-medium mb-2 text-primary-700 dark:text-primary-400">
              Active Filters
            </h4>
            <div className="space-y-1 text-xs">
              {filters.author && (
                <div className="text-light-text-secondary dark:text-dark-text-secondary">
                  Author: <span className="font-medium">{filters.author}</span>
                </div>
              )}
              {filters.createdStartDate && (
                <div className="text-light-text-secondary dark:text-dark-text-secondary">
                  From: <span className="font-medium">{filters.createdStartDate}</span>
                </div>
              )}
              {filters.createdEndDate && (
                <div className="text-light-text-secondary dark:text-dark-text-secondary">
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