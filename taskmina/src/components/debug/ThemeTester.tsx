import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ThemeTester: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50">
      <h3 className="font-bold mb-2">Theme Debugger</h3>
      <p>Current theme: <strong>{theme}</strong></p>
      <p>Dark class on HTML: <strong>{document.documentElement.classList.contains('dark') ? 'Yes' : 'No'}</strong></p>
      <div className="flex flex-col gap-2 mt-4">
        <div className="h-8 bg-header-light"></div>
        <div className="h-8" style={{ backgroundColor: 'rgb(0, 128, 128)' }}></div>
        <button 
          onClick={toggleTheme}
          className="px-3 py-1 bg-teal text-white rounded-md mt-2"
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default ThemeTester;
