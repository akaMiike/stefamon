import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Jogador } from 'src/app/models/Jogador.model';
import { Stefamon } from 'src/app/models/Stefamon.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { JogadorService } from 'src/app/shared/services/jogador/jogador.service';

@Component({
  selector: 'app-meus-stefamons',
  templateUrl: './meus-stefamons.component.html',
  styleUrls: ['./meus-stefamons.component.css']
})
export class MeusStefamonsComponent implements OnInit {

  dadosJogador?: Jogador;
  
  stefamonEscolhido: Stefamon;
  mostrarModalConfirmacao: boolean = false;

  constructor(
    private jogadorService: JogadorService,
    private authService: AuthService,
    private messageService: MessageService
  ){ }

  ngOnInit(): void {
    this.authService.usuarioLogado.subscribe(jogadorLogado => this.dadosJogador = jogadorLogado);
  }


  escolherStefamonVenda(stefamon: Stefamon){
    this.mostrarModalConfirmacao = true;
    this.stefamonEscolhido = stefamon;
  }

  venderStefamon(){
    this.jogadorService.venderStefamon(this.dadosJogador.id, this.stefamonEscolhido.id).subscribe((jogadorAtualizado) => {
      this.authService.atualizarJogadorLogado(jogadorAtualizado);
    })
    this.messageService.add({severity:'success', summary:'Venda realizada', detail:'O stefamon foi vendido com sucesso.'})
    this.mostrarModalConfirmacao = false;
  }

}
