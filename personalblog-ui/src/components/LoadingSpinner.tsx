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
            w-12 h-12 rounded-full border-4 border-opacity-20 animate-spin
            ${isDarkMode ? 'border-white border-t-blue-400' : 'border-gray-900 border-t-blue-600'}
          `}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className={`
              w-6 h-6 rounded-full animate-pulse
              ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'}
            `}
          />
        </div>
      </div>
    </div>
  );
};