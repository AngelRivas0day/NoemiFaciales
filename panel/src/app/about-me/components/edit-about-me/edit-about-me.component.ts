import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { ApiService } from 'app/api/services';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-about-me',
  templateUrl: './edit-about-me.component.html',
  styleUrls: ['./edit-about-me.component.scss']
})
export class EditAboutMeComponent implements OnInit {

  public Editor = ClassicEditor;
  public editorData: string = '';
  text = new FormControl(null);



  constructor(
    private apiService: ApiService
  ) {
    this.fetchData();
   }

  ngOnInit() {
  }

  // public onChange( { editor }: ChangeEvent ) {
  //   const data = editor.getData();
  //   this.text.setValue(data);
  //   console.log( data );
  // }

  fetchData(){
    this.apiService.getOne('about-me/list', 1).subscribe(
      (resp:any)=>this.text.patchValue(resp.text),
      (err)=>console.log(err),
      ()=>console.log("Edición exitosa")
    );
  }

  save(){
    const token = localStorage.getItem('access_token');
    console.log(this.text.value);
    this.apiService.putNoId('about-me/update', this.text.value, token).subscribe(
      (resp:any)=>console.log(resp),
      (err)=>console.log(err),
      ()=>console.log("Edición exitosa")
    );
  }

}
