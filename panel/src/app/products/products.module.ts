import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { MaterialModule } from 'app/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { CreateProductComponent } from './components/create-product/create-product.component';



@NgModule({
  declarations: [ProductsComponent, EditProductComponent, CreateProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    DataTablesModule,
    FormsModule
  ],
  entryComponents: [
    EditProductComponent,
    CreateProductComponent
  ]
})
export class ProductsModule { }
