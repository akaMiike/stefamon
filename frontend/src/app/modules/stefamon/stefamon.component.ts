import { Component, OnInit } from '@angular/core';
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

  constructor(
    private stefamonService: StefamonService
  ) { }

  ngOnInit(): void {
    this.stefamonService.listarTodos(this.paginacaoStefamon).subscribe(res => {
      this.paginacaoStefamon.elementos = res.elementos;
      this.paginacaoStefamon.totalElementos = res.totalElementos;
    });
  }

  paginate(event){
    this.paginacaoStefamon.pagina = event.page
    this.stefamonService.listarTodos(this.paginacaoStefamon).subscribe(res => {
      this.paginacaoStefamon.elementos = res.elementos;
      this.paginacaoStefamon.totalElementos = res.totalElementos;
    });
  }

}
