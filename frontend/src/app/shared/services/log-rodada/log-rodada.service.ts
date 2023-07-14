import { Injectable } from '@angular/core';
import { LogRodada } from 'src/app/models/LogRodada.model';
import { BatalhaService } from '../batalha/requests/batalha.service';

@Injectable({
  providedIn: 'root'
})
export class LogRodadaService {

  private logsBatalha: LogRodada[] = [];

  private contadorRodada = 1;

  private nomeJogadorAtacante?: string;
  private nomeStefamonAtacante?: string;
  private nomeJogadorAtacado?: string;
  private nomeStefamonAtacado?: string;
  private vidaStefamonAntesAtaque?: number;
  private vidaStefamonAposAtaque?: number;

  private danoRecebido: number;
  private defendeuAtaque: boolean;
  private ataqueCritico: boolean;
  private esquivouAtaque: boolean;

  constructor(
    private batalhaService: BatalhaService
  ) { }

  adicionarJogadoresRodada(nomeAtacante: string, nomeStefamonAtacante: string, nomeAtacado: string, nomeStefamonAtacado: string){
    this.nomeJogadorAtacante = nomeAtacante;
    this.nomeStefamonAtacante = nomeStefamonAtacante;
    this.nomeJogadorAtacado = nomeAtacado;
    this.nomeStefamonAtacado = nomeStefamonAtacado;
  }

  adicionarDetalhesAtaqueRodada(
    danoRecebido: number, defendeuAtaque: boolean, ataqueCritico: boolean,
    esquivouAtaque: boolean, vidaStefamonAntesAtaque: number, vidaStefamonAposAtaque: number
  ){
    this.danoRecebido = danoRecebido;
    this.defendeuAtaque = defendeuAtaque;
    this.ataqueCritico = ataqueCritico;
    this.esquivouAtaque = esquivouAtaque;
    this.vidaStefamonAposAtaque = vidaStefamonAposAtaque;
    this.vidaStefamonAntesAtaque = vidaStefamonAntesAtaque;
  }

  registrarNovaRodada(descricaoRodada: string = null){
    const detalheRodada = descricaoRodada ? descricaoRodada: this.montarDescricaoLogRodada();

    this.logsBatalha.push({
      numRodada: this.contadorRodada,
      nomeJogadorAtacante: this.nomeJogadorAtacante,
      nomeJogadorAtacado: this.nomeJogadorAtacado,
      nomeStefamonAtacante: this.nomeStefamonAtacante,
      nomeStefamonAtacado: this.nomeStefamonAtacado,
      vidaStefamonAntesAtaque: this.vidaStefamonAntesAtaque?.toString(),
      vidaStefamonAposAtaque: this.vidaStefamonAposAtaque?.toString(),
      detalhesRodada: detalheRodada
    } as LogRodada);
    
    this.resetValoresRodada();
    this.contadorRodada++;
  }

  montarDescricaoLogRodada(){
    if(this.esquivouAtaque){
      return `${this.nomeStefamonAtacado} esquivou do ataque de ${this.nomeStefamonAtacante}.`
    }
    else if(this.defendeuAtaque){
      return `${this.nomeStefamonAtacado} defendeu o ataque ${this.ataqueCritico ? 'critico' : '' } de ${this.nomeStefamonAtacante} perdendo ${this.danoRecebido} de vida.`
    } 
    else{
      return `${this.nomeStefamonAtacante} ${this.ataqueCritico ? 'deu um ataque critico em' : 'atacou' } ${this.nomeStefamonAtacado} perdendo ${this.danoRecebido} de vida.`
    }
  }

  resetValoresRodada(){
    this.nomeJogadorAtacante = null;
    this.nomeStefamonAtacante = null;
    this.nomeJogadorAtacado = null;
    this.nomeStefamonAtacado = null;
    this.danoRecebido = null;
    this.vidaStefamonAntesAtaque = null;
    this.vidaStefamonAposAtaque = null;
    this.defendeuAtaque = null;
    this.ataqueCritico = null;
    this.esquivouAtaque = null;
  }

  getLogsBatalha(){
    return this.logsBatalha
  }

  salvarLogsBatalha(idBatalha: number){
    const logsBatalhaTemp = this.logsBatalha
    this.logsBatalha = [];

    return this.batalhaService.criarLogsBatalha(idBatalha, logsBatalhaTemp)
  }

}
