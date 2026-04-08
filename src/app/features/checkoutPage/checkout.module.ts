import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout-page/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent
  }
];
@NgModule({
  declarations: [CheckoutComponent],
  imports: [CommonModule, ReactiveFormsModule , FormsModule , RouterModule.forChild(routes)],
})
export class CheckoutModule {}
