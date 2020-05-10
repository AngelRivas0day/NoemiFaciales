import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { ApiService } from 'app/api/services';
import { CreateCitaComponent } from '../create-cita/create-cita.component';
import { EditCitaComponent } from '../edit-cita/edit-cita.component';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  items: any[] = [];
  currentDate = new Date();
  component: string = 'citas';

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
      {data:'nombre'},
      {data:'phone'},
      {data:'date'},
      {data:'checked'},
      {data:'done'},
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

  openCreate(){
    const dialogRef = this.dialog.open(CreateCitaComponent,{
      width: '800px',
      hasBackdrop: true,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(()=>{
        this.fetchData();
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

  delete(id: number){
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
    const dialogRef = this.dialog.open(EditCitaComponent,{
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
