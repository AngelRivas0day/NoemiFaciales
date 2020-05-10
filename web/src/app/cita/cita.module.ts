import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitaRoutingModule } from './cita-routing.module';
import { AgendaComponent } from './components/agenda/agenda.component';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgxMaskModule, IConfig } from 'ngx-mask'

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [AgendaComponent, ConfirmacionComponent],
  imports: [
    CommonModule,
    CitaRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskModule.forRoot(maskConfig)
  ]
})
export class CitaModule { }
