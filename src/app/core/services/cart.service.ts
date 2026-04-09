import { computed, inject, Injectable, signal } from '@angular/core';
import { CartItem } from '../Models/Cart/cart-item.model';
import { HttpClient } from '@angular/common/http';
import { Product } from '../Models/Cart/product.model';
import { CreateCartRequest } from '../Models/Cart/create-cart-item.model';
import { Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public Cart = signal<CartItem[]>([]);
  public cartItemCount = computed(() => this.Cart().reduce((sum, item) => sum + item.amount, 0));
  private readonly baseUrl = 'http://localhost:3000';
  private readonly httpClient = inject(HttpClient);
  private cartLoaded = false;

  getCart(forceRefresh = false): Observable<CartItem[]> {
    if (this.cartLoaded && !forceRefresh) {
      return of(this.Cart());
    }
    return this.httpClient.get<CartItem[]>(`${this.baseUrl}/cart`).pipe(
      tap((items) => {
        this.Cart.set(items);
        this.cartLoaded = true;
      }),
    );
  }
  addToCart(product: Product, quantity = 1): Observable<CartItem> {
    const item: CreateCartRequest = {
      category: product.category,
      title: product.name,
      subtitle: product.description.substring(0, 20),
      imageSrc: product.image,
      amount: quantity,
      price: product.price,
      imageAlt: product.name,
      productId: product.id,
    };

    return this.getCart().pipe(
      switchMap((cartItems) => {
        const existingItem = cartItems.find((cartItem) => cartItem.productId === product.id);

        if (existingItem?.id != null) {
          return this.changeQuantity(existingItem.id, existingItem.amount + item.amount);
        }

        return this.httpClient.post<CartItem>(`${this.baseUrl}/cart`, item).pipe(
          tap((createdItem) => {
            this.Cart.update((currentItems) => [...currentItems, createdItem]);
          }),
        );
      }),
    );
  }

  deleteAllCart(cartId: number) {
    return this.httpClient.delete(`${this.baseUrl}/cart/${cartId}`).pipe(
      tap(() => {
        this.Cart.set([]);
      }),
    );
  }

  changeQuantity(cartItemId: number, newQuantity: number): Observable<CartItem> {
    return this.httpClient
      .patch<CartItem>(`${this.baseUrl}/cart/${cartItemId}`, {
        amount: newQuantity,
      })
      .pipe(
        tap((updatedItem) => {
          this.Cart.update((items) =>
            items.map((item) => (item.id === cartItemId ? updatedItem : item)),
          );
        }),
      );
  }
  deleteItemFromCart(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/cart/${id}`).pipe(
      tap(() => {
        this.Cart.update((items) => items.filter((item) => item.id !== id));
      }),
    );
  }
}
