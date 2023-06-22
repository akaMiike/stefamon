import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarOponentesComponent } from './modules/batalha/listar-oponentes/listar-oponentes.component';
import { HomeComponent } from './modules/home/home.component';
import { LojaComponent } from './modules/loja/loja.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { QuantidadeStefamonGuard } from './shared/guards/quantidade-stefamon.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'batalha', component: ListarOponentesComponent, canActivate: [AuthGuard, QuantidadeStefamonGuard]},
  { path: 'loja', component: LojaComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
