import { Component, OnInit } from '@angular/core';
import { Jogador } from 'src/app/models/Jogador.model';
import { Page } from 'src/app/shared/models/Page.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { BatalhaService } from 'src/app/shared/services/batalha/batalha.service';
import { JogadorService } from 'src/app/shared/services/jogador/jogador.service';

@Component({
  selector: 'app-listar-oponentes',
  templateUrl: './listar-oponentes.component.html',
  styleUrls: ['./listar-oponentes.component.css']
})
export class ListarOponentesComponent implements OnInit {

  paginaJogadores = new Page<Jogador>();
  sugestaoJogadores: Jogador[] = [];
  usuarioLogado?: Jogador;

  inicioListaSugestao = 0;
  fimListaSugestao = 3;

  constructor(
    private jogadorService: JogadorService,
    private authService: AuthService,
    private batalhaService: BatalhaService
    ) { }

  ngOnInit(): void {
    this.paginaJogadores.tamanhoPagina = 30;
    this.authService.usuarioLogado.subscribe(jogador => {this.usuarioLogado = jogador})

    this.jogadorService.buscarTodosPaginado(this.paginaJogadores).subscribe(paginaJogadores => {
      this.paginaJogadores.totalElementos = paginaJogadores.totalElementos;
      this.paginaJogadores.elementos = paginaJogadores.elementos.filter(j => j.nickname != this.usuarioLogado?.nickname);
      this.atualizarSugestaoJogadores();
    });
  }

  atualizarSugestaoJogadores(){
    this.sugestaoJogadores = this.paginaJogadores.elementos.slice(
      this.inicioListaSugestao,
      this.fimListaSugestao
    );

    this.inicioListaSugestao += 3
    this.fimListaSugestao += Math.min(3, this.paginaJogadores.elementos.length - this.fimListaSugestao);
    
    if(this.inicioListaSugestao >= this.paginaJogadores.elementos.length){
      const ultimaPagina = this.paginaJogadores.pagina > Math.ceil(this.paginaJogadores.totalElementos / this.paginaJogadores.tamanhoPagina);
      this.paginaJogadores.pagina = ultimaPagina ? 0 : this.paginaJogadores.pagina++;

      this.jogadorService.buscarTodosPaginado(this.paginaJogadores).subscribe(paginaJogadores => {
        this.paginaJogadores.totalElementos = paginaJogadores.totalElementos;
        this.paginaJogadores.elementos = paginaJogadores.elementos.filter(j => j.nickname != this.usuarioLogado?.nickname);

        this.inicioListaSugestao = 0;
        this.fimListaSugestao = Math.min(3, this.paginaJogadores.elementos.length);
      });
    }
  }

  batalhar(oponente: Jogador){
    this.batalhaService.iniciarBatalha(this.usuarioLogado, oponente);
  }

}
