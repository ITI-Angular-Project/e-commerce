import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../Models/Order/order-item.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  /**
   * Get order history from json-server mock
   * @returns Observable with array of order history
   */
  getOrderHistory(): Observable<Order[]> {
    // using json-server endpoint as requested
    return this.http.get<Order[]>('http://localhost:3000/orders');
  }

  /**
   * Place a new order
   * @param orderData - The order data
   * @returns Observable with the created order
   */
  placeOrder(orderData: Omit<Order, 'id'>): Observable<Order> {
    return this.http.post<Order>('http://localhost:3000/orders', orderData);
  }
}
