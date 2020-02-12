import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartComponent } from './components/cart/cart.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [CheckoutComponent, CartComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    MaterialModule
  ]
})
export class CheckoutModule { }
