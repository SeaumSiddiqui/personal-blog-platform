import React from 'react';
import { Link } from 'react-router-dom';
import { Download, ArrowRight, MapPin, Coffee, BookOpen } from 'lucide-react';
import { StatsSection } from './StatsSection';
import profileImageDark from '../../assets/profile-image-dark.png';

interface HeroSectionProps {
  isDarkMode: boolean;
  isVisible: boolean;
  imageTransition: boolean;
  scrollToSection: (sectionId: string) => void;
  openContactModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isDarkMode,
  isVisible,
  imageTransition,
}) => {
  return (
    <section id="hero" className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="space-y-4">
              <div className={`inline-flex items-center space-x-2 px-4 py-2 border-2 ${
                isDarkMode 
                  ? 'bg-black border-[#c5bbb8] text-[#c5bbb8]' 
                  : 'bg-white border-gray-700 text-gray-700'
              } backdrop-blur-sm`} style={{
                fontFamily: '"Courier New", monospace'
              }}>
                <div className={`w-3 h-3 ${
                  isDarkMode ? 'bg-[#c5bbb8]' : 'bg-green-500'
                } animate-pulse`} style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                }} />
                <span className="text-sm font-bold uppercase">STATUS: AVAILABLE</span>
              </div>
              
              <h1 className={`text-5xl md:text-6xl font-bold leading-tight transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`} style={{
                fontFamily: '"Courier New", monospace',
                textShadow: isDarkMode ? '4px 4px 0px #666' : '4px 4px 0px #c5bbb8'
              }}>
                SEAUM SIDDIQUI
              </h1>
              
              <h2 className={`text-2xl md:text-3xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
              }`} style={{
                fontFamily: '"Courier New", monospace',
                // textTransform: 'uppercase'
              }}>
                {'>'} BACKEND_DEVELOPER
              </h2>
              
              <div className={`p-4 border-2 ${
                isDarkMode 
                  ? 'border-[#c5bbb8] bg-black/50' 
                  : 'border-gray-700 bg-white/50'
              }`}>

                {/* <div> */}
                <p className={`text-lg leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
                }`} style={{
                  fontFamily: '"Courier New", monospace'
                }}>
                  {/* SPECIALIZED IN SPRING_BOOT DEVELOPMENT,<br/>
                  CRAFTING ROBUST RESTFUL_APIS AND<br/>
                  SCALABLE MICROSERVICES ARCHITECTURE.
                </p> */}

                Specialized in Spring Boot development, crafting robust RESTful APIs and scalable microservices architecture.
                </p>
              </div>
              
              <div className={`flex items-center space-x-2 text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-600'
              }`} style={{
                fontFamily: '"Courier New", monospace'
              }}>
                <MapPin className="w-4 h-4" />
                <span className="uppercase">LOCATION: DHAKA, BANGLADESH • REMOTE_AVAILABLE</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className={`group flex items-center space-x-2 px-6 py-3 border-2 font-bold transition-all duration-300 transform hover:scale-105 ${
                isDarkMode
                  ? 'bg-[#c5bbb8] text-black border-[#c5bbb8] hover:bg-transparent hover:text-[#c5bbb8]'
                  : 'bg-gray-700 text-white border-gray-700 hover:bg-transparent hover:text-gray-700'
              }`} style={{
                fontFamily: '"Courier New", monospace',
                // textTransform: 'uppercase'
              }}>
                <Download className="w-5 h-5" />
                <span>DOWNLOAD_CV</span>
              </button>
              
              <Link
                to="/blogs"
                className={`group flex items-center space-x-2 px-6 py-3 border-2 font-bold transition-all duration-300 transform hover:scale-105 ${
                  isDarkMode
                    ? 'border-[#c5bbb8] text-[#c5bbb8] hover:bg-[#c5bbb8] hover:text-black'
                    : 'border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white'
                }`} style={{
                  fontFamily: '"Courier New", monospace',
                  // textTransform: 'uppercase'
                }}>
                <BookOpen className="w-5 h-5" />
                <span>READ_BLOG</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* Integrated Stats Section */}
            <div className="mt-12">
              <StatsSection isDarkMode={isDarkMode} />
            </div>
          </div>

          {/* Profile Image with Smooth Transition */}
          <div className={`flex justify-center lg:justify-end ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="relative">
              <div className={`relative w-80 h-80 border-4 overflow-hidden transition-all duration-500 transform hover:scale-105 ${
                isDarkMode 
                  ? 'border-[#c5bbb8] shadow-2xl'
                  : 'border-gray-700 shadow-2xl'
              }`} style={{
                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                imageRendering: 'pixelated'
              }}>
                {/* Image container with transition */}
                <div className="relative w-full h-full">
                  <img
                    src={isDarkMode 
                      ? profileImageDark
                      : "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
                    }
                    alt="Seaum Siddiqui"
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      imageTransition ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
                    }`}
                    // style={{
                    //   imageRendering: 'pixelated',
                    //   filter: isDarkMode ? 'contrast(1.2) brightness(0.9)' : 'contrast(1.1) brightness(1.1)'
                    // }}
                  />
                  
                  {/* Pixelated overlay effect
                  <div className={`absolute inset-0 transition-opacity duration-500 ${
                    isDarkMode 
                      ? 'bg-gradient-to-t from-black/40 via-transparent to-[#c5bbb8]/20' 
                      : 'bg-gradient-to-t from-gray-900/40 via-transparent to-gray-700/20'
                  }`} />
                  
                  Scanline effect 
                  <div className="absolute inset-0 opacity-20" style={{
                    background: `repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      ${isDarkMode ? '#c5bbb8' : '#000'} 2px,
                      ${isDarkMode ? '#c5bbb8' : '#000'} 4px
                    )`
                  }} /> */}
                </div>
              </div>
              
              <div className={`absolute -bottom-4 -right-4 p-4 border-4 backdrop-blur-sm ${
                isDarkMode 
                  ? 'bg-black border-[#c5bbb8] text-[#c5bbb8]' 
                  : 'bg-white border-gray-700 text-gray-700'
              }`} style={{
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
              }}>
                <Coffee className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};