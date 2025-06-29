import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { ThemeToggle } from '../components/ThemeToggle';
import { SocialLinks } from '../components/SocialLinks';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { PortfolioNavigation } from '../components/portfolio/PortfolioNavigation';
import { HeroSection } from '../components/portfolio/HeroSection';
import { SkillsSection } from '../components/portfolio/SkillsSection';
import { ProjectsSection } from '../components/portfolio/ProjectsSection';
import { ExperienceSection } from '../components/portfolio/ExperienceSection';
import { EducationSection } from '../components/portfolio/EducationSection';
import { ContactModal } from '../components/portfolio/ContactModal';
import { PortfolioFooter } from '../components/portfolio/PortfolioFooter';
import { ScrollControls } from '../components/portfolio/ScrollControls';

export const Portfolio: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { loading: authLoading } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [imageTransition, setImageTransition] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Handle scroll events
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
      
      // Update active section based on scroll position (excluding contact since it's now a modal)
      const sections = ['hero', 'about', 'skills', 'projects', 'experience'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle image transition when theme changes
  useEffect(() => {
    setImageTransition(true);
    const timer = setTimeout(() => {
      setImageTransition(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [isDarkMode]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  if (authLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-black via-gray-900 to-gray-800' 
          : 'bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300'
      }`}>
        <LoadingSpinner isDarkMode={isDarkMode} />
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
      {/* Navigation */}
      <PortfolioNavigation 
        isDarkMode={isDarkMode}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        openContactModal={openContactModal}
      />

      {/* Fixed Social Links and Theme Toggle */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center space-y-6">
        <SocialLinks layout="vertical" size="medium" />
        <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
      </div>

      {/* Hero Section with Integrated Stats */}
      <HeroSection 
        isDarkMode={isDarkMode}
        isVisible={isVisible}
        imageTransition={imageTransition}
        scrollToSection={scrollToSection}
        openContactModal={openContactModal}
      />

      {/* Skills Section */}
      <SkillsSection isDarkMode={isDarkMode} />

      {/* Experience Section */}
      {/* <ExperienceSection isDarkMode={isDarkMode} /> */}

      {/* Projects Section */}
      <ProjectsSection isDarkMode={isDarkMode} />

      {/* Education Section */}
      <EducationSection isDarkMode={isDarkMode} />

      {/* Footer */}
      <PortfolioFooter 
        isDarkMode={isDarkMode}
        scrollToSection={scrollToSection}
        openContactModal={openContactModal}
      />

      {/* Scroll Controls */}
      <ScrollControls 
        isDarkMode={isDarkMode}
        showScrollTop={showScrollTop}
        scrollToTop={scrollToTop}
      />

      {/* Contact Modal */}
      <ContactModal 
        isDarkMode={isDarkMode}
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
      />
    </div>
  );
};