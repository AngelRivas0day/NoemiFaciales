import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  products: any[] = [
    {
      id: 1,
      name: 'Protector solar',
      desc: '',
      imageUrl: '...'
    },
    {
      id: 2,
      name: 'Humectante',
      desc: '',
      imageUrl: '...'
    },
    {
      id: 3,
      name: 'Lociones',
      desc: '',
      imageUrl: '...'
    },
    {
      id: 4,
      name: 'Shampoo',
      desc: '',
      imageUrl: '...'
    }
  ];
}
