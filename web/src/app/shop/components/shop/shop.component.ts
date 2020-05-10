import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  items: any[];
  component: string = 'products';
  baseUrl: string = environment.baseUrl + '/products/get-image/';

  constructor(
    private apiService: ApiService,
    public cartService: CartService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData(){
    this.apiService.getAll(`${this.component}/list`).subscribe(
      (data:any)=>this.items = data,
      (err)=>console.log(err)
    );
  }

  addProd(product: any, quantity: number){
    this.cartService.addCart(product, quantity);
  }

}
