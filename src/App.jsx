import { useState, useEffect } from 'react';
import { getGridData, getForecast, getAlerts, normalizeForecast } from './services/weatherAPI';
import useGeolocation from './services/geolocation';
import WeatherPanel from "./components/WeatherPanel";
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import Statistics from './components/LocationSearch';
import AlertPopup from './components/AlertPopup';

import './App.css';

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [showAlerts, setShowAlerts] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

  // 🌎 Use geolocation hook (auto-detects user position)
  const { location, error: geoError, loading: geoLoading } = useGeolocation();

  // 🗺️ Default coordinates for New York City (fallback)
  const defaultLocation = {
    latitude: 40.7128,
    longitude: -74.0060,
  };

  useEffect(() => {
    if (!geoLoading) {
      fetchWeather();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoLoading, location]);

  useEffect(() => {
    if (weather) {
      generateAlerts(weather);
    }
  }, [weather]);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use detected location if available, else fallback to NYC
      const coords = location || defaultLocation;

      // Fetch NOAA grid data for that location
      const gridData = await getGridData(coords.latitude, coords.longitude);
      const { properties } = gridData;

      // Fetch forecast using the grid info
      const forecast = await getForecast(properties.gridId, properties.gridX, properties.gridY);
      const normalizedForecast = normalizeForecast(forecast);

      // Get weather alerts for the state (if available)
      const stateCode = properties.relativeLocation.properties.state;
      const stateAlerts = await getAlerts(stateCode);

      // Process the forecast data into the expected format
      const processedForecast = {
        city: {
          name: properties.relativeLocation.properties.city,
          state: stateCode,
        },
        list: normalizedForecast,
      };

      setWeather(processedForecast);
      
      // Store official NOAA alerts (these are already significant weather alerts)
      const officialAlerts = stateAlerts?.features || [];
      setAlerts(officialAlerts);

      setLoading(false);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Unable to load weather data. Please try again later.');
      setLoading(false);
    }
  };

  // ⚠️ Generate alerts ONLY for SEVERE weather events (like Amber Alerts)
  // Only triggers for: Snow, Blizzards, Thunderstorms, Severe Storms
  // Rain alerts are excluded - only severe conditions trigger the popup
  const generateAlerts = (data) => {
    const newAlerts = [];
    const current = data.list[0];
    const nextPeriod = data.list[1];
    const tomorrow = data.list[8];

    // Helper function to check for SEVERE weather conditions only
    const hasSevereWeather = (weatherData) => {
      if (!weatherData?.weather?.[0]) return false;
      
      const main = weatherData.weather[0].main?.toLowerCase() || '';
      const description = weatherData.weather[0].description?.toLowerCase() || '';
      const combined = `${main} ${description}`;
      
      // Only check for SEVERE weather conditions (not regular rain)
      const severeKeywords = [
        'snow', 'sleet', 'blizzard', 'winter storm',
        'thunderstorm', 'severe storm', 'lightning',
        'hail', 'freezing rain', 'ice storm',
        'tornado', 'hurricane', 'typhoon'
      ];
      
      return severeKeywords.some(keyword => combined.includes(keyword));
    };

    // Check for current SEVERE weather (Snow, Blizzards, Thunderstorms only)
    if (hasSevereWeather(current)) {
      const weatherType = current.weather[0].main?.toLowerCase() || current.weather[0].description?.toLowerCase() || '';
      let icon = '⚠️';
      let severity = 'danger';
      let title = 'Severe Weather Alert';
      
      if (weatherType.includes('snow') || weatherType.includes('blizzard') || weatherType.includes('winter storm')) {
        icon = '❄️';
        title = 'Snow/Blizzard Alert';
      } else if (weatherType.includes('thunderstorm') || weatherType.includes('severe storm') || weatherType.includes('lightning')) {
        icon = '⛈️';
        title = 'Thunderstorm Alert';
      } else if (weatherType.includes('hail') || weatherType.includes('freezing rain') || weatherType.includes('ice storm')) {
        icon = '🧊';
        title = 'Severe Weather Alert';
      }
      
      newAlerts.push({
        title: title,
        message: `${current.weather[0].description || 'Severe weather conditions'} currently affecting your area. Take immediate precautions and stay safe.`,
        timeframe: 'Current',
        severity: severity,
        icon: icon,
      });
    }

    // Check for upcoming SEVERE weather in next period
    if (nextPeriod && hasSevereWeather(nextPeriod)) {
      const weatherType = nextPeriod.weather[0].main?.toLowerCase() || nextPeriod.weather[0].description?.toLowerCase() || '';
      let icon = '⚠️';
      let severity = 'danger';
      let title = 'Severe Weather Expected';
      
      if (weatherType.includes('snow') || weatherType.includes('blizzard') || weatherType.includes('winter storm')) {
        icon = '❄️';
        title = 'Snow/Blizzard Expected';
      } else if (weatherType.includes('thunderstorm') || weatherType.includes('severe storm')) {
        icon = '⛈️';
        title = 'Thunderstorm Expected';
      } else if (weatherType.includes('hail') || weatherType.includes('freezing rain')) {
        icon = '🧊';
        title = 'Severe Weather Expected';
      }
      
      newAlerts.push({
        title: title,
        message: `${nextPeriod.weather[0].description || 'Severe weather'} expected soon. Prepare immediately and take necessary precautions.`,
        timeframe: 'Upcoming',
        severity: severity,
        icon: icon,
      });
    }

    // Check for major SEVERE weather change (severe weather starting)
    if (tomorrow && !hasSevereWeather(current) && hasSevereWeather(tomorrow)) {
      const weatherType = tomorrow.weather[0].main?.toLowerCase() || tomorrow.weather[0].description?.toLowerCase() || '';
      let icon = '⚠️';
      let severity = 'danger';
      let title = 'Severe Weather Change';
      
      if (weatherType.includes('snow') || weatherType.includes('blizzard')) {
        icon = '❄️';
        title = 'Snow/Blizzard Expected';
      } else if (weatherType.includes('thunderstorm')) {
        icon = '⛈️';
        title = 'Thunderstorm Expected';
      } else if (weatherType.includes('hail') || weatherType.includes('freezing rain')) {
        icon = '🧊';
        title = 'Severe Weather Expected';
      }
      
      newAlerts.push({
        title: title,
        message: `Severe weather change expected: ${tomorrow.weather[0].description || 'severe conditions'}. Plan ahead and prepare.`,
        timeframe: 'Tomorrow',
        severity: severity,
        icon: icon,
      });
    }

    // Only set alerts if there are SEVERE weather events
    // Combine with existing official NOAA alerts
    setAlerts(prevAlerts => {
      const existingAlerts = prevAlerts || [];
      // Only add custom alerts if they're SEVERE weather events
      const combined = [...existingAlerts, ...newAlerts];
      return combined;
    });
    
    // Automatically show popup for severe weather (no badge click needed)
    if (newAlerts.length > 0) {
      setShowAlerts(true);
    }
  };

  // Navigation handler
  const handleNavigate = (page) => {
    setCurrentPage(page);
    // For now, just update the state. You can add routing logic here later
    console.log(`Navigating to: ${page}`);
  };

  // 🌀 Handle loading and error states
  if (loading || geoLoading) {
    return (
      <div className="app loading">
        <Header 
          city="Loading..." 
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
        <div className="loading-indicator">
          {geoLoading ? 'Detecting your location...' : 'Loading weather data...'}
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="app error">
        <Header 
          city="Error" 
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
        <div className="error-message">{error || 'Unable to load weather data'}</div>
      </div>
    );
  }

  // 🌤️ Main UI
  return (
    <div className="app">
      <Header 
        city={`${weather.city.name}, ${weather.city.state}`}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Severe weather popup shows automatically - no badge needed */}

      <div className="main-content">
        <div className="left-section">
          <CurrentWeather data={weather.list[0]} />
        </div>
        <Statistics data={weather.list[0]} />
      </div>

      <WeatherPanel
      current={weather.list[0]}
      forecast={weather.list.slice(1, 7)}
      location={`${weather.city.name}, ${weather.city.state}`}
      alerts={alerts}
      />

      {/* Auto-show popup for severe weather alerts */}
      {showAlerts && alerts.length > 0 && (
        <AlertPopup alerts={alerts} onClose={() => setShowAlerts(false)} />
      )}

      {/* Show geolocation error softly */}
      {geoError && <div className="geo-warning">📍 {geoError}</div>}
    </div>
  );
}
