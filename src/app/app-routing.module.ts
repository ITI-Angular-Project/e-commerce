import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule) },
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'cart',
    loadChildren: () => import('./features/cart/cart.module').then((m) => m.CartModule),
    canActivate: [authGuard],
  },
  {
    path: 'checkout',
    loadChildren: () => import('./features/checkout/checkout.module').then((m) => m.CheckoutModule),
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'orders',
    loadChildren: () => import('./features/order/order.module').then((m) => m.OrderModule),
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
