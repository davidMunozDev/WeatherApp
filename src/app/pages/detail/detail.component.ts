import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherDetailComponent } from '../../components/weather-detail/weather-detail.component';
import { WeatherService, WeatherData, City } from '../../services/weather.service';
import { FavoritesService } from '../../services/favorites.service';

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
  currentCity: City | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService,
    private favoritesService: FavoritesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const lat = params['lat'];
      const lon = params['lon'];
      const name = params['name'] || '';
      const country = params['country'] || '';
      const state = params['state'] || '';

      if (lat && lon) {
        this.currentCity = {
          lat: parseFloat(lat),
          lon: parseFloat(lon),
          name: name,
          country: country,
          state: state,
        };
        this.cityName = name;
        this.loadWeather(this.currentCity.lat, this.currentCity.lon);
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

  get isFavorite(): boolean {
    if (!this.currentCity) return false;
    return this.favoritesService.isFavorite(this.currentCity.lat, this.currentCity.lon);
  }

  toggleFavorite() {
    if (!this.currentCity) return;

    if (this.isFavorite) {
      this.favoritesService.removeFavorite(this.currentCity.lat, this.currentCity.lon);
    } else {
      this.favoritesService.addFavorite(this.currentCity);
    }
    this.cdr.markForCheck();
  }
}
