import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/shared/services/api-service.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  form: FormGroup;
  services: any[];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiServiceService
  ) { 
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      date: new FormControl(''),
      servicio: new FormControl('', [Validators.required]),
      notes: new FormControl('')
    });
  }

  ngOnInit() {
    this.fetchServices();
  }

  fetchServices(){
    this.apiService.getServices().subscribe((data:any)=>{
      console.log(data);
      this.services = data;
    })
  }

  setAppointment(){
    
  }

}
