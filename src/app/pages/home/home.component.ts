import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherDetailComponent } from '../../components/weather-detail/weather-detail.component';
import { WeatherService, WeatherData } from '../../services/weather.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, WeatherDetailComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private readonly MADRID_LAT = 40.4168;
  private readonly MADRID_LON = -3.7038;

  weatherData: WeatherData | null = null;
  loading: boolean = false;

  constructor(private weatherService: WeatherService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadMadridWeather();
  }

  loadMadridWeather() {
    this.loading = true;
    this.weatherService.getWeatherByCoordinates(this.MADRID_LAT, this.MADRID_LON).subscribe({
      next: (data) => {
        console.log('Weather data received:', data);
        this.weatherData = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading weather:', error);
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }
}
