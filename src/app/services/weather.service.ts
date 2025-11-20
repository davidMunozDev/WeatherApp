import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface City {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly geoUrl = 'https://api.openweathermap.org/geo/1.0/direct';
  private readonly weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private readonly apiKey = '983021c82d2d0c864d9774f4cb21847e'; // Esto se debe de mover a un .env

  constructor(private http: HttpClient) {}

  searchCities(cityName: string, limit: number = 5): Observable<City[]> {
    const params = new HttpParams()
      .set('q', cityName)
      .set('limit', limit.toString())
      .set('appid', this.apiKey);

    return this.http.get<City[]>(this.geoUrl, { params });
  }

  getWeatherByCoordinates(lat: number, lon: number): Observable<WeatherData> {
    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('appid', this.apiKey)
      .set('units', 'metric')
      .set('lang', 'es');

    return this.http.get<WeatherData>(this.weatherUrl, { params });
  }
}
