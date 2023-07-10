import { Component, OnInit } from '@angular/core';
import { Jogador } from 'src/app/models/Jogador.model';
import { Stefamon } from 'src/app/models/Stefamon.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-meus-stefamons',
  templateUrl: './meus-stefamons.component.html',
  styleUrls: ['./meus-stefamons.component.css']
})
export class MeusStefamonsComponent implements OnInit {

  dadosJogador?: Jogador;
  stefamonEscolhido: Stefamon;
  mostrarModalConfirmacao: boolean = false;

  constructor(
    private authService: AuthService
  ){ }

  ngOnInit(): void {
    this.authService.usuarioLogado.subscribe(jogadorLogado => this.dadosJogador = jogadorLogado);
  }

  escolherStefamonVenda(stefamon: Stefamon){
    this.stefamonEscolhido = stefamon;
    this.mostrarModalConfirmacao = true;
  }

}
