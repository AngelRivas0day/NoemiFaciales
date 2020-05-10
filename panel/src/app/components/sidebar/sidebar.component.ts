import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
  { path: '/sobre-mi', title: 'Sobre mi',  icon: 'users_circle-08', class: '' },
  { path: '/servicios', title: 'Servicios', icon: 'design_bullet-list-67', class: '' },
  { path: '/productos', title: 'Productos', icon: 'shopping_basket', class: '' },
  { path: '/citas', title: 'Citas', icon: 'files_paper', class: '' },
  { path: '/ordenes', title: 'Ordenes', icon: 'files_paper', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter( menuItem => menuItem );
  }

  isMobileMenu() { return !( window.innerWidth > 991 ); };

}
