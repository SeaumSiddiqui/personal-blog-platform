import React, { useEffect, useState, useRef } from 'react';
import profileImageDark from '../../assets/profile-image-dark.webp';
import profileImageLight from '../../assets/profile-image-light.webp';

interface ProfileImageProps {
  isDarkMode: boolean;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({ isDarkMode }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevTheme = useRef<boolean | null>(null);
  const initialMount = useRef(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 400);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      prevTheme.current = isDarkMode;
      return;
    }

    if (prevTheme.current !== isDarkMode) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 800);
      prevTheme.current = isDarkMode;
    }
  }, [isDarkMode]);

  return (
    <div className="mb-16 flex justify-center">
      <div
        className="relative w-80 h-72"
        style={{
          transform: isLoaded ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-10deg)',
          opacity: isLoaded ? 1 : 0,
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease-out',
        }}
      >
        <div
          className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
            isDarkMode ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            animation: isAnimating ? 'stickerApply 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
          }}
        >
          <img
            src={profileImageDark}
            alt="Profile"
            className="w-full h-full object-cover rounded-2xl shadow-2xl"
          />
        </div>
        <div
          className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
            isDarkMode ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            animation: isAnimating ? 'stickerApply 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
          }}
        >
          <img
            src={profileImageLight}
            alt="Profile"
            className="w-full h-full object-cover rounded-2xl shadow-2xl brightness-110 contrast-110"
          />
        </div>
      </div>

      <style>{`
        @keyframes stickerApply {
          0% {
            transform: scale(0.95) rotate(-3deg);
          }
          30% {
            transform: scale(1.05) rotate(2deg);
          }
          50% {
            transform: scale(0.98) rotate(-1deg);
          }
          70% {
            transform: scale(1.02) rotate(0.5deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
};
