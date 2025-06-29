import React, { useState, useEffect } from 'react';
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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    // Update on mount
    updateScrollProgress();

    // Add scroll listener
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    
    // Also update on resize in case content height changes
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  return (
    <>
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-3 border-2 shadow-lg transition-all duration-300 hover:scale-110 z-40 ${
            isDarkMode
              ? 'bg-black text-[#c5bbb8] border-[#c5bbb8] hover:bg-[#c5bbb8] hover:text-black'
              : 'bg-white text-gray-700 border-gray-700 hover:bg-gray-700 hover:text-white shadow-xl'
          }`} style={{
            clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
          }}>
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Scroll Progress Indicator */}
      <div className={`fixed bottom-0 left-0 w-full h-1 z-50 border-t-2 ${
        isDarkMode ? 'bg-black border-[#c5bbb8]' : 'bg-white border-gray-700'
      }`}>
        <div 
          className={`h-full transition-all duration-150 ease-out ${
            isDarkMode 
              ? 'bg-[#c5bbb8]' 
              : 'bg-gray-700'
          }`}
          style={{ 
            width: `${scrollProgress}%`,
            imageRendering: 'pixelated'
          }}
        />
      </div>
    </>
  );
};