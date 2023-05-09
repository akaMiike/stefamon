import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(localStorage.getItem("LOGGED_IN") != null);
  public isAuthenticatedObs: Observable<boolean> = this._isAuthenticatedSubject.asObservable();

  private readonly URL = `${environment.urlBackend}`
  
  constructor(private http: HttpClient) { }

    registrar(nickname: string, password: string){
      return this.http.post(`${this.URL}/jogador`, {
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
          this._isAuthenticatedSubject.next(true);
          this.setUsuarioLogado(nickname);
        })
      )
    }

    logout(){
      localStorage.clear();
      alert("Deslogado com sucesso!")
    }

    isLogado(){
      return Boolean(localStorage.getItem("LOGGED_IN"))
    }

    getUsuarioLogado(){
      return localStorage.getItem("LOGGED_IN_USERNAME")
    }

    setUsuarioLogado(username: string){
      localStorage.setItem("LOGGED_IN", "true")
      localStorage.setItem("LOGGED_IN_USERNAME", username)
    }
}
