import { Component, OnInit } from '@angular/core';
import { LoadingService } from './shared/services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'hackathon-angular';
  isTelaCarregando: boolean = false;
  messagemTelaCarregamento: string = '';

  constructor(
    private loadingService: LoadingService
  ){}

  ngOnInit(): void {
    this.loadingService.mensagemloading.subscribe(mensagem => this.messagemTelaCarregamento = mensagem);
    this.loadingService.loading.subscribe(isTelaCarregando => {this.isTelaCarregando = isTelaCarregando; console.log(isTelaCarregando)})
  }

}
