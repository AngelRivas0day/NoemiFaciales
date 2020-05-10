import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api/services';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { EditOrderComponent } from '../edit-order/edit-order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  baseUrl = environment.base_url + '/games/get-image/';
  dtOptions: DataTables.Settings = {};
  items: any[] = [];
  currentDate = new Date();
  component: string = 'orders';

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const that = this;
    this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    serverSide: true,
    processing: true,
    paging: false,
    orderCellsTop: false,
    ordering: false,
    ajax: (DataTablesParemeters: any, callback) => {
      that.apiService.postDataTables(`${this.component}/dataTable`, DataTablesParemeters).
        subscribe((resp:any)=>{
          that.items = resp;
          callback({
            recordsTotal: resp.length,
            data: [] 
          });
        });
    },
    columns: [
      {data:'id'},
      {data:'fullName'},
      {data:'phone'},
      {data:'email'},
      {data:'paymentMethod'},
      {data:'checked'},
      {data:'created_at'},
      {data:'delivered'},
      {data:'actions'}
    ]
    };
  }

  fetchData(){
    this.apiService.getAll(`${this.component}/list`).subscribe((data:any)=>{
      console.log(data);
      this.items = data;
    },err=>{
      console.log(err);
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }

  confirm(id: number){
    const token = localStorage.getItem('access_token');
    this.apiService.put(`${this.component}/confirm`, id, {}, token).subscribe((data:any)=>{
      console.log(data);
    },err=>{
      console.log(err);
    },()=>{
      setTimeout(()=>this.fetchData(), 700);
    });
  }

  delivered(id: number){
    const token = localStorage.getItem('access_token');
    this.apiService.put(`${this.component}/delivered`, id, {}, token).subscribe((data:any)=>{
      console.log(data);
    },err=>{
      console.log(err);
    },()=>{
      setTimeout(()=>this.fetchData(), 700);
    });
  }

  achieve(id: number){
    const token = localStorage.getItem('access_token');
    this.apiService.put(`${this.component}/archive`, id, {}, token).subscribe((data:any)=>{
      console.log(data);
    },err=>{
      console.log(err);
    },()=>{
      setTimeout(()=>this.fetchData(), 700);
    });
  }

  erase(id: number){
    const token = localStorage.getItem('access_token');
    this.apiService.delete(`${this.component}/delete`, id, token).subscribe((resp:any)=>{
      console.log('Se elminó la reservacion con éxito');
    },(error)=>{ 
      console.log(error);
    },()=>{
      setTimeout(()=>this.fetchData(), 700);
    });
  }

  openEdit(id: number, checked?: number){
    const dialogRef = this.dialog.open(EditOrderComponent,{
      width: '80vW',
      maxHeight: '90vH',
      hasBackdrop: true,
      data: {
        id: id,
        isChecked: checked
      }
    });
    dialogRef.afterClosed().subscribe(()=>{
      setTimeout(()=>this.fetchData(), 700);
    });
  }

}
