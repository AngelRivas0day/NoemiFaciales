import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'app/api/services';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-servicio.component.html',
  styleUrls: ['./create-servicio.component.scss']
})
export class CreateServicioComponent implements OnInit {

  stepName: string;
  stepTime: String;
  stepDesc: string;
  stepIndex: number = 1;


  form: FormGroup;
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
    public dialogRef: MatDialogRef<CreateServicioComponent>,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('',[Validators.required]),
      image: new FormControl(null,[Validators.required]),
      // pasos: this.formBuilder.array([]),
      pasos: new FormControl(''),
      price: new FormControl(500)
    });
  }

  ngOnInit(){
    this.form.valueChanges.subscribe(()=>{
      this.form.value.image = this.selectedFile;
      this.values = this.form.value;
    });
    this.steps = [];
  }

  // intentanto traer todos los colores y elementos disponles con los que se puede crear un producto
  // para ser metidos dentro de un select o un multiple select y crear productos
  // consultar relaciones en la base de datos para poder crear un flujo de creación correcto

  create(){
    const token = localStorage.getItem('access_token');
    this.apiService.postWithImage(`${this.component}/create`, this.form.value, token).subscribe((data:any)=>{
      console.log(data);
    },(error)=>{
      console.log("Hubo un error al crear el producto");
      console.log(error);
    },()=>{
      this.dialogRef.close();
    });
  }

  handleChange(event){
    this.selectedFile = <File>event.target.files[0];
    this.form.value.image = this.selectedFile;
  }

  onNoClick(){
    this.dialogRef.close();
  }

//   get pasosArray() {
//     return this.form.get('pasos') as any;
//  }

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
}
