import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from './../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private cartService = inject(CartService);
  public AuthService = inject(AuthService);
  userName = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).username : '';
  loggedIn = false;
  show = false;
  cartCount = 0;

  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      next: () => {
        this.cartCount = this.cartService.cartItemCount();
      },
      error: (err) => {
        console.error('Failed to load cart count:', err);
      },
    });
  }

  toglle() {
    this.show = !this.show;
  }
  logout() {
    this.AuthService.logOut();
  }
}
