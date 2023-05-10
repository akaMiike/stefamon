import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    MenubarModule,
    ButtonModule,
    CommonModule,
    TooltipModule,
    HttpClientModule
  ],
  exports:[HeaderComponent]
})
export class SharedModule { }
