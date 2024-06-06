import React, { useState, useEffect } from 'react';
import { getWeather } from '../services/api';

const Weather = ({ location, startDate }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      console.log('Fetching weather for location:', location, 'on date:', startDate);
      const data = await getWeather(location, startDate);
      console.log('Fetched weather data:', data);
      setWeather(data);
    };

    fetchWeather();
  }, [location, startDate]);

  if (!weather) return <div>Loading weather...</div>;

  return (
    <div>
      <h2>Weather in {location} on {startDate}</h2>
      {weather.map((day, index) => (
        <div key={index}>
          <p>Date: {day.date}</p>
          <p>Temperature: {day.temp}°C</p>
          <p>Conditions: {day.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Weather;
