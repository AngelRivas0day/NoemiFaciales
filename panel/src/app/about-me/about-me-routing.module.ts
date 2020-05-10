import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditAboutMeComponent } from './components/edit-about-me/edit-about-me.component';


const routes: Routes = [
  {
    path: '',
    component: EditAboutMeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutMeRoutingModule { }
