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
        <div className='data1'>
            <span className='city'><h2>{city}</h2></span>
            <span className='temp'><p>{temperature}°</p></span>
            <span className='weather-description'><p>{weatherDescription}</p></span>
            
            <div className='data2'>
            <span className='temp2'><p>{temperature}°</p></span>
            <span className='weather-description2'><p>{weatherDescription}</p></span>
            <span className='hourly-forecast'><p>Hourly  Forcast</p></span>
            <div className='hourly-pill'>
            <div className='pill-1'></div>
            <div className='pill-2'></div>
            <div className='pill-3'></div>
            <div className='pill-4'></div>
            <div className='pill-5'></div>
            <div className='pill-6'></div>
            </div>
            </div>
        </div>
    );
};

export default WeatherDisplay;