import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, onToggle }) => {
  return (
    <div className="relative">
      {/* Vertical Slider Container */}
      <div 
        className={`
          relative w-12 h-20 rounded-full p-1 cursor-pointer transition-all duration-300 
          shadow-lg backdrop-blur-md border
          ${isDarkMode 
            ? 'bg-gray-800/90 border-gray-600 hover:bg-gray-700' 
            : 'bg-white/90 border-gray-200 hover:bg-white'
          }
        `}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {/* Slider Track */}
        <div className="relative h-full w-full">
          {/* Icons positioned at top and bottom */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
            <Sun className={`w-5 h-5 transition-all duration-300 ${
              !isDarkMode 
                ? 'text-yellow-500 scale-110' 
                : 'text-gray-400 scale-90'
            }`} />
          </div>
          
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <Moon className={`w-5 h-5 transition-all duration-300 ${
              isDarkMode 
                ? 'text-blue-400 scale-110' 
                : 'text-gray-400 scale-90'
            }`} />
          </div>
          
          {/* Sliding Indicator */}
          <div 
            className={`
              absolute w-8 h-8 rounded-full transition-all duration-300 ease-in-out
              shadow-md border-2
              ${isDarkMode 
                ? 'bg-gray-700 border-blue-400 bottom-1' 
                : 'bg-white border-yellow-500 top-1'
              }
            `}
            style={{
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          >
            {/* Inner glow effect */}
            <div className={`
              absolute inset-0 rounded-full transition-all duration-300
              ${isDarkMode 
                ? 'bg-blue-400/20 shadow-blue-400/50' 
                : 'bg-yellow-500/20 shadow-yellow-500/50'
              }
            `} />
          </div>
        </div>
        
        {/* Hover effect overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-transparent to-transparent hover:from-white/5 hover:to-white/5 transition-all duration-300" />
      </div>
      
      {/* Optional label */}
      <div className={`
        absolute -left-16 top-1/2 transform -translate-y-1/2 text-xs font-medium
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
        ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
      `}>
        Theme
      </div>
    </div>
  );
};