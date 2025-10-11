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
    <div
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl dark:hover:shadow-gray-900"
    >
      <div className="relative aspect-[4/3] bg-gray-200 dark:bg-gray-700">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-500 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-300 dark:bg-gray-600">
            <p className="text-gray-600 dark:text-gray-300">Failed to load image</p>
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
      <div className="p-4">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
          {photo.author}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {photo.width} x {photo.height}
        </p>
      </div>
    </div>
  );
};

export default PhotoCard;
