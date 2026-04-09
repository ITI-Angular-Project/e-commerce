import { inject, Injectable, signal } from '@angular/core';
import { CartItem } from '../Models/Cart/cart-item.model';
import { HttpClient } from '@angular/common/http';
import { Product } from '../Models/Cart/product.model';
import { CreateCartRequest } from '../Models/Cart/create-cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public Cart = signal<CartItem[]>([]);
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
  public user = localStorage.getItem('user');
  private baseUrl = 'http://localhost:3000';
  private httpClient = inject(HttpClient);
  getCart() {
    return this.httpClient.get<CartItem[]>(`${this.baseUrl}/cart`);
  }
  // AddToCart(item: CartItem) {
  //   this.httpClient.post(`${this.baseUrl}/cart`, item);
  // }
  addToCart(product: Product) {
    const user = localStorage.getItem('user');
    if (!user) {
    }

    let item: CreateCartRequest = {
      category: product.category,
      title: product.name,
      subtitle: product.description.substring(0, 20),
      imageSrc: product.image,
      amount: 1,
      price: product.price,
      imageAlt: product.name,
      productId: product.id,
      // userId:user.id
    };
    return this.httpClient.post<CreateCartRequest>(`${this.baseUrl}/cart`, item);
  }
  deleteAllCart(cartId: number) {
    this.httpClient.delete(`${this.baseUrl}/cart/${cartId}`);
    // this.httpClient.delete(`${this.baseUrl}/cart?userId=${user.id}`);
  }
  changeQuantity(cartItemId: number, newQuantity: number) {
    console.log(newQuantity);
    return this.httpClient.patch<CartItem>(`${this.baseUrl}/cart/${cartItemId}`, {
      amount: newQuantity,
    });
  }
  deleteItemFromCart(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/cart/${id}`);
  }
}
