import React, { useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  useEffect(() => {
    console.log('Current theme:', theme);
    // Log the HTML class to check if dark class is present
    console.log('HTML dark class:', document.documentElement.classList.contains('dark'));
  }, [theme]);

  return (
    <button
      onClick={() => {
        console.log('Theme toggle button clicked'); // Debug: Check if button is clicked
        toggleTheme();
      }}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
    >
      {theme === 'dark' ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </button>
  );
};

export default ThemeToggle;