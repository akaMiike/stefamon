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
  @Input() mostrarModal: boolean
  @Output() mostrarModalChange = new EventEmitter<boolean>()
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
      this.batalhaService.buscarBatalhasPorJogador(this.dadosJogadorLogado.id, this.paginaHistoricoBatalha).subscribe(batalhas => {
        this.paginaHistoricoBatalha.totalElementos = batalhas.totalElementos;
        this.paginaHistoricoBatalha.elementos = batalhas.elementos;
      });
    });
  }

  fecharModal(){
    this.mostrarModal = false;
    this.mostrarModalChange.emit(this.mostrarModal);
  }

  obterProximaPagina(event: LazyLoadEvent){
    this.paginaHistoricoBatalha.pagina = event.first / event.rows;
    this.batalhaService.buscarBatalhasPorJogador(this.dadosJogadorLogado.id, this.paginaHistoricoBatalha).subscribe(batalhas => {
      this.paginaHistoricoBatalha.totalElementos = batalhas.totalElementos;
      this.paginaHistoricoBatalha.elementos = batalhas.elementos;
    });

  }

}
