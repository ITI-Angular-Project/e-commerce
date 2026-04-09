import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private cartService = inject(CartService);
  show = false;
  cartCount = this.cartService.cartItemCount;

  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      error: (err) => {
        console.error('Failed to load cart count:', err);
      },
    });
  }

  toglle(){
    this.show = !this.show;
    
  }
}
