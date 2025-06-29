import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { ThemeToggle } from '../components/ThemeToggle';
import { 
  ArrowLeft, 
  Brain, 
  CheckCircle, 
  TrendingUp,
  Users,
  Clock,
  ExternalLink,
  Lightbulb,
  Rocket,
  Target
} from 'lucide-react';

export const IdeaDemo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isDarkMode, toggleTheme } = useTheme();

  // Demo data for AI Code Review Assistant
  const ideaData = {
    'ai-code-review': {
      title: 'AI Code Review Assistant',
      subtitle: 'Intelligent Code Analysis & Review Automation',
      description: 'An advanced AI-powered system that revolutionizes code review processes by providing intelligent analysis, automated suggestions, and comprehensive quality assessments.',
      category: 'AI/ML',
      complexity: 'Complex',
      estimatedTime: '6-8 months',
      teamSize: '4-6 developers',
      technologies: ['Spring Boot', 'Python', 'TensorFlow', 'GitHub API', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
      features: [
        'Automated code quality analysis',
        'Security vulnerability detection',
        'Performance optimization suggestions',
        'Code style and convention enforcement',
        'Technical debt identification',
        'Integration with popular Git platforms',
        'Real-time collaboration features',
        'Customizable review templates'
      ],
      benefits: [
        'Reduce code review time by 60%',
        'Improve code quality consistency',
        'Catch bugs before production',
        'Standardize coding practices',
        'Accelerate development cycles',
        'Reduce technical debt accumulation'
      ],
      architecture: [
        'Microservices-based backend',
        'Machine learning pipeline',
        'Real-time notification system',
        'Scalable data processing',
        'API-first design',
        'Cloud-native deployment'
      ],
      marketPotential: 'High - Growing demand for automated code quality tools',
      targetAudience: 'Development teams, Tech companies, Open source projects',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop'
    },
    'smart-energy': {
      title: 'Smart Home Energy Manager',
      subtitle: 'IoT-Based Energy Optimization System',
      description: 'Comprehensive energy management solution that monitors, analyzes, and optimizes home energy consumption through intelligent IoT integration.',
      category: 'IoT',
      complexity: 'Medium',
      estimatedTime: '4-6 months',
      teamSize: '3-4 developers',
      technologies: ['Spring Boot', 'MQTT', 'InfluxDB', 'React', 'Arduino', 'Raspberry Pi', 'AWS IoT'],
      features: [
        'Real-time energy monitoring',
        'Smart device integration',
        'Predictive analytics',
        'Cost optimization algorithms',
        'Mobile app control',
        'Automated scheduling',
        'Energy usage reports',
        'Carbon footprint tracking'
      ],
      benefits: [
        'Reduce energy costs by 25-30%',
        'Lower carbon footprint',
        'Automated energy optimization',
        'Real-time usage insights',
        'Smart device coordination',
        'Predictive maintenance alerts'
      ],
      architecture: [
        'IoT sensor network',
        'Edge computing nodes',
        'Cloud data processing',
        'Machine learning models',
        'Mobile applications',
        'Web dashboard'
      ],
      marketPotential: 'Very High - Growing smart home market',
      targetAudience: 'Homeowners, Property managers, Energy companies',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop'
    }
  };

  const currentIdea = ideaData[id as keyof typeof ideaData];

  if (!currentIdea) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-black via-gray-900 to-gray-800' 
          : 'bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300'
      }`}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Idea Not Found</h1>
          <Link to="/" className="text-blue-500 hover:underline">
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-black via-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300'
    }`} style={{
      fontFamily: '"Courier New", monospace',
      imageRendering: 'pixelated'
    }}>
      {/* Fixed Theme Toggle */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
        <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b-4 transition-all duration-300 ${
        isDarkMode 
          ? 'bg-black/90 border-gray-700' 
          : 'bg-gray-100/90 border-gray-400'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className={`flex items-center space-x-2 px-3 py-2 border-2 transition-colors duration-200 ${
                  isDarkMode
                    ? 'border-[#c5bbb8] text-[#c5bbb8] hover:bg-[#c5bbb8] hover:text-black'
                    : 'border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white'
                }`} style={{
                  fontFamily: '"Courier New", monospace',
                  // textTransform: 'uppercase'
                }}>
                <ArrowLeft className="w-4 h-4" />
                <span>BACK_TO_PORTFOLIO</span>
              </Link>
            </div>
            
            <h1 className={`text-xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`} style={{
              textShadow: isDarkMode ? '2px 2px 0px #c5bbb8' : '2px 2px 0px #666',
              fontFamily: '"Courier New", monospace',
              // textTransform: 'uppercase'
            }}>
              IDEA_CONCEPT.EXE
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className={`inline-flex items-center space-x-2 px-4 py-2 border-2 ${
                isDarkMode 
                  ? 'bg-black border-[#c5bbb8] text-[#c5bbb8]' 
                  : 'bg-white border-gray-700 text-gray-700'
              }`}>
                <Brain className="w-4 h-4" />
                <span className="text-sm font-bold uppercase">{currentIdea.category} • {currentIdea.complexity}</span>
              </div>
              
              <h1 className={`text-4xl md:text-5xl font-bold leading-tight transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`} style={{
                fontFamily: '"Courier New", monospace',
                textShadow: isDarkMode ? '3px 3px 0px #c5bbb8' : '3px 3px 0px #666',
                // textTransform: 'uppercase'
              }}>
                {currentIdea.title.replace(' ', '_')}
              </h1>
              
              <h2 className={`text-xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
              }`} style={{
                fontFamily: '"Courier New", monospace'
              }}>
                {currentIdea.subtitle.toUpperCase()}
              </h2>
              
              <div className={`p-4 border-2 ${
                isDarkMode 
                  ? 'border-[#c5bbb8] bg-black/50' 
                  : 'border-gray-700 bg-white/50'
              }`}>
                <p className={`text-lg leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
                }`} style={{
                  fontFamily: '"Courier New", monospace'
                }}>
                  {currentIdea.description.toUpperCase()}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 border-2 text-center ${
                  isDarkMode
                    ? 'border-[#c5bbb8] bg-black/30'
                    : 'border-gray-700 bg-white/30'
                }`}>
                  <Clock className={`w-6 h-6 mx-auto mb-2 ${
                    isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
                  }`} />
                  <div className={`text-sm font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`} style={{ fontFamily: '"Courier New", monospace' }}>
                    {currentIdea.estimatedTime.toUpperCase()}
                  </div>
                </div>
                <div className={`p-4 border-2 text-center ${
                  isDarkMode
                    ? 'border-[#c5bbb8] bg-black/30'
                    : 'border-gray-700 bg-white/30'
                }`}>
                  <Users className={`w-6 h-6 mx-auto mb-2 ${
                    isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
                  }`} />
                  <div className={`text-sm font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`} style={{ fontFamily: '"Courier New", monospace' }}>
                    {currentIdea.teamSize.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            {/* Concept Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className={`relative w-full h-80 border-4 overflow-hidden transition-all duration-500 ${
                  isDarkMode 
                    ? 'border-[#c5bbb8] shadow-2xl' 
                    : 'border-gray-700 shadow-2xl'
                }`} style={{
                  clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                  imageRendering: 'pixelated'
                }}>
                  <img
                    src={currentIdea.image}
                    alt={currentIdea.title}
                    className="w-full h-full object-cover"
                    style={{
                      imageRendering: 'pixelated',
                      filter: isDarkMode ? 'contrast(1.2) brightness(0.9)' : 'contrast(1.1) brightness(1.1)'
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className={`absolute inset-0 ${
                    isDarkMode 
                      ? 'bg-gradient-to-t from-black/40 via-transparent to-[#c5bbb8]/20' 
                      : 'bg-gradient-to-t from-gray-900/40 via-transparent to-gray-700/20'
                  }`} />
                  
                  {/* Scanline effect */}
                  <div className="absolute inset-0 opacity-20" style={{
                    background: `repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      ${isDarkMode ? '#c5bbb8' : '#000'} 2px,
                      ${isDarkMode ? '#c5bbb8' : '#000'} 4px
                    )`
                  }} />
                </div>
                
                <div className={`absolute -bottom-4 -right-4 p-4 border-4 backdrop-blur-sm ${
                  isDarkMode 
                    ? 'bg-black border-[#c5bbb8] text-[#c5bbb8]' 
                    : 'bg-white border-gray-700 text-gray-700'
                }`} style={{
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                }}>
                  <Lightbulb className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className={`text-3xl font-bold mb-12 text-center transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`} style={{
            fontFamily: '"Courier New", monospace',
            textShadow: isDarkMode ? '2px 2px 0px #c5bbb8' : '2px 2px 0px #666',
            // textTransform: 'uppercase'
          }}>
            {'>'} CORE_FEATURES.DAT
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentIdea.features.map((feature, index) => (
              <div
                key={index}
                className={`p-4 border-2 transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? 'bg-black/50 border-[#c5bbb8]'
                    : 'bg-white/80 border-gray-700 shadow-lg'
                }`} style={{
                  clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
                }}>
                <div className="flex items-start space-x-3">
                  <CheckCircle className={`w-5 h-5 mt-1 flex-shrink-0 ${
                    isDarkMode ? 'text-[#c5bbb8]' : 'text-green-500'
                  }`} />
                  <span className={`text-sm font-bold transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`} style={{
                    fontFamily: '"Courier New", monospace',
                    // textTransform: 'uppercase'
                  }}>
                    {feature.replace(' ', '_')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className={`text-3xl font-bold mb-12 text-center transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`} style={{
            fontFamily: '"Courier New", monospace',
            textShadow: isDarkMode ? '2px 2px 0px #c5bbb8' : '2px 2px 0px #666',
            // textTransform: 'uppercase'
          }}>
            {'>'} TECHNOLOGY_STACK.SYS
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {currentIdea.technologies.map((tech, index) => (
              <span
                key={index}
                className={`px-4 py-2 border-2 font-bold transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? 'bg-black border-[#c5bbb8] text-[#c5bbb8] hover:bg-[#c5bbb8] hover:text-black'
                    : 'bg-white border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white'
                }`} style={{
                  fontFamily: '"Courier New", monospace',
                  // textTransform: 'uppercase'
                }}>
                {tech.replace(' ', '_')}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Market Potential */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <div className={`p-8 border-2 ${
              isDarkMode
                ? 'bg-black/50 border-[#c5bbb8]'
                : 'bg-white/80 border-gray-700 shadow-lg'
            }`} style={{
              clipPath: 'polygon(0 0, calc(100% - 25px) 0, 100% 25px, 100% 100%, 25px 100%, 0 calc(100% - 25px))'
            }}>
              <div className="flex items-center space-x-3 mb-6">
                <Target className={`w-6 h-6 ${
                  isDarkMode ? 'text-[#c5bbb8]' : 'text-green-500'
                }`} />
                <h3 className={`text-2xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`} style={{
                  fontFamily: '"Courier New", monospace',
                  // textTransform: 'uppercase'
                }}>
                  KEY_BENEFITS
                </h3>
              </div>
              
              <div className="space-y-3">
                {currentIdea.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <TrendingUp className={`w-4 h-4 mt-1 flex-shrink-0 ${
                      isDarkMode ? 'text-[#c5bbb8]' : 'text-green-500'
                    }`} />
                    <span className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
                    }`} style={{
                      fontFamily: '"Courier New", monospace'
                    }}>
                      {benefit.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Info */}
            <div className={`p-8 border-2 ${
              isDarkMode
                ? 'bg-black/50 border-[#c5bbb8]'
                : 'bg-white/80 border-gray-700 shadow-lg'
            }`} style={{
              clipPath: 'polygon(0 0, calc(100% - 25px) 0, 100% 25px, 100% 100%, 25px 100%, 0 calc(100% - 25px))'
            }}>
              <div className="flex items-center space-x-3 mb-6">
                <Rocket className={`w-6 h-6 ${
                  isDarkMode ? 'text-[#c5bbb8]' : 'text-blue-500'
                }`} />
                <h3 className={`text-2xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`} style={{
                  fontFamily: '"Courier New", monospace',
                  // textTransform: 'uppercase'
                }}>
                  MARKET_ANALYSIS
                </h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className={`text-sm font-bold mb-2 ${
                    isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
                  }`} style={{
                    fontFamily: '"Courier New", monospace',
                    // textTransform: 'uppercase'
                  }}>
                    MARKET_POTENTIAL:
                  </h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`} style={{
                    fontFamily: '"Courier New", monospace'
                  }}>
                    {currentIdea.marketPotential.toUpperCase()}
                  </p>
                </div>
                
                <div>
                  <h4 className={`text-sm font-bold mb-2 ${
                    isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
                  }`} style={{
                    fontFamily: '"Courier New", monospace',
                    // textTransform: 'uppercase'
                  }}>
                    TARGET_AUDIENCE:
                  </h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`} style={{
                    fontFamily: '"Courier New", monospace'
                  }}>
                    {currentIdea.targetAudience.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className={`p-8 border-2 ${
            isDarkMode
              ? 'bg-gradient-to-br from-[#c5bbb8]/20 to-gray-900/50 border-[#c5bbb8]'
              : 'bg-gradient-to-br from-gray-200 to-gray-300 border-gray-700 shadow-lg'
          }`} style={{
            clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))'
          }}>
            <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`} style={{
              fontFamily: '"Courier New", monospace',
              textShadow: isDarkMode ? '2px 2px 0px #c5bbb8' : '2px 2px 0px #666',
              // textTransform: 'uppercase'
            }}>
              INTERESTED_IN_COLLABORATION?
            </h2>
            
            <p className={`text-lg mb-8 transition-colors duration-300 ${
              isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
            }`} style={{
              fontFamily: '"Courier New", monospace'
            }}>
              LET'S DISCUSS HOW WE CAN BRING<br/>
              THIS INNOVATIVE CONCEPT TO LIFE.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/#contact"
                className={`flex items-center space-x-2 px-6 py-3 border-2 font-bold transition-all duration-300 transform hover:scale-105 ${
                  isDarkMode
                    ? 'bg-[#c5bbb8] text-black border-[#c5bbb8] hover:bg-transparent hover:text-[#c5bbb8]'
                    : 'bg-gray-700 text-white border-gray-700 hover:bg-transparent hover:text-gray-700'
                }`} style={{
                  fontFamily: '"Courier New", monospace',
                  // textTransform: 'uppercase'
                }}>
                <span>CONTACT_ME.EXE</span>
              </Link>
              
              <Link
                to="/"
                className={`flex items-center space-x-2 px-6 py-3 border-2 font-bold transition-all duration-300 transform hover:scale-105 ${
                  isDarkMode
                    ? 'border-[#c5bbb8] text-[#c5bbb8] hover:bg-[#c5bbb8] hover:text-black'
                    : 'border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white'
                }`} style={{
                  fontFamily: '"Courier New", monospace',
                  // textTransform: 'uppercase'
                }}>
                <span>VIEW_MORE_IDEAS</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};