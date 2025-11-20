import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CityListComponent } from '../../components/city-list/city-list.component';
import { FavoritesService, FavoriteCity } from '../../services/favorites.service';
import { City } from '../../services/weather.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, CityListComponent],
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favoriteCities: FavoriteCity[] = [];
  private favoritesSubscription?: Subscription;

  constructor(private favoritesService: FavoritesService, private router: Router) {}

  ngOnInit() {
    this.favoritesSubscription = this.favoritesService.favorites$.subscribe((favorites) => {
      this.favoriteCities = favorites;
    });
  }

  ngOnDestroy() {
    this.favoritesSubscription?.unsubscribe();
  }

  onCitySelected(city: City) {
    // Navegar a la página de detalle
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
    this.favoritesService.removeFavorite(city.lat, city.lon);
  }
}
