import React, { useEffect, useState, useRef } from 'react';

interface HeroSectionProps {
  isDarkMode: boolean;
  scrollToSection: (sectionId: string) => void;
  openContactModal: () => void;
  onNameAnimationComplete?: () => void;
}

export const NAME_ANIMATION_DURATION = 700;
export const NAME_WORD_DELAY = 250;
export const NAME_WORDS = ['Seaum', 'Siddiqui'];
export const NAME_START_DELAY = 100;
export const NAME_COMPLETE_TIME = NAME_START_DELAY + (NAME_WORDS.length * NAME_WORD_DELAY) + NAME_ANIMATION_DURATION;

export const HeroSection: React.FC<HeroSectionProps> = ({
  isDarkMode,
  onNameAnimationComplete
}) => {
  const [nameVisible, setNameVisible] = useState<number[]>([]);
  const [roleVisible, setRoleVisible] = useState<number[]>([]);
  const [locationPhase, setLocationPhase] = useState<'hidden' | 'pop' | 'spin' | 'float'>('hidden');
  const [locationTextVisible, setLocationTextVisible] = useState(false);
  const animationTriggered = useRef(false);

  const roleWords = ['Backend', 'Engineer'];

  useEffect(() => {
    if (animationTriggered.current) return;
    animationTriggered.current = true;

    setLocationPhase('pop');
    setTimeout(() => setLocationPhase('spin'), 400);

    NAME_WORDS.forEach((_, index) => {
      setTimeout(() => {
        setNameVisible(prev => [...prev, index]);
      }, NAME_START_DELAY + index * NAME_WORD_DELAY);
    });

    const nameCompleteTime = NAME_START_DELAY + (NAME_WORDS.length * NAME_WORD_DELAY) + NAME_ANIMATION_DURATION;

    setTimeout(() => {
      setLocationPhase('float');
      setLocationTextVisible(true);
    }, nameCompleteTime);

    setTimeout(() => {
      roleWords.forEach((_, index) => {
        setTimeout(() => {
          setRoleVisible(prev => [...prev, index]);
        }, index * 150);
      });

      if (onNameAnimationComplete) {
        onNameAnimationComplete();
      }
    }, nameCompleteTime);
  }, [onNameAnimationComplete]);

  return (
    <div className="space-y-4">
      <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-heading font-bold tracking-tight leading-none transition-colors duration-300 ${
        isDarkMode ? 'text-dark-text' : 'text-light-text'
      }`}>
        {NAME_WORDS.map((word, index) => (
          <span
            key={index}
            className="inline-block overflow-hidden mr-4"
          >
            <span
              className="inline-block transition-all ease-out"
              style={{
                transform: nameVisible.includes(index) ? 'translateY(0)' : 'translateY(100%)',
                opacity: nameVisible.includes(index) ? 1 : 0,
                transitionDuration: `${NAME_ANIMATION_DURATION}ms`,
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </h1>

      <h2 className={`text-sm sm:text-base font-mono font-medium uppercase tracking-wide transition-colors duration-300 ${
        isDarkMode ? 'text-slate-400' : 'text-slate-600'
      }`}>
        {roleWords.map((word, index) => (
          <span
            key={index}
            className="inline-block overflow-hidden mr-2"
          >
            <span
              className="inline-block transition-all duration-500 ease-out"
              style={{
                transform: roleVisible.includes(index) ? 'translateY(0)' : 'translateY(100%)',
                opacity: roleVisible.includes(index) ? 1 : 0,
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </h2>

      <p className={`max-w-sm text-sm leading-relaxed ${
        isDarkMode ? 'text-slate-400' : 'text-slate-700'
      }`}>
        I build scalable backend systems and RESTful APIs
        <br />
        using <span className={isDarkMode ? 'text-slate-200 font-medium' : 'text-slate-900 font-medium'}>Java, Spring Boot</span> and <span className={isDarkMode ? 'text-slate-200 font-medium' : 'text-slate-900 font-medium'}>microservices architecture</span>.   
      </p>
      
      

      <div className={`flex items-center gap-2 text-xs font-mono ${
        isDarkMode ? 'text-slate-400' : 'text-slate-600'
      }`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 flex-shrink-0"
          style={{
            opacity: locationPhase === 'hidden' ? 0 : 1,
            animation: locationPhase === 'pop'
              ? 'locationPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
              : locationPhase === 'spin'
                ? 'locationBubbleSpin 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards'
                : locationPhase === 'float'
                  ? 'locationFloat 3s ease-in-out infinite'
                  : 'none',
          }}
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span
          style={{
            opacity: locationTextVisible ? 1 : 0,
            transform: locationTextVisible ? 'translateX(0)' : 'translateX(-10px)',
            transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
          }}
        >
          Dhaka, Bangladesh
        </span>
      </div>

      <style>{`
        @keyframes locationPop {
          0% {
            transform: translateY(20px) scale(0);
            opacity: 0;
          }
          60% {
            transform: translateY(-5px) scale(1.2);
            opacity: 1;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        @keyframes locationBubbleSpin {
          0% {
            transform: rotateY(0deg) scale(1);
          }
          25% {
            transform: rotateY(90deg) scale(0.9);
          }
          50% {
            transform: rotateY(180deg) scale(1);
          }
          75% {
            transform: rotateY(270deg) scale(0.9);
          }
          100% {
            transform: rotateY(360deg) scale(1);
          }
        }
        @keyframes locationFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
      `}</style>
    </div>
  );
};
