import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  register(startup): Observable<any> {
    return this.http
      .post(`api/register`, startup)
      .pipe(catchError(this.handleError));
  }

  getdata() {
    return this.http.get('api/collection').pipe(catchError(this.handleError));
  }

  getview(startup) {
    return this.http
      .get(`api/view/${startup}`)
      .pipe(catchError(this.handleError));
  }

  handleError(error) {
    alert(error.error);
    return throwError(error.error);
  }
}
