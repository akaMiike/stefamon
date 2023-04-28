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


  register(nickname: string, password: string){
    return this.http.post(this.URL, {
      nickname: nickname,
      password: password
    })
  }
}
