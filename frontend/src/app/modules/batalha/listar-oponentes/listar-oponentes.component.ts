import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-oponentes',
  templateUrl: './listar-oponentes.component.html',
  styleUrls: ['./listar-oponentes.component.css']
})
export class ListarOponentesComponent implements OnInit {

  nome = 'Jogador 1';

  constructor() { }

  ngOnInit(): void {
  }

}
