import axios from 'axios';

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export const getWeather = async (location, startDate) => {
  try {
    const response = await axios.get(`https://api.weatherapi.com/v1/history.json`, {
      params: {
        key: WEATHER_API_KEY,
        q: location,
        dt: startDate
      }
    });

    const weatherData = response.data.forecast.forecastday.map(day => ({
      date: day.date,
      temp: day.day.avgtemp_c,
      description: day.day.condition.text,
    }));

    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return [];
  }
};



export const getMap = (location) => {
  try {
    const { latitude, longitude } = location;
    if (!latitude || !longitude) {
      throw new Error('Invalid location coordinates');
    }

    // Construct the image URL for Google Maps Static API
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=600x600&key=${GOOGLE_MAPS_API_KEY}`;
    console.log('Constructed Map URL:', mapUrl);  // Log the constructed URL
    return mapUrl;
  } catch (error) {
    console.error('Error constructing map URL:', error);
    return null;
  }
};
