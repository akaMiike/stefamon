import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Jogador } from 'src/app/models/Jogador.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class JogadorService {

  private readonly URL: string = `${environment.urlBackend}/jogador`

  constructor(
    private http: HttpClient
  ) { }

  buscarPorUsername(username: string): Observable<Jogador>{
    return this.http.get<Jogador>(this.URL, {
      params:{
        nome: username
      }
    })
  }

  comprarStefamon(idJogador: number, idStefamon: number): Observable<Jogador>{
    return this.http.put<Jogador>(`${this.URL}/${idJogador}/comprar-stefamon/${idStefamon}`, {})
  }

}
