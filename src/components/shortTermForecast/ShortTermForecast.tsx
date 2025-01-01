import React from 'react';
import { Forecast } from '../../interfaces/WeatherInterfaces';
import './ShortTermForecast.css';

interface ShortTermForecastProps {
    forecastData: Forecast[];
    getWeatherIcon: (code: number) => string;
}

const ShortTermForecast: React.FC<ShortTermForecastProps> = ({ forecastData, getWeatherIcon }) => {
    const renderForecastBlock = (forecast: Forecast, index: number) => {
        const date = new Date(forecast.dt * 1000);
        const hours = date.getHours();
        const timeLabel = `${hours}:00`;

        return (
            <div key={index} className="forecast-block">
                <p className="forecast-label">{timeLabel}</p>
                <img className='forecast-icon' src={getWeatherIcon(forecast.weather[0].id)} alt="Wetter Icon" />
                <p className="forecast-temp">{forecast.main.temp.toFixed()}°C</p>
            </div>
        );
    };

    return (
        <div className="short-term-forecast">
            <h3>Outlook</h3>
            <div className="forecast-container">
                {forecastData.slice(0, 4).map(renderForecastBlock)}
            </div>
        </div>
    );
};

export default ShortTermForecast;
