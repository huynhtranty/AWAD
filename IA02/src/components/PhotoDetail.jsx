import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPhotoById, getFullImageUrl } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

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
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Image Section */}
          <div className="relative bg-gray-200">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
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
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Photo #{photo.id}
              </h1>
              <p className="text-gray-500">
                A stunning photograph from Lorem Picsum collection
              </p>
            </div>

            <div className="space-y-4">
              {/* Author */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-32">
                  <p className="text-sm font-semibold text-gray-600 uppercase">
                    Author
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-lg text-gray-800 font-medium">
                    {photo.author}
                  </p>
                </div>
              </div>

              {/* Dimensions */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-32">
                  <p className="text-sm font-semibold text-gray-600 uppercase">
                    Dimensions
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-lg text-gray-800">
                    {photo.width} x {photo.height} pixels
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="flex items-start">
                <div className="flex-shrink-0 w-32">
                  <p className="text-sm font-semibold text-gray-600 uppercase">
                    Description
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-lg text-gray-800">
                    This is a high-quality photograph from the Lorem Picsum
                    collection, perfect for placeholder images and design
                    mockups. The image showcases professional photography with
                    excellent composition and lighting.
                  </p>
                </div>
              </div>

              {/* Original URL */}
              {photo.url && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-32">
                    <p className="text-sm font-semibold text-gray-600 uppercase">
                      Source
                    </p>
                  </div>
                  <div className="flex-1">
                    <a
                      href={photo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-blue-500 hover:text-blue-700 hover:underline"
                    >
                      View Original
                    </a>
                  </div>
                </div>
              )}

              {/* Download URL */}
              {photo.download_url && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-32">
                    <p className="text-sm font-semibold text-gray-600 uppercase">
                      Download
                    </p>
                  </div>
                  <div className="flex-1">
                    <a
                      href={photo.download_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-blue-500 hover:text-blue-700 hover:underline"
                    >
                      Download Full Size
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4">
              <button
                onClick={() => navigate('/photos')}
                className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Back to Gallery
              </button>
              <button
                onClick={() => window.open(photo.download_url, '_blank')}
                className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
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
