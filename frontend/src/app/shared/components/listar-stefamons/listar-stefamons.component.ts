import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Jogador} from 'src/app/models/Jogador.model';
import {Stefamon} from 'src/app/models/Stefamon.model';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-listar-stefamons',
  templateUrl: './listar-stefamons.component.html',
  styleUrls: ['./listar-stefamons.component.css']
})
export class ListarStefamonsComponent implements OnInit, OnChanges {

  @Input() isCompra: boolean;
  @Input() isVenda: boolean;
  @Input() stefamons: Stefamon[];
  @Output() stefamonEscolhido = new EventEmitter<Stefamon>();
  dadosJogador: Jogador;

  constructor(
    private messageService: MessageService,
    private authService: AuthService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stefamons'].currentValue){
      this.stefamons = changes['stefamons'].currentValue;
    }
  }

  ngOnInit(): void {
    this.authService.usuarioLogado.subscribe(jogador => this.dadosJogador = jogador);
  }

  escolherStefamonCompra(stefamon: Stefamon){
    if(this.dadosJogador){
      if(this.dadosJogador.saldo < stefamon.preco){
        this.messageService.add({severity: 'warn', summary: 'Saldo insuficiente', detail: 'Você não possui saldo suficiente para realizar a compra.'})
      }
      else{
        this.stefamonEscolhido.emit(stefamon);
      }
    }
    else{
      this.messageService.add({severity: 'warn', summary: 'Login necessário', detail: 'Você deve estar logado para realizar a compra.'})
    }
  }

  escolherStefamonVenda(stefamon: Stefamon){
    this.stefamonEscolhido.emit(stefamon);
  }

}
