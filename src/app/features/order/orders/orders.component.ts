import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../core/Models/Order/order-item.model';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrderHistory().subscribe({
      next: (data) => {
        this.orders = data;
        this.filteredOrders = data;
      },
      error: (err) => console.error('Error fetching orders', err),
    });
  }

  onFilterChanged(status: string): void {
    if (status === 'All') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(
        (o) => o.status.toLowerCase() === status.toLowerCase(),
      );
    }
  }
}
