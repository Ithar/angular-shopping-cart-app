import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdminProductFormComponent } from '../admin/component/admin-product-form/admin-product-form.component';
import { AdminProductsComponent } from '../admin/component/admin-products/admin-products.component';
import { AuthGuard } from '../shared/service/auth-guard.service';
import { AdminAuthGuard } from './service/admin-auth-guard.service';

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminProductFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'admin/product/new', component: AdminProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/product/:id', component: AdminProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
       { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] }
    ])
  ]
})
export class AdminModule { }
