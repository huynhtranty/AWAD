import { useEffect } from 'react';
import PhotoCard from './PhotoCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import usePhotoData from '../hooks/usePhotoData';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

/**
 * PhotoList component - Displays a grid of photos with infinite scroll
 */
const PhotoList = () => {
  const { photos, isLoading, hasMore, error, loadMorePhotos } = usePhotoData();
  const lastPhotoRef = useInfiniteScroll(loadMorePhotos, isLoading, hasMore);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  if (error && photos.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      {/* Header Section - Responsive Typography */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
          Photo Gallery
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
          Browse beautiful photos from Lorem Picsum
        </p>
        <div className="mt-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {photos.length > 0 && (
            <span>{photos.length} photos loaded</span>
          )}
        </div>
      </div>

      {photos.length === 0 && isLoading ? (
        <LoadingSpinner message="Loading photos..." />
      ) : (
        <>
          {/* Responsive Grid: 1 col mobile, 2 cols tablet, 3 cols desktop, 4 cols large */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {photos.map((photo, index) => {
              // Attach ref to the last photo for infinite scroll
              if (photos.length === index + 1) {
                return (
                  <div key={photo.id} ref={lastPhotoRef}>
                    <PhotoCard photo={photo} />
                  </div>
                );
              }
              return <PhotoCard key={photo.id} photo={photo} />;
            })}
          </div>

          {isLoading && (
            <div className="mt-6 sm:mt-8">
              <LoadingSpinner message="Loading more photos..." />
            </div>
          )}

          {!hasMore && photos.length > 0 && (
            <div className="text-center py-6 sm:py-8">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
                No more photos to load
              </p>
            </div>
          )}

          {error && photos.length > 0 && (
            <div className="mt-6 sm:mt-8">
              <ErrorMessage message={error} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PhotoList;
