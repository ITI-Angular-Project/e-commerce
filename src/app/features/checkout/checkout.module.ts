import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: CheckoutPageComponent
  }
];
@NgModule({
  declarations: [CheckoutPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CheckoutModule {}
