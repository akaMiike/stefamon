import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Jogador } from 'src/app/models/Jogador.model';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuantidadeStefamonGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ){}

  private jogadorLogado?: Jogador;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.authService.usuarioLogado.subscribe(jogador => this.jogadorLogado = jogador);
    
      if(!this.authService.isLogado()){
        this.router.navigate(['/home']);
        return false;
      }
      else{
        if(this.jogadorLogado.stefamons.length === 0){
          this.messageService.add({severity: 'warn', summary:'Obrigatório ter Stefamons.', detail:'Você deve possuir ao menos 1 stefamon para participar da batalha.'})
          return false;
        }
        else{
          return true;
        }
      }
  }
  
}
