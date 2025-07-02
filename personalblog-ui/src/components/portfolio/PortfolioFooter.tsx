import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

interface PortfolioFooterProps {
  isDarkMode: boolean;
  scrollToSection: (sectionId: string) => void;
  openContactModal: () => void;
}

export const PortfolioFooter: React.FC<PortfolioFooterProps> = ({ 
  isDarkMode, 
  scrollToSection, 
  openContactModal 
}) => {
  const navigate = useNavigate();

  const handleNavClick = (item: string) => {
    if (item.toLowerCase() === 'contact') {
      openContactModal();
    } else if (item.toLowerCase() === 'about') {
      // About content is in the hero section
      scrollToSection('hero');
    } else if (item.toLowerCase() === 'blog') {
      // Navigate to blog page using React Router
      navigate('/blogs');
    } else {
      scrollToSection(item.toLowerCase());
    }
  };

  return (
    <footer className={`border-t-4 py-12 transition-colors duration-300 ${
      isDarkMode ? 'border-[#c5bbb8]' : 'border-gray-700'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`} style={{
              fontFamily: '"Courier New", monospace',
              textTransform: 'uppercase',
              textShadow: isDarkMode ? '2px 2px 0px #666' : '2px 2px 0px #c5bbb8'
            }}>
              SEAUM_SIDDIQUI
            </h3>
            <div className={`p-3 border-2 ${
              isDarkMode 
                ? 'border-[#c5bbb8] bg-black/30' 
                : 'border-gray-700 bg-white/30'
            }`}>
              <p className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
              }`} style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '12px'
              }}>
                BACKEND DEVELOPER SPECIALIZING<br/>
                IN SPRING_BOOT AND MODERN<br/>
                WEB TECHNOLOGIES.
              </p>
            </div>
          </div>
          
          <div>
            <h4 className={`text-lg font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`} style={{
              fontFamily: '"Courier New", monospace',
              textTransform: 'uppercase'
            }}>
              QUICK_LINKS:
            </h4>
            <div className="space-y-2">
              {/* Replace when you have experience section */}
              {/* {['About', 'Skills', 'Projects', 'Experience', 'Education', 'Blog', 'Contact'].map((item) => ( */}
              {['About', 'Skills', 'Projects', 'Education', 'Blog', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`block text-sm font-bold transition-colors duration-200 ${
                    isDarkMode 
                      ? 'text-[#c5bbb8] hover:text-white' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`} style={{
                    fontFamily: '"Courier New", monospace',
                    textTransform: 'uppercase'
                  }}>
                  {'>'} {item.replace(' ', '_')}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className={`text-lg font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`} style={{
              fontFamily: '"Courier New", monospace',
              textTransform: 'uppercase'
            }}>
              CONNECT:
            </h4>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: 'https://github.com/SeaumSiddiqui' },
                { icon: Linkedin, href: 'https://linkedin.com/in/seaum-siddiqui' },
                { icon: Mail, href: 'mailto:seaumsiddiqui@outlook.com' },
                { icon: Twitter, href: 'https://x.com/SeaumSiddiqui' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 border-2 transition-all duration-200 hover:scale-110 ${
                    isDarkMode
                      ? 'text-[#c5bbb8] border-[#c5bbb8] hover:bg-[#c5bbb8] hover:text-black'
                      : 'text-gray-700 border-gray-700 hover:bg-gray-700 hover:text-white'
                  }`} style={{
                    clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'
                  }}>
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className={`mt-8 pt-8 border-t-2 text-center transition-colors duration-300 ${
          isDarkMode ? 'border-[#c5bbb8]' : 'border-gray-700'
        }`}>
          <div className={`inline-block p-3 border-2 ${
            isDarkMode 
              ? 'border-[#c5bbb8] bg-black/30' 
              : 'border-gray-700 bg-white/30'
          }`}>
            <p className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
            }`} style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '12px'
            }}>
              © 2024 SEAUM_SIDDIQUI. BUILT WITH REACT AND SPRING_BOOT.<br/>
              ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};