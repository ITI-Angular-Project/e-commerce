import { Component, EventEmitter, output, Output } from '@angular/core';

@Component({
  selector: 'app-order-filters',
  standalone: false,
  templateUrl: './order-filters.component.html',
  styleUrl: './order-filters.component.css',
})
export class OrderFiltersComponent {
  filters: string[] = ['All', 'Processing', 'Shipped', 'Delivered'];
  activeFilter: string = 'All';

  filterChanged = output<string>();

  setFilter(filter: string): void {
    this.activeFilter = filter;
    this.filterChanged.emit(filter === 'All Orders' ? 'All' : filter);
  }
}
