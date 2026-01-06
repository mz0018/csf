import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const BtnChangeTheme = () => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      <Sun
        className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ease-in-out ${
          theme === 'light' ? 'text-yellow-500' : 'text-gray-400'
        }`}
      />

      <button
        onClick={toggleTheme}
        className={`relative w-10 h-6 sm:w-12 sm:h-5 rounded-full transition-colors duration-300 ease-in-out focus:outline-none
          ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-700'}
        `}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 sm:w-6 sm:h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out
            ${theme === 'dark' ? 'translate-x-4 sm:translate-x-6 bg-yellow-400' : 'bg-white'}
          `}
        />
      </button>

      <Moon
        className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ease-in-out ${
          theme === 'dark' ? 'text-yellow-400' : 'text-gray-400'
        }`}
      />
    </div>
  );
};

export default BtnChangeTheme;
