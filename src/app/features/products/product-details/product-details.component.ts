import { Component, OnInit, signal } from '@angular/core';
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

  quantity: number = 1;

  cartCount = signal<number>(3);

  toastMessage: string = '';
  showToast: boolean = false;
  toastTimer: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    const found = this.productService.getAllProducts().find(p => p.id === id);

    if (found) {
      this.product = found;
    } else {
      this.notFound = true;
    }
  }

  getStars(rating: number): string {
    const full  = Math.floor(rating);
    const empty = 5 - full;
    return '★'.repeat(full) + '☆'.repeat(empty);
  }

  getSavings(): number {
    if (!this.product?.originalPrice) return 0;
    return this.product.originalPrice - this.product.price;
  }

  getDiscountPercent(): number {
    if (!this.product?.originalPrice) return 0;
    const saved = this.product.originalPrice - this.product.price;
    return Math.round((saved / this.product.originalPrice) * 100);
  }

  increaseQty() {
    if (this.quantity < 10) this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart() {
    if (!this.product) return;
    this.cartCount.update(count => count + this.quantity);
    this.showToastMessage(`✓  "${this.product.name}" (x${this.quantity}) added to cart!`);
  }

  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => { this.showToast = false; }, 3000);
  }
}