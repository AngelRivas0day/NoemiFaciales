import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './components/productos/productos.component';
import { EditProductoComponent } from './components/edit-producto/edit-producto.component';
import { CreateProductoComponent } from './components/create-producto/create-producto.component';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material/material.module';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material';
import { UploadImageComponent } from './components/upload-image/upload-image.component';

@NgModule({
  declarations: [ProductosComponent, EditProductoComponent, CreateProductoComponent, UploadImageComponent],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MatNativeDateModule, 
    MatMomentDateModule,
    DataTablesModule
  ],
  entryComponents: [
    EditProductoComponent,
    CreateProductoComponent,
    UploadImageComponent
  ]
})
export class ProductosModule { }
