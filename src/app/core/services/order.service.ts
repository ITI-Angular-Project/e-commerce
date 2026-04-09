import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderHistory } from '../Models/Order/order-history-item.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  /**
   * Get order history from json-server mock
   * @returns Observable with array of order history
   */
  getOrderHistory(): Observable<OrderHistory[]> {
    // using json-server endpoint as requested
    return this.http.get<OrderHistory[]>('http://localhost:3000/orders');
  }

  /**
   * Place a new order
   * @param orderData - The order data
   * @returns Observable with the created order
   */
  placeOrder(orderData: Omit<OrderHistory, 'id'>): Observable<OrderHistory> {
    return this.http.post<OrderHistory>('http://localhost:3000/orders', orderData);
  }
}
