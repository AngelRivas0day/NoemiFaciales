import { Component, OnInit } from '@angular/core';
import { Subject, Observable, ObservableLike } from 'rxjs';
import 'rxjs/add/operator/map';
import { ApiService } from 'app/api/services';
import { MatDialog } from '@angular/material/dialog';
import { EditServicioComponent } from '../edit-servicio/edit-servicio.component';
import { CreateServicioComponent } from '../create-servicio/create-servicio.component';
import { UploadImageComponent } from '../upload-image/upload-image.component';

@Component({
  selector: 'app-products',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  services: any[] = [];
  component: string = 'services';

  constructor(
    public apiService: ApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const that = this;
    this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 5,
    serverSide: true,
    processing: true,
    paging: false,
    // ordering: false,
    orderCellsTop: false,
    ordering: false,
    ajax: (DataTablesParemeters: any, callback) => {
      that.apiService.postDataTables(`${this.component}/dataTable`, DataTablesParemeters).
        subscribe((resp:any)=>{
          that.services = resp;
          callback({
            recordsTotal: resp.length,
            data: [] 
          });
        });
    },
    columns: [{data:'id'},{data:'image'},{data:'name'},{data:'description'},{data:'actions'}]
    };
  }

  rerender(){
    this.apiService.getAll(`${this.component}/list`).subscribe((resp:any)=>{
      this.services = resp;
    });
  }

  openEditProduct(id):void{
    const dialogRef = this.dialog.open(EditServicioComponent,{
      width: '700px',
      hasBackdrop: true,
      maxHeight: '80vH',
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(()=>{
      setTimeout(()=>this.rerender(),750);
    });
  }

  openCreate(){
    const dialogRef = this.dialog.open(CreateServicioComponent,{
      width: '800px',
      hasBackdrop: true,
      disableClose: true,
      maxHeight: '80vH',
    });
    dialogRef.afterClosed().subscribe(()=>{
      setTimeout(()=>this.rerender(),750);
    });
  }

  eraseProduct(id){
    const token = localStorage.getItem('access_token');
    this.apiService.delete(`${this.component}/delete`, id, token).subscribe((resp:any)=>{
      console.log('Se elminó el producto con éxito');
    },(error)=>{ 
      console.log(error);
    },()=>{
      setTimeout(()=>this.rerender(),750);
    });
  }

  openUpdateImage(id: number){
    const dialogRef = this.dialog.open(UploadImageComponent,{
      width: '400px',
      hasBackdrop: true,
      maxHeight: '80vH',
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(()=>{
      setTimeout(()=>this.rerender(),750);
    });
  }
}
