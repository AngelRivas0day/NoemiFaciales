import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { MaterialModule } from 'app/material/material.module';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [OrdersComponent, EditOrderComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MaterialModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    EditOrderComponent
  ]
})
export class OrdersModule { }
