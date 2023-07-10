import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Jogador } from 'src/app/models/Jogador.model';
import { Stefamon } from 'src/app/models/Stefamon.model';
import { Page } from 'src/app/shared/models/Page.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { StefamonService } from 'src/app/shared/services/stefamon/stefamon.service';

@Component({
  selector: 'app-comprar-stefamons',
  templateUrl: './comprar-stefamons.component.html',
  styleUrls: ['./comprar-stefamons.component.css']
})
export class ComprarStefamonsComponent implements OnInit {

  dadosJogador?: Jogador;
  mostrarModalConfirmacao: boolean = false;
  stefamonEscolhido: Stefamon;

  paginacaoStefamon = new Page<Stefamon>();
  atributosStefamon: SelectItem[] = [];
  atributoSelecionado: string;
  direcoesOrdenacao: SelectItem[] = [];
  direcaoOrdenacao: string;

  constructor(
    private stefamonService: StefamonService,
    private authService: AuthService,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.authService.usuarioLogado.subscribe(jogadorLogado => {this.dadosJogador = jogadorLogado});

    this.atributosStefamon = [
      {label: "Vida", value: "vida"},
      {label: "Ataque", value:"ataque"},
      {label: "Defesa", value: "defesa"},
      {label: "Inteligencia", value: "inteligencia"},
      {label: "Velocidade", value: "velocidade"},
      {label: "Poder", value: "poder"}
    ]

    this.direcoesOrdenacao = [
      {label:"Menor para Maior", value: "ASC"},
      {label:"Maior para Maior", value: "DESC"}
    ]

    this.listarTodosStefamons();

  }

  paginacao(event){
    this.paginacaoStefamon.pagina = event.page
    this.listarTodosStefamons();
  }

  setColunaOrdenacao(){
    this.paginacaoStefamon.colunaOrdenacao = this.atributoSelecionado;
    this.direcaoOrdenacao = null;
  }

  buscarStefamonPorNome(event){
    this.paginacaoStefamon.pagina = 0
    this.paginacaoStefamon.filtros = event.target.value == '' ? {} : {nome: event.target.value};
    this.listarTodosStefamons();
  }

  listarTodosStefamons(){
    this.stefamonService.listarTodos(this.paginacaoStefamon).subscribe(res => {
      this.paginacaoStefamon.elementos = res.elementos;
      this.paginacaoStefamon.totalElementos = res.totalElementos;
    });
  }

  ordenacao(){
    if(this.paginacaoStefamon.valorOrdenacao === "ASC"){
      this.paginacaoStefamon.valorOrdenacao = "DESC"
    }
    else{
      this.paginacaoStefamon.valorOrdenacao = "ASC"
    }
    this.listarTodosStefamons();
  }

  confirmarCompra(stefamon: Stefamon){
    if(this.dadosJogador){
      if(this.dadosJogador.saldo < stefamon.preco){
        this.messageService.add({severity: 'warn', summary:'Saldo insuficiente', detail:'Você não possui saldo suficiente para realizar a compra.'})
      }
      else{
        this.stefamonEscolhido = stefamon;
        this.mostrarModalConfirmacao = true;
      }
    }
    else{
      this.messageService.add({severity: 'warn', summary:'Login necessário', detail:'Você deve estar logado para realizar a compra.'})
    }
  }

}
