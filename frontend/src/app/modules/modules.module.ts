import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LojaComponent } from './loja/loja.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import {TableModule} from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import {PaginatorModule} from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { TabMenuModule } from 'primeng/tabmenu';
import { MeusStefamonsComponent } from './loja/meus-stefamons/meus-stefamons.component';
import { ComprarStefamonsComponent } from './loja/comprar-stefamons/comprar-stefamons.component';
import {DialogModule} from 'primeng/dialog';


@NgModule({
  declarations: [
    HomeComponent,
    LojaComponent,
    MeusStefamonsComponent,
    ComprarStefamonsComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    MenubarModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    TableModule,
    PaginatorModule,
    DropdownModule,
    TabMenuModule,
    DialogModule
  ]
})
export class ModulesModule { }
