import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface DarkModeToggleProps {
  className?: string;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ className = '' }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`
        relative inline-flex items-center justify-center w-12 h-6 rounded-full 
        transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-blue-500 dark:focus:ring-offset-gray-800
        ${isDarkMode 
          ? 'bg-blue-600 hover:bg-blue-700' 
          : 'bg-gray-300 hover:bg-gray-400'
        }
        ${className}
      `}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <span
        className={`
          absolute left-1 inline-block w-4 h-4 rounded-full bg-white shadow-lg 
          transform transition-transform duration-300 ease-in-out
          ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}
        `}
      />
      <span className="sr-only">
        {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
      
      {/* Icons */}
      <Sun 
        size={12} 
        className={`
          absolute left-1.5 text-yellow-500 transition-opacity duration-300
          ${isDarkMode ? 'opacity-0' : 'opacity-100'}
        `}
      />
      <Moon 
        size={12} 
        className={`
          absolute right-1.5 text-blue-200 transition-opacity duration-300
          ${isDarkMode ? 'opacity-100' : 'opacity-0'}
        `}
      />
    </button>
  );
};

export default DarkModeToggle;