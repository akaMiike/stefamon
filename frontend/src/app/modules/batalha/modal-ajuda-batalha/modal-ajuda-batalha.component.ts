import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-ajuda-batalha',
  templateUrl: './modal-ajuda-batalha.component.html',
  styleUrls: ['./modal-ajuda-batalha.component.css']
})
export class ModalAjudaBatalhaComponent implements OnInit {

  @Input() mostrarModal: boolean
  @Output() mostrarModalChange = new EventEmitter<boolean>();
  paginaModalAjuda = 0;
  tituloModal: string;

  constructor() { }

  ngOnInit(): void {
    this.tituloModal = 'Modo contra Jogador'
  }

  fecharModal(){
    this.paginaModalAjuda = 0;
    this.mostrarModal = false;
    this.mostrarModalChange.emit(this.mostrarModal);
  }

  proximaPagina(){
    this.paginaModalAjuda++;
    this.trocarTituloModal();
  }

  paginaAnterior(){
    this.paginaModalAjuda--;
    this.trocarTituloModal();
  }

  trocarTituloModal(){
    switch(this.paginaModalAjuda){
      case 0:
        this.tituloModal = 'Modo contra Jogador';
        break;
      case 1:
        this.tituloModal = 'Modo contra Bot';
        break;
      case 2:
        this.tituloModal = 'Stefamons';
        break;
      case 3:
        this.tituloModal = 'Resultado da Batalha';
        break;
      default:
        break;
    }
  }

}
