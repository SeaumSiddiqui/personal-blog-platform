import React from 'react';
import { ArrowUp } from 'lucide-react';

interface ScrollControlsProps {
  isDarkMode: boolean;
  showScrollTop: boolean;
  scrollToTop: () => void;
}

export const ScrollControls: React.FC<ScrollControlsProps> = ({
  isDarkMode,
  showScrollTop,
  scrollToTop
}) => {
  return (
    <>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`
            fixed bottom-6 left-6 w-12 h-12 rounded-full border-2 transition-all duration-300
            flex items-center justify-center transform hover:scale-110 hover:shadow-lg backdrop-blur-sm z-40
            ${isDarkMode
              ? 'border-stone-600/50 bg-stone-800/50 hover:border-primary-400/70 hover:bg-primary-500/20'
              : 'border-grey-300/60 bg-white/80 hover:border-primary-500/70 hover:bg-primary-500/10 shadow-lg'
            }
          `}
          title="Scroll to top"
        >
          <ArrowUp className={`w-5 h-5 transition-colors duration-300 ${
            isDarkMode ? 'text-stone-300' : 'text-grey-600'
          }`} />
          <div className="absolute inset-0 rounded-full bg-primary-500 opacity-0 hover:opacity-10 transition-opacity duration-300" />
        </button>
      )}
    </>
  );
};