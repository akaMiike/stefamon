import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { Jogador } from 'src/app/models/Jogador.model';
import { Page } from 'src/app/shared/models/Page.model';
import { JogadorService } from 'src/app/shared/services/jogador/jogador.service';

@Component({
  selector: 'app-modal-ranking-jogadores',
  templateUrl: './modal-ranking-jogadores.component.html',
  styleUrls: ['./modal-ranking-jogadores.component.css']
})
export class ModalRankingJogadoresComponent implements OnInit {

  @Input() mostrarModal = false;
  @Output() mostrarModalChange = new EventEmitter<boolean>();
  paginaRankingJogadores = new Page<Jogador>();

  constructor(
    private jogadorService: JogadorService
  ) { }

  ngOnInit(): void {
    this.paginaRankingJogadores.tamanhoPagina = 5;
    this.paginaRankingJogadores.pagina = 0;
  }

  fecharModal(){
    this.mostrarModal = false;
    this.mostrarModalChange.emit(this.mostrarModal);
  }

  obterProximaPagina(event: LazyLoadEvent){
    this.paginaRankingJogadores.pagina = event.first / event.rows;
    this.jogadorService.buscarRankingUsuarios(this.paginaRankingJogadores).subscribe(pagina => {
      this.paginaRankingJogadores.elementos = pagina.elementos;
      this.paginaRankingJogadores.totalElementos = pagina.totalElementos;
    })
  }

}
