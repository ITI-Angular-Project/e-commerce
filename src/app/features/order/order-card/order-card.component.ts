import { Component, input, Input } from '@angular/core';
import { Order } from '../../../core/Models/Order/order.model';

@Component({
  selector: 'app-order-card',
  standalone: false,
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css',
})
export class OrderCardComponent {
  order = input.required<Order>();

  getStatusBgColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-success bg-opacity-10 text-success';
      case 'shipped':
        return 'bg-primary bg-opacity-10 text-primary';
      case 'processing':
        return 'bg-warning text-dark'; // Bootstrap warning is already yellow
      default:
        return 'bg-secondary bg-opacity-10 text-secondary';
    }
  }
}
