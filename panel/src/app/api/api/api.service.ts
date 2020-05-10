import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {

  public setHeaders(token){
    return new HttpHeaders({ // some hard coded headers but they work hella fine in here
      'Content-Type':'application/json; charset=utf-8',
      'token': token
    });
  }

  public setHeadersWithNoToken(){
    return new HttpHeaders({ // some hard coded headers but they work hella fine in here
      'Content-Type':'application/json; charset=utf-8',
    });
  }

  public setHeadersWithJustToken(token){
    return new HttpHeaders({ // some hard coded headers but they work hella fine in here
      'token': token
    });
  }

  base_url = 'http://localhost:3000';

  private options = { headers: null, };

  private _auth = new BehaviorSubject<boolean>( false );

  constructor(
    private http: HttpClient,
  ) {
    this.resetHeaders();
  }

  get auth(): Observable<boolean> { return this._auth; }

  private resetHeaders() {
    this.options.headers = new HttpHeaders({ 'Content-Type': 'application/json', });
  }

  private setToken( token: string, type:string = 'json; charset=utf-8', use:number = 1) {
    localStorage.setItem( 'access_token', token );
    if(use == 0){
      this.options.headers = new HttpHeaders({
        Token: token,
      });
    }else{
      this.options.headers = new HttpHeaders({
        'Content-Type': `application/${type}`,
        Token: token,
      });
    }
  }

  restoreAccess() {
    const token = localStorage.getItem( 'access_token' );
    if ( token && token.length ) {
      this.setToken( token );
      this._auth.next( true );
    }
  }

  // loginUser(credentials){
  //   // this._auth.next( true );
  //   // return;
  //   return this.http.post(this.base_url + "/admin/login",credentials).subscribe((data)=>{
  //     if(data.hasOwnProperty('access_token')){
  //       console.log("Si hay token");
  //       this.setToken(data.access_token);
  //     }
  //   })
  // }

  login( data: any ) {
    this.http.post(this.base_url+'/admin/login', data ).subscribe((data: any) => {
        if(data.token.length){
          this._auth.next( true );
        }else{
          this._auth.next( false );
        }
        this.setToken(data.token);
    },(error)=>{
      console.log("no se pudo hacer login");
    });
  }

  logout() {
    localStorage.removeItem( 'access_token' );
    this.resetHeaders();
    this._auth.next( false );
  }

  public   handleError( error: HttpErrorResponse ) {
    if ( error.error instanceof ErrorEvent ) {
      // Client-side or network error
      console.error( 'An error occurred:', error.error.message );
    } else {
      console.error( `Backend returned code ${error.status}, body was: ${error.message}` );
      console.log(error);
    }
    // return throwError( error.message );
  }

  public catchRequestError() {
    return catchError(( err: HttpErrorResponse ) => {
      if ( err.status === 401 ) {
        this.logout();
      } else {
        this.handleError( err );
      }
      return of( null );
    });
  }

  fetch( endpoint: string ) {
    return this.http.get(`${this.base_url}/${endpoint}`, this.options ).pipe(
      retry(2),
      this.catchRequestError()
    );
  }

  getOne( endpoint: string, id: any) {
    return this.http.get(`${this.base_url}/${endpoint}/${id}`, this.options ).pipe(
      retry(2),
      this.catchRequestError()
    );
  }

  getAll( endpoint: string ) {
    return this.http.get(`${this.base_url}/${endpoint}/`, this.options ).pipe(
      retry(2),
      this.catchRequestError()
    );
  }

  post( endpoint: string, data: any , token: any) {
    this.setToken(token);
    return this.http.post(`${this.base_url}/${endpoint}/`, data, this.options ).pipe(
      retry(2),
      this.catchRequestError()
    );
  }

  postWithImage( endpoint: string, data: any , token: any) {
    this.setToken(token, '', 0);
    let formData = this.toFormData(data);
    return this.http.post(`${this.base_url}/${endpoint}`, formData, this.options ).pipe(
      retry(2),
      this.catchRequestError()
    );
  }

  put( endpoint: string, id: any, data: any , token: any) {
    this.setToken(token);
    return this.http.put(`${this.base_url}/${endpoint}/${id}`, data, this.options ).pipe(
      retry(3),
      this.catchRequestError()
    );
  }

  putNoId( endpoint: string, data: any , token: any) {
    this.setToken(token, 'x-www-form-urlencoded');
    return this.http.put(`${this.base_url}/${endpoint}`, data, this.options ).pipe(
      retry(3),
      this.catchRequestError()
    );
  }

  patch( endpoint: string, id: any, data = null ) {
    return this.http.patch(`${this.base_url}/${endpoint}/${id}`, data, this.options ).pipe(
      retry(2),
      this.catchRequestError()
    );
  }

  delete( endpoint: string, id: any , token: any) {
    this.setToken(token);
    return this.http.delete(`${this.base_url}/${endpoint}/${id}`, this.options ).pipe(
      retry(2),
      this.catchRequestError()
    );
  }

  toFormData(formValue) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      let value = formValue[key];
      console.log(key);
      console.log(value);
      if (value != null) {
        formData.append(key, value);
      }
    }
    return formData;
  }

  updateImage(endpoint: string, id: number, token: string, file: File, fileName: string){
    this.setToken(token);
    const payload = new FormData();
    payload.append('image', file, fileName);
    return this.http.put<any>(`${this.base_url}/${endpoint}/${id}`, payload, this.options).pipe(
      retry(3),
      this.catchRequestError()
    )
  }

  postDataTables(endpoint: string, DataTableParameters: any){
    return this.http.post(`${this.base_url}/${endpoint}`, DataTableParameters).pipe(
      retry(3),
      this.catchRequestError()
    )
  }


}
