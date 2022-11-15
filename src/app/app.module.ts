import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataTablesModule } from "angular-datatables";
import { CustomFormsModule } from 'ng2-validation';
import { environment } from '../environments/environment';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { CategoryService } from './category.service';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductService } from './product.service';
import { ProductFilterComponent } from './product/product-filter/product-filter.component';
import { ProductComponent } from './product/product.component';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ShoppingCartComponent,
    LoginComponent,
    ProductFormComponent,
    NotAuthorizedComponent,
    ProductFilterComponent,
    ProductCardComponent,
  ],
  imports: [
    FontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    CustomFormsModule,
    DataTablesModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    CategoryService,
    ProductService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
