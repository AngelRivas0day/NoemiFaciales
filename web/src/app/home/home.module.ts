import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { BannerComponent } from './components/banner/banner.component';
import { AboutComponent } from './components/about/about.component';
import { SharedModule } from '../shared/shared.module';
import { ContactComponent } from './components/contact/contact.component';
import { MaterialModule } from '../material/material.module';
import { ServicesComponent } from './components/services/services.component';
import { ContainerComponent } from './components/container/container.component';
import { RouterModule } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';


@NgModule({
  declarations: [
    BannerComponent,
    AboutComponent,
    ContactComponent,
    ServicesComponent, 
    ContainerComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MaterialModule,
    RouterModule,
    LazyLoadImageModule
  ]
})
export class HomeModule { }
