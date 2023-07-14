import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Batalha } from 'src/app/models/Batalha.model';
import { Jogador } from 'src/app/models/Jogador.model';
import { Page } from '../../models/Page.model';
import { AuthService } from '../../services/auth/auth.service';
import { BatalhaService } from '../../services/batalha/requests/batalha.service';

@Component({
  selector: 'app-modal-historico-batalhas',
  templateUrl: './modal-historico-batalhas.component.html',
  styleUrls: ['./modal-historico-batalhas.component.css']
})
export class ModalHistoricoBatalhasComponent implements OnInit {

  dadosJogadorLogado: Jogador;
  @Input() mostrarModal = false;
  @Output() mostrarModalChange = new EventEmitter<boolean>();
  dadosBatalhaEscolhido: Batalha;
  mostrarLogBatalha = false;
  mostrarHistoricoBatalha = true;
  paginaHistoricoBatalha = new Page<Batalha>();

  constructor(
    private authService: AuthService,
    private batalhaService: BatalhaService
  ) { }

  ngOnInit(): void {
    this.paginaHistoricoBatalha.pagina = 0;
    this.paginaHistoricoBatalha.tamanhoPagina = 5;

    this.authService.usuarioLogado.subscribe(jogador => {
      this.dadosJogadorLogado = jogador;
    });
  }

  obterProximaPagina(event: LazyLoadEvent){
    this.paginaHistoricoBatalha.pagina = event.first / event.rows;
    this.batalhaService.buscarBatalhasPorJogador(this.dadosJogadorLogado.id, this.paginaHistoricoBatalha).subscribe(batalhas => {
      this.paginaHistoricoBatalha.totalElementos = batalhas.totalElementos;
      this.paginaHistoricoBatalha.elementos = batalhas.elementos;
    });

  }

  fecharModal(){
    this.mostrarModal = false;
    this.mostrarModalChange.emit(this.mostrarModal);
  }

  isJogadorLogadoVencedorBatalha(batalha: Batalha){
    return (batalha.jogadorVenceu && batalha.nomeJogador === this.dadosJogadorLogado.nickname) ||
    (!batalha.jogadorVenceu && batalha.nomeOponente === this.dadosJogadorLogado.nickname)
  }

  visualizarLogBatalha(batalha: Batalha){
    this.dadosBatalhaEscolhido = batalha;
    this.mostrarHistoricoBatalha = false;
    this.mostrarLogBatalha = true;
  }

  voltarHistoricoBatalhas(){
    this.dadosBatalhaEscolhido = null;
    this.mostrarLogBatalha = false;
    this.mostrarHistoricoBatalha = true;
  }

}
