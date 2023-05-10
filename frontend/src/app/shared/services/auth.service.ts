import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment.prod';
import { JogadorService } from './jogador.service';
import { Jogador } from 'src/app/models/Jogador.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticatedObs: Observable<boolean> = this._isAuthenticatedSubject.asObservable();

  private usuarioLogado: string;

  private readonly URL = `${environment.urlBackend}`
  
  constructor(
    private http: HttpClient
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
          alert("Logado com sucesso!");
          this.usuarioLogado = nickname;
          this._isAuthenticatedSubject.next(true);
        })
      )
    }

    logout(){
      this.usuarioLogado = null;
      alert("Deslogado com sucesso!")
    }

    isLogado(){
      return this.usuarioLogado != null;
    }

    getUsuarioLogado(){
      return this.usuarioLogado;
    }
}
