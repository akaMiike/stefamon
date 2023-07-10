import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Jogador } from 'src/app/models/Jogador.model';
import { Stefamon } from 'src/app/models/Stefamon.model';
import { AuthService } from '../../services/auth/auth.service';
import { JogadorService } from '../../services/jogador/jogador.service';

@Component({
  selector: 'app-modal-confirmacao-loja',
  templateUrl: './modal-confirmacao-loja.component.html',
  styleUrls: ['./modal-confirmacao-loja.component.css']
})
export class ModalConfirmacaoLojaComponent implements OnInit {

  @Input() isCompra: boolean
  @Input() mostrarModal: boolean
  @Output() mostrarModalChange = new EventEmitter<boolean>()
  @Input() stefamonEscolhido: Stefamon
  dadosJogador: Jogador
  saldoAposAcao: number

  constructor(
    private jogadorService: JogadorService,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.authService.usuarioLogado.subscribe(jogador => {
      this.dadosJogador = jogador;

      if(this.isCompra){
        this.saldoAposAcao = this.dadosJogador.saldo - this.stefamonEscolhido.preco
      } else{
        this.saldoAposAcao = this.dadosJogador.saldo + this.stefamonEscolhido.preco
      }
    });
  }

  confirmarAcao(){
    if(this.isCompra){
      this.confirmarCompra();
    }
    else{
      this.confirmarVenda();
    }
  }

  confirmarCompra(){
    this.jogadorService.comprarStefamon(this.dadosJogador.id, this.stefamonEscolhido.id).subscribe((jogadorAtualizado) => {
      this.authService.atualizarJogadorLogado(jogadorAtualizado);
      this.messageService.add({severity: 'success', summary:'Compra realizada', detail:'Stefamon comprado com sucesso.'})
    })
    this.fecharModal();
  }

  confirmarVenda(){
    this.jogadorService.venderStefamon(this.dadosJogador.id, this.stefamonEscolhido.id).subscribe((jogadorAtualizado) => {
      this.authService.atualizarJogadorLogado(jogadorAtualizado);
    })
    this.messageService.add({severity:'success', summary:'Venda realizada', detail:'O stefamon foi vendido com sucesso.'})
    this.fecharModal();
  }

  fecharModal(){
    this.mostrarModal = false;
    this.mostrarModalChange.emit(this.mostrarModal);
  }

}
