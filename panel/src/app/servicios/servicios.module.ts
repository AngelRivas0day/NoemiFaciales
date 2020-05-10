import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { EditServicioComponent } from './components/edit-servicio/edit-servicio.component';
import { MaterialModule } from 'app/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { CreateServicioComponent } from './components/create-servicio/create-servicio.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';



@NgModule({
  declarations: [ServiciosComponent, EditServicioComponent, CreateServicioComponent, UploadImageComponent],
  imports: [
    CommonModule,
    ServiciosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    DataTablesModule,
    FormsModule
  ],
  entryComponents: [
    EditServicioComponent,
    CreateServicioComponent,
    UploadImageComponent
  ]
})
export class ServiciosModule { }
