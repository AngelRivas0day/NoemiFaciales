import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/shared/services/api-service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  services: any[];

  constructor(
    private router: Router,
    public servicesApi: ApiServiceService
  ) { }

  ngOnInit() {
    this.fetchServices();
  }

  async fetchServices(){
    this.services = await this.servicesApi.getServices();
  }

  goToCheckout(){
    this.router.navigateByUrl('/carro');
  }

}
