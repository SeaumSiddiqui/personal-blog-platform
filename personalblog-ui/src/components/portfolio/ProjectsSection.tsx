import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Github, Star, ExternalLink, Lightbulb, Rocket, Brain, Zap } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  status: 'Live' | 'In Progress' | 'Completed';
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

interface Idea {
  id: number;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  complexity: 'Simple' | 'Medium' | 'Complex';
  image: string;
  demoUrl?: string;
  featured: boolean;
}

interface ProjectsSectionProps {
  isDarkMode: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'ideas'>('projects');

  const projects: Project[] = [
    {
      id: 1,
      title: 'Blog Writing Platform With User Authentication',
      description: 'A full-stack blog management system with authentication, role-based access control, and modern UI. Features include markdown editor, image uploads, and responsive design.',
      technologies: ['Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Keycloak', 'Oracle Object Storage', 'Docker'],
      status: 'Live',
      image: 'https://objectstorage.ap-mumbai-1.oraclecloud.com/n/bmihpqq11x49/b/blog-image-bucket-20241130-2238/o/1493409d-629e-4061-925e-956342cf8898_Screenshot%20%2818%29.png',
      liveUrl: '/blogs',
      githubUrl: 'https://github.com/seaum-siddiqui/blog-platform',
      featured: true
    },
    // {
    //   id: 2,
    //   title: 'E-Commerce API',
    //   description: 'RESTful API for e-commerce platform with microservices architecture, payment integration, and real-time inventory management.',
    //   technologies: ['Spring Boot', 'MongoDB', 'Redis', 'Docker', 'AWS'],
    //   status: 'Completed',
    //   image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    //   githubUrl: 'https://github.com/seaum-siddiqui/ecommerce-api',
    //   featured: true
    // },
    // {
    //   id: 3,
    //   title: 'Task Management System',
    //   description: 'Collaborative task management application with real-time updates, team collaboration features, and advanced reporting.',
    //   technologies: ['Spring Boot', 'WebSocket', 'PostgreSQL', 'React', 'Material-UI'],
    //   status: 'In Progress',
    //   image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    //   featured: false
    // }
  ];

  const ideas: Idea[] = [
    // {
    //   id: 1,
    //   title: 'AI Code Review Assistant',
    //   description: 'An intelligent code review system that analyzes pull requests, suggests improvements, detects potential bugs, and ensures coding standards compliance using machine learning.',
    //   category: 'AI/ML',
    //   technologies: ['Spring Boot', 'Python', 'TensorFlow', 'GitHub API', 'PostgreSQL'],
    //   complexity: 'Complex',
    //   image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    //   demoUrl: '/idea/ai-code-review',
    //   featured: true
    // },
    // {
    //   id: 2,
    //   title: 'Smart Home Energy Manager',
    //   description: 'IoT-based energy management system that monitors and optimizes home energy consumption, integrates with smart devices, and provides cost-saving recommendations.',
    //   category: 'IoT',
    //   technologies: ['Spring Boot', 'MQTT', 'InfluxDB', 'React', 'Arduino'],
    //   complexity: 'Medium',
    //   image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    //   demoUrl: '/idea/smart-energy',
    //   featured: true
    // },
    // {
    //   id: 3,
    //   title: 'Blockchain Supply Chain Tracker',
    //   description: 'Transparent supply chain tracking system using blockchain technology to ensure product authenticity, trace origins, and prevent counterfeiting.',
    //   category: 'Blockchain',
    //   technologies: ['Spring Boot', 'Ethereum', 'Solidity', 'Web3.js', 'IPFS'],
    //   complexity: 'Complex',
    //   image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    //   featured: false
    // },
    // {
    //   id: 4,
    //   title: 'Developer Productivity Dashboard',
    //   description: 'Comprehensive dashboard that aggregates data from various development tools, tracks productivity metrics, and provides insights for team performance optimization.',
    //   category: 'Analytics',
    //   technologies: ['Spring Boot', 'Elasticsearch', 'Kibana', 'React', 'Docker'],
    //   complexity: 'Medium',
    //   image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    //   featured: false
    // },
    // {
    //   id: 5,
    //   title: 'Micro-Learning Platform',
    //   description: 'Bite-sized learning platform that delivers personalized content based on user preferences, tracks progress, and uses spaced repetition for better retention.',
    //   category: 'EdTech',
    //   technologies: ['Spring Boot', 'React Native', 'MongoDB', 'Redis', 'AWS'],
    //   complexity: 'Medium',
    //   image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    //   featured: false
    // },
    // {
    //   id: 6,
    //   title: 'Voice-Controlled API Testing',
    //   description: 'Revolutionary API testing tool that allows developers to create, execute, and manage API tests using voice commands and natural language processing.',
    //   category: 'DevTools',
    //   technologies: ['Spring Boot', 'Speech Recognition', 'NLP', 'Postman API', 'React'],
    //   complexity: 'Complex',
    //   image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    //   featured: false
    // }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI/ML': return Brain;
      case 'IoT': return Zap;
      case 'Blockchain': return Rocket;
      case 'Analytics': return Eye;
      case 'EdTech': return Lightbulb;
      case 'DevTools': return Github;
      default: return Lightbulb;
    }
  };

  const renderProjects = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <div
          key={project.id}
          className={`group border-2 overflow-hidden transition-all duration-300 hover:scale-105 ${
            isDarkMode
              ? 'bg-black/50 border-[#c5bbb8] hover:bg-black/70'
              : 'bg-white/80 border-gray-700 hover:bg-white/90 shadow-lg hover:shadow-xl'
          }`} style={{
            clipPath: 'polygon(0 0, calc(100% - 25px) 0, 100% 25px, 100% 100%, 25px 100%, 0 calc(100% - 25px))'
          }}>
          <div className="relative overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              style={{ imageRendering: 'pixelated' }}
            />
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 text-xs font-bold border-2 ${
                project.status === 'Live'
                  ? isDarkMode ? 'bg-[#c5bbb8] text-black border-[#c5bbb8]' : 'bg-green-500 text-white border-green-500'
                  : project.status === 'In Progress'
                  ? isDarkMode ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-yellow-500 text-white border-yellow-500'
                  : isDarkMode ? 'bg-blue-500 text-white border-blue-500' : 'bg-blue-500 text-white border-blue-500'
              }`} style={{
                fontFamily: '"Courier New", monospace',
                // textTransform: 'uppercase'
              }}>
                {project.status.replace(' ', '_')}
              </span>
            </div>
            {project.featured && (
              <div className="absolute top-4 left-4">
                <Star className={`w-5 h-5 ${
                  isDarkMode ? 'text-[#c5bbb8]' : 'text-yellow-500'
                } fill-current`} />
              </div>
            )}
            
            {/* Scanline effect on image */}
            <div className="absolute inset-0 opacity-30" style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 3px,
                ${isDarkMode ? '#c5bbb8' : '#000'} 3px,
                ${isDarkMode ? '#c5bbb8' : '#000'} 6px
              )`
            }} />
          </div>
          
          <div className="p-6">
            <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`} style={{
              fontFamily: '"Courier New", monospace',
              textTransform: 'uppercase'
            }}>
              {project.title.replace(' ', '_')}
            </h3>
            
            <div className={`p-3 border-2 mb-4 ${
              isDarkMode 
                ? 'border-[#c5bbb8] bg-black/30' 
                : 'border-gray-700 bg-white/30'
            }`}>
              <p className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
              }`} style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '14px',
                lineHeight: '1.3'
              }}>
                {project.description}
                {/* {project.description.toUpperCase()} */}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 text-xs border transition-colors duration-300 ${
                    isDarkMode
                      ? 'bg-black border-[#c5bbb8] text-[#c5bbb8]'
                      : 'bg-white border-gray-700 text-gray-700'
                  }`} style={{
                    fontFamily: '"Courier New", monospace',
                    // textTransform: 'uppercase'
                  }}>
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              {project.liveUrl && (
                <Link
                  to={project.liveUrl}
                  className={`flex items-center space-x-2 px-4 py-2 border-2 font-bold transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-[#c5bbb8] text-black border-[#c5bbb8] hover:bg-transparent hover:text-[#c5bbb8]'
                      : 'bg-gray-700 text-white border-gray-700 hover:bg-transparent hover:text-gray-700'
                  }`} style={{
                    fontFamily: '"Courier New", monospace',
                    // textTransform: 'uppercase'
                  }}>
                  <Eye className="w- h-4" />
                  <span>VIEW</span>
                </Link>
              )}
              
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-2 px-4 py-2 border-2 font-bold transition-all duration-300 ${
                    isDarkMode
                      ? 'border-[#c5bbb8] text-[#c5bbb8] hover:bg-[#c5bbb8] hover:text-black'
                      : 'border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white'
                  }`} style={{
                    fontFamily: '"Courier New", monospace',
                    // textTransform: 'uppercase'
                  }}>
                  <Github className="w-4 h-4" />
                  <span>CODE</span>
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderIdeas = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {ideas.map((idea) => {
        const CategoryIcon = getCategoryIcon(idea.category);
        return (
          <div
            key={idea.id}
            className={`group border-2 overflow-hidden transition-all duration-300 hover:scale-105 ${
              isDarkMode
                ? 'bg-black/50 border-[#c5bbb8] hover:bg-black/70'
                : 'bg-white/80 border-gray-700 hover:bg-white/90 shadow-lg hover:shadow-xl'
            }`} style={{
              clipPath: 'polygon(0 0, calc(100% - 25px) 0, 100% 25px, 100% 100%, 25px 100%, 0 calc(100% - 25px))'
            }}>
            <div className="relative overflow-hidden">
              <img
                src={idea.image}
                alt={idea.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                style={{ imageRendering: 'pixelated' }}
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 text-xs font-bold border-2 ${
                  idea.complexity === 'Simple'
                    ? isDarkMode ? 'bg-green-500 text-white border-green-500' : 'bg-green-500 text-white border-green-500'
                    : idea.complexity === 'Medium'
                    ? isDarkMode ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-yellow-500 text-white border-yellow-500'
                    : isDarkMode ? 'bg-red-500 text-white border-red-500' : 'bg-red-500 text-white border-red-500'
                }`} style={{
                  fontFamily: '"Courier New", monospace',
                  // textTransform: 'uppercase'
                }}>
                  {idea.complexity}
                </span>
              </div>
              <div className="absolute top-4 left-4">
                <div className={`p-2 border-2 ${
                  isDarkMode
                    ? 'bg-[#c5bbb8] border-[#c5bbb8]'
                    : 'bg-white border-gray-700'
                }`} style={{
                  clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'
                }}>
                  <CategoryIcon className={`w-4 h-4 ${
                    isDarkMode ? 'text-black' : 'text-gray-700'
                  }`} />
                </div>
              </div>
              {idea.featured && (
                <div className="absolute bottom-4 left-4">
                  <Star className={`w-5 h-5 ${
                    isDarkMode ? 'text-[#c5bbb8]' : 'text-yellow-500'
                  } fill-current`} />
                </div>
              )}
              
              {/* Scanline effect on image */}
              <div className="absolute inset-0 opacity-30" style={{
                background: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 3px,
                  ${isDarkMode ? '#c5bbb8' : '#000'} 3px,
                  ${isDarkMode ? '#c5bbb8' : '#000'} 6px
                )`
              }} />
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-lg font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`} style={{
                  fontFamily: '"Courier New", monospace',
                  textTransform: 'uppercase'
                }}>
                  {idea.title.replace(' ', '_')}
                </h3>
                <span className={`px-2 py-1 text-xs font-bold border transition-colors duration-300 ${
                  isDarkMode
                    ? 'bg-black border-[#c5bbb8] text-[#c5bbb8]'
                    : 'bg-white border-gray-700 text-gray-700'
                }`} style={{
                  fontFamily: '"Courier New", monospace',
                  // textTransform: 'uppercase'
                }}>
                  {idea.category}
                </span>
              </div>
              
              <div className={`p-3 border-2 mb-4 ${
                isDarkMode 
                  ? 'border-[#c5bbb8] bg-black/30' 
                  : 'border-gray-700 bg-white/30'
              }`}>
                <p className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
                }`} style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '12px',
                  lineHeight: '1.3'
                }}>
                  {idea.description.toUpperCase()}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {idea.technologies.slice(0, 3).map((tech, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 text-xs border transition-colors duration-300 ${
                      isDarkMode
                        ? 'bg-black border-[#c5bbb8] text-[#c5bbb8]'
                        : 'bg-white border-gray-700 text-gray-700'
                    }`} style={{
                      fontFamily: '"Courier New", monospace',
                      // textTransform: 'uppercase'
                    }}>
                    {tech}
                  </span>
                ))}
                {idea.technologies.length > 3 && (
                  <span className={`px-2 py-1 text-xs transition-colors duration-300 ${
                    isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-500'
                  }`} style={{
                    fontFamily: '"Courier New", monospace'
                  }}>
                    +{idea.technologies.length - 3}
                  </span>
                )}
              </div>
              
              <div className="flex justify-center">
                {idea.demoUrl && (
                  <Link
                    to={idea.demoUrl}
                    className={`flex items-center space-x-2 px-6 py-2 border-2 font-bold transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-[#c5bbb8] text-black border-[#c5bbb8] hover:bg-transparent hover:text-[#c5bbb8]'
                        : 'bg-gray-700 text-white border-gray-700 hover:bg-transparent hover:text-gray-700'
                    }`} style={{
                      fontFamily: '"Courier New", monospace',
                      // textTransform: 'uppercase'
                    }}>
                    <Eye className="w-4 h-4" />
                    <span>VIEW_CONCEPT</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`} style={{
            fontFamily: '"Courier New", monospace',
            textShadow: isDarkMode ? '3px 3px 0px #666' : '3px 3px 0px #c5bbb8',
            // textTransform: 'uppercase'
          }}>
            {'>'} {activeTab === 'projects' ? 'FEATURED_PROJECTS' : 'INNOVATIVE_IDEAS'}
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
              {activeTab === 'projects' 
                ? 'A SHOWCASE OF MY RECENT WORK\nAND PERSONAL PROJECTS'
                : 'INNOVATIVE CONCEPTS AND FUTURE\nPROJECT POSSIBILITIES'
              }
            </p>
          </div> */}
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className={`flex border-2 ${
            isDarkMode ? 'border-[#c5bbb8]' : 'border-gray-700'
          }`} style={{
            clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
          }}>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-8 py-3 font-bold transition-all duration-300 ${
                activeTab === 'projects'
                  ? isDarkMode
                    ? 'bg-[#c5bbb8] text-black'
                    : 'bg-gray-700 text-white'
                  : isDarkMode
                  ? 'bg-black text-[#c5bbb8] hover:bg-[#c5bbb8]/10'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`} style={{
                fontFamily: '"Courier New", monospace',
                // textTransform: 'uppercase'
              }}>
              PROJECTS
            </button>
            <button
              onClick={() => setActiveTab('ideas')}
              className={`px-8 py-3 font-bold transition-all duration-300 ${
                activeTab === 'ideas'
                  ? isDarkMode
                    ? 'bg-[#c5bbb8] text-black'
                    : 'bg-gray-700 text-white'
                  : isDarkMode
                  ? 'bg-black text-[#c5bbb8] hover:bg-[#c5bbb8]/10'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`} style={{
                fontFamily: '"Courier New", monospace',
                // textTransform: 'uppercase'
              }}>
              IDEAS
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="transition-all duration-500">
          {activeTab === 'projects' ? renderProjects() : renderIdeas()}
        </div>

        {/* Bottom Action */}
        <div className="text-center mt-10">
          {activeTab === 'projects' ? (
            <a
              href="https://github.com/seaum-siddiqui"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center space-x-2 px-6 py-3 border-2 font-bold transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? 'border-[#c5bbb8] text-[#c5bbb8] hover:bg-[#c5bbb8] hover:text-black'
                  : 'border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white'
              }`} style={{
                fontFamily: '"Courier New", monospace',
                // textTransform: 'uppercase'
              }}>
              <Github className="w-5 h-5" />
              <span>VIEW_ALL_PROJECTS</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <div className={`inline-flex items-center space-x-2 px-6 py-3 border-2 ${
              isDarkMode
                ? 'border-[#c5bbb8] text-[#c5bbb8] bg-black/30'
                : 'border-gray-700 text-gray-700 bg-white/30'
            }`} style={{
              fontFamily: '"Courier New", monospace',
              // textTransform: 'uppercase',
              clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
            }}>
              <Lightbulb className="w-5 h-5" />
              <span>MORE_IDEAS_COMING_SOON</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};