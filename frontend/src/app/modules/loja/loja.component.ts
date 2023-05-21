import { Component, OnInit } from '@angular/core';
import { Jogador } from 'src/app/models/Jogador.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { JogadorService } from 'src/app/shared/services/jogador.service';

@Component({
  selector: 'app-stefamon',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.css'],
  providers: []
})
export class LojaComponent implements OnInit {

  usuarioEstaLogado: boolean;
  dadosUsuarioLogado: Jogador;
  opcaoMenuLoja: number = 0;

  constructor(
    private authService: AuthService,
    private jogadorService: JogadorService
  ) {}

  ngOnInit(): void {
    this.authService.isLogado().subscribe((estaLogado) => {
      this.usuarioEstaLogado = estaLogado;
      
      if(estaLogado){
        this.buscarDadosUsuarioLogado();
      }
      else{
        this.dadosUsuarioLogado = null;
      }
    });
  }

  trocarOpcaoMenu(opcao: number){
    this.opcaoMenuLoja = opcao;
  }

  buscarDadosUsuarioLogado(){
    this.jogadorService.buscarPorUsername(this.authService.getUsuarioLogado()).subscribe((dadosUsuario) => {
      this.dadosUsuarioLogado = dadosUsuario;
    })
  }
}
