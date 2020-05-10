import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  deliveryFee: number = 200;
  products$: Observable<any[]>;
  subtotal$: Observable<any[]>;
  productsUrl: string = 'http://localhost:3000/products/get-image/';
  servicesUrl: string = 'http://localhost:3000/services/get-image/';
  productsToSend: any[];

  constructor(
    private cartService: CartService,
    private router: Router
  ) { 
    this.products$ = this.cartService.cart$;
    this.subtotal$ = this.cartService.subtotal$;
  }

  ngOnInit() {
  }

  minus(product:any){
    console.log(product);
    this.cartService.removeFromCart(product);
    setTimeout(()=>this.refresh(), 200);
  }

  plus(product:any){
    this.cartService.addCart(product, 1);
    setTimeout(()=>this.refresh(), 200);
  }

  refresh(){
    this.router.navigateByUrl('/productos', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/carro-de-compras']);
    }); 
  }

}
