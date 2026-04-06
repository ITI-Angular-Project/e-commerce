import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { RouterModule } from '@angular/router';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { CouponComponent } from './coupon/coupon.component';

@NgModule({
  declarations: [CartPageComponent, CartItemComponent, CartSummaryComponent, CouponComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CartPageComponent,
      },
    ]),
  ],
})
export class CartModule {}
