import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

interface SocialLinksProps {
  layout?: 'vertical' | 'horizontal';
  size?: 'small' | 'medium' | 'large';
  animate?: boolean;
  startAnimation?: boolean;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  layout = 'vertical',
  size = 'medium',
  animate = true,
  startAnimation = false
}) => {
  const { isDarkMode } = useTheme();
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const animationTriggered = useRef(false);

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/SeaumSiddiqui',
      label: 'GitHub',
      color: 'hover:bg-gray-800 hover:text-white'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/seaum-siddiqui',
      label: 'LinkedIn',
      color: 'hover:bg-blue-600 hover:text-white'
    },
    {
      icon: Mail,
      href: 'mailto:seaumsiddiqui@outlook.com',
      label: 'Email',
      color: 'hover:bg-red-500 hover:text-white'
    },
    {
      icon: Twitter,
      href: 'https://x.com/SeaumSiddiqui',
      label: 'Twitter',
      color: 'hover:bg-blue-400 hover:text-white'
    }
  ];

  useEffect(() => {
    if (!animate) {
      setVisibleItems([0, 1, 2, 3]);
      return;
    }

    if (!startAnimation || animationTriggered.current) return;
    animationTriggered.current = true;

    const reversedIndices = [...socialLinks.keys()].reverse();

    reversedIndices.forEach((index, i) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, index]);
      }, i * 100);
    });
  }, [animate, startAnimation]);

  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const iconSizes = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6'
  };

  const containerClasses = layout === 'horizontal'
    ? 'flex flex-row space-x-3'
    : 'flex flex-col space-y-3';

  return (
    <div className={containerClasses}>
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            group relative ${sizeClasses[size]} rounded-full border-2 transition-all duration-300
            flex items-center justify-center transform hover:scale-110 hover:shadow-lg backdrop-blur-sm
            ${isDarkMode
              ? 'border-stone-600/50 bg-stone-800/50 hover:border-stone-400/70'
              : 'border-grey-300/60 bg-white/80 hover:border-grey-500/70 shadow-lg'
            }
            ${social.color}
          `}
          style={{
            transform: animate
              ? visibleItems.includes(index)
                ? 'translateX(0) scale(1)'
                : 'translateX(30px) scale(0.8)'
              : 'translateX(0) scale(1)',
            opacity: animate ? (visibleItems.includes(index) ? 1 : 0) : 1,
            transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease-out',
          }}
          title={social.label}
        >
          <social.icon className={`${iconSizes[size]} transition-colors duration-300 ${
            isDarkMode ? 'text-stone-300' : 'text-grey-600'
          } group-hover:text-current`} />

          <div className="absolute inset-0 rounded-full bg-current opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </a>
      ))}
    </div>
  );
};
