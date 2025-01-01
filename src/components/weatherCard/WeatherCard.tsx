import React, { useState } from 'react';
import './WeatherCard.css'; 
import { WeatherResponse, Forecast } from '../../interfaces/WeatherInterfaces';
import searchIcon from '../../assets/img/searchIcon.png';
import thunderstormIcon from '../../assets/svg/wi-day-thunderstorm.svg';
import drizzleIcon from "../../assets/svg/wi-day-hail.svg";
import rainIcon from '../../assets/svg/wi-day-rain.svg';
import snowIcon from '../../assets/svg/wi-day-snow.svg';
import sunny from "../../assets/svg/wi-day-sunny.svg";
import dayCloudy from '../../assets/svg/wi-day-cloudy.svg';
import windspeed from '../../assets/svg/windspeed.svg';
import rain from '../../assets/svg/wi-rain.svg';
import { MdLocationOn } from 'react-icons/md';
import ShortTermForecast from '../hourlyForecast/ShortTermForecast';

interface WeatherCardProps {
    onSearch: (city: string) => Promise<WeatherResponse | null>; 
    weatherData: WeatherResponse | null;
    hourlyForecast: Forecast[] | null;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ onSearch, weatherData, hourlyForecast }) => {
    const [city, setCity] = useState('');

    const handleSearch = async () => {
        if (city) {
            await onSearch(city); 
            setCity(''); 
        }
    };

    const getWeatherIcon = (code: number): string => {
        switch (true) {
            case (code >= 200 && code <= 232):
                return thunderstormIcon;
            case (code >= 300 && code <= 321):
                return drizzleIcon;
            case (code >= 500 && code <= 531):
                return rainIcon;
            case (code >= 600 && code <= 622):
                return snowIcon;
            case (code >= 701 && code <= 781):
                return dayCloudy; 
            case (code === 800):
                return sunny;
            case (code === 801 || code === 802 || code === 803 || code === 804):
                return dayCloudy; 
            default:
                return ''; 
        }
    };

    return (
        <div className='weather'>
            <div className='search-bar'>
                <input 
                    type="text" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    placeholder="Search"
                />
                <img 
                    src={searchIcon} 
                    alt="Search" 
                    className='search-icon'
                    onClick={handleSearch}
                />
            </div>
            {weatherData && (
                <div className="weather-card">
                    <div className="weather-header">
                        <img className='weather-icon' src={getWeatherIcon(weatherData.weather[0]?.id)} alt="Wetter Icon" />
                        <p className='temperature'>{weatherData.main.temp.toFixed()} °C</p>
                    </div>
                    <p className='temperature-description'>{weatherData.weather[0]?.description}</p> 

                    {/* Standort mit SVG-Icon */}
                    <h2 className='location'>
                        <MdLocationOn />
                        <span>{weatherData.name}</span>
                    </h2>

                    <div className='weather-info'>
                        <div className='humidity-group'>
                            <img src={rain} alt="Humidity" />
                            <span>{weatherData.main.humidity}%</span>
                        </div>
                        <div className='wind-group'>
                            <img src={windspeed} alt="Wind Speed" />
                            <span>{(weatherData.wind.speed * 3.6).toFixed()} km/h</span>
                        </div>
                    </div>
                </div>
            )}
            {weatherData && hourlyForecast && (
                <ShortTermForecast forecastData={hourlyForecast} getWeatherIcon={getWeatherIcon} />
            )}
        </div>
    );
};

export default WeatherCard;
