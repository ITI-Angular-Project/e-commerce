import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/Models/Cart/product.model';
import { CartService } from '../../../core/services/cart.service';

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
  loading = true;
  error: string | null = null;
  
  minPrice: number = 0;
  maxPrice: number = 0;
  selectedMinPrice: number = 0;
  selectedMaxPrice: number = 0;
  sortBy: string = 'default'; 
  toastMessage: string = '';
  showToast: boolean = false;
  toastTimer: any;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    console.log('ProductListComponent initialized');
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        console.log('Products loaded:', products.length);
        this.allProducts = products;
        
        const cats = products.map(p => p.category);
        this.categories = ['All', ...Array.from(new Set(cats))];

        const prices = products.map(p => p.price);
        this.minPrice = Math.floor(Math.min(...prices));
        this.maxPrice = Math.ceil(Math.max(...prices));
        this.selectedMinPrice = this.minPrice;
        this.selectedMaxPrice = this.maxPrice;
        
        this.updateDisplayedProducts();
        this.loading = false;
        this.cdr.detectChanges();
        console.log('Loading set to false');
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
        this.cdr.detectChanges();
        console.error('Product load error:', err);
      }
    });
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

  onPriceChange() {
    this.currentPage = 1;
    this.updateDisplayedProducts();
  }

 onSortChange() {
    this.currentPage = 1;
    this.updateDisplayedProducts();
  }

  get pageTitle(): string {
    return this.selectedCategory === 'All'
      ? 'All Products'
      : this.selectedCategory;
  }


  updateDisplayedProducts() {
    let filtered = this.allProducts;

    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    filtered = filtered.filter(p => 
      p.price >= this.selectedMinPrice && p.price <= this.selectedMaxPrice
    );

    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      );
    }


    if (this.sortBy === 'price-asc') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-desc') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    this.filteredCount = filtered.length;
    this.totalPages = Math.ceil(filtered.length / this.productsPerPage);
    this.pageNumbers = this.getVisiblePages();

    const start = (this.currentPage - 1) * this.productsPerPage;
    const end = start + this.productsPerPage;
    this.displayedProducts = filtered.slice(start, end);
  }

  getVisiblePages(): number[] {
    const maxVisible = 5; 
    const pages: number[] = [];

    if (this.totalPages <= maxVisible) {

      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    let startPage = Math.max(2, this.currentPage - 1);
    let endPage = Math.min(this.totalPages - 1, this.currentPage + 1);

    if (startPage > 2) {
      pages.push(-1);
        }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < this.totalPages - 1) {
      pages.push(-1);  
    }

    if (this.totalPages > 1) {
      pages.push(this.totalPages);
    }

    return pages;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedProducts();
    }
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.toastMessage = `${product.name} added to cart!`;
        this.showToast = true;

        if (this.toastTimer) {
          clearTimeout(this.toastTimer);
        }

        this.toastTimer = setTimeout(() => {
          this.showToast = false;
        }, 3000);
      },
      error: (err) => {
        console.error('Add to cart failed:', err);
        this.toastMessage = `Could not add ${product.name} to cart.`;
        this.showToast = true;
      }
    });
  }

  addToCart(product: Product) {
    this.onAddToCart(product);
  }
}
