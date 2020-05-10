import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { MenuButtonsDirective } from './directives/menu-buttons.directive';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './components/cart/cart.component';
import { ApiService } from './services/api.service';
import { GroupProductsPipe } from './pipes/group-products.pipe';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NavComponent,MenuButtonsDirective, FooterComponent, CartComponent, GroupProductsPipe, CheckoutComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    NavComponent,
    MenuButtonsDirective,
    FooterComponent,
    ApiService,
    GroupProductsPipe
  ]
})
export class SharedModule { }
