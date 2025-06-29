import React from 'react';

interface PortfolioNavigationProps {
  isDarkMode: boolean;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  openContactModal: () => void;
}

export const PortfolioNavigation: React.FC<PortfolioNavigationProps> = ({
  isDarkMode,
  activeSection,
  scrollToSection,
  openContactModal
}) => {
  const handleNavClick = (item: string) => {
    if (item.toLowerCase() === 'contact') {
      openContactModal();
    } else if (item.toLowerCase() === 'about') {
      // About content is in the hero section
      scrollToSection('hero');
    } else {
      scrollToSection(item.toLowerCase());
    }
  };

  return (
    <nav className={`top-0 left-0 right-0 z-50 backdrop-blur-xl transition-all duration-300 ${
      isDarkMode 
        ? 'bg-black/90 border-gray-700' 
        : 'bg-gray-100/90 border-gray-400'
    }`} style={{
      borderStyle: 'solid',
      borderImage: 'linear-gradient(90deg, #c5bbb8 0%, #999 50%, #c5bbb8 100%) 1'
    }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className={`text-xl font-bold transition-colors duration-300 ${
              isDarkMode 
                ? 'text-white' 
                : 'text-gray-900'
            }`} style={{
              textShadow: isDarkMode ? '2px 2px 0px #666' : '2px 2px 0px #c5bbb8',
              fontFamily: '"Courier New", monospace'
            }}>
              SEAUM_SIDDIQUI
            </h1>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {/* Replace when you have experience section */}
            {/* {['About', 'Skills', 'Experience','Projects', 'Education', 'Contact'].map((item) => ( */}
            {['About', 'Skills', 'Projects', 'Education', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`text-sm font-bold transition-all duration-200 px-3 py-1 border-2 ${
                  (activeSection === item.toLowerCase() && item.toLowerCase() !== 'contact') ||
                  (item.toLowerCase() === 'about' && activeSection === 'hero')
                    ? isDarkMode 
                      ? 'text-black bg-[#c5bbb8] border-[#c5bbb8]' 
                      : 'text-white bg-gray-700 border-gray-700'
                    : isDarkMode 
                    ? 'text-[#c5bbb8] border-[#c5bbb8] hover:bg-[#c5bbb8] hover:text-black' 
                    : 'text-gray-700 border-gray-700 hover:bg-gray-700 hover:text-white'
                }`} style={{
                  fontFamily: '"Courier New", monospace',
                  textTransform: 'uppercase'
                }}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};