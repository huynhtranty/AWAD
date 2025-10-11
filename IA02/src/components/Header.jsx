import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Header component - Navigation header for the app
 */
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/photos';

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1
            onClick={() => navigate('/photos')}
            className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
          >
            Photo Gallery
          </h1>
          {!isHome && (
            <button
              onClick={() => navigate('/photos')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
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
    </header>
  );
};

export default Header;
