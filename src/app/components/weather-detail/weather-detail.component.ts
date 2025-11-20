import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherData } from '../../services/weather.service';

interface WeatherMetric {
  label: string;
  value: string;
  colorClass: string;
  textSize: string;
}

@Component({
  selector: 'app-weather-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-detail.component.html',
})
export class WeatherDetailComponent {
  @Input() weatherData: WeatherData | null = null;
  @Input() loading: boolean = false;
  @Input() showFavoriteButton: boolean = true;

  get mainMetrics(): WeatherMetric[] {
    if (!this.weatherData) return [];
    return [
      {
        label: 'Sensación térmica',
        value: `${this.weatherData.main.feels_like.toFixed(1)}°C`,
        colorClass: 'text-gray-800',
        textSize: 'text-2xl',
      },
      {
        label: 'Temp. Mínima',
        value: `${this.weatherData.main.temp_min.toFixed(1)}°C`,
        colorClass: 'text-blue-600',
        textSize: 'text-2xl',
      },
      {
        label: 'Temp. Máxima',
        value: `${this.weatherData.main.temp_max.toFixed(1)}°C`,
        colorClass: 'text-red-600',
        textSize: 'text-2xl',
      },
      {
        label: 'Humedad',
        value: `${this.weatherData.main.humidity}%`,
        colorClass: 'text-gray-800',
        textSize: 'text-2xl',
      },
    ];
  }

  get additionalMetrics(): WeatherMetric[] {
    if (!this.weatherData) return [];
    return [
      {
        label: 'Presión',
        value: `${this.weatherData.main.pressure} hPa`,
        colorClass: 'text-gray-800',
        textSize: 'text-xl',
      },
      {
        label: 'Viento',
        value: `${this.weatherData.wind.speed} m/s`,
        colorClass: 'text-gray-800',
        textSize: 'text-xl',
      },
      {
        label: 'Visibilidad',
        value: `${(this.weatherData.visibility / 1000).toFixed(1)} km`,
        colorClass: 'text-gray-800',
        textSize: 'text-xl',
      },
      {
        label: 'Nubosidad',
        value: `${this.weatherData.clouds.all}%`,
        colorClass: 'text-gray-800',
        textSize: 'text-xl',
      },
      {
        label: 'Amanecer',
        value: new Date(this.weatherData.sys.sunrise * 1000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        colorClass: 'text-gray-800',
        textSize: 'text-xl',
      },
      {
        label: 'Atardecer',
        value: new Date(this.weatherData.sys.sunset * 1000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        colorClass: 'text-gray-800',
        textSize: 'text-xl',
      },
    ];
  }
}
