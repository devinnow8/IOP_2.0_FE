import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {

      switch (err.status) {

        case 401:
          alert('Unauthorized Request.');
          break;

        case 403:
          alert('Forbidden.');
          break;

        case 0:
          alert('HTTP Error Response.');
          break;

        default:
          alert(err.error.message);
          break;
      }

      const error = err.error.message || err.statusText;
      return throwError(() => new Error(error));
    }));
  }
}