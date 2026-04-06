import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/Models/Cart/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product!: Product;

  @Output() addToCartClicked = new EventEmitter<Product>();

  getStars(rating: number): string {
    const full  = Math.floor(rating);
    const empty = 5 - full;
    return '★'.repeat(full) + '☆'.repeat(empty);
  }


  getDiscountPercent(): number {
    if (!this.product.originalPrice) return 0;
    const saved = this.product.originalPrice - this.product.price;
    return Math.round((saved / this.product.originalPrice) * 100);
  }

  onAddToCartClick() {
    this.addToCartClicked.emit(this.product);
  }
}
