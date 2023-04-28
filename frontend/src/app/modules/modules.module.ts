import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { StefamonComponent } from './stefamon/stefamon.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import {TableModule} from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    HomeComponent,
    StefamonComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    MenubarModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    TableModule
  ]
})
export class ModulesModule { }
