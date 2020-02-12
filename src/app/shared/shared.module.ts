import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { MenuButtonsDirective } from './directives/menu-buttons.directive';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [NavComponent,MenuButtonsDirective, FooterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    NavComponent,
    MenuButtonsDirective,
    FooterComponent
  ]
})
export class SharedModule { }
