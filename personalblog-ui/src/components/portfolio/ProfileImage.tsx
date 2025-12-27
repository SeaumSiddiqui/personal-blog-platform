import React from 'react';
import profileImageDark from '../../assets/profile-image-dark.png';

interface ProfileImageProps {
  isDarkMode: boolean;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({ isDarkMode }) => {
  return (
    <div className="mb-16 flex justify-center">
      <div className="relative w-80 h-72">
        <div className={`absolute inset-0 rounded-2xl transition-opacity duration-700 ${
          isDarkMode ? 'opacity-100' : 'opacity-0'
        }`}>
          <img
            src={profileImageDark}
            alt="Profile"
            className="w-full h-full object-cover rounded-2xl shadow-2xl"
          />
        </div>
        <div className={`absolute inset-0 rounded-2xl transition-opacity duration-700 ${
          isDarkMode ? 'opacity-0' : 'opacity-100'
        }`}>
          <img
            src={profileImageDark}
            alt="Profile"
            className="w-full h-full object-cover rounded-2xl shadow-2xl brightness-110 contrast-110"
          />
        </div>
      </div>
    </div>
  );
};
