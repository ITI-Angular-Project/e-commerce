import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-summary',
  standalone: false,
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css'],
  host: {
    style: `
      bg-white border order-summary-card shadow-sm p-4 p-md-5 sticky-top-32
    `,
  },
})
export class CartSummaryComponent {
  public subTotal = input.required<number>();
  public shipping = 0;
  private router = inject(Router);
  navigateToCheckout() {
    this.router.navigate(['/checkout'], {
      state: {
        orderSummary: {
          subtotal: this.subTotal(),
          shipping: this.shipping,
          total: this.subTotal() + this.shipping,
        },
      },
    });
  }
}
