import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { isDarkMode } = useTheme();

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  const buttonClass = (isActive: boolean = false, isDisabled: boolean = false) => `
    flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
    ${isActive
      ? 'bg-primary-400 text-white shadow-md dark:bg-primary-500'
      : isDisabled
      ? isDarkMode
        ? 'text-dark-text-secondary cursor-not-allowed'
        : 'text-light-text-secondary cursor-not-allowed'
      : isDarkMode
      ? 'text-dark-text hover:text-dark-text hover:bg-dark-border'
      : 'text-light-text hover:text-light-text hover:bg-light-border'
    }
  `;

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className={buttonClass(false, currentPage === 0)}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="ml-1 hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <div className={`flex items-center justify-center px-3 py-2 ${
                isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
              }`}>
                <MoreHorizontal className="w-4 h-4" />
              </div>
            ) : (
              <button
                onClick={() => onPageChange((page as number) - 1)}
                className={buttonClass(currentPage === (page as number) - 1)}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className={buttonClass(false, currentPage === totalPages - 1)}
      >
        <span className="mr-1 hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};