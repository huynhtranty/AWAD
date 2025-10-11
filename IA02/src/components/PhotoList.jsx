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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Photo Gallery
        </h2>
        <p className="text-gray-600">
          Browse beautiful photos from Lorem Picsum
        </p>
      </div>

      {photos.length === 0 && isLoading ? (
        <LoadingSpinner message="Loading photos..." />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
            <div className="mt-8">
              <LoadingSpinner message="Loading more photos..." />
            </div>
          )}

          {!hasMore && photos.length > 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600 font-medium">
                No more photos to load
              </p>
            </div>
          )}

          {error && photos.length > 0 && (
            <div className="mt-8">
              <ErrorMessage message={error} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PhotoList;
