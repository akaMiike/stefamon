import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(private messageService: MessageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((response: HttpErrorResponse) => {

      if(response.error){
        if(response.error.parameterViolations){
          (response.error.parameterViolations as any[]).forEach(error => {
            this.messageService.add({severity: 'error', summary:'Erro', detail: error.message});
          })
        }
        else{
          this.messageService.add({severity: 'error', summary:'Erro', detail: response.error});
        }
      }

      return throwError(() => response)
    }))
  }
}

