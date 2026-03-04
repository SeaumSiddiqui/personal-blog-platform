
import React from 'react';

interface PortfolioFooterProps {
  isDarkMode: boolean;
  openContactModal: () => void;
}

export const PortfolioFooter: React.FC<PortfolioFooterProps> = ({ isDarkMode }) => {
  return (
    <footer className="mt-24">
      <p
        className={`text-sm text-right transition-colors duration-300 ${
          isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
        }`}
      >
        © 2025{' '}
        <span
          className={`font-semibold transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}
        >
          Seaum Siddiqui
        </span>{' '}
        All Rights Reserved
      </p>
    </footer>
  );
};