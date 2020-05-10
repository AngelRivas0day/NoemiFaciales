import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AdminLayoutComponent } from './admin/layout/admin-layout/admin-layout.component';
import { CartComponent } from './shared/components/cart/cart.component';
import { CheckoutComponent } from './shared/components/checkout/checkout.component';


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
        path: 'servicio/:id',
        loadChildren: ()=>import('./service/service.module').then(m=>m.ServiceModule)
      },
      {
        path: 'sobre-mi',
        loadChildren: ()=>import('./about/about.module').then(m=>m.AboutModule)
      },
      {
        path: 'productos',
        loadChildren: ()=>import('./shop/shop.module').then(m=>m.ShopModule)
      },
      {
        path: 'citas',
        loadChildren: ()=>import('./cita/cita.module').then(m=>m.CitaModule)
      },
      {
        path: 'carro-de-compras',
        component: CartComponent
      }
      ,
      {
        path: 'carro-de-compras/checkout',
        component: CheckoutComponent
      }
    ]
  }
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  // ...any other options you'd like to use
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
