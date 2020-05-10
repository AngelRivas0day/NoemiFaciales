import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  isLinear = true;
  image = '../assets/images/phone.jpg';
  placeholderImage = '../assets/images/phone-min.jpg';

  constructor() { }

  ngOnInit() {
  }

}
