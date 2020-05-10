import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'app/api/services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.scss']
})
export class CreateProductoComponent implements OnInit {

  form: FormGroup;
  selectedFile: File;
  values: any;
  component: string = 'products';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<CreateProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      existence: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(()=>{
      this.form.value.image = this.selectedFile;
      this.values = this.form.value;
    });
  }

  handleChange(event){
    this.selectedFile = <File>event.target.files[0];
    this.form.value.image = this.selectedFile;
  }

  create(){
    const token = localStorage.getItem('access_token');
    console.log(this.form.value);
    this.apiService.postWithImage(`${this.component}/create`, this.form.value, token).subscribe((data:any)=>{
      console.log(data);
    },err=>{
      console.log(err);
    },()=>{
      this.dialogRef.close();
    });
  }

}
