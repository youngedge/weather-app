import './App.css'
import { useState, useEffect } from 'react';
import Search from './components/search';
import WeatherDisplay from './components/weatherDisplay';

interface WeatherData {
    location: {
        name: string;
    };
    current: {
        temp_c: number;
        condition: {
            text: string;
        };
    };
}

function App() {
  const [city, setCity] = useState<string | null>(null); // Initial city
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const BaseUrl = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=`;

  const apiKey = '30c9b59de9mshfc5f793820d04c6p14d299jsn37a2def6be16';

  const handleSearch = (newCity: string) => {
    setCity(newCity);
  };

  const fetchWeatherData = async () => {
    if (!city) return;
    setIsLoading(true);
    setError(null);

    try {
      const url = `${BaseUrl}${city}&days=3`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        // Handle non-2xx responses (e.g., API errors)
        // const errorData = await response.json();
        // setError(errorData.message || 'Error fetching weather data.');
        return; // Exit the function if there's an error
      }

      const result: WeatherData = await response.json();

      setWeatherData(result);
    } catch (error) {
      console.error(error);
      setError('Error fetching weather data.');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchWeatherData();
  }, [city]); // Refetch data when city changes

  return (
    <div className="container">
      <div className='widget'>
        <Search onSearch={handleSearch} />
        {isLoading && <p>Loading weather data...</p>}
        {error && <p>Error: {error}</p>}
        {weatherData && <WeatherDisplay weatherData={weatherData} />}
        {!weatherData && !isLoading && !error && <p>No weather data found for this city.</p>}
      </div>

    </div>
  )
}

export default App