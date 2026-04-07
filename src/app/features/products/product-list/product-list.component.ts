import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/Models/Cart/product.model';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  allProducts: Product[] = [];

  categories: string[] = [];

  displayedProducts: Product[] = [];

  searchText: string = '';
  selectedCategory: string = 'All';

  currentPage: number = 1;
  productsPerPage: number = 6;
  totalPages: number = 1;
  pageNumbers: number[] = [];
  filteredCount: number = 0;

  cartCount = signal<number>(3);

  toastMessage: string = '';
  showToast: boolean = false;
  toastTimer: any;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.allProducts = this.productService.getAllProducts();
    this.categories  = this.productService.getCategories();
    this.updateDisplayedProducts();
  }

  onSearchChange() {
    this.currentPage = 1;
    this.updateDisplayedProducts();
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.currentPage = 1;
    this.updateDisplayedProducts();
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updateDisplayedProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  addToCart(product: Product) {
    this.cartCount.update(count => count + 1);
    this.showToastMessage(`✓  "${product.name}" added to cart!`);
  }

  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => { this.showToast = false; }, 3000);
  }

  updateDisplayedProducts() {
    let filtered = this.allProducts;

    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    const query = this.searchText.toLowerCase().trim();
    if (query) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    this.filteredCount = filtered.length;
    this.totalPages    = Math.ceil(filtered.length / this.productsPerPage);

    this.pageNumbers = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pageNumbers.push(i);
    }

    const start = (this.currentPage - 1) * this.productsPerPage;
    this.displayedProducts = filtered.slice(start, start + this.productsPerPage);
  }
}