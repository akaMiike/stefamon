import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticatedObs: Observable<boolean> = this._isAuthenticatedSubject.asObservable();

  private usuarioLogado: string;

  private readonly URL = `${environment.urlBackend}`
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

    registrar(nickname: string, password: string){
      return this.http.post(`${this.URL}/jogador/registrar`, {
        nickname: nickname,
        password: password
      })
  }
  
    login(nickname: string, password: string){
      return this.http.post(`${this.URL}/jogador/login`, {
        nickname: nickname,
        password: password
      }).pipe(
        tap(() => {
          this.messageService.add({severity:'success', summary:'Login', detail: 'Login realizado com sucesso.'})
          this.usuarioLogado = nickname;
          this._isAuthenticatedSubject.next(true);
        })
      )
    }

    logout(){
      this.usuarioLogado = null;
      this._isAuthenticatedSubject.next(false);
      this.messageService.add({severity:'success', summary:'Logout', detail: 'Logout realizado com sucesso.'})
    }

    isLogado(){
      return !!this.getUsuarioLogado();
    }

    getUsuarioLogado(){
      return this.usuarioLogado;
    }
}
