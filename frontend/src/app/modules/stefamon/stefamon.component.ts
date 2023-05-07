import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { Stefamon } from 'src/app/models/Stefamon.model';
import { Page } from 'src/app/shared/models/Page.model';
import { StefamonService } from '../../shared/services/stefamon.service';

@Component({
  selector: 'app-stefamon',
  templateUrl: './stefamon.component.html',
  styleUrls: ['./stefamon.component.css'],
  providers: []
})
export class StefamonComponent implements OnInit {
  paginacaoStefamon = new Page<Stefamon>();
  atributosStefamon: SelectItem[] = [];
  atributoSelecionado: string;

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
  }

  ngOnInit(): void {
    this.listarTodos();
  }

  paginacao(event){
    this.paginacaoStefamon.pagina = event.page
    this.listarTodos();
  }

  ordenacao(){
    this.paginacaoStefamon.colunaOrdenacao = this.atributoSelecionado;
    this.listarTodos();
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

}
