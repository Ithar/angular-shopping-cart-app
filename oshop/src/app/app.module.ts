import { environment } from './../environments/environment';

// Modules
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

// Guards
import { AdminAuthGuard } from './service/admin-auth-guard.service';
import { AuthGuard } from './service/auth-guard.service';

// Component
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminProductFormComponent } from './admin/admin-product-form/admin-product-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    LoginComponent,
    PlaceOrderComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminProductFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },

      // logged-in
      { path: 'place-order', component: PlaceOrderComponent, canActivate: [AuthGuard] },
      { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
    
      // admin
      { path: 'admin/product/new', component: AdminProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/product/:id', component: AdminProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
