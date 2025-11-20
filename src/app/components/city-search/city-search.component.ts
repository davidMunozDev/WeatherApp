import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-city-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './city-search.component.html',
})
export class CitySearchComponent {
  @Output() search = new EventEmitter<string>();

  searchQuery: string = '';

  onSearch() {
    if (this.searchQuery.trim()) {
      this.search.emit(this.searchQuery.trim());
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }
}
