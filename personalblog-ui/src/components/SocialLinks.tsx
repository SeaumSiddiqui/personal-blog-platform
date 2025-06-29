import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

interface SocialLinksProps {
  layout?: 'vertical' | 'horizontal';
  size?: 'small' | 'medium' | 'large';
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ 
  layout = 'vertical', 
  size = 'medium' 
}) => {
  const { isDarkMode } = useTheme();

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
          title={social.label}
        >
          <social.icon className={`${iconSizes[size]} transition-colors duration-300 ${
            isDarkMode ? 'text-stone-300' : 'text-grey-600'
          } group-hover:text-current`} />
          
          {/* Ripple effect on hover */}
          <div className="absolute inset-0 rounded-full bg-current opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </a>
      ))}
    </div>
  );
};