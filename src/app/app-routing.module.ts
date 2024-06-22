import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {ProductsComponent} from "./components/products/products.component";
import {ProductDetailComponent} from "./components/product-detail/product-detail.component";
import {authGuard} from "./services/auth.guard";
import {CartComponent} from "./components/cart/cart.component";
import {OrdersComponent} from "./components/orders/orders.component";
import {OrderDetailComponent} from "./components/order-detail/order-detail.component";
import {PaymentComponent} from "./components/payment/payment.component";
import {HomeComponent} from "./components/home/home.component";
import {CategoryComponent} from "./components/category/category.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'categories', component: CategoryComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/:id', component: ProductDetailComponent},
  {path: 'cart', component: CartComponent, canActivate: [authGuard]},
  {path: 'orders', component: OrdersComponent, canActivate: [authGuard]},
  {path: 'orders/:id', component: OrderDetailComponent, canActivate: [authGuard]},
  {path: 'payment', component: PaymentComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
