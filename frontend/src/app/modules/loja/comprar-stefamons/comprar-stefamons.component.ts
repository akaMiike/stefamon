import { Component, Input, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Stefamon } from 'src/app/models/Stefamon.model';
import { Page } from 'src/app/shared/models/Page.model';
import { StefamonService } from 'src/app/shared/services/stefamon.service';

@Component({
  selector: 'app-comprar-stefamons',
  templateUrl: './comprar-stefamons.component.html',
  styleUrls: ['./comprar-stefamons.component.css']
})
export class ComprarStefamonsComponent implements OnInit {

  @Input() saldoJogador: number = null;
  
  paginacaoStefamon = new Page<Stefamon>();
  atributosStefamon: SelectItem[] = [];
  atributoSelecionado: string;
  direcoesOrdenacao: SelectItem[] = [];
  direcaoOrdenacao: string;

  constructor(  
    private stefamonService: StefamonService,
    ) { }

  ngOnInit(): void {

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

    this.listarTodos();

  }

  paginacao(event){
    this.paginacaoStefamon.pagina = event.page
    this.listarTodos();
  }

  setColunaOrdenacao(){
    this.paginacaoStefamon.colunaOrdenacao = this.atributoSelecionado;
    this.direcaoOrdenacao = null;
  }

  buscarPorNome(event){
    console.log(event);
    this.paginacaoStefamon.filtros = event.target.value == '' ? {} : {nome: event.target.value};
    this.listarTodos();
  }

  listarTodos(){
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
    this.listarTodos();
  }


}
