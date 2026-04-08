import { Component, input, output } from '@angular/core';
import { CartItem } from '../../../core/Models/Cart/cart-item.model';

@Component({
  selector: 'app-cart-item',
  standalone: false,
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
  host: {
    class: 'cart-item',
  },
})
export class CartItemComponent {
  public item = input.required<CartItem>();
  public productUpdated = output<CartItem>();
  public productDeleted = output<number>();
  decrement(item: CartItem) {
    if (item.amount > 0) {
      item.amount--;
      this.productUpdated.emit(item);
    }
  }
}
