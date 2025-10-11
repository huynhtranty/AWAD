import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchPhotoById, getFullImageUrl } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

/**
 * DetailRow component - Reusable component for displaying photo information
 */
const DetailRow = ({ label, children }) => (
  <div className="flex items-start py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
    <div className="flex-shrink-0 w-32 pt-1">
      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
        {label}
      </p>
    </div>
    <div className="flex-1 pl-4">
      {children}
    </div>
  </div>
);

DetailRow.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

/**
 * PhotoDetail component - Displays detailed view of a single photo
 */
const PhotoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const loadPhoto = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchPhotoById(id);
        setPhoto(data);
      } catch (err) {
        setError(err.message || 'Failed to load photo details');
      } finally {
        setIsLoading(false);
      }
    };

    loadPhoto();
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner message="Loading photo details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message={error} />
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/photos')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Gallery
          </button>
        </div>
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message="Photo not found" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl dark:shadow-gray-900/50 overflow-hidden">
          {/* Image Section */}
          <div className="relative bg-gray-200 dark:bg-gray-700 min-h-[400px]">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-blue-500 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={getFullImageUrl(photo.id)}
              alt={`Photo by ${photo.author}`}
              className={`w-full h-auto transition-opacity duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          {/* Details Section */}
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Photo #{photo.id}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                A stunning photograph from Lorem Picsum collection
              </p>
            </div>

            {/* Photo Information */}
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Photo Information
              </h2>
              <div className="space-y-1">
                {/* Author */}
                <DetailRow label="Author">
                  <p className="text-lg text-gray-800 dark:text-gray-200 font-medium">
                    {photo.author || 'Unknown'}
                  </p>
                </DetailRow>

                {/* Dimensions */}
                <DetailRow label="Dimensions">
                  <p className="text-lg text-gray-800 dark:text-gray-200">
                    {photo.width} × {photo.height} pixels
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Aspect Ratio: {(photo.width / photo.height).toFixed(2)}:1
                  </p>
                </DetailRow>

                {/* Description */}
                <DetailRow label="Description">
                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    This is a high-quality photograph from the Lorem Picsum
                    collection, perfect for placeholder images and design
                    mockups. The image showcases professional photography with
                    excellent composition and lighting.
                  </p>
                </DetailRow>

                {/* Source URL */}
                {photo.url && (
                  <DetailRow label="Source">
                    <a
                      href={photo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-base text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline font-medium"
                    >
                      View Original Source
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </DetailRow>
                )}

                {/* Download URL */}
                {photo.download_url && (
                  <DetailRow label="Download">
                    <a
                      href={photo.download_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-base text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline font-medium"
                    >
                      Download Full Size Image
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </a>
                  </DetailRow>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/photos')}
                className="flex-1 px-6 py-3 bg-gray-600 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-medium shadow-sm"
              >
                Back to Gallery
              </button>
              <button
                onClick={() => window.open(photo.download_url, '_blank')}
                className="flex-1 px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium shadow-sm"
              >
                Download Photo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetail;
