import React from 'react';

interface StatsSectionProps {
  isDarkMode: boolean;
}

interface Stat {
  label: string;
  value: string;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ isDarkMode }) => {
  const stats: Stat[] = [
    { label: 'Years Experience', value: '1+' },
    { label: 'Projects Completed', value: '3+' },
    { label: 'Happy Clients', value: '2+' }
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`text-center p-4 border-2 transition-all duration-300 hover:scale-105 ${
            isDarkMode
              // ? 'bg-black/50 border-[#c5bbb8] backdrop-blur-sm'
              // : 'bg-white/80 border-gray-700 backdrop-blur-sm shadow-lg'
              ? 'border-[#c5bbb8] backdrop-blur-md'
              : 'border-gray-700 backdrop-blur-md shadow-lg'
          }`} style={{
            clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
          }}>
          <div className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`} style={{
            fontFamily: '"Courier New", monospace',
            textShadow: isDarkMode ? '2px 2px 0px #666' : '2px 2px 0px #c5bbb8'
          }}>
            {stat.value}
          </div>
          <div className={`text-sm font-bold transition-colors duration-300 ${
            isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
          }`} style={{
            fontFamily: '"Courier New", monospace',
            // textTransform: 'uppercase'
          }}>
            {stat.label.replace(' ', '_')}
          </div>
        </div>
      ))}
    </div>
  );
};