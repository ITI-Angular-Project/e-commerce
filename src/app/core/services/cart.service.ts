import { computed,inject, Injectable, signal } from '@angular/core';
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

  public cartItemCount = computed(() =>
    this.Cart().reduce((sum, item) => sum + item.amount, 0)
  );
  /* [
    {
      imageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD1hHTm_CxonKyWYo6hnegah30bfj2WTWn2YoKVW5w1p99wnUJexgOIJm0eNsZ_FQiwBeQ_u_QG0hHqvCpUYghK6TwL9OfnLDrVGlwgNEqJip65EqMdDr_oNhoFzP9mltSRvdz9cMcWQXDEW2Im08rRXuBn8jOEBR_eJ0NWyeaLHJXcCIaaqSw3vILoH4INlG_AKVYPL3o4j3HI3t2BytAWmCQmBL6lKU--_G5ARKS68x3CePetQaqnNP0f-DXZYwJ7ANWv6L4h4nok',
      imageAlt: 'Pro Wireless X10',
      category: 'Audio',
      title: 'Pro Wireless X10',
      subtitle: 'Space Grey · Leather Finish',
      amount: 1,
      price: 299.0,
      // OriginalPrice: 349.00,
    },
    {
      imageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD1hHTm_CxonKyWYo6hnegah30bfj2WTWn2YoKVW5w1p99wnUJexgOIJm0eNsZ_FQiwBeQ_u_QG0hHqvCpUYghK6TwL9OfnLDrVGlwgNEqJip65EqMdDr_oNhoFzP9mltSRvdz9cMcWQXDEW2Im08rRXuBn8jOEBR_eJ0NWyeaLHJXcCIaaqSw3vILoH4INlG_AKVYPL3o4j3HI3t2BytAWmCQmBL6lKU--_G5ARKS68x3CePetQaqnNP0f-DXZYwJ7ANWv6L4h4nok',
      imageAlt: 'Pro Wireless X10',
      category: 'Audio',
      title: 'Pro Wireless X10',
      subtitle: 'Space Grey · Leather Finish',
      amount: 1,
      price: 299.0,
      // OriginalPrice: 349.00,
    },
    {
      imageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD1hHTm_CxonKyWYo6hnegah30bfj2WTWn2YoKVW5w1p99wnUJexgOIJm0eNsZ_FQiwBeQ_u_QG0hHqvCpUYghK6TwL9OfnLDrVGlwgNEqJip65EqMdDr_oNhoFzP9mltSRvdz9cMcWQXDEW2Im08rRXuBn8jOEBR_eJ0NWyeaLHJXcCIaaqSw3vILoH4INlG_AKVYPL3o4j3HI3t2BytAWmCQmBL6lKU--_G5ARKS68x3CePetQaqnNP0f-DXZYwJ7ANWv6L4h4nok',
      imageAlt: 'Pro Wireless X10',
      category: 'Audio',
      title: 'Pro Wireless X10',
      subtitle: 'Space Grey · Leather Finish',
      amount: 1,
      price: 299.0,
      // OriginalPrice: 349.00,
    },
  ] */
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
      })
    );
  }
  // AddToCart(item: CartItem) {
  //   this.httpClient.post(`${this.baseUrl}/cart`, item);
  // }
  addToCart(product: Product, quantity = 1): Observable<CartItem> {
    const item: CreateCartRequest = {
      category: product.category,
      title: product.name,
      subtitle: product.description.substring(0, 20),
      imageSrc: product.image,
      amount: Math.max(1, quantity),
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
          })
        );
      })
    );
  }




 deleteAllCart(cartId: number) {
    return this.httpClient.delete(`${this.baseUrl}/cart/${cartId}`).pipe(
      tap(() => {
        this.Cart.set([]);
      })
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
            items.map((item) => (item.id === cartItemId ? updatedItem : item))
          );
        })
      );
  }
   deleteItemFromCart(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/cart/${id}`).pipe(
      tap(() => {
        this.Cart.update((items) => items.filter((item) => item.id !== id));
      })
    );
  }
}
