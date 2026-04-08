import { Component, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/Models/Cart/product.model';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  notFound: boolean = false;
  loading: boolean = true;
  quantity: number = 1;
  cartCount = signal(3);
  toastMessage: string = '';
  showToast: boolean = false;
  toastTimer: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);
    
    console.log('Product ID from route:', id);
    
    if (!id || isNaN(id)) {
      this.notFound = true;
      this.loading = false;
      return;
    }

    this.productService.getProductById(id).subscribe({
      next: (product) => {
        console.log('Product loaded:', product);
        this.product = product;
        this.notFound = false;
        this.loading = false;
        this.cdr.detectChanges();
        console.log('After setting loading to false:', this.loading);
      },
      error: (err) => {
        console.error('Error loading product:', err);
        this.notFound = true;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getStars(rating: number): string {
    const full = Math.floor(rating);
    const empty = 5 - full;
    return '★'.repeat(full) + '☆'.repeat(empty);
  }

  getSavings(): number {
    if (!this.product || !this.product.originalPrice) return 0;
    return this.product.originalPrice - this.product.price;
  }

  getDiscountPercent(): number {
    if (!this.product || !this.product.originalPrice) return 0;
    const saved = this.getSavings();
    return Math.round((saved / this.product.originalPrice) * 100);
  }

  increaseQty() {
    if (this.product && this.product.stock) {
      if (this.quantity < this.product.stock) {
        this.quantity++;
      }
    } else {
      this.quantity++;
    }
  }

  decreaseQty() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    if (!this.product) return;

    this.cartCount.update(count => count + this.quantity);
    this.toastMessage = `${this.quantity} x ${this.product.name} added to cart!`;
    this.showToast = true;

    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }

    this.toastTimer = setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}