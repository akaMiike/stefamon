import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Stefamon } from 'src/app/models/Stefamon.model';
import { Injectable } from '@angular/core';
import { Page } from '../../models/Page.model';

@Injectable({
  providedIn: 'root'
})
export class StefamonService {

  private readonly URL: string = `${environment.urlBackend}/stefamon`

  constructor(
    private http: HttpClient
  ) { }

  listarTodos(paginacao: Page<Stefamon>): Observable<Page<Stefamon>>{
    return this.http.get<Page<Stefamon>>(this.URL + "/todos", {
      params: {
        pagina: (paginacao.pagina).toString(),
        tamanhoPagina: paginacao.tamanhoPagina.toString(),
        ordem: paginacao.valorOrdenacao,
        ...(paginacao.colunaOrdenacao == null ? {} : {coluna: paginacao.colunaOrdenacao}),
        ...(paginacao.filtros ?? {})
      }
    });
  }

}
