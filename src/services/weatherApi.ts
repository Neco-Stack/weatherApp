import { WeatherResponse, WeatherForecast } from '../interfaces/WeatherInterfaces';

const API_KEY = 'e1c81ffa14956de084a5f0b68e160e1a';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherByCity = async (city: string): Promise<WeatherResponse | null> => {
    try {
        console.log(`Fetching weather data for ${city} with API key: ${API_KEY}`);

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
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=de`);

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
