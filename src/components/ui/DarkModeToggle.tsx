
import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '@/hooks/useDarkMode';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="inline-flex items-center justify-center p-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300 shadow-sm hover:shadow-md"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-yellow-500 dark:text-yellow-400 transition-colors duration-300" />
      ) : (
        <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300 transition-colors duration-300" />
      )}
    </button>
  );
};

export default DarkModeToggle;
