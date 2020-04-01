import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

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
    return this.http.get('http://localhost:3000/services/list');
  }

  getService(id: number){
    // return this.services.filter(x => x.id == id)[0];
    return this.http.get(this.baseUrl + '/services/list/' + id);
  }
}
