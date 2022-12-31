import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Historial } from '../shared/historial';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { laUrl } from '../../environments/environments'

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  // Define API
  apiURL = laUrl.finalurl;
  constructor(private http: HttpClient) {}
  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/
  // Http Optionss
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
    }),
  };
  // HttpClient API get() method => Fetch historial list
  getHistorials() {
    return this.http
      .get<Historial[]>(this.apiURL + '/restLog.php')
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API get() method => Fetch employee
  getHistorial(id: any): Observable<Historial> {
    return this.http
      .get<Historial>(this.apiURL + '/historial/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API post() method => Create employee
  createHistorial(employee: any): Observable<Historial> {
    return this.http
      .post<Historial>(
        this.apiURL + '/historial',
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API put() method => Update employee
  updateHistorial(id: any, employee: any): Observable<Historial> {
    return this.http
      .put<Historial>(
        this.apiURL + '/historial/' + id,
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API delete() method => Delete employee
  deleteHistorial(id: any) {
    return this.http
      .delete<Historial>(this.apiURL + '/historial/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}
