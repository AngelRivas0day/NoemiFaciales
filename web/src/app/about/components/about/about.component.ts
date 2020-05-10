import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  aboutText: any;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData(){
    this.apiService.getOne('about-me/list', 1).subscribe(
      (resp:any)=>this.aboutText = resp.text,
      (err)=>console.log(err),
      ()=>console.log("Edición exitosa")
    );
  }

}
