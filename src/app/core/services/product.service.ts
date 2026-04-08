import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';import { Observable, catchError, map, throwError } from 'rxjs';
import { Product } from '../Models/Cart/product.model';

interface JsonServerProduct {
  id: number;
  Title?: string;
  Category?: string;
  Description?: string;
  Price?: number;
  Brand?: string;
  'Image URL'?: string;
  Rating?: number | string;
  Stock?: number;
  title?: string;
  category?: string;
  description?: string;
  price?: number;
  brand?: string;
  image?: string;
  rating?: number | string;
  stock?: number;
  originalPrice?: number;
  reviews?: number;
  badge?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient); 
  private readonly API_URL = 'http://localhost:3000/products';


  private mapToProduct(api: JsonServerProduct): Product {
    const rating = api.Rating ?? api.rating ?? 0;
    return {
      id: api.id,
      name: api.Title ?? api.title ?? '',
      category: api.Category ?? api.category ?? '',
      price: api.Price ?? api.price ?? 0,
      originalPrice: api.originalPrice,
      image: api['Image URL'] ?? api.image ?? '',
      description: api.Description ?? api.description ?? '',
      rating: typeof rating === 'string' ? parseFloat(rating) : rating,
      reviews: api.reviews ?? 0,
      badge: api.badge,
      brand: api.Brand ?? api.brand,
      stock: api.Stock ?? api.stock
    };
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<JsonServerProduct[]>(this.API_URL).pipe(
      map(products => products.map(p => this.mapToProduct(p))),
      catchError(err => {
        console.error('Failed to fetch products:', err);
        return throwError(() => new Error('Could not load products'));
      })
    );
  }

  getProductById(id: number | string): Observable<Product> {
    return this.http.get<JsonServerProduct>(`${this.API_URL}/${id}`).pipe(
      map(product => {
        console.log('Raw product from API:', product);
        const mapped = this.mapToProduct(product);
        console.log('Mapped product:', mapped);
        return mapped;
      }),
      catchError(err => {
        console.error(`Failed to fetch product ${id}:`, err);
        return throwError(() => new Error('Product not found'));
      })
    );
  }

  getCategories(): Observable<string[]> {
    return this.getAllProducts().pipe(
      map(products => {
        const cats = products.map(p => p.category);
        return ['All', ...Array.from(new Set(cats))];
      })
    );
  }
};