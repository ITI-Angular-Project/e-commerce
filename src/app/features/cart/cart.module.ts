import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CartItemComponent
  }
];
@NgModule({
  declarations: [CartPageComponent, CartItemComponent],
  imports: [CommonModule , RouterModule.forChild(routes)],
})
export class CartModule {}
