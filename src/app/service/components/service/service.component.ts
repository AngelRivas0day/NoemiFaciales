import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  pasos: any[] = [
    {
      no: 1,
      titulo: "Paso uno",
      desc: "Lorem ipsum dolor sit amet, consectetur",
      tiempo: "10 mins"
    },
    {
      no: 2,
      titulo: "Aplicación de loción bien loca",
      desc: "Lorem ipsum dolor sit amet, consectetur",
      tiempo: "15 mins"
    },
    {
      no: 3,
      titulo: "Paso tres",
      desc: "Lorem ipsum dolor sit amet, consectetur",
      tiempo: "5 mins"
    },
    {
      no: 4,
      titulo: "Paso cuatro",
      desc: "Lorem ipsum dolor sit amet, consectetur. Esto es un placeholder bien loco, para ver si el numero se queda en la parte media del contenedor.",
      tiempo: "20 mins"
    },
  ];

}
