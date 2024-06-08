import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {ProductsComponent} from "./components/products/products.component";
import {ProductDetailComponent} from "./components/product-detail/product-detail.component";
import {authGuard} from "./services/auth.guard";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'products', component: ProductsComponent, canActivate: [authGuard]},
  {path: 'products/:id', component: ProductDetailComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
