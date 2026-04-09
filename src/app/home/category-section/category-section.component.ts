import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/Models/Cart/product.model';

@Component({
  selector: 'app-category-section',
  standalone: false,
  templateUrl: './category-section.component.html',
  styleUrls: ['./category-section.component.css'],
})
export class CategorySection implements OnInit {
  categories: string[] = [];
  categoryHighlights: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        const uniqueCategories = Array.from(
          new Set(products.map((product) => product.category).filter(Boolean)),
        );

        this.categories = uniqueCategories.slice(0, 4);
        this.categoryHighlights = uniqueCategories
          .slice(0, 3)
          .map((category) => products.find((product) => product.category === category))
          .filter((product): product is Product => Boolean(product));
      },
      error: (err) => {
        console.error('Failed to load home categories:', err);
      },
    });
  }
}
