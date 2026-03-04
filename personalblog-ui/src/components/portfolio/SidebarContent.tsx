import React, { useEffect, useState, useRef } from 'react';
import { Briefcase, Users, Award } from 'lucide-react';
import { ExternalLink } from 'lucide-react';
import {
  SiOpenjdk,
  SiSpringboot,
  SiMysql,
  SiDocker,
  SiGithub,
  SiApachemaven
} from 'react-icons/si';
import GitHubHeatmap from './GitHubHeatmap';

interface SidebarContentProps {
  isDarkMode: boolean;
  startAnimation?: boolean;
}

interface Stat {
  label: string;
  value: number;
  suffix: string;
}

interface Tech {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

type SectionType = 'stats' | 'stacks' | 'github';

const AnimatedCounter: React.FC<{ target: number; suffix: string; isDarkMode: boolean; shouldAnimate: boolean }> = ({
  target,
  suffix,
  isDarkMode,
  shouldAnimate
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) return;

    const duration = 1000;
    const steps = 20;
    const increment = target / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [target, shouldAnimate]);

  return (
    <span className={`text-xl font-mono font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
      {count}{suffix}
    </span>
  );
};

export const SidebarContent: React.FC<SidebarContentProps> = ({ isDarkMode, startAnimation = false }) => {
  const [activeSection, setActiveSection] = useState<SectionType>('stats');
  const [cardsVisible, setCardsVisible] = useState<number[]>([]);
  const [shouldAnimateCounters, setShouldAnimateCounters] = useState(false);
  const animationTriggered = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const experienceSection = document.getElementById('experience');
      const projectsSection = document.getElementById('projects');

      if (!experienceSection || !projectsSection) return;

      const experienceRect = experienceSection.getBoundingClientRect();
      const projectsRect = projectsSection.getBoundingClientRect();

      const viewportMiddle = window.innerHeight / 2;

      if (projectsRect.top <= viewportMiddle && projectsRect.bottom >= 0) {
        setActiveSection('github');
      } else if (experienceRect.top <= viewportMiddle && experienceRect.bottom >= 0) {
        setActiveSection('stacks');
      } else {
        setActiveSection('stats');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!startAnimation || animationTriggered.current) return;
    animationTriggered.current = true;

    [0, 1, 2].forEach((index) => {
      setTimeout(() => {
        setCardsVisible(prev => [...prev, index]);
      }, index * 150);
    });

    setTimeout(() => {
      setShouldAnimateCounters(true);
    }, 300);
  }, [startAnimation]);

  const techs: Tech[] = [
    { name: 'Java', icon: SiOpenjdk },
    { name: 'Spring Boot', icon: SiSpringboot },
    { name: 'MySQL', icon: SiMysql },
    { name: 'Docker', icon: SiDocker },
    { name: 'GitHub', icon: SiGithub },
    { name: 'Maven', icon: SiApachemaven }
  ];

  const stats: Stat[] = [
    { label: 'Projects', value: 2, suffix: '+' },
    { label: 'Clients', value: 1, suffix: '+' },
    { label: 'Yrs Expertise', value: 0, suffix: '+' }
  ];

  return (
    <div className="relative w-full overflow-hidden mt-3">
      <style>{`
        .sidebar-transition {
          transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      filter 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>

      <div
        className="sidebar-transition will-change-transform"
        style={{
          position: activeSection === 'stats' ? 'relative' : 'absolute',
          width: '100%',
          opacity: activeSection === 'stats' ? 1 : 0,
          transform: activeSection === 'stats'
            ? 'translateY(0) scale(1)'
            : 'translateY(-20px) scale(0.95)',
          filter: activeSection === 'stats' ? 'blur(0px)' : 'blur(8px)',
          pointerEvents: activeSection === 'stats' ? 'auto' : 'none',
        }}
      >
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg transition-all duration-300 ${
                isDarkMode
                  ? 'bg-black/60 border border-slate-800'
                  : 'bg-white/60 border border-slate-300'
              }`}
              style={{
                transform: cardsVisible.includes(index) ? 'translateY(0)' : 'translateY(30px)',
                opacity: cardsVisible.includes(index) ? 1 : 0,
                transition: `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease-out`,
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`p-1 rounded ${
                  isDarkMode ? 'bg-primary-500/20' : 'bg-primary-500/10'
                }`}>
                  {index === 0 && <Briefcase className={`w-3.5 h-3.5 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} />}
                  {index === 1 && <Users className={`w-3.5 h-3.5 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} />}
                  {index === 2 && <Award className={`w-3.5 h-3.5 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} />}
                </div>
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  isDarkMode={isDarkMode}
                  shouldAnimate={shouldAnimateCounters && cardsVisible.includes(index)}
                />
              </div>
              <div className={`text-xs font-mono font-medium ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="sidebar-transition will-change-transform"
        style={{
          position: activeSection === 'stacks' ? 'relative' : 'absolute',
          width: '100%',
          top: 0,
          opacity: activeSection === 'stacks' ? 1 : 0,
          transform: activeSection === 'stacks'
            ? 'translateY(0) scale(1)'
            : activeSection === 'stats'
              ? 'translateY(20px) scale(0.95)'
              : 'translateY(-20px) scale(0.95)',
          filter: activeSection === 'stacks' ? 'blur(0px)' : 'blur(8px)',
          pointerEvents: activeSection === 'stacks' ? 'auto' : 'none',
        }}
      >
        <div className="grid grid-cols-3 gap-2">
          {techs.map((tech, index) => (
            <a
              key={index}
              href="#"
              className={`group flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300 ${
                isDarkMode
                  ? 'bg-black/60 border border-slate-800 hover:bg-black/80'
                  : 'bg-white/60 border border-slate-300 hover:bg-white/80'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-primary-500/20' : 'bg-primary-500/10'
              }`}>
                <tech.icon className={`w-5 h-5 ${
                  isDarkMode ? 'text-primary-400' : 'text-primary-600'
                }`} />
              </div>
              <div className="flex items-center gap-1">
                <div className={`text-xs font-mono font-medium text-center ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {tech.name}
                </div>
                <ExternalLink className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`} />
              </div>
            </a>
          ))}
        </div>
      </div>

      <div
        className="sidebar-transition will-change-transform"
        style={{
          position: activeSection === 'github' ? 'relative' : 'absolute',
          width: '100%',
          top: 0,
          opacity: activeSection === 'github' ? 1 : 0,
          transform: activeSection === 'github'
            ? 'translateY(0) scale(1)'
            : 'translateY(20px) scale(0.95)',
          filter: activeSection === 'github' ? 'blur(0px)' : 'blur(8px)',
          pointerEvents: activeSection === 'github' ? 'auto' : 'none',
        }}
      >
        <GitHubHeatmap />
      </div>
    </div>
  );
};
