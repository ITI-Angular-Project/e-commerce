import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart-page',
  standalone: false,
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
  // host: {
  //   class: `
  //     cart-page-wrapper
  //   `,
  // },
})
export class CartPageComponent {
  public cartService = inject(CartService);
  public CartItems = this.cartService.Cart;
  public subTotal = computed(() =>
    this.CartItems().reduce((sum, item) => sum + item.Price * item.Amount, 0),
  );
}
