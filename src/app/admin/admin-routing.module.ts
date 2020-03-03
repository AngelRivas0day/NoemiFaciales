import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  // {
  //   path: 'login',
  //   component: 
  // },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'servicios',
    loadChildren: ()=>import('./components/servicios/servicios.module').then(m=>m.ServiciosModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
