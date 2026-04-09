import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/Models/Cart/product.model';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-featured-section',
  standalone: false,
  templateUrl: './featured-section.component.html',
  styleUrls: ['./featured-section.component.css'],
})
export class FeaturedSection implements OnInit {
  featuredProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.featuredProducts = [...products]
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6);
      },
      error: (err) => {
        console.error('Failed to load featured products:', err);
      },
    });
  }

  addToCart(product: Product, event?: Event) {
    event?.stopPropagation();
    event?.preventDefault();

    this.cartService.addToCart(product).subscribe({
      error: (err) => {
        console.error('Failed to add featured product to cart:', err);
      },
    });
  }

  getShortDescription(product: Product): string {
    return product.description.length > 80
      ? `${product.description.slice(0, 80)}...`
      : product.description;
  }
}
