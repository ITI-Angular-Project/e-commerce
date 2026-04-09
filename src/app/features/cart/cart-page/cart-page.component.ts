import { Component, computed, inject, OnInit, signal, Signal } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { CartItem } from '../../../core/Models/Cart/cart-item.model';

@Component({
  selector: 'app-cart-page',
  standalone: false,
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  public cartService = inject(CartService);
  // public CartItems = signal<CartItem[]>([]);
  public subTotal = computed(() =>
    this.cartService.Cart().reduce((sum, item) => sum + item.price * item.amount, 0),
  );
  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      next: (value) => {
        this.cartService.Cart.set(value);
        // this.CartItems.set(value);
      },
    });
  }

  updateItemQuantity(item: CartItem) {
    this.cartService.changeQuantity(item.id!, item.amount).subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteProdcut(id: number) {
    this.cartService.deleteItemFromCart(id).subscribe({
      next: (value) => {
        const test = this.cartService.Cart().findIndex((i) => i.id == id);
        if (test != -1) this.cartService.Cart().splice(test, 1);
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}
