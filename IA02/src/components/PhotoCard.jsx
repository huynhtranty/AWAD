import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getThumbnailUrl } from '../services/api';

/**
 * PhotoCard component - Displays a single photo card with thumbnail and author
 * @param {Object} props - Component props
 * @param {Object} props.photo - Photo data object
 */
const PhotoCard = ({ photo }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    navigate(`/photos/${photo.id}`);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <article
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 overflow-hidden cursor-pointer
                 transform transition-all duration-300
                 hover:scale-105 hover:shadow-xl dark:hover:shadow-gray-900
                 active:scale-95 active:shadow-lg
                 focus-within:ring-2 focus-within:ring-blue-500 dark:focus-within:ring-blue-400
                 touch-manipulation"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`View details for photo by ${photo.author}`}
    >
      {/* Image Container - Responsive aspect ratio */}
      <div className="relative aspect-[4/3] sm:aspect-[3/2] md:aspect-[4/3] bg-gray-200 dark:bg-gray-700">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 sm:w-8 sm:h-8 border-3 sm:border-4 border-blue-500 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-300 dark:bg-gray-600">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 px-2 text-center">Failed to load image</p>
          </div>
        ) : (
          <img
            src={getThumbnailUrl(photo.id)}
            alt={`Photo by ${photo.author}`}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        )}
      </div>

      {/* Info Section - Responsive padding and text */}
      <div className="p-3 sm:p-4">
        <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 truncate mb-1">
          {photo.author}
        </p>
        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
          {photo.width} × {photo.height}
        </p>
      </div>
    </article>
  );
};

export default PhotoCard;
