// --- CONFIGURATION ---
// NOTE: Replace these with your actual keys and endpoints
const API_CONFIG = {
  OPEN_WEATHER_KEY: 'YOUR_OPEN_WEATHER_API_KEY', 
  WEATHER_API_KEY: 'https://api.weather.gov/openapi.json',
  OPEN_WEATHER_URL: 'https://api.weather.gov/openapi.json',
  WEATHER_API_URL: 'https://api.weatherapi.com/v1/current.json',
};

/**
 * Generic function to handle the fetch request and check for errors.
 * @param {string} url - The URL to fetch.
 * @returns {Promise<object>} The parsed JSON data.
 */
async function _fetcher(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API Request Failed: ${response.statusText}`);
  }
  return response.json();
}