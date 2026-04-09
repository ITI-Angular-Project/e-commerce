import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { OrderFiltersComponent } from './order-filters/order-filters.component';
import { OrderCardComponent } from './order-card/order-card.component';

const routes: Routes = [{ path: '', component: OrdersComponent }];

@NgModule({
  declarations: [OrdersComponent, OrderFiltersComponent, OrderCardComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OrderModule {}
