import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class JogadorService {

  private readonly URL: string = `${environment.urlBackend}/jogador`

  constructor(
    private http: HttpClient
  ) { }

}
