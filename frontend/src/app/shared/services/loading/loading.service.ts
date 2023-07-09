import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private subjectLoading = new Subject<boolean>();
  private subjectMensagemLoading = new Subject<string>()
  
  loading = this.subjectLoading.asObservable();
  mensagemloading = this.subjectMensagemLoading.asObservable();

  constructor() { }

  mostrarCarregamento(mensagemLoading: string = ''){
    this.subjectMensagemLoading.next(mensagemLoading)
    this.subjectLoading.next(true);
  }

  pararCarregamento(){
    this.subjectMensagemLoading.next('');
    this.subjectLoading.next(false);
  }

}
