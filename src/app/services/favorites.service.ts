import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { City } from './weather.service';

export interface FavoriteCity extends City {
  addedAt: number; // timestamp
}

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'weather-app-favorites';
  private favoritesSubject = new BehaviorSubject<FavoriteCity[]>(this.loadFavoritesFromStorage());

  public favorites$: Observable<FavoriteCity[]> = this.favoritesSubject.asObservable();

  constructor() {}

  /**
   * Obtiene todos los favoritos
   */
  getFavorites(): FavoriteCity[] {
    return this.favoritesSubject.value;
  }

  /**
   * Añade una ciudad a favoritos
   */
  addFavorite(city: City): boolean {
    const favorites = this.getFavorites();

    if (this.isFavorite(city.lat, city.lon)) {
      return false;
    }

    const favoriteCity: FavoriteCity = {
      ...city,
      addedAt: Date.now(),
    };

    const updatedFavorites = [...favorites, favoriteCity];
    this.saveFavorites(updatedFavorites);
    return true;
  }

  /**
   * Elimina una ciudad de favoritos
   */
  removeFavorite(lat: number, lon: number): boolean {
    const favorites = this.getFavorites();
    const filtered = favorites.filter((city) => city.lat !== lat || city.lon !== lon);

    if (filtered.length === favorites.length) {
      return false;
    }

    this.saveFavorites(filtered);
    return true;
  }

  /**
   * Verifica si una ciudad está en favoritos
   */
  isFavorite(lat: number, lon: number): boolean {
    return this.getFavorites().some((city) => city.lat === lat && city.lon === lon);
  }

  /**
   * Guarda favoritos en localStorage y actualiza el BehaviorSubject
   */
  private saveFavorites(favorites: FavoriteCity[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
      this.favoritesSubject.next(favorites);
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }

  /**
   * Carga favoritos desde localStorage
   */
  private loadFavoritesFromStorage(): FavoriteCity[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) {
        return [];
      }
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      return [];
    }
  }
}
