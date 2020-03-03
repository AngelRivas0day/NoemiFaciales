import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { ListaServiciosComponent } from './lista-servicios/lista-servicios.component';
import { EditServiciosComponent } from './edit-servicios/edit-servicios.component';
import { CreateServicioComponent } from './create-servicio/create-servicio.component';


@NgModule({
  declarations: [ListaServiciosComponent, EditServiciosComponent, CreateServicioComponent],
  imports: [
    CommonModule,
    ServiciosRoutingModule
  ]
})
export class ServiciosModule { }
