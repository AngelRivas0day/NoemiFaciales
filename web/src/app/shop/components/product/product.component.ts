import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product$: any;
  baseUrl: string = environment.baseUrl + '/products/get-image/';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    public cartService: CartService
  ) { }

  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      switchMap((params:any)=>{
        const id = params.get("id");
        return this.apiService.getOne('products/list',id);
      })
    );
  }

  addProd(product: any, quantity: number){
    this.cartService.addCart(product, quantity);
  }

}
