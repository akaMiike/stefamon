import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LojaComponent } from './loja/loja.component';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import {TableModule} from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import {PaginatorModule} from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { TabMenuModule } from 'primeng/tabmenu';
import {TooltipModule} from 'primeng/tooltip';
import {SelectButtonModule} from 'primeng/selectbutton';
import {CarouselModule} from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { MeusStefamonsComponent } from './loja/meus-stefamons/meus-stefamons.component';
import { ComprarStefamonsComponent } from './loja/comprar-stefamons/comprar-stefamons.component';
import { ListarOponentesComponent } from './batalha/listar-oponentes/listar-oponentes.component';
import { ResultadoBatalhaComponent } from './batalha/resultado-batalha/resultado-batalha.component';
import { SharedModule } from '../shared/shared.module';
import { ModalAjudaBatalhaComponent } from './batalha/modal-ajuda-batalha/modal-ajuda-batalha.component';
import { ModalRankingJogadoresComponent } from './batalha/modal-ranking-jogadores/modal-ranking-jogadores.component';
import { ModalAjudaLojaComponent } from './loja/modal-ajuda-loja/modal-ajuda-loja.component';
import { ModalBoasVindasComponent } from './home/modal-boas-vindas/modal-boas-vindas.component';



@NgModule({
  declarations: [
    HomeComponent,
    LojaComponent,
    MeusStefamonsComponent,
    ComprarStefamonsComponent,
    ListarOponentesComponent,
    ResultadoBatalhaComponent,
    ModalAjudaBatalhaComponent,
    ModalRankingJogadoresComponent,
    ModalAjudaLojaComponent,
    ModalBoasVindasComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    MenubarModule,
    CardModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    TableModule,
    PaginatorModule,
    DropdownModule,
    TabMenuModule,
    TooltipModule,
    SharedModule,
    SelectButtonModule,
    CarouselModule,
    DialogModule
  ]
})
export class ModulesModule { }
