import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from '../shared/services/cart.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  total$: Observable<number>;
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private cartService: CartService
  ) { 
    this.total$ = this.cartService.cart$
    .pipe(
      map(items => {return items.length})
    );
  }

  ngOnInit() {
  }

  onActivate(event) {
    if(event.constructor.name !== "CartComponent"){
      window.scroll(0,0);
    }
  }
}
