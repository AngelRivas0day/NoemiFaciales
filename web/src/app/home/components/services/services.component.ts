import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  baseUrl = environment.baseUrl;
  imageUrl = this.baseUrl + '/services/get-image/';

  services: any[];

  constructor(
    private router: Router,
    public servicesApi: ApiService
  ) { }

  ngOnInit() {
    this.fetchServices();
  }

  fetchServices(){
    this.servicesApi.getServices().subscribe((data:any)=>{
      console.log(data);
      this.services = data;
    })
  }

  goToCheckout(){
    this.router.navigateByUrl('/carro');
  }

}
