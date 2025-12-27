import React from 'react';

interface LoadingSpinnerProps {
  isDarkMode: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isDarkMode }) => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div
          className={`
            w-12 h-12 rounded-full border-4 border-opacity-20 animate-spin transition-colors duration-300
            ${isDarkMode ? 'border-dark-text-secondary border-t-primary-500' : 'border-light-text-secondary border-t-primary-400'}
          `}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`
              w-6 h-6 rounded-full animate-pulse transition-colors duration-300
              ${isDarkMode ? 'bg-primary-500' : 'bg-primary-400'}
            `}
          />
        </div>
      </div>
    </div>
  );
};