import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductAdminComponent } from './product-admin.component';
import { ProductAdminRoutingModule } from './product-admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ProductAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [ProductAdminComponent]
})
export class ProductAdminModule { }
