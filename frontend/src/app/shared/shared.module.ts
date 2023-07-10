import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import {TooltipModule} from 'primeng/tooltip';
import {CardModule} from 'primeng/card';
import { ListarStefamonsComponent } from './components/listar-stefamons/listar-stefamons.component';
import { ModalConfirmacaoLojaComponent } from './components/modal-confirmacao-loja/modal-confirmacao-loja.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ListarStefamonsComponent,
    ModalConfirmacaoLojaComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    CardModule,
    MenubarModule,
    ButtonModule,
    CommonModule,
    TooltipModule,
    DialogModule,
    HttpClientModule
  ],
  exports:[
    HeaderComponent,
    ListarStefamonsComponent,
    ModalConfirmacaoLojaComponent
  ]
})
export class SharedModule { }
