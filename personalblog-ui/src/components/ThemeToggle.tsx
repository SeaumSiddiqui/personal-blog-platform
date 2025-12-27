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
            ? 'bg-dark-card border-dark-border hover:bg-dark-card/70'
            : 'bg-light-card border-light-border hover:bg-light-card/80'
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
                ? 'text-primary-500 scale-110'
                : 'text-dark-text-secondary scale-90'
            }`} />
          </div>

          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <Moon className={`w-5 h-5 transition-all duration-300 ${
              isDarkMode
                ? 'text-primary-400 scale-110'
                : 'text-light-text-secondary scale-90'
            }`} />
          </div>

          {/* Sliding Indicator */}
          <div
            className={`
              absolute w-8 h-8 rounded-full transition-all duration-300 ease-in-out
              shadow-md border-2
              ${isDarkMode
                ? 'bg-dark-bg border-primary-400 bottom-1'
                : 'bg-light-card border-primary-500 top-1'
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
                ? 'bg-primary-400/20 shadow-primary-400/50'
                : 'bg-primary-500/20 shadow-primary-500/50'
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
        ${isDarkMode ? 'text-dark-text' : 'text-light-text'}
      `}>
        Theme
      </div>
    </div>
  );
};