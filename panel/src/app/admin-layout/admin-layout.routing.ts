import { Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    // { path: 'user-profile',   component: UserProfileComponent },
    { path: 'servicios',      loadChildren: ()=>import('../servicios/servicios.module').then(m=>m.ServiciosModule) },
    { path: 'productos',      loadChildren: ()=>import('../productos/productos.module').then(m=>m.ProductosModule) },
    { path: 'citas',          loadChildren: ()=>import('../citas/citas.module').then(m=>m.CitasModule) },
    { path: 'sobre-mi',       loadChildren: ()=>import('../about-me/about-me.module').then(m=>m.AboutMeModule)},
    { path: 'ordenes',        loadChildren: ()=>import('../orders/orders.module').then(m=>m.OrdersModule) }
];
