import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor() { }

  services: any[] = [
    {
      id: 1,
      imgUrl: '../assets/images/placeholder.png',
      serviceTitle: 'Limpieza facial profunda',
      serviceDesc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 2,
      imgUrl: '../assets/images/placeholder.png',
      serviceTitle: 'Microdermoabración',
      serviceDesc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 3,
      imgUrl: '../assets/images/placeholder.png',
      serviceTitle: 'Rejuvenecimiento con micropunción',
      serviceDesc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 4,
      imgUrl: '../assets/images/placeholder.png',
      serviceTitle: 'Renovación tisular',
      serviceDesc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 5,
      imgUrl: '../assets/images/placeholder.png',
      serviceTitle: 'Tratamiento despigmentante',
      serviceDesc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 6,
      imgUrl: '../assets/images/placeholder.png',
      serviceTitle: 'Eliminación de pediculosis',
      serviceDesc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    }
  ];

  getServices(){
    return this.services;
  }

  getService(id: number){
    return this.services.filter(x => x.id == id)[0];
  }
}
