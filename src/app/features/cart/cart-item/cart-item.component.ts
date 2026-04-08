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
  // public ImageSrc = input.required();
  // public ImageAlt = input.required();
  // public Category = input.required();
  // public Title = input.required();
  // public Subtitle = input.required();
  // public Amount = input.required();
  // public Price = input.required();
  // public OriginalPrice = input.required();
  public item = input.required<CartItem>();
  public productUpdated = output<CartItem>();
  public productDeleted = output<number>();
}
