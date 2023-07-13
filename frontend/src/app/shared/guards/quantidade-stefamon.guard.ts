import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Jogador } from 'src/app/models/Jogador.model';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuantidadeStefamonGuard implements CanActivate{
  
  private jogadorLogado?: Jogador;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.authService.usuarioLogado.subscribe(jogador => this.jogadorLogado = jogador);

      if(!this.authService.isLogado()){
        return false;
      }
      else{
        if(this.jogadorLogado.stefamons.length === 0){
          this.messageService.add({severity: 'warn', summary:'Não possui Stefamons suficientes.', detail:'Você deve possuir ao menos 1 stefamon para participar da batalha.'})
          return false;
        }
        else{
          return true;
        }
      }
  }
  
}
