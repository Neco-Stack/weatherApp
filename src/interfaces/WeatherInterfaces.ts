export interface WeatherResponse {
    name: string;
    main: {
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
    };
    weather: Array<{
        id: number;
        description: string;
        icon: string;
    }>;
    wind: {
        speed: number;
        deg: number;
    };
}

export interface WeatherForecast {
    list: Forecast[];
}

export interface Forecast {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    weather: Array<{
        id: number;
        description: string;
        icon: string;
    }>;
}
