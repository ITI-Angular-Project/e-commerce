import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderPayload {
  email: string;
  phone: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateProvince: string;
  zipPostalCode: string;
  country: string;
  deliveryMethod: string;
  paymentMethod: string;
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface OrderResponse {
  orderId: string;
  status: string;
  message: string;
  totalAmount: number;
  estimatedDelivery: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://api.example.com/api/orders';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  /**
   * Submit an order to the backend
   * @param orderData - The order form data
   * @returns Observable with order response
   */
  submitOrder(orderData: OrderPayload): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${this.apiUrl}/create`, orderData, this.httpOptions);
  }

  /**
   * Validate coupon/discount code
   * @param couponCode - The coupon code to validate
   * @returns Observable with discount amount
   */
  validateCoupon(couponCode: string): Observable<{ discountAmount: number; validUntil: string }> {
    return this.http.post<{ discountAmount: number; validUntil: string }>(
      `${this.apiUrl}/validate-coupon`,
      { code: couponCode },
      this.httpOptions
    );
  }

  /**
   * Get shipping options based on address
   * @param address - The shipping address
   * @returns Observable with available shipping options
   */
  getShippingOptions(address: {
    country: string;
    state: string;
    city: string;
  }): Observable<any[]> {
    return this.http.post<any[]>(
      `${this.apiUrl}/shipping-options`,
      address,
      this.httpOptions
    );
  }

  /**
   * Verify email address exists
   * @param email - Email to verify
   * @returns Observable with verification result
   */
  verifyEmail(email: string): Observable<{ isValid: boolean; message: string }> {
    return this.http.post<{ isValid: boolean; message: string }>(
      `${this.apiUrl}/verify-email`,
      { email },
      this.httpOptions
    );
  }

  /**
   * Get order status by order ID
   * @param orderId - The order ID to track
   * @returns Observable with order status
   */
  getOrderStatus(orderId: string): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/${orderId}`, this.httpOptions);
  }

  /**
   * Cancel an order
   * @param orderId - The order ID to cancel
   * @returns Observable with cancellation response
   */
  cancelOrder(orderId: string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(
      `${this.apiUrl}/${orderId}`,
      this.httpOptions
    );
  }

  /**
   * Process payment
   * @param paymentData - Payment information
   * @returns Observable with payment response
   */
  processPayment(paymentData: {
    orderId: string;
    paymentMethod: string;
    amount: number;
  }): Observable<{ transactionId: string; status: string }> {
    return this.http.post<{ transactionId: string; status: string }>(
      `${this.apiUrl}/process-payment`,
      paymentData,
      this.httpOptions
    );
  }

  /**
   * Get countries list
   * @returns Observable with countries array
   */
  getCountries(): Observable<{ id: string; name: string }[]> {
    return this.http.get<{ id: string; name: string }[]>(`${this.apiUrl}/countries`, this.httpOptions);
  }

  /**
   * Get states/provinces for a country
   * @param countryId - The country ID
   * @returns Observable with states/provinces array
   */
  getStates(countryId: string): Observable<{ id: string; name: string }[]> {
    return this.http.get<{ id: string; name: string }[]>(
      `${this.apiUrl}/states/${countryId}`,
      this.httpOptions
    );
  }

  /**
   * Handle validation errors from API
   * @param errorResponse - The error response from API
   * @returns Formatted validation errors
   */
  parseValidationErrors(errorResponse: any): ValidationError[] {
    if (errorResponse.errors && Array.isArray(errorResponse.errors)) {
      return errorResponse.errors;
    }

    if (errorResponse.message) {
      return [{ field: 'general', message: errorResponse.message }];
    }

    return [{ field: 'general', message: 'An unknown error occurred' }];
  }
}
