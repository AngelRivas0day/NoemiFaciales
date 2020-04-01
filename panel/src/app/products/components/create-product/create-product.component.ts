import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'app/services/services';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

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

  constructor(
    public dialogRef: MatDialogRef<CreateProductComponent>,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('',[Validators.required]),
      image: new FormControl(null,[Validators.required]),
      // pasos: this.formBuilder.array([]),
      pasos: new FormControl('')
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
    this.apiService.createProduct(token, this.form.value).subscribe((data:any)=>{
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
    this.form.get('pasos').setValue(JSON.stringify(this.steps));
  }
}
