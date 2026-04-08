import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { CouponComponent } from './coupon/coupon.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CartPageComponent,
  },
];
@NgModule({
  declarations: [CartPageComponent, CartItemComponent, CartSummaryComponent, CouponComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CartModule {}
