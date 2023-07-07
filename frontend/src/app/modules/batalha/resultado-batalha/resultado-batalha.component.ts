import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Jogador } from 'src/app/models/Jogador.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { BatalhaService } from 'src/app/shared/services/batalha/batalha.service';

@Component({
  selector: 'app-resultado-batalha',
  templateUrl: './resultado-batalha.component.html',
  styleUrls: ['./resultado-batalha.component.css']
})
export class ResultadoBatalhaComponent implements OnInit {
  
  dadosOponente: Jogador;
  dadosJogador?: Jogador;
  isJogadorLogadoVencedor: boolean;

  constructor(
    private authService: AuthService,
    private batalhaService: BatalhaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dadosOponente = this.router.getCurrentNavigation().extras.state.oponente;
    this.authService.usuarioLogado.subscribe(jogador => this.dadosJogador = jogador);
    this.isJogadorLogadoVencedor = this.obterResultadoBatalha().id === this.dadosJogador.id;
  }

  obterResultadoBatalha(): Jogador{
    return this.batalhaService.iniciarBatalha(this.dadosJogador, this.dadosOponente);
  }

}
