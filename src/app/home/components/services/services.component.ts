import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  services: any[] = [
    {
      imgUrl: 'https://source.unsplash.com/random?health',
      serviceTitle: 'Facial tipo 1',
      serviceDesc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      imgUrl: 'https://source.unsplash.com/random?health',
      serviceTitle: 'Facial tipo 2',
      serviceDesc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      imgUrl: 'https://source.unsplash.com/random?health',
      serviceTitle: 'Facial tipo 3',
      serviceDesc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    }
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToCheckout(){
    this.router.navigateByUrl('/carro');
  }

}
