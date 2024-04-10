import React from 'react';

interface WeatherData {
    location: {
        name: string;
        localtime: Date | string;
    };
    current: {
        temp_c: number;
        condition: {
            text: string;
        };
    };
    forecast: {
        forecastday: {
            date: Date;
            day: {
                avgtemp_c: number;
            };
            condition: {
                text: string;
            };
        };
    };
}

function formatDate(localtime: Date) {
    const day = localtime.getDate();
    const month = localtime.getMonth() + 1; // Months are zero-indexed, so we add 1
    const year = localtime.getFullYear();

    return `${day}.${month}.${year}`;
}

function greetByTime(localtime: Date) {
    try {
        if (!localtime || !(localtime instanceof Date)) {
            throw new Error("Invalid localtime");
        }

        const currentHour = localtime.getHours();
        let greeting: string;

        if (currentHour >= 0 && currentHour < 12) {
            greeting = "Good Morning";
        } else if (currentHour >= 12 && currentHour < 17) {
            greeting = "Good Afternoon";
        } else {
            greeting = "Good Evening";
        }

        return greeting;
    } catch (error) {
        console.error("Error getting local time:", error);
        return "";
    }
}

const WeatherDisplay: React.FC<{ weatherData: WeatherData | null }> = ({
    weatherData,
}) => {
    if (!weatherData || !weatherData.location || !weatherData.location.localtime) {
        return <div>Error: Weather data is missing or invalid.</div>;
    }

    let localtime: Date;
    if (typeof weatherData.location.localtime === "string") {
        localtime = new Date(weatherData.location.localtime);
        console.log("Parsed localtime:", localtime); // Debugging
    } else {
        localtime = weatherData.location.localtime;
    }

    const city = weatherData.location.name;
    const temperature = weatherData.current.temp_c;
    const weatherDescription = weatherData.current.condition.text;

    const currentGreeting = greetByTime(localtime);
    const formattedDate = formatDate(localtime);

    // Format the time to display in AM/PM format with uppercase letters
    const formattedTime = localtime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
                            .replace(/(am|pm)/i, function(match) { return match.toUpperCase(); });

    return (
        <div className='data1'>
            <span className='date'>{formattedDate}</span>
            <span className='time'>{formattedTime}</span> {/* Display the formatted time */}
            <span className='city'><h2>{city}</h2></span>
            <span className='temp'><p>{temperature}°</p></span>
            <span className='weather-description'>{weatherDescription}</span> {/* Display the weather description */}
            <div className='data2'>
                <span className='greeting'>{currentGreeting}</span>
                <span className='temp2'><p>{temperature}°</p></span>
                <span className='weather-description2'>{weatherDescription}</span>
                <span className='hourly-forecast'><p>Hourly Forecast</p></span>
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
