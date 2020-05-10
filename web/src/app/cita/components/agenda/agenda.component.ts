import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';
import states from '../../../../assets/states.json';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  form: FormGroup;
  services: any[];
  component: string = 'citas';
  fees: number = 200;
  statesData: any[] = states;
  cities: any[] = ["Selecciona un estado"];
  states: any[];
  phoneMask: any = [/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) { 
    this.form = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      date: new FormControl(''),
      address: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      servicios: new FormControl('', [Validators.required]),
      notes: new FormControl('')
    });
  }

  organizeData(): void{
    console.log(this.statesData);
    this.states = Object.keys(this.statesData);
    console.log("Estados:",this.states);
  }

  onStateSelect(event, state): void{
    this.cities = this.statesData[state];
    console.log("Ciudades", this.cities);
  }

  ngOnInit() {
    this.fetchServices();
    this.organizeData();

  }

  fetchServices(){
    this.apiService.getServices().subscribe((data:any)=>{
      console.log(data);
      this.services = data;
    });
  }

  setAppointment(){
    console.log(this.form.value);
    this.apiService.post(`${this.component}/create`, this.form.value).subscribe((data:any)=>{
      console.log(data);
    },err=>console.log(err),
    ()=>setTimeout(()=>this.router.navigateByUrl('/'), 10000));
  }

}
