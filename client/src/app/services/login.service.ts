import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(user): Observable<any> {
    return this.http
      .post(`api/login`, user)
      .pipe(retry(1), catchError(this.handleError));
  }

  logout() {
    return this.http
      .get(`api/logout`)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error) {
    alert(error.error);
    return throwError(error.error);
  }
}
