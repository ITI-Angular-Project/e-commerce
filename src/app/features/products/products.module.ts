import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  }
];
@NgModule({
  declarations: [ProductListComponent, ProductCardComponent, ProductDetailsComponent ],
  imports: [CommonModule , FormsModule , RouterModule.forChild(routes)],
    exports: [RouterModule]

})
export class ProductsModule {}
