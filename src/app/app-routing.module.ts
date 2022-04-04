import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AuthGuard } from './auth-guard.service';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductComponent } from './product/product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  {path:"",component:ProductComponent},
  {path:"login",component:LoginComponent},
  {path:"products",component:ProductComponent},
  {path:"not-authorized",component:NotAuthorizedComponent},
  
  {path:"shopping-cart",component:ShoppingCartComponent,canActivate:[AuthGuard]},
  {path:"check-out",component:CheckOutComponent,canActivate:[AuthGuard]},
  {path:"order-success",component:OrderSuccessComponent,canActivate:[AuthGuard]},
  {path:"my/orders",component:MyOrdersComponent,canActivate:[AuthGuard]},

  {path:"admin/products/new",component:ProductFormComponent,canActivate:[AuthGuard,AdminAuthGuard]},
  {path:"admin/products/:id",component:ProductFormComponent,canActivate:[AuthGuard,AdminAuthGuard]},
  {path:"admin/products",component:AdminProductsComponent,canActivate:[AuthGuard,AdminAuthGuard]},
  
  {path:"admin/orders",component:AdminOrdersComponent,canActivate:[AuthGuard,AdminAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
