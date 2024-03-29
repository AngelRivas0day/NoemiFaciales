import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CitasComponent } from './components/citas/citas.component';


const routes: Routes = [
  {
    path: '',
    component: CitasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitasRoutingModule { }
