import { useState, useEffect, useCallback } from 'react';
import { fetchPhotos } from '../services/api';

/**
 * Custom hook for fetching and managing photo data
 * @returns {Object} Photo data and loading states
 */
const usePhotoData = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const loadPhotos = useCallback(async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      setError(null);
      const newPhotos = await fetchPhotos(page, 30);

      if (newPhotos.length === 0) {
        setHasMore(false);
      } else {
        setPhotos((prevPhotos) => {
          // Remove duplicates based on photo ID
          const photoIds = new Set(prevPhotos.map((p) => p.id));
          const uniqueNewPhotos = newPhotos.filter((p) => !photoIds.has(p.id));
          return [...prevPhotos, ...uniqueNewPhotos];
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to load photos');
      console.error('Error loading photos:', err);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading]);

  const loadMorePhotos = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading, hasMore]);

  useEffect(() => {
    loadPhotos();
  }, [page]);

  return {
    photos,
    isLoading,
    hasMore,
    error,
    loadMorePhotos,
  };
};

export default usePhotoData;
