import { Component, input } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  standalone: false,
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  public ImageSrc = input.required();
  public Category = input.required();
  public Title = input.required();
  public Subtitle = input.required();
  public Amount = input.required();
  public Price = input.required();
  public OriginalPrice = input.required();
}
