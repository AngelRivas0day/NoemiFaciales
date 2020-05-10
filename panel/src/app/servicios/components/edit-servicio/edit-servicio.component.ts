import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'app/api/services';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-servicio.component.html',
  styleUrls: ['./edit-servicio.component.scss']
})
export class EditServicioComponent implements OnInit {

  stepName: string;
  stepTime: String;
  stepDesc: string;
  stepIndex: number = 1;


  form: FormGroup;
  service: any;
  selectedFile: File;
  values:any;
  steps: {
    id: number,
    no: number,
    title: String,
    description: String,
    time: String
  }[];
  component: string = 'services';

  constructor(
    public dialogRef: MatDialogRef<EditServicioComponent>,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('',[Validators.required]),
      pasos: new FormControl(''),
      price: new FormControl(500)
    });
  }

  ngOnInit(){
    this.getProduct(this.data.id);
    this.form.valueChanges.subscribe(()=>{
      this.form.value.image = this.selectedFile;
      this.values = this.form.value;
    });
    this.steps = [];
  }
  onNoClick(){
    this.dialogRef.close();
  }

  addStep(){
    var item = {
      id: this.stepIndex,
      no: this.stepIndex,
      title: this.stepName,
      description: this.stepDesc,
      time: this.stepTime
    };
    this.steps.push(item);
    this.form.get('pasos').setValue(JSON.stringify(this.steps));
    this.stepIndex+=1;
    this.stepDesc = "";
    this.stepName = "";
    this.stepTime = "";
    console.log(this.form.value);
  }

  minusStep(){
    this.steps.pop();
    this.stepIndex--;
    this.form.get('pasos').setValue(JSON.stringify(this.steps));
  }

  getProduct(id) {
    if (this.data.id) {
      this.apiService.getOne(`${this.component}/list`, id).subscribe((data: any) => {
        console.log("data: ");
        console.log(data[0]);
        this.service = data[0];
        this.form.patchValue(data[0]);
        this.steps = JSON.parse(this.service.pasos);
        this.stepIndex = this.steps.length + 1;
      },(error)=>{
        console.log("Hubo un error al traer la informacion del producto con el id: "+id);
        console.log(error);
      });
    }
  }

  saveChanges(id) {
    // const formData = new FormData();
    let token = localStorage.getItem('access_token');
    // console.log(this.editProdForm.get('image').value);
    this.apiService.put(`${this.component}/update`, id, this.form.value, token).subscribe((data) => {
      console.log("Si jalo el update");
      console.log(data);
    },(error)=>{
      console.log("Hubo un error al guardar los cambios del producto con el id: "+id);
      console.log(error);
    },()=>{
      this.dialogRef.close();
    });
  }

}
