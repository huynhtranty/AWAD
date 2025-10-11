const BASE_URL = 'https://picsum.photos';
const API_URL = 'https://picsum.photos/v2/list';

/**
 * Fetch a list of photos from Lorem Picsum API
 * @param {number} page - Page number for pagination
 * @param {number} limit - Number of photos per page
 * @returns {Promise<Array>} Array of photo objects
 */
export const fetchPhotos = async (page = 1, limit = 30) => {
  try {
    const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

/**
 * Fetch a single photo by ID
 * @param {string} id - Photo ID
 * @returns {Promise<Object>} Photo object
 */
export const fetchPhotoById = async (id) => {
  try {
    const response = await fetch(`https://picsum.photos/id/${id}/info`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching photo:', error);
    throw error;
  }
};

/**
 * Get image URL for a specific photo
 * @param {string} id - Photo ID
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {string} Image URL
 */
export const getImageUrl = (id, width = 400, height = 300) => {
  return `${BASE_URL}/id/${id}/${width}/${height}`;
};

/**
 * Get thumbnail URL for a photo
 * @param {string} id - Photo ID
 * @returns {string} Thumbnail URL
 */
export const getThumbnailUrl = (id) => {
  return getImageUrl(id, 400, 300);
};

/**
 * Get full-size image URL for a photo
 * @param {string} id - Photo ID
 * @returns {string} Full-size image URL
 */
export const getFullImageUrl = (id) => {
  return getImageUrl(id, 1200, 800);
};
