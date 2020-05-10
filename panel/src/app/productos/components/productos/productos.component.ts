import { Component, OnInit } from '@angular/core';
import { Subject, Observable, ObservableLike } from 'rxjs';
import 'rxjs/add/operator/map';
import { ApiService } from 'app/api/services';
import { MatDialog } from '@angular/material/dialog';
import { EditProductoComponent } from '../edit-producto/edit-producto.component';
import { CreateProductoComponent } from '../create-producto/create-producto.component';
import { UploadImageComponent } from '../upload-image/upload-image.component';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  products: any[] = [];
  component: string = 'products';

  constructor(
    public apiService: ApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.setDataTable();
  }

  setDataTable(){
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
          that.products = resp;
          callback({
            recordsTotal: resp.length,
            data: [] 
          });
        });
    },
    columns: [{data:'id'},{data:'image'},{data:'name'},{data: 'existence'},{data:'description'},{data:'actions'}]
    };
  }

  openEditProduct(id):void{
    const dialogRef = this.dialog.open(EditProductoComponent,{
      width: '700px',
      hasBackdrop: true,
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(()=>{
      setTimeout(()=>this.rerender(),750);
    });
  }

  openCreate(){
    const dialogRef = this.dialog.open(CreateProductoComponent,{
      width: '800px',
      hasBackdrop: true,
      disableClose: true,
      maxHeight: '80vH'
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

  rerender(){
    this.apiService.getAll(`${this.component}/list`).subscribe((resp:any)=>{
      this.products = resp;
    });
  }

  openUpdateImage(id: number){
    const dialogRef = this.dialog.open(UploadImageComponent,{
      width: '400px',
      hasBackdrop: true,
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(()=>{
      setTimeout(()=>this.rerender(),750);
    });
  }

}
