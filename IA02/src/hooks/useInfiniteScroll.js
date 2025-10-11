import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for infinite scroll functionality
 * @param {Function} callback - Function to call when reaching the bottom
 * @param {boolean} isLoading - Whether data is currently being loaded
 * @param {boolean} hasMore - Whether there is more data to load
 * @returns {Object} Ref object to attach to the sentinel element
 */
const useInfiniteScroll = (callback, isLoading, hasMore) => {
  const observer = useRef();
  const sentinelRef = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          callback();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, callback]
  );

  return lastElementRef;
};

export default useInfiniteScroll;
