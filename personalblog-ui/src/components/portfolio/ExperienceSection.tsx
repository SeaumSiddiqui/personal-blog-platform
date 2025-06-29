import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

interface Experience {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
}

interface ExperienceSectionProps {
  isDarkMode: boolean;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ isDarkMode }) => {
  const experiences: Experience[] = [
    {
      company: 'TechCorp Solutions',
      position: 'Senior Backend Developer',
      duration: '2022 - Present',
      location: 'Remote',
      description: 'Leading backend development for microservices architecture serving 1M+ users.',
      achievements: [
        'Architected microservices handling 10K+ requests/second',
        'Reduced deployment time by 60% with CI/CD pipelines',
        'Mentored 3 junior developers'
      ]
    },
    {
      company: 'StartupXYZ',
      position: 'Backend Developer',
      duration: '2020 - 2022',
      location: 'New York, NY',
      description: 'Developed core backend services for a fintech startup.',
      achievements: [
        'Built payment system processing $1M+ monthly',
        'Implemented OAuth2 security framework',
        'Achieved 99.9% uptime for critical services'
      ]
    }
  ];

  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`} style={{
            fontFamily: '"Courier New", monospace',
            textShadow: isDarkMode ? '3px 3px 0px #666' : '3px 3px 0px #c5bbb8',
            // textTransform: 'uppercase'
          }}>
            &gt; WORK_EXPERIENCE.LOG
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
              MY PROFESSIONAL JOURNEY<br/>
              AND KEY ACHIEVEMENTS
            </p>
          </div> */}
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`p-8 border-2 transition-all duration-300 hover:scale-[1.02] ${
                isDarkMode
                  ? 'bg-black/50 border-[#c5bbb8]'
                  : 'bg-white/80 border-gray-700 shadow-lg'
              }`} style={{
                clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))'
              }}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className={`text-2xl font-bold transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`} style={{
                        fontFamily: '"Courier New", monospace',
                        // textTransform: 'uppercase'
                      }}>
                        {exp.position.replace(' ', '_')}
                      </h3>
                      <p className={`text-lg font-bold mb-2 ${
                        isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
                      }`} style={{
                        fontFamily: '"Courier New", monospace',
                        // textTransform: 'uppercase'
                      }}>
                        @ {exp.company.replace(' ', '_')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className={`flex items-center space-x-1 transition-colors duration-300 ${
                        isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-600'
                      }`} style={{
                        fontFamily: '"Courier New", monospace'
                      }}>
                        <Calendar className="w-4 h-4" />
                        <span>{exp.duration}</span>
                      </div>
                      <div className={`flex items-center space-x-1 transition-colors duration-300 ${
                        isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-600'
                      }`} style={{
                        fontFamily: '"Courier New", monospace'
                      }}>
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-4 border-2 mb-6 ${
                    isDarkMode 
                      ? 'border-[#c5bbb8] bg-black/30' 
                      : 'border-gray-700 bg-white/30'
                  }`}>
                    <p className={`leading-relaxed transition-colors duration-300 ${
                      isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
                    }`} style={{
                      fontFamily: '"Courier New", monospace',
                      fontSize: '14px'
                    }}>
                      {exp.description.toUpperCase()}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className={`text-lg font-bold mb-4 transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`} style={{
                    fontFamily: '"Courier New", monospace',
                    // textTransform: 'uppercase'
                  }}>
                    KEY_ACHIEVEMENTS:
                  </h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li
                        key={achIndex}
                        className={`flex items-start space-x-2 text-sm transition-colors duration-300 ${
                          isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
                        }`} style={{
                          fontFamily: '"Courier New", monospace',
                          fontSize: '12px'
                        }}>
                        <span className={`${
                          isDarkMode ? 'text-[#c5bbb8]' : 'text-green-500'
                        } mt-0.5 flex-shrink-0`}>
                          &gt;
                        </span>
                        <span>{achievement.toUpperCase()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};