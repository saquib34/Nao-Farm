import axios from 'axios';

// API base URL - change to your server URL when deployed
const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Get all available crops
 * @returns {Promise} A promise that resolves to an array of crops
 */
export const getCrops = async () => {
  try {
    const response = await api.get('/crops');
    return response.data;
  } catch (error) {
    console.error('Error fetching crops:', error);
    return [];
  }
};

/**
 * Get a crop by ID
 * @param {string} cropId - The ID of the crop to fetch
 * @returns {Promise} A promise that resolves to a crop object or null
 */
export const getCropById = async (cropId) => {
  try {
    const response = await api.get(`/crops/${cropId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching crop by ID ${cropId}:`, error);
    return null;
  }
};

/**
 * Get a product that matches a crop
 * @param {string} cropId - The ID of the crop to match
 * @returns {Promise} A promise that resolves to a product object or null
 */
export const getMatchedProduct = async (cropId) => {
  try {
    const response = await api.get(`/products/match/${cropId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching matched product for crop ${cropId}:`, error);
    return null;
  }
};

/**
 * Get crop and matched product information in one call
 * @param {string} cropIdentifier - Either the crop ID or crop name
 * @returns {Promise} A promise that resolves to an object with crop and matched product
 */
export const getCropProductMapping = async (cropIdentifier) => {
  try {
    const response = await api.get(`/mapping`, {
      params: { query: cropIdentifier }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 404) {
        return {
          error: error.response.data.error || "Crop not found",
          crop: error.response.data.crop || null,
          matchedProduct: error.response.data.matchedProduct || null
        };
      }
    }
    
    console.error("Error fetching crop-product mapping:", error);
    return {
      error: "Failed to fetch data. Please try again later.",
      crop: null,
      matchedProduct: null
    };
  }
};