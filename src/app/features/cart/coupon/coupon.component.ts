import { Component } from '@angular/core';

@Component({
  selector: 'app-coupon',
  standalone: false,
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css'],
  host:{
    class:`
      bg-white p-3 border shadow-sm coupon-card 
    `
  }
})
export class CouponComponent {}
