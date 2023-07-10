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
import { MostrarStefamonsComponent } from './components/mostrar-stefamons/mostrar-stefamons.component';
import { ModalConfirmacaoLojaComponent } from './components/modal-confirmacao-loja/modal-confirmacao-loja.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MostrarStefamonsComponent,
    ModalConfirmacaoLojaComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    MenubarModule,
    ButtonModule,
    CommonModule,
    TooltipModule,
    DialogModule,
    HttpClientModule
  ],
  exports:[
    HeaderComponent,
    MostrarStefamonsComponent,
    ModalConfirmacaoLojaComponent
  ]
})
export class SharedModule { }
