import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'app/api/services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  selectedFile: File;
  values:any;
  fileName: any;
  component: string = 'products';

  constructor(
    public dialogRef: MatDialogRef<UploadImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
  ) { 
  }

  image = new FormControl(null);

  handleChange(event){
    this.selectedFile = <File>event.target.files[0];
    this.fileName = this.selectedFile.name;
  }

  ngOnInit() {
  }

  updateImage(){
    const token = localStorage.getItem('access_token');
    const data = new FormData();
    data.append('image', this.selectedFile, this.fileName);
    this.apiService.updateImage(`${this.component}/update-image`, this.data.id, token, this.selectedFile, this.fileName).subscribe((data:any)=>{
      console.log(data);
    }, err =>{
      console.log(err);
    }, () => this.dialogRef.close());
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
