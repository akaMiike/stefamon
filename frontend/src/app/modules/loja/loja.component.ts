import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { Stefamon } from 'src/app/models/Stefamon.model';
import { Page } from 'src/app/shared/models/Page.model';
import { StefamonService } from '../../shared/services/stefamon.service';

@Component({
  selector: 'app-stefamon',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.css'],
  providers: []
})
export class LojaComponent implements OnInit {
  paginacaoStefamon = new Page<Stefamon>();
  atributosStefamon: SelectItem[] = [];
  atributoSelecionado: string;
  direcoesOrdenacao: SelectItem[] = [];
  direcaoOrdenacao: string;

  constructor(
    private stefamonService: StefamonService
  ) { 
    this.atributosStefamon = [
      {label: "Vida", value: "vida"},
      {label: "Ataque", value:"ataque"},
      {label: "Defesa", value: "defesa"},
      {label: "Inteligencia", value: "inteligencia"},
      {label: "Velocidade", value: "velocidade"},
      {label: "Poder", value: "poder"}
    ]

    this.direcoesOrdenacao = [
      {label:"Descendente", value: "DESC"},
      {label:"Ascendente", value: "ASC"}
    ]

  }

  ngOnInit(): void {
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
