import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CitySearchComponent } from '../../components/city-search/city-search.component';
import { CityListComponent } from '../../components/city-list/city-list.component';
import { WeatherService, City } from '../../services/weather.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, CitySearchComponent, CityListComponent],
  templateUrl: './search.component.html',
})
export class SearchComponent {
  cities: City[] = [];
  loading: boolean = false;
  hasSearched: boolean = false;

  constructor(
    private weatherService: WeatherService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  handleSearch(cityName: string) {
    this.loading = true;
    this.hasSearched = true;
    console.log('Searching for:', cityName);

    this.weatherService.searchCities(cityName, 10).subscribe({
      next: (cities) => {
        console.log('Cities received:', cities);
        this.cities = cities;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error searching cities:', error);
        this.cities = [];
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  onCitySelected(city: City) {
    this.router.navigate(['/detail'], {
      queryParams: {
        lat: city.lat,
        lon: city.lon,
        name: city.name,
        country: city.country,
        state: city.state || '',
      },
    });
  }

  onCityRemoved(city: City) {
    this.cities = this.cities.filter((c) => c.lat !== city.lat || c.lon !== city.lon);
  }
}
