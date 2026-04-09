import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Product } from '../../../core/Models/Cart/product.model';
import { AuthActionService } from '../../../core/services/auth-action.service';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;

  @Output() addToCartClicked = new EventEmitter<Product>();
  authActionService = inject(AuthActionService);

  getStars(rating: number): string {
    const full = Math.floor(rating);
    const empty = 5 - full;
    return '★'.repeat(full) + '☆'.repeat(empty);
  }

  getDiscountPercent(): number {
    if (!this.product.originalPrice) return 0;
    const saved = this.product.originalPrice - this.product.price;
    return Math.round((saved / this.product.originalPrice) * 100);
  }

  onAddToCartClick() {
    this.authActionService.requireAuth(() => this.addToCartClicked.emit(this.product));
  }
}
