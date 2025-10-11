import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

/**
 * Header component - Navigation header for the app
 */
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const isHome = location.pathname === '/' || location.pathname === '/photos';

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1
            onClick={() => navigate('/photos')}
            className="text-2xl font-bold text-gray-800 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            22120418 - Photo Gallery
          </h1>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                // Sun icon for light mode
                <svg
                  className="w-5 h-5 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                // Moon icon for dark mode
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {!isHome && (
              <button
                onClick={() => navigate('/photos')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Gallery
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
