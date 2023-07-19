import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-ajuda-loja',
  templateUrl: './modal-ajuda-loja.component.html',
  styleUrls: ['./modal-ajuda-loja.component.css']
})
export class ModalAjudaLojaComponent implements OnInit {

  @Input() mostrarModal: boolean
  @Output() mostrarModalChange = new EventEmitter<boolean>();
  paginaModalAjuda = 0;
  tituloModal: string;

  constructor() { }

  ngOnInit(): void {
    this.tituloModal = 'Boas Vindas'
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
        this.tituloModal = 'Boas Vindas';
        break;
      case 1:
        this.tituloModal = 'Atributos do Stefamon';
        break;
      default:
        break;
    }
  }

}
