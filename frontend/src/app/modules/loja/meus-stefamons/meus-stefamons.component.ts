import { Component, Input, OnInit } from '@angular/core';
import { Jogador } from 'src/app/models/Jogador.model';
import { Stefamon } from 'src/app/models/Stefamon.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { JogadorService } from 'src/app/shared/services/jogador.service';

@Component({
  selector: 'app-meus-stefamons',
  templateUrl: './meus-stefamons.component.html',
  styleUrls: ['./meus-stefamons.component.css']
})
export class MeusStefamonsComponent implements OnInit {

  @Input() stefamonsJogador: Stefamon[] = [];

  constructor(){ }

  ngOnInit(): void {
    
  }

}
