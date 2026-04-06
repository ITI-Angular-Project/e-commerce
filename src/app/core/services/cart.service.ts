import { inject, Injectable, signal } from '@angular/core';
import { ICartItem } from '../Models/Cart/CartItem';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public Cart = signal<ICartItem[]>([
    {
      ImageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD1hHTm_CxonKyWYo6hnegah30bfj2WTWn2YoKVW5w1p99wnUJexgOIJm0eNsZ_FQiwBeQ_u_QG0hHqvCpUYghK6TwL9OfnLDrVGlwgNEqJip65EqMdDr_oNhoFzP9mltSRvdz9cMcWQXDEW2Im08rRXuBn8jOEBR_eJ0NWyeaLHJXcCIaaqSw3vILoH4INlG_AKVYPL3o4j3HI3t2BytAWmCQmBL6lKU--_G5ARKS68x3CePetQaqnNP0f-DXZYwJ7ANWv6L4h4nok',
      ImageAlt: 'Pro Wireless X10',
      Category: 'Audio',
      Title: 'Pro Wireless X10',
      Subtitle: 'Space Grey · Leather Finish',
      Amount: 1,
      Price: 299.0,
      // OriginalPrice: 349.00,
    },
    {
      ImageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD1hHTm_CxonKyWYo6hnegah30bfj2WTWn2YoKVW5w1p99wnUJexgOIJm0eNsZ_FQiwBeQ_u_QG0hHqvCpUYghK6TwL9OfnLDrVGlwgNEqJip65EqMdDr_oNhoFzP9mltSRvdz9cMcWQXDEW2Im08rRXuBn8jOEBR_eJ0NWyeaLHJXcCIaaqSw3vILoH4INlG_AKVYPL3o4j3HI3t2BytAWmCQmBL6lKU--_G5ARKS68x3CePetQaqnNP0f-DXZYwJ7ANWv6L4h4nok',
      ImageAlt: 'Pro Wireless X10',
      Category: 'Audio',
      Title: 'Pro Wireless X10',
      Subtitle: 'Space Grey · Leather Finish',
      Amount: 1,
      Price: 299.0,
      // OriginalPrice: 349.00,
    },
    {
      ImageSrc:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD1hHTm_CxonKyWYo6hnegah30bfj2WTWn2YoKVW5w1p99wnUJexgOIJm0eNsZ_FQiwBeQ_u_QG0hHqvCpUYghK6TwL9OfnLDrVGlwgNEqJip65EqMdDr_oNhoFzP9mltSRvdz9cMcWQXDEW2Im08rRXuBn8jOEBR_eJ0NWyeaLHJXcCIaaqSw3vILoH4INlG_AKVYPL3o4j3HI3t2BytAWmCQmBL6lKU--_G5ARKS68x3CePetQaqnNP0f-DXZYwJ7ANWv6L4h4nok',
      ImageAlt: 'Pro Wireless X10',
      Category: 'Audio',
      Title: 'Pro Wireless X10',
      Subtitle: 'Space Grey · Leather Finish',
      Amount: 1,
      Price: 299.0,
      // OriginalPrice: 349.00,
    },
  ]);
  private baseUrl = 'http://localhost:3000';
  private httpClient = inject(HttpClient);
  getCart(){
    this.httpClient.get(`${this.baseUrl}/cart`,{
      headers:{
        
      }
    });
  }
  AddToCart(item: ICartItem) {
    this.httpClient.post(`${this.baseUrl}/cart`, item);
  }
  deleteAllCart(cartId: string) {
    this.httpClient.delete(`${this.baseUrl}/cart/${cartId}`);
  }
  changeQuantity(cartItemId: string, newQuantity: number) {
    this.httpClient.patch(`${this.baseUrl}/cart/item/${cartItemId}`, {
      quantity: newQuantity,
    });
  }
  deleteItemFromCart(cartItemId: string) {
    this.httpClient.delete(`${this.baseUrl}/cart/item/${cartItemId}`);
  }
}
