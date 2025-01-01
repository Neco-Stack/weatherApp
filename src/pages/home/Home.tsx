import React, { useEffect, useState } from 'react';
import { fetchWeatherByCity, fetchWeatherForecast } from '../../services/weatherApi';
import { WeatherResponse, Forecast } from '../../interfaces/WeatherInterfaces';
import WeatherCard from '../../components/weatherCard/WeatherCard';
import "./Home.css"

const Home: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
    const [hourlyForecast, setHourlyForecast] = useState<Forecast[] | null>(null);

    useEffect(() => {
        const fetchDefaultWeather = async () => {
            const city = 'Obertauern';
            const currentData = await fetchWeatherByCity(city);
            const forecastData = await fetchWeatherForecast(city);

            if (currentData) {
                setWeatherData(currentData);
            }
            if (forecastData) {
                setHourlyForecast(forecastData.list.slice(0, 4)); 
            }
        };
        
        fetchDefaultWeather();
    }, []);

    const handleSearch = async (city: string): Promise<WeatherResponse | null> => {
        const currentData = await fetchWeatherByCity(city);
        const forecastData = await fetchWeatherForecast(city);
        if (currentData) {
            setWeatherData(currentData);
        }
        if (forecastData) {
            setHourlyForecast(forecastData.list.slice(0, 4)); 
        }
        return currentData;
    };

    return (
       <div>
            <h1>Wetter</h1>
            <WeatherCard 
                onSearch={handleSearch} 
                weatherData={weatherData} 
                hourlyForecast={hourlyForecast}
            />
        </div>
    );
};

export default Home;

