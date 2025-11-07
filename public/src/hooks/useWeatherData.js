import { useState, useEffect } from 'react';
// Assume functions to fetch data from different sources
import { fetchCurrentWeather } from './api/weatherApiA';
import { fetchForecast } from './api/weatherApiB';

const useWeatherData = (location) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. Fetch data concurrently
        const [current, forecast] = await Promise.all([
          fetchCurrentWeather(location),
          fetchForecast(location)
        ]);
        
        // 2. Merge and consolidate
        const mergedData = {
          // Standardize and pick necessary fields from each response
          current: current.mainInfo,
          dailyForecast: forecast.sevenDayForecast,
          lastUpdated: new Date().toISOString()
        };

        setData(mergedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [location]); // Re-run when location changes

  return { data, loading, error };
};

export default useWeatherData;