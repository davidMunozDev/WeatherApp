import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherDetailComponent } from '../../components/weather-detail/weather-detail.component';
import { WeatherService, WeatherData } from '../../services/weather.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, WeatherDetailComponent],
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
  weatherData: WeatherData | null = null;
  loading: boolean = false;
  cityName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const lat = params['lat'];
      const lon = params['lon'];
      this.cityName = params['name'] || '';

      if (lat && lon) {
        this.loadWeather(parseFloat(lat), parseFloat(lon));
      } else {
        console.error('No coordinates provided');
      }
    });
  }

  loadWeather(lat: number, lon: number) {
    this.loading = true;
    this.weatherService.getWeatherByCoordinates(lat, lon).subscribe({
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
