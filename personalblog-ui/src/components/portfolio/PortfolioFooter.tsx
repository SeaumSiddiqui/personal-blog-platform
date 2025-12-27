// import React from 'react';

// interface PortfolioFooterProps {
//   isDarkMode: boolean;
//   openContactModal: () => void;
// }

// export const PortfolioFooter: React.FC<PortfolioFooterProps> = ({ isDarkMode }) => {
//   return (
//     <footer className="mt-24">
//       <p className={`text-sm leading-relaxed transition-colors duration-300 ${
//         isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
//       }`}>
//         Designed and built by Seaum Siddiqui. Coded in{' '}
//         <a
//           href="https://code.visualstudio.com/"
//           target="_blank"
//           rel="noopener noreferrer"
//           className={`font-medium transition-colors duration-300 ${
//             isDarkMode
//               ? 'text-dark-text hover:text-primary-400'
//               : 'text-light-text hover:text-primary-600'
//           }`}
//         >
//           Visual Studio Code
//         </a>
//         . Built with{' '}
//         <a
//           href="https://react.dev/"
//           target="_blank"
//           rel="noopener noreferrer"
//           className={`font-medium transition-colors duration-300 ${
//             isDarkMode
//               ? 'text-dark-text hover:text-primary-400'
//               : 'text-light-text hover:text-primary-600'
//           }`}
//         >
//           React
//         </a>
//         {' '}and{' '}
//         <a
//           href="https://tailwindcss.com/"
//           target="_blank"
//           rel="noopener noreferrer"
//           className={`font-medium transition-colors duration-300 ${
//             isDarkMode
//               ? 'text-dark-text hover:text-primary-400'
//               : 'text-light-text hover:text-primary-600'
//           }`}
//         >
//           Tailwind CSS
//         </a>
//         .
//       </p>
//     </footer>
//   );
// };


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
