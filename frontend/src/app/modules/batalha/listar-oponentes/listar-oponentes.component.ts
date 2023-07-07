import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
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
  usuarioLogado?: Jogador;

  private readonly PAGINA_INICIAL = 0;
  private readonly QTD_OPONENTES_PAGINA = 3;
  private readonly TAMANHO_PAGINA = 30;

  inicioListaSugestao = this.PAGINA_INICIAL;
  fimListaSugestao = this.QTD_OPONENTES_PAGINA;

  constructor(
    private jogadorService: JogadorService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.paginaJogadores.tamanhoPagina = this.TAMANHO_PAGINA;
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

    this.inicioListaSugestao += this.QTD_OPONENTES_PAGINA
    this.fimListaSugestao += Math.min(
      this.QTD_OPONENTES_PAGINA,
      this.paginaJogadores.elementos.length - this.fimListaSugestao
    );
    
    if(this.inicioListaSugestao >= this.paginaJogadores.elementos.length){
      const isUltimaPagina = this.paginaJogadores.pagina > Math.ceil(this.paginaJogadores.totalElementos / this.paginaJogadores.tamanhoPagina);
      this.paginaJogadores.pagina = isUltimaPagina ? this.PAGINA_INICIAL : this.paginaJogadores.pagina++;

      this.jogadorService.buscarTodosPaginado(this.paginaJogadores).subscribe(paginaJogadores => {
        this.paginaJogadores.totalElementos = paginaJogadores.totalElementos;
        this.paginaJogadores.elementos = paginaJogadores.elementos.filter(j => j.nickname != this.usuarioLogado?.nickname);

        this.inicioListaSugestao = this.PAGINA_INICIAL;
        this.fimListaSugestao = Math.min(this.QTD_OPONENTES_PAGINA, this.paginaJogadores.elementos.length);
      });
    }
  }

  batalhar(oponente: Jogador){
    const extras: NavigationExtras = { state: {oponente: oponente}, relativeTo: this.activatedRoute}
    this.router.navigate(['resultado'], extras)
  }

}
