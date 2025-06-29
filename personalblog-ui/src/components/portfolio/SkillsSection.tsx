import React from 'react';
import { 
  SiSpringboot, 
  SiOpenjdk, 
  SiSpring, 
  SiPostgresql, 
  SiMongodb, 
  SiRedis, 
  SiAmazonaws, 
  SiDocker, 
  SiKubernetes, 
  SiGit, 
  SiApachemaven, 
  SiJunit5 
} from 'react-icons/si';

interface Skill {
  name: string;
  icon: React.ComponentType<any>;
  category: 'Backend' | 'Database' | 'Cloud' | 'Tools';
}

interface SkillsSectionProps {
  isDarkMode: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ isDarkMode }) => {
  const skills: Skill[] = [
    { name: 'Spring Boot', icon: SiSpringboot, category: 'Backend' },
    { name: 'Java', icon: SiOpenjdk, category: 'Backend' },
    { name: 'Spring Security', icon: SiSpring, category: 'Backend' },
    { name: 'PostgreSQL', icon: SiPostgresql, category: 'Database' },
    { name: 'MongoDB', icon: SiMongodb, category: 'Database' },
    { name: 'Redis', icon: SiRedis, category: 'Database' },
    { name: 'AWS', icon: SiAmazonaws, category: 'Cloud' },
    { name: 'Docker', icon: SiDocker, category: 'Cloud' },
    { name: 'Kubernetes', icon: SiKubernetes, category: 'Cloud' },
    { name: 'Git', icon: SiGit, category: 'Tools' },
    { name: 'Maven', icon: SiApachemaven, category: 'Tools' },
    { name: 'JUnit', icon: SiJunit5, category: 'Tools' }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`} style={{
            fontFamily: '"Courier New", monospace',
            textShadow: isDarkMode ? '3px 3px 0px #666' : '3px 3px 0px #c5bbb8',
            // textTransform: 'uppercase'
          }}>
            &gt; TECHNICAL_SKILLS
          </h2>
          {/* <div className={`max-w-3xl mx-auto p-4 border-2 ${
            isDarkMode 
              ? 'border-[#c5bbb8] bg-black/50' 
              : 'border-gray-700 bg-white/50'
          }`}>
            <p className={`text-lg transition-colors duration-300 ${
              isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
            }`} style={{
              fontFamily: '"Courier New", monospace'
            }}>
              TECHNOLOGIES AND TOOLS I USE TO BUILD<br/>
              EXCEPTIONAL SOFTWARE SOLUTIONS
            </p>
          </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {['Backend', 'Database', 'Cloud', 'Tools'].map((category) => (
            <div
              key={category}
              className={`p-6 border-2 transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-black/50 border-[#c5bbb8]'
                  : 'bg-white/80 border-gray-700 shadow-lg'
              }`} style={{
                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
              }}>
              <h3 className={`text-xl font-bold mb-6 text-center transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`} style={{
                fontFamily: '"Courier New", monospace',
                // textTransform: 'uppercase',
                textShadow: isDarkMode ? '2px 2px 0px #666' : '2px 2px 0px #c5bbb8'
              }}>
                {category}
              </h3>
              
              <div className="space-y-4">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill, index) => (
                    <div 
                      key={index}
                      className={`group flex items-center space-x-4 p-3 border-2 transition-all duration-300 hover:scale-105 ${
                        isDarkMode
                          ? 'border-[#c5bbb8] bg-black/30 hover:bg-[#c5bbb8]/10'
                          : 'border-gray-700 bg-white/30 hover:bg-gray-100/50'
                      }`} style={{
                        clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                      }}>
                      {/* Icon Container */}
                      <div className={`flex-shrink-0 p-2 border-2 transition-all duration-300 ${
                        isDarkMode
                          ? 'bg-[#c5bbb8] border-[#c5bbb8] group-hover:bg-black group-hover:border-[#c5bbb8]'
                          : 'bg-gray-700 border-gray-700 group-hover:bg-white group-hover:border-gray-700'
                      }`} style={{
                        clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'
                      }}>
                        <skill.icon className={`w-6 h-6 transition-colors duration-300 ${
                          isDarkMode 
                            ? 'text-black group-hover:text-[#c5bbb8]' 
                            : 'text-white group-hover:text-gray-700'
                        }`} />
                      </div>
                      
                      {/* Skill Name */}
                      <span className={`font-bold transition-colors duration-300 ${
                        isDarkMode ? 'text-[#c5bbb8] group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'
                      }`} style={{
                        fontFamily: '"Courier New", monospace',
                        // textTransform: 'uppercase',
                        fontSize: '14px'
                      }}>
                        {skill.name.replace(' ', '_')}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};