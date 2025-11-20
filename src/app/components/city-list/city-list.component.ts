import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { City } from '../../services/weather.service';

@Component({
  selector: 'app-city-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './city-list.component.html',
})
export class CityListComponent {
  @Input() cities: City[] = [];
  @Input() loading: boolean = false;
  @Input() hasSearched: boolean = false;
  @Input() showRemoveButton: boolean = false;
  @Output() citySelected = new EventEmitter<City>();
  @Output() cityRemoved = new EventEmitter<City>();

  onSelectCity(city: City) {
    this.citySelected.emit(city);
  }

  onRemoveCity(city: City) {
    this.cityRemoved.emit(city);
  }
}
