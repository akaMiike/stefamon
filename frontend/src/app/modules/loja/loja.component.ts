import { Component, OnInit } from '@angular/core';
import { Jogador } from 'src/app/models/Jogador.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-stefamon',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.css'],
  providers: []
})
export class LojaComponent implements OnInit {

  usuarioEstaLogado: boolean;
  dadosUsuarioLogado?: Jogador;
  opcaoMenuLoja: number = 0;

  constructor(
    private authService: AuthService
  ) {}

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
