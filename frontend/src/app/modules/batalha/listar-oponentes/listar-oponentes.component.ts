import { Component, OnInit } from '@angular/core';
import { Jogador } from 'src/app/models/Jogador.model';
import { Page } from 'src/app/shared/models/Page.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { JogadorService } from 'src/app/shared/services/jogador/jogador.service';

@Component({
  selector: 'app-listar-oponentes',
  templateUrl: './listar-oponentes.component.html',
  styleUrls: ['./listar-oponentes.component.css']
})
export class ListarOponentesComponent implements OnInit {

  paginaJogadores = new Page<Jogador>();
  sugestaoJogadores: Jogador[] = [];

  inicioListaSugestao = 0;
  fimListaSugestao = 3;


  constructor(
    private jogadorService: JogadorService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.paginaJogadores.tamanhoPagina = 30;
    this.jogadorService.buscarTodosPaginado(this.paginaJogadores).subscribe(paginaJogadores => {
      this.paginaJogadores.totalElementos = paginaJogadores.totalElementos;
      this.paginaJogadores.elementos = paginaJogadores.elementos.filter(j => j.nickname != this.authService.getUsuarioLogado());
      this.atualizarSugestaoJogadores();
    });
  }

  atualizarSugestaoJogadores(){
    console.log("inicioLista: " + this.inicioListaSugestao);
    console.log("fimLista: " + this.fimListaSugestao);

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
        this.paginaJogadores.elementos = paginaJogadores.elementos.filter(j => j.nickname != this.authService.getUsuarioLogado());

        this.inicioListaSugestao = 0;
        this.fimListaSugestao = Math.min(3, this.paginaJogadores.elementos.length);
      });
    }
  }

}
