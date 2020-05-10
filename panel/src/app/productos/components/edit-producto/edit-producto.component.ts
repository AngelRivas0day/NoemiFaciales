import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'app/api/services';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.scss']
})
export class EditProductoComponent implements OnInit {

  form: FormGroup;
  event: any;
  selectedFile: File;
  values:any;
  component: string = 'products';


  constructor(
    public dialogRef: MatDialogRef<EditProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    public formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      existence: new FormControl('', [Validators.required]),
      month_product: new FormControl('')
    });
  }

  ngOnInit() {
    this.fetchProducto(this.data.id);
  }

  fetchProducto(id) {
    if (this.data.id) {
      this.apiService.getOne(`${this.component}/list`, id).subscribe((data: any) => {
        console.log("data: ");
        console.log(data);
        this.form.patchValue(data);
        if(this.form.value.existence == 1){
          this.form.get('existence').setValue('1');
        }else{
          this.form.get('existence').setValue('0');
        }
        console.log(this.form.value);
      },(error)=>{
        console.log("Hubo un error al traer la informacion del producto con el id: "+id);
        console.log(error);
      });
    }
  }

  saveChanges() {
    console.log(this.form.value);
    if(this.form.value.month_product == true){
      this.form.get('month_product').setValue(1);
    }else{
      this.form.get('month_product').setValue(0);
    }

    if(this.form.value.existence == '1'){
      this.form.get('existence').setValue(1);
    }else{
      this.form.get('existence').setValue(0);
    }
    let token = localStorage.getItem('access_token');
    this.apiService.put(`${this.component}/update`, this.data.id, this.form.value, token).subscribe((data) => {
      console.log("Si jalo el update");
      console.log(data);
    },(error)=>{
      console.log("Hubo un error al guardar los cambios del producto con el id: "+this.data.id);
      console.log(error);
    },()=>{
      this.dialogRef.close();
    });
  }

}
