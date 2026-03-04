import React, { useEffect, useState, useRef } from 'react';

interface AnimatedHeadingProps {
  text: string;
  isDarkMode: boolean;
  className?: string;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  isDarkMode,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            setTimeout(() => setIsVisible(true), 100);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <h2
      ref={headingRef}
      className={`text-xl font-serif italic transition-colors duration-300 ${
        isDarkMode ? 'text-slate-300' : 'text-slate-700'
      } ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) skewX(0deg)' : 'translateY(20px) skewX(-3deg)',
        transition: 'opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {text}
    </h2>
  );
};
