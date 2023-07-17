import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Jogador } from 'src/app/models/Jogador.model';
import { Page } from 'src/app/shared/models/Page.model';
import { ResultadoBatalha } from 'src/app/shared/models/ResultadoBatalha.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LogicaBatalhaService } from 'src/app/shared/services/batalha/logica-batalha/logica-batalha.service';
import { BatalhaService } from 'src/app/shared/services/batalha/requests/batalha.service';
import { JogadorService } from 'src/app/shared/services/jogador/jogador.service';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { LogRodadaService } from 'src/app/shared/services/log-rodada/log-rodada.service';
import { Batalha } from 'src/app/models/Batalha.model';

@Component({
  selector: 'app-listar-oponentes',
  templateUrl: './listar-oponentes.component.html',
  styleUrls: ['./listar-oponentes.component.css']
})
export class ListarOponentesComponent implements OnInit {

  paginaJogadores = new Page<Jogador>();
  sugestaoJogadores: Jogador[] = [];
  usuarioLogado?: Jogador;
  mostrarModalHistoricoBatalha = false;

  private readonly PAGINA_INICIAL = 0;
  private readonly QTD_OPONENTES_PAGINA = 3;
  private readonly TAMANHO_PAGINA = 30;

  inicioListaSugestao = this.PAGINA_INICIAL;
  fimListaSugestao = this.QTD_OPONENTES_PAGINA;

  constructor(
    private jogadorService: JogadorService,
    private authService: AuthService,
    private logicaBatalhaService: LogicaBatalhaService,
    private logsRodadaService: LogRodadaService,
    private batalhaService: BatalhaService,
    private loadingService: LoadingService,
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

  async batalhar(oponente: Jogador){
    this.loadingService.mostrarCarregamento('Batalha em andamento...');
    const [vencedor, perdedor] = this.logicaBatalhaService.iniciarBatalha(this.usuarioLogado, oponente);
    
    const batalha: Batalha = await this.batalhaService.salvarBatalha(this.usuarioLogado.id, oponente.id, vencedor.id === this.usuarioLogado.id).toPromise();
    
    const logsBatalha = this.logsRodadaService.getLogsBatalha();
    await this.logsRodadaService.salvarLogsBatalha(batalha.id).toPromise();
    this.authService.atualizarJogadorLogado();
    
    const resultadoBatalha: ResultadoBatalha = {
      vencedor: vencedor,
      perdedor: perdedor, 
      idBatalha: batalha.id,
      moedasObtidas: batalha.moedasObtidas, 
      logsBatalha: logsBatalha}

    setTimeout(() => {
      const extras: NavigationExtras = { state: resultadoBatalha, relativeTo: this.activatedRoute}
      this.loadingService.pararCarregamento();
      this.router.navigate(['resultado'], extras)
    }, 3000)
  }

  mostrarModalHistoricoBatalhas(){
    this.mostrarModalHistoricoBatalha = true;
  }

}
