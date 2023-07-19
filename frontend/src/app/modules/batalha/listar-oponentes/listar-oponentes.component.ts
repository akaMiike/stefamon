import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Jogador } from 'src/app/models/Jogador.model';
import { Page } from 'src/app/shared/models/Page.model';
import { EnumDificuldadeBot } from 'src/app/shared/models/EnumDIficuldadeBot.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LogicaBatalhaService } from 'src/app/shared/services/batalha/logica-batalha/logica-batalha.service';
import { JogadorService } from 'src/app/shared/services/jogador/jogador.service';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { StefamonService } from 'src/app/shared/services/stefamon/stefamon.service';
import { Stefamon } from 'src/app/models/Stefamon.model';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-listar-oponentes',
  templateUrl: './listar-oponentes.component.html',
  styleUrls: ['./listar-oponentes.component.css']
})
export class ListarOponentesComponent implements OnInit {

  private readonly PAGINA_INICIAL = 0;
  private readonly QTD_OPONENTES_PAGINA = 3;
  private readonly TAMANHO_PAGINA = 30;

  paginaJogadores = new Page<Jogador>();
  paginaStefamonsBot = new Page<Stefamon>();
  sugestaoJogadores: Jogador[] = [];
  usuarioLogado?: Jogador;
  
  dadosBot: Jogador = this.logicaBatalhaService.getDadosBot();
  dificuldadeBotEscolhida = EnumDificuldadeBot.SEM_BOT;
  dificuldadesBot: SelectItem[];

  mostrarModalHistoricoBatalha = false;
  mostrarModalRankingJogadores = false;
  mostrarModalAjudaBatalha = false;
  modoContraBot = false;

  inicioListaSugestaoJogadores = this.PAGINA_INICIAL;
  fimListaSugestaoJogadores = this.QTD_OPONENTES_PAGINA;

  constructor(
    private jogadorService: JogadorService,
    private authService: AuthService,
    private stefamonService: StefamonService,
    private logicaBatalhaService: LogicaBatalhaService,
    private loadingService: LoadingService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.paginaJogadores.tamanhoPagina = this.TAMANHO_PAGINA;
    this.authService.usuarioLogado.subscribe(jogador => {this.usuarioLogado = jogador})
  
    this.dificuldadesBot = [
      {label: 'Fácil', value: EnumDificuldadeBot.FACIL},
      {label: 'Médio', value: EnumDificuldadeBot.MEDIO},
      {label: 'Difícil', value: EnumDificuldadeBot.DIFICIL},
    ]

    this.buscarTodosStefamons();
    this.jogadorService.buscarTodosPaginado(this.paginaJogadores).subscribe(paginaJogadores => {
      this.paginaJogadores.totalElementos = paginaJogadores.totalElementos;
      this.paginaJogadores.elementos = paginaJogadores.elementos.filter(j => j.nickname != this.usuarioLogado?.nickname);
      this.atualizarSugestaoJogadores();
    });
  }

  atualizarSugestaoJogadores(){
    this.sugestaoJogadores = this.paginaJogadores.elementos.slice(
      this.inicioListaSugestaoJogadores,
      this.fimListaSugestaoJogadores
    );

    this.inicioListaSugestaoJogadores += this.QTD_OPONENTES_PAGINA
    this.fimListaSugestaoJogadores += Math.min(
      this.QTD_OPONENTES_PAGINA,
      this.paginaJogadores.elementos.length - this.fimListaSugestaoJogadores
    );
    
    if(this.inicioListaSugestaoJogadores >= this.paginaJogadores.elementos.length){
      const isUltimaPagina = this.paginaJogadores.pagina > Math.ceil(this.paginaJogadores.totalElementos / this.paginaJogadores.tamanhoPagina);
      this.paginaJogadores.pagina = isUltimaPagina ? this.PAGINA_INICIAL : this.paginaJogadores.pagina++;

      this.jogadorService.buscarTodosPaginado(this.paginaJogadores).subscribe(paginaJogadores => {
        this.paginaJogadores.totalElementos = paginaJogadores.totalElementos;
        this.paginaJogadores.elementos = paginaJogadores.elementos.filter(j => j.nickname != this.usuarioLogado?.nickname);

        this.inicioListaSugestaoJogadores = this.PAGINA_INICIAL;
        this.fimListaSugestaoJogadores = Math.min(this.QTD_OPONENTES_PAGINA, this.paginaJogadores.elementos.length);
      });
    }
  }

  async batalhar(oponente: Jogador){
    this.loadingService.mostrarCarregamento('Batalha em andamento...');

    const resultadoBatalha = await this.logicaBatalhaService.batalhar(
      this.usuarioLogado, oponente, this.dificuldadeBotEscolhida
      );

    setTimeout(() => {
      const extras: NavigationExtras = { state: resultadoBatalha, relativeTo: this.activatedRoute}
      this.loadingService.pararCarregamento();
      this.router.navigate(['resultado'], extras)
    }, 3000)
  }

  mostrarModalHistoricoBatalhas(){
    this.mostrarModalHistoricoBatalha = true;
  }

  mostrarModalRanking(){
    this.mostrarModalRankingJogadores = true;
  }

  mostrarModalAjuda(){
    this.mostrarModalAjudaBatalha = true;
  }

  buscarTodosStefamons(){
    this.paginaStefamonsBot.tamanhoPagina = 100;
    this.stefamonService.listarTodos(this.paginaStefamonsBot).subscribe(pagina => {
     this.paginaStefamonsBot.elementos = pagina.elementos;
    });
  }

  alterarQntdStefamonsBot(dificuldadeBot: EnumDificuldadeBot){
    let numStefamons = 0;
    this.dadosBot.stefamons = [];
    this.dificuldadeBotEscolhida = dificuldadeBot;

    switch(dificuldadeBot){
      case EnumDificuldadeBot.FACIL:
        numStefamons = 2;
        break;
      case EnumDificuldadeBot.MEDIO:
        numStefamons = 4;
        break;
      case EnumDificuldadeBot.DIFICIL:
        numStefamons = 6;
        break;
      default:
        break;
    }

    for(let i = 0; i < numStefamons; i++){
      let escolhaStefamonBot = this.paginaStefamonsBot.elementos[Math.floor(Math.random() * this.paginaStefamonsBot.elementos.length)]
      this.dadosBot.stefamons.push(escolhaStefamonBot);
    }
  }

  alterarModoJogo(){
    if(this.modoContraBot){
      this.dificuldadeBotEscolhida = EnumDificuldadeBot.SEM_BOT;
      this.atualizarSugestaoJogadores();
    }
    else{
      this.dificuldadeBotEscolhida = EnumDificuldadeBot.FACIL;
      this.alterarQntdStefamonsBot(this.dificuldadeBotEscolhida);
      this.sugestaoJogadores = [this.dadosBot];
    }
    
    this.modoContraBot = !this.modoContraBot;
  }

}
