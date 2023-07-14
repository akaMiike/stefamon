import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Batalha } from 'src/app/models/Batalha.model';
import { LogRodada } from 'src/app/models/LogRodada.model';
import { environment } from 'src/environments/environment.prod';
import { Page } from '../../../models/Page.model';

@Injectable({
  providedIn: 'root'
})
export class BatalhaService {

  private readonly URL: string = `${environment.urlBackend}/batalha`

  constructor(private http: HttpClient) { }

  buscarBatalhasPorJogador(idJogador: number, paginacao: Page<Batalha>){
    return this.http.get<Page<Batalha>>(`${this.URL}/${idJogador}`, {
      params: {
        pagina: paginacao.pagina.toString(),
        tamanhoPagina: paginacao.tamanhoPagina.toString()
      }
    });
  }

  salvarBatalha(idJogador: number, idOponente: number, jogadorVenceu: boolean){
    return this.http.post<Batalha>(this.URL, {
      idJogador: idJogador,
      idOponente: idOponente,
      jogadorVenceu: jogadorVenceu
    })
  }

  criarLogsBatalha(idBatalha: number, logsBatalha: LogRodada[]){
    return this.http.post(`${this.URL}/${idBatalha}/logs`, logsBatalha)
  }

  obterLogsBatalha(idBatalha: number){
    return this.http.get(`${this.URL}/${idBatalha}/logs`)
  }
}
