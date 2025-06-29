import React from 'react';
import { X, Mail, Phone, Zap, Github, Linkedin, Twitter } from 'lucide-react';

interface ContactModalProps {
  isDarkMode: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isDarkMode, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal - Much smaller and compact */}
      <div className={`relative w-full max-w-md rounded-xl shadow-2xl border-4 ${
        isDarkMode
          ? 'bg-gradient-to-br from-black via-gray-900 to-gray-800 border-[#c5bbb8]'
          : 'bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 border-gray-700'
      }`} style={{
        clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
        fontFamily: '"Courier New", monospace'
      }}>
        {/* Header - Compact */}
        <div className={`flex items-center justify-between p-4 border-b-2 ${
          isDarkMode ? 'border-[#c5bbb8]' : 'border-gray-700'
        }`}>
          <h2 className={`text-xl font-bold transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`} style={{
            fontFamily: '"Courier New", monospace',
            textShadow: isDarkMode ? '2px 2px 0px #666' : '2px 2px 0px #c5bbb8',
            // textTransform: 'uppercase'
          }}>
            {'>'} CONTACT
          </h2>
          
          <button
            onClick={onClose}
            className={`p-1.5 border-2 transition-all duration-200 hover:scale-110 ${
              isDarkMode
                ? 'border-[#c5bbb8] text-[#c5bbb8] hover:bg-[#c5bbb8] hover:text-black'
                : 'border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white'
            }`} style={{
              clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))'
            }}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content - Much more compact */}
        <div className="p-5">
          {/* Welcome Message - Smaller */}
          <div className={`text-center p-3 border-2 mb-4 ${
            isDarkMode 
              ? 'border-[#c5bbb8] bg-black/50' 
              : 'border-gray-700 bg-white/50'
          }`} style={{
            clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
          }}>
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Zap className={`w-4 h-4 ${
                isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
              }`} />
              <h3 className={`text-sm font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`} style={{
                fontFamily: '"Courier New", monospace',
                // textTransform: 'uppercase'
              }}>
                LET'S_CONNECT
              </h3>
            </div>
            <p className={`text-xs transition-colors duration-300 ${
              isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
            }`} style={{
              fontFamily: '"Courier New", monospace'
            }}>
              READY TO BRING YOUR IDEAS TO LIFE?
            </p>
          </div>

          {/* Contact Methods - Compact grid */}
          <div className="grid grid-cols-1 gap-3 mb-4">
            {[
              { 
                icon: Mail, 
                title: 'EMAIL', 
                value: 'seaumsiddiqui@outlook.com', 
                href: 'mailto:seaumsiddiqui@outlook.com',
                description: 'Best for project inquiries'
              },
              { 
                icon: Phone, 
                title: 'PHONE', 
                value: '+880 170 602 0534', 
                href: '+880 170 602 0534',
                description: 'Quick discussions & calls'
              }
            ].map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                className={`group p-3 border-2 transition-all duration-300 hover:scale-[1.02] ${
                  isDarkMode
                    ? 'bg-black/50 border-[#c5bbb8] hover:bg-black/70'
                    : 'bg-white/80 border-gray-700 hover:bg-white/90 shadow-lg'
                }`} style={{
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                }}>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 border-2 ${
                    isDarkMode
                      ? 'bg-[#c5bbb8] border-[#c5bbb8] group-hover:bg-black group-hover:border-[#c5bbb8]'
                      : 'bg-gray-700 border-gray-700 group-hover:bg-white group-hover:border-gray-700'
                  }`} style={{
                    clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'
                  }}>
                    <contact.icon className={`w-4 h-4 transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-black group-hover:text-[#c5bbb8]' 
                        : 'text-white group-hover:text-gray-700'
                    }`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-bold transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`} style={{
                      fontFamily: '"Courier New", monospace',
                      // textTransform: 'uppercase'
                    }}>
                      {contact.title}
                    </h4>
                    
                    <p className={`text-xs font-bold transition-colors duration-300 ${
                      isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-600'
                    }`} style={{
                      fontFamily: '"Courier New", monospace'
                    }}>
                      {contact.value}
                    </p>
                    
                    <p className={`text-xs transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} style={{
                      fontFamily: '"Courier New", monospace'
                    }}>
                      {contact.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Response Time Info - Compact */}
          <div className={`p-3 border-2 mb-4 ${
            isDarkMode
              ? 'bg-gradient-to-br from-[#c5bbb8]/20 to-gray-900/50 border-[#c5bbb8]'
              : 'bg-gradient-to-br from-gray-200 to-gray-300 border-gray-700 shadow-lg'
          }`} style={{
            clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
          }}>
            <div className="text-center">
              <h4 className={`text-sm font-bold mb-1 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`} style={{
                fontFamily: '"Courier New", monospace',
                // textTransform: 'uppercase'
              }}>
                QUICK_RESPONSE_GUARANTEED
              </h4>
              <p className={`text-xs transition-colors duration-300 ${
                isDarkMode ? 'text-[#c5bbb8]' : 'text-gray-700'
              }`} style={{
                fontFamily: '"Courier New", monospace'
              }}>
                I TYPICALLY RESPOND WITHIN 24 HOURS
              </p>
            </div>
          </div>

          {/* Social Icons - Compact horizontal layout */}
          <div className="text-center">
            <h4 className={`text-sm font-bold mb-3 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`} style={{
              fontFamily: '"Courier New", monospace',
              // textTransform: 'uppercase'
            }}>
              CONNECT_ON_SOCIAL:
            </h4>
            
            <div className="flex justify-center space-x-3">
              {[
                { icon: Github, href: 'https://github.com/SeaumSiddiqui', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/seaum-siddiqui', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:seaumsiddiqui@outlook.com', label: 'Email' },
                { icon: Twitter, href: 'https://x.com/SeaumSiddiqui', label: 'Twitter' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  className={`p-2 border-2 transition-all duration-200 hover:scale-110 ${
                    isDarkMode
                      ? 'text-[#c5bbb8] border-[#c5bbb8] hover:bg-[#c5bbb8] hover:text-black'
                      : 'text-gray-700 border-gray-700 hover:bg-gray-700 hover:text-white'
                  }`} style={{
                    clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'
                  }}>
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};