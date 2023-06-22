import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Jogador } from 'src/app/models/Jogador.model';
import { environment } from 'src/environments/environment.prod';
import { Page } from '../../models/Page.model';

@Injectable({
  providedIn: 'root'
})
export class JogadorService {

  private readonly URL: string = `${environment.urlBackend}/jogador`

  constructor(
    private http: HttpClient
  ) { }

  buscarPorId(id: number): Observable<Jogador>{
    return this.http.get<Jogador>(`${this.URL}/${id}`)
  }

  buscarPorUsername(username: string): Observable<Jogador>{
    return this.http.get<Jogador>(`${this.URL}/${username}`)
  }

  comprarStefamon(idJogador: number, idStefamon: number): Observable<Jogador>{
    return this.http.put<Jogador>(`${this.URL}/${idJogador}/comprar-stefamon/${idStefamon}`, {})
  }

  venderStefamon(idJogador: number, idStefamon:number): Observable<Jogador>{
    return this.http.delete<Jogador>(`${this.URL}/${idJogador}/vender-stefamon/${idStefamon}`, {})
  }

  buscarTodosPaginado(paginacao: Page<Jogador>){
    return this.http.get<Page<Jogador>>(this.URL, {
      params:{
        pagina: paginacao.pagina.toString(),
        tamanhoPagina: paginacao.tamanhoPagina.toString()
      }
    });
  }

}
