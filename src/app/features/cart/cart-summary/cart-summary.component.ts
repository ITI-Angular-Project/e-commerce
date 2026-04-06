import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-summary',
  standalone: false,
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css',
  host: {
    style: `
      bg-white border order-summary-card shadow-sm p-4 p-md-5 sticky-top-32
    `,
  },
})
export class CartSummaryComponent {}
