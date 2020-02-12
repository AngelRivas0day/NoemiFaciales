import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  displayedColumns: string[] = ['Producto', 'Cantidad', 'Precio'];
  dataSource = [
    {image: '../assets/images/service_1.jpg', name: 'Facial tipo 1', price: 760, quantity: 1},
    {image: '../assets/images/service_1.jpg', name: 'Tratamiento tipo 3', price: 600, quantity: 2},
  ];

  checkout(){
    this.router.navigateByUrl('/carro/checkout');
  }

}
