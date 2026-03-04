import React, { useEffect, useState, useRef } from 'react';

interface PortfolioNavigationProps {
  isDarkMode: boolean;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  startAnimation?: boolean;
}

export const PortfolioNavigation: React.FC<PortfolioNavigationProps> = ({
  isDarkMode,
  activeSection,
  scrollToSection,
  startAnimation = false
}) => {
  const [lineDrawn, setLineDrawn] = useState<number[]>([]);
  const [labelVisible, setLabelVisible] = useState<number[]>([]);
  const animationTriggered = useRef(false);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'blogs', label: 'Blog' }
  ];

  useEffect(() => {
    if (!startAnimation || animationTriggered.current) return;
    animationTriggered.current = true;

    navItems.forEach((_, index) => {
      setTimeout(() => {
        setLineDrawn(prev => [...prev, index]);
      }, index * 120);

      setTimeout(() => {
        setLabelVisible(prev => [...prev, index]);
      }, 200 + index * 120);
    });
  }, [startAnimation]);

  return (
    <nav className="hidden lg:block">
      <ul className="mt-16 space-y-4">
        {navItems.map((item, index) => (
          <li key={item.id} className="relative">
            <button
              onClick={() => scrollToSection(item.id)}
              className="group flex items-center space-x-4"
            >
              <span
                className={`h-px transition-colors duration-300 ${
                  activeSection === item.id
                    ? 'bg-primary-500'
                    : isDarkMode
                    ? 'bg-dark-text-secondary group-hover:bg-primary-400'
                    : 'bg-light-text-secondary group-hover:bg-primary-500'
                }`}
                style={{
                  width: lineDrawn.includes(index)
                    ? activeSection === item.id ? '64px' : '32px'
                    : '0px',
                  transition: 'width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 0.3s',
                }}
              />
              <span
                className={`text-xs font-mono font-bold uppercase tracking-widest transition-colors duration-300 ${
                  activeSection === item.id
                    ? 'text-primary-500'
                    : isDarkMode
                    ? 'text-dark-text-secondary group-hover:text-primary-400'
                    : 'text-light-text-secondary group-hover:text-primary-500'
                }`}
                style={{
                  transform: labelVisible.includes(index) ? 'translateX(0)' : 'translateX(-20px)',
                  opacity: labelVisible.includes(index) ? 1 : 0,
                  transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease-out',
                }}
              >
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
