import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CartService } from 'src/app/shared/services/cart.service';
import { ApiService } from 'src/app/shared/services/api.service';
import states from '../../../../assets/states.json';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  deliveryFee: number = 200;
  products$: Observable<any>;
  form: FormGroup;
  subtotal: number;
  total: number;
  statesData: any[] = states;
  cities: any[] = ["Selecciona un estado"];
  states: any[];

  constructor(
    public activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private cartService: CartService,
    private apiService: ApiService
  ) { 
    this.form = this.formBuilder.group({
      fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      cp: new FormControl('', [Validators.required]),
      products: new FormControl('', [Validators.required]),
      subtotal: new FormControl('', [Validators.required]),
      total: new FormControl('', [Validators.required]),
      deliveryMethod: new FormControl('', [Validators.required]),
      paymentMethod: new FormControl('', [Validators.required]),
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

  ngOnInit(): void {
    this.organizeData();
    this.products$ = this.cartService.cart$;
    if(!this.products$){
      this.router.navigateByUrl('/');
    }
    this.cartService.subtotal$.subscribe((subtotal=>{
      this.subtotal = parseInt(subtotal);
    }));
    
    this.total = this.subtotal + this.deliveryFee;

    this.products$.subscribe((data:any)=>{
      this.form.get('products').setValue(JSON.stringify(data));
    });
    this.form.get('total').setValue(this.total);
    this.form.get('subtotal').setValue(this.subtotal);
  }

  onSubmit(){
    console.log(this.form.value);
    this.apiService.post('orders/create', this.form.value).subscribe((data:any)=>{
      console.log(data);
    });
  }

}
