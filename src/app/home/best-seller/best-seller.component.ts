import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/Models/Cart/product.model';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-best-seller',
  standalone: false,
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.css'],
})
export class BestSeller implements OnInit {
  bestSellers: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.bestSellers = [...products]
          .sort((a, b) => {
            if (b.rating !== a.rating) {
              return b.rating - a.rating;
            }

            return a.price - b.price;
          })
          .slice(0, 4);
      },
      error: (err) => {
        console.error('Failed to load best sellers:', err);
      },
    });
  }

  getOriginalPrice(product: Product): number | null {
    if (product.originalPrice) {
      return product.originalPrice;
    }

    if (product.rating >= 4.5) {
      return Number((product.price * 1.15).toFixed(2));
    }

    return null;
  }
}
