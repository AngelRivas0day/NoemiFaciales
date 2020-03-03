import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AdminLayoutComponent } from './admin/layout/admin-layout/admin-layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: ()=>import('./home/home.module').then(m=>m.HomeModule)
      },
      {
        path: 'carro',
        loadChildren: ()=>import('./checkout/checkout.module').then(m=>m.CheckoutModule)
      },
      {
        path: 'servicio',
        loadChildren: ()=>import('./service/service.module').then(m=>m.ServiceModule)
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: ()=>import('./admin/admin.module').then(m=>m.AdminModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
