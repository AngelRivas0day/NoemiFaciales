import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutMeRoutingModule } from './about-me-routing.module';
import { EditAboutMeComponent } from './components/edit-about-me/edit-about-me.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MaterialModule } from 'app/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [EditAboutMeComponent],
  imports: [
    CommonModule,
    AboutMeRoutingModule,
    CKEditorModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AboutMeModule { }
