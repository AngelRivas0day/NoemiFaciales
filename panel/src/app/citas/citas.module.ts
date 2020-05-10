import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitasRoutingModule } from './citas-routing.module';
import { CitasComponent } from './components/citas/citas.component';
import { EditCitaComponent } from './components/edit-cita/edit-cita.component';
import { CreateCitaComponent } from './components/create-cita/create-cita.component';
import { MaterialModule } from 'app/material/material.module';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CitasComponent, EditCitaComponent, CreateCitaComponent],
  imports: [
    CommonModule,
    CitasRoutingModule,
    MaterialModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [EditCitaComponent, CreateCitaComponent]
})
export class CitasModule { }
