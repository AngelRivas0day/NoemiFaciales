import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitaRoutingModule } from './cita-routing.module';
import { AgendaComponent } from './components/agenda/agenda.component';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AgendaComponent, ConfirmacionComponent],
  imports: [
    CommonModule,
    CitaRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CitaModule { }
