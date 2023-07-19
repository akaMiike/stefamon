import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-boas-vindas',
  templateUrl: './modal-boas-vindas.component.html',
  styleUrls: ['./modal-boas-vindas.component.css']
})
export class ModalBoasVindasComponent implements OnInit {

  @Input() mostrarModal: boolean
  @Output() mostrarModalChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  fecharModal(){
    this.mostrarModal = false;
    this.mostrarModalChange.emit(this.mostrarModal);
  }

}
