import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../Models/Order/order.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  getOrderHistory(): Observable<Order[]> {
    return this.http.get<Order[]>(
      `http://localhost:3000/orders?userId=${this.authService.currentUser?.id}`,
    );
  }

  placeOrder(orderData: Omit<Order, 'id'>): Observable<Order> {
    return this.http.post<Order>('http://localhost:3000/orders', orderData);
  }
}
