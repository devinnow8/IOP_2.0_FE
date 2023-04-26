import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { UserService } from '../servcies/user.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private messageService: MessageService,
    private userService: UserService
    ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      switch (err.status) {

        case 401:
          this.userService.removeUser();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unauthorized Request.' });
          break;

        case 403:
          this.userService.removeUser();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Forbidden.' });
          break;

        case 0:
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'HTTP Error Response.' });
          break;

        // default:
        //   this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error });
        //   break;
      }
      console.log(err)
      const error = err.error || err.status;
      return throwError(() => error);
    }));
  }
}