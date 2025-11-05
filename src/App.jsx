import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import WeeklyForecast from './components/WeeklyForecast';
import Statistics from './components/Statistics';
import InfoCards from './components/InfoCards';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = 'YOUR_API_KEY'; // Get from openweathermap.org
  const city = 'New York';

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${API_KEY}`
      );
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!weather) return <div className="error">Unable to load weather data</div>;

  return (
    <div className="app">
      <Header city={weather.city.name} />
      <div className="main-content">
        <div className="left-section">
          <CurrentWeather data={weather.list[0]} />
          <WeeklyForecast forecast={weather.list} />
        </div>
        <Statistics data={weather.list[0]} />
      </div>
      <InfoCards data={weather.list[0]} city={weather.city} />
    </div>
  );
}

export default App;