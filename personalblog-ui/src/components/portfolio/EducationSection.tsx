import React from 'react';
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react';

interface Education {
  degree: string;
  school: string;
  location: string;
  period: string;
  description: string;
}

// Uncomment the following section to include certifications when available -total 3 blocks need to be uncommented
// interface Certification {
//   name: string;
//   issuer: string;
//   year: string;
//   status: 'Active' | 'Expired';
// }

interface EducationSectionProps {
  isDarkMode: boolean;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ isDarkMode }) => {
  const education: Education[] = [
        {
      degree: 'Bachelor of Science in Computer Science',
      school: 'State University',
      location: 'Dhaka, Bangladesh',
      period: '2022 - current',
      description: 'Major in CS, GPA: 3.6+/4.0'
    },
    // {
    //   degree: 'Higher Secondary Certificate',
    //   school: 'Residential Laboratory College',
    //   location: 'Dhaka, Bangladesh',
    //   period: '2017 - 2019',
    //   description: 'Science group'
    // },
  ];
// Uncomment the following section to include certifications when available
//   const certifications: Certification[] = [
//     { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2023', status: 'Active' },
//     { name: 'Oracle Certified Professional Java SE', issuer: 'Oracle Corporation', year: '2022', status: 'Active' },
//     { name: 'Spring Professional Certification', issuer: 'VMware', year: '2022', status: 'Active' },
//     { name: 'Kubernetes Application Developer', issuer: 'CNCF', year: '2021', status: 'Active' }
//   ];

  return (
    <section id="education" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`} style={{
            fontFamily: '"Courier New", monospace',
            textShadow: isDarkMode ? '3px 3px 0px #c5bbb8' : '3px 3px 0px #666',
            // textTransform: 'uppercase'
          }}>
            {'>'} EDUCATION_&_CERTIFICATIONS.EDU
          </h2>
          <div className={`max-w-3xl mx-auto p-4 border-2 ${
            isDarkMode 
              ? 'border-[#c5bbb8] bg-black/50' 
              : 'border-gray-700 bg-white/50'
          }`}>
            <p className={`text-lg transition-colors duration-300 ${
              isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
            }`} style={{
              fontFamily: '"Courier New", monospace'
            }}>
              ACADEMIC FOUNDATION AND<br/>
              PROFESSIONAL CERTIFICATIONS
            </p>
          </div>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <div className={`p-3 border-2 ${
                isDarkMode
                  ? 'bg-[#c5bbb8] border-[#c5bbb8]'
                  : 'bg-gray-700 border-gray-700'
              }`} style={{
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
              }}>
                <GraduationCap className={`w-6 h-6 ${
                  isDarkMode ? 'text-black' : 'text-white'
                }`} />
              </div>
              <h3 className={`text-2xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`} style={{
                fontFamily: '"Courier New", monospace',
                // textTransform: 'uppercase'
              }}>
                EDUCATION
              </h3>
            </div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className={`p-6 border-2 transition-all duration-300 hover:scale-[1.02] ${
                    isDarkMode
                      ? 'bg-black/50 border-[#c5bbb8]'
                      : 'bg-white/80 border-gray-700 shadow-lg'
                  }`} style={{
                    clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
                  }}>
                  <h4 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`} style={{
                    fontFamily: '"Courier New", monospace',
                    // textTransform: 'uppercase'
                  }}>
                    {edu.degree}
                  </h4>
                  
                  <p className={`font-bold mb-3 transition-colors duration-300 ${
                    isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
                  }`} style={{
                    fontFamily: '"Courier New", monospace',
                    // textTransform: 'uppercase'
                  }}>
                    @ {edu.school}
                  </p>

                  <div className="flex items-center space-x-4 mb-3 text-sm">
                    <div className={`flex items-center space-x-1 transition-colors duration-300 ${
                      isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-600'
                    }`} style={{
                      fontFamily: '"Courier New", monospace'
                    }}>
                      <Calendar className="w-4 h-4" />
                      <span>{edu.period}</span>
                    </div>
                    <div className={`flex items-center space-x-1 transition-colors duration-300 ${
                      isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-600'
                    }`} style={{
                      fontFamily: '"Courier New", monospace'
                    }}>
                      <MapPin className="w-4 h-4" />
                      <span>{edu.location}</span>
                    </div>
                  </div>

                  <div className={`p-3 border-2 ${
                    isDarkMode 
                      ? 'border-[#c5bbb8] bg-black/30' 
                      : 'border-gray-700 bg-white/30'
                  }`}>
                    <p className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
                    }`} style={{
                      fontFamily: '"Courier New", monospace',
                      fontSize: '14px'
                    }}>
                        {edu.description}
                      {/* {edu.description.toUpperCase()} */}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <div className={`p-3 border-2 ${
                isDarkMode
                  ? 'bg-[#c5bbb8] border-[#c5bbb8]'
                  : 'bg-gray-700 border-gray-700'
              }`} style={{
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
              }}>
                <Award className={`w-6 h-6 ${
                  isDarkMode ? 'text-black' : 'text-white'
                }`} />
              </div>
              <h3 className={`text-2xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`} style={{
                fontFamily: '"Courier New", monospace',
                // textTransform: 'uppercase'
              }}>
                CERTIFICATIONS
              </h3>
            </div>
            {/* Uncomment the following section to include certifications when available */}
            {/* 
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className={`p-4 border-2 transition-all duration-300 hover:scale-[1.02] ${
                    isDarkMode
                      ? 'bg-black/50 border-[#c5bbb8]'
                      : 'bg-white/80 border-gray-700 shadow-lg'
                  }`} style={{
                    clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
                  }}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className={`text-sm font-bold mb-1 transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`} style={{
                        fontFamily: '"Courier New", monospace',
                        // textTransform: 'uppercase'
                      }}>
                        {cert.name.replace(' ', '_')}
                      </h4>
                      
                      <p className={`text-xs mb-2 transition-colors duration-300 ${
                        isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-600'
                      }`} style={{
                        fontFamily: '"Courier New", monospace'
                      }}>
                        {cert.issuer.toUpperCase()} • {cert.year}
                      </p>
                    </div>
                    
                    <span className={`px-2 py-1 text-xs font-bold border-2 ${
                      cert.status === 'Active'
                        ? isDarkMode 
                          ? 'bg-[#c5bbb8] text-black border-[#c5bbb8]' 
                          : 'bg-green-500 text-white border-green-500'
                        : isDarkMode 
                          ? 'bg-gray-600 text-gray-300 border-gray-600' 
                          : 'bg-gray-400 text-white border-gray-400'
                    }`} style={{
                      fontFamily: '"Courier New", monospace',
                      // textTransform: 'uppercase'
                    }}>
                      {cert.status}
                    </span>
                  </div>
                </div>
              ))}
            </div> */}

            {/* Summary Stats */}
            {/* <div className={`mt-8 p-6 border-2 ${
              isDarkMode
                ? 'bg-gradient-to-br from-[#c5bbb8]/20 to-gray-900/50 border-[#c5bbb8]'
                : 'bg-gradient-to-br from-gray-200 to-gray-300 border-gray-700 shadow-lg'
            }`} style={{
              clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
            }}>
              <h4 className={`text-lg font-bold mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`} style={{
                fontFamily: '"Courier New", monospace',
                // textTransform: 'uppercase'
              }}>
                CREDENTIALS_SUMMARY
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold transition-colors duration-300 ${
                    isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
                  }`} style={{
                    fontFamily: '"Courier New", monospace'
                  }}>
                    {education.length}
                  </div>
                  <div className={`text-xs transition-colors duration-300 ${
                    isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-600'
                  }`} style={{
                    fontFamily: '"Courier New", monospace',
                    // textTransform: 'uppercase'
                  }}>
                    DEGREES
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={`text-2xl font-bold transition-colors duration-300 ${
                    isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
                  }`} style={{
                    fontFamily: '"Courier New", monospace'
                  }}>
                    {certifications.filter(c => c.status === 'Active').length}
                  </div>
                  <div className={`text-xs transition-colors duration-300 ${
                    isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-600'
                  }`} style={{
                    fontFamily: '"Courier New", monospace',
                    // textTransform: 'uppercase'
                  }}>
                    ACTIVE_CERTS
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};