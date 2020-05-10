import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  services: any[] = [
    {
      id: 1,
      imgUrl: '../assets/images/placeholder.png',
      serviceTitle: 'Limpieza facial profunda',
      serviceDesc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 2,
      imgUrl: '../assets/images/placeholder.png',
      serviceTitle: 'Microdermoabración',
      serviceDesc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 3,
      imgUrl: '../assets/images/placeholder.png',
      serviceTitle: 'Rejuvenecimiento con micropunción',
      serviceDesc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 4,
      imgUrl: '../assets/images/placeholder.png',
      serviceTitle: 'Renovación tisular',
      serviceDesc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 5,
      imgUrl: '../assets/images/placeholder.png',
      serviceTitle: 'Tratamiento despigmentante',
      serviceDesc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
      id: 6,
      imgUrl: '../assets/images/placeholder.png',
      serviceTitle: 'Eliminación de pediculosis',
      serviceDesc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
    }
  ];

  getServices(){
    return this.http.get('http://localhost:3000/services/list');
  }

  getService(id: number){
    // return this.services.filter(x => x.id == id)[0];
    return this.http.get(this.base_url + '/services/list/' + id);
  }

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
    // this.options.headers = new HttpHeaders({ 'Content-Type': 'application/json', });
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
      this.handleError( err );
      return of( null );
    });
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

  post( endpoint: string, data = null) {
    const headers = this.setHeadersWithNoToken();
    return this.http.post(`${this.base_url}/${endpoint}/`, data, {headers} ).pipe(
      retry(2),
      this.catchRequestError()
    );
  }

}
