import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Jogador } from 'src/app/models/Jogador.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-stefamon',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.css'],
  providers: []
})
export class LojaComponent implements OnInit {

  private readonly OPCAO_MENU_COMPRAR_STEFAMONS = 0;
  private readonly OPCAO_MENU_MEUS_STEFAMONS = 1;

  usuarioEstaLogado: boolean;
  dadosUsuarioLogado?: Jogador;
  opcaoMenuLoja: number = this.OPCAO_MENU_COMPRAR_STEFAMONS;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    let redirecionadoPelaHome = this.router.getCurrentNavigation().extras.state?.fromHome;
    if(redirecionadoPelaHome){
      this.trocarOpcaoMenu(this.OPCAO_MENU_MEUS_STEFAMONS);
    }
  }

  ngOnInit(): void {
    this.authService.usuarioLogado.subscribe((jogadorLogado) => {
        this.usuarioEstaLogado = !!jogadorLogado
        this.dadosUsuarioLogado = jogadorLogado
    });
  }

  trocarOpcaoMenu(opcao: number){
    this.opcaoMenuLoja = opcao;
  }
}
