import { Component, Input, OnInit } from '@angular/core';
import { LogRodada } from 'src/app/models/LogRodada.model';
import { BatalhaService } from '../../services/batalha/requests/batalha.service';

@Component({
  selector: 'app-listar-log-batalha',
  templateUrl: './listar-log-batalha.component.html',
  styleUrls: ['./listar-log-batalha.component.css']
})
export class ListarLogBatalhaComponent implements OnInit {

  logsBatalha: LogRodada[];
  @Input() idBatalha: number;

  constructor(
    private batalhaService: BatalhaService
  ) { }

  ngOnInit(): void {
    this.batalhaService.obterLogsBatalha(this.idBatalha).subscribe(logs => this.logsBatalha = logs);
  }

}
