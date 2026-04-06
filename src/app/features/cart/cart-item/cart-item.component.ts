import { Component, input, output } from '@angular/core';
import { ICartItem } from '../../../core/Models/Cart/CartItem';

@Component({
  selector: 'app-cart-item',
  standalone: false,
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
  host: {
    class: "cart-item"
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
  public item = input.required<ICartItem>();
  public productUpdated = output<ICartItem>();
}
