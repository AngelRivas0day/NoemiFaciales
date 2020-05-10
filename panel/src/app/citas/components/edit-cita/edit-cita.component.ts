import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'app/api/services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-cita',
  templateUrl: './edit-cita.component.html',
  styleUrls: ['./edit-cita.component.scss']
})
export class EditCitaComponent implements OnInit {

  form: FormGroup;
  itemId: number;
  isChecked: number;
  item: any;
  selectOptions: any[];
  component: string = 'citas';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<EditCitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      servicios: new FormControl('', [Validators.required]),
      notes: new FormControl('', [Validators.required]),
      created_at: new FormControl('')
    });
    this.itemId = this.data.id;
    this.isChecked = this.data.isChecked;
  }

  fetchData(id: number){
    this.apiService.getOne(`${this.component}/list`, id).subscribe((resp: any)=>{
      this.item = resp[0];
      console.log(this.item);
      this.form.patchValue(this.item);
      let servicios = JSON.parse(this.item.servicios);
      this.form.get('servicios').setValue(servicios.name);
    },err=>{
      console.log(err);
    });
  }

  fetchSelect(){
    this.apiService.getAll('services/list').subscribe((resp:any)=>{
      this.selectOptions = resp;
    },err=>console.log(err));
  }

  ngOnInit() {
    this.fetchData(this.data.id);
    this.fetchSelect();
  }

  onSubmit(){
    const token = localStorage.getItem('access_token');
    this.form.get('checked').setValue(this.isChecked);
    this.apiService.put(`${this.component}/update`, this.data.id, this.form.value, token).subscribe((resp:any)=>{
      console.log(resp);
    },err=>{
      console.log(err);
    },()=>{
      this.dialogRef.close();
    });
  }

}
