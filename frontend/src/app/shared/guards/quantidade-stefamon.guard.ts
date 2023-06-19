import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { JogadorService } from '../services/jogador/jogador.service';

@Injectable({
  providedIn: 'root'
})
export class QuantidadeStefamonGuard implements CanActivate {
  constructor(
    private jogadorService: JogadorService,
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const jogadorLogado = this.authService.getUsuarioLogado();
    
      if(!jogadorLogado){
        this.router.navigate(['/home']);
        return false;
      }
      else{
        return this.jogadorService.buscarPorUsername(jogadorLogado).pipe(
          map((dadosJogador) => {
            if(dadosJogador.stefamons.length === 0){
              alert('Você deve possuir ao menos 1 stefamon para participar da batalha.');
              return false;
            }
            else{
              return true;
            }
          })
        );
      }
  }
  
}
