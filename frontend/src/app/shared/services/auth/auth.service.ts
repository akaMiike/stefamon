import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { Jogador } from 'src/app/models/Jogador.model';
import { environment } from 'src/environments/environment.prod';
import { JogadorService } from '../jogador/jogador.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticatedSubject: BehaviorSubject<Jogador|null> = new BehaviorSubject<Jogador>(null);
  public usuarioLogado: Observable<Jogador|null> = this._isAuthenticatedSubject.asObservable();

  private readonly URL = `${environment.urlBackend}`

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private jogadorService: JogadorService
  ) { }

    registrar(nickname: string, password: string, avatar: string){
      return this.http.post(`${this.URL}/jogador/registrar`, {
        nickname: nickname,
        password: password,
        nomeArquivoAvatar: avatar
      })
  }

    login(nickname: string, password: string){
      this.http.post(`${this.URL}/jogador/login`, {
        nickname: nickname,
        password: password
      }).pipe(
        tap(() => {
          this.messageService.add({severity:'success', summary:'Login', detail: 'Login realizado com sucesso.'})
          this.obterDadosJogadorLogado(nickname);
        })
      ).subscribe();
    }

    logout(){
      this.atualizarJogadorLogado(null);
      this.messageService.add({severity:'success', summary:'Logout', detail: 'Logout realizado com sucesso.'})
    }

    isLogado(){
      return !!this._isAuthenticatedSubject.getValue();
    }

    atualizarJogadorLogado(jogadorAtualizado: Jogador){
      this._isAuthenticatedSubject.next(jogadorAtualizado);
    }

    private obterDadosJogadorLogado(username: string){
      this.jogadorService.buscarPorUsername(username).subscribe(jogador => {
        this.atualizarJogadorLogado(jogador);
      })
    }
}
