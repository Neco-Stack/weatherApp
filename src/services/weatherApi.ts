import { WeatherResponse, WeatherForecast } from '../interfaces/WeatherInterfaces';

const API_KEY = 'c6b40f2e22b7db716a15d9545aaa65d2';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherByCity = async (city: string): Promise<WeatherResponse | null> => {
    try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=de`);

        if (!response.ok) {
            throw new Error('Stadt nicht gefunden');
        }

        const data: WeatherResponse = await response.json();
        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('Ein unbekannter Fehler ist aufgetreten');
        }
        return null;
    }
};

export const fetchWeatherForecast = async (city: string): Promise<WeatherForecast | null> => {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=de`);

        if (!response.ok) {
            throw new Error('Vorhersage nicht gefunden');
        }

        const data = await response.json();
        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('Ein unbekannter Fehler ist aufgetreten');
        }
        return null;
    }
};
