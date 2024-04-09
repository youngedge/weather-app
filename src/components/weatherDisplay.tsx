import React from 'react';

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

const WeatherDisplay: React.FC<{ weatherData: WeatherData }> = ({ weatherData }) => {
    if (!weatherData) return null;

    const city = weatherData.location.name;
    const temperature = weatherData.current.temp_c;
    const weatherDescription = weatherData.current.condition.text;

    return (
        <div className='data'>
            <h2>Weather in {city}</h2>
            <p>Temperature: {temperature}°C</p>
            <p>Conditions: {weatherDescription}</p>
        </div>
    );
};

export default WeatherDisplay;