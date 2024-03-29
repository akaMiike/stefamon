import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Jogador } from 'src/app/models/Jogador.model';
import { ResultadoBatalha } from 'src/app/shared/models/ResultadoBatalha.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-resultado-batalha',
  templateUrl: './resultado-batalha.component.html',
  styleUrls: ['./resultado-batalha.component.css']
})
export class ResultadoBatalhaComponent implements OnInit {
  
  resultadoBatalha: ResultadoBatalha
  isJogadorLogadoVencedor: boolean;
  dadosJogador: Jogador;
  dadosOponente: Jogador;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    if(this.router.getCurrentNavigation() != null){
      this.resultadoBatalha = this.router.getCurrentNavigation().extras.state as ResultadoBatalha;
    }
   }

  ngOnInit(): void {
    this.authService.usuarioLogado.subscribe(jogador => {
      this.dadosJogador = jogador
      this.isJogadorLogadoVencedor = this.resultadoBatalha.vencedor.id === this.dadosJogador.id;
      this.dadosOponente = this.isJogadorLogadoVencedor ? this.resultadoBatalha.perdedor : this.resultadoBatalha.vencedor
    });
  }

  redirecionarParaLoja(){
    this.router.navigate(['loja']);
  }

  redirecionarParaListarOponentes(){
    this.router.navigate(['batalhar']);
  }

}
