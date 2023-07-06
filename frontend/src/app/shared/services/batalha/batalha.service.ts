import { Injectable } from '@angular/core';
import { Jogador } from 'src/app/models/Jogador.model';
import { Stefamon } from 'src/app/models/Stefamon.model';

@Injectable({
  providedIn: 'root'
})
export class BatalhaService {

  private readonly PORCENT_PROBABILIDADE_DEFESA = 20;
  private jogadorAtacante: Jogador;
  private jogadorAtacado: Jogador;

  constructor() { }

  iniciarBatalha(jogador: Jogador, oponente: Jogador){
    this.jogadorAtacante = {...jogador, stefamons: [...jogador.stefamons]};
    this.jogadorAtacado = {...oponente, stefamons: [...oponente.stefamons]};

    while(true){
      var stefamonAtacante = this.jogadorAtacante.stefamons[this.jogadorAtacante.stefamons.length -1];
      var stefamonAtacado = this.jogadorAtacado.stefamons[this.jogadorAtacado.stefamons.length -1];

      this.atacarStefamon(stefamonAtacante, stefamonAtacado);
      
      if(this.stefamonMorreu(stefamonAtacado)){
        this.jogadorAtacado.stefamons.pop();
      }

      if(!this.possuiStefamonVivo(this.jogadorAtacado)){
        break;
      }

      this.novaRodada();
    }

    return this.jogadorAtacante.id === jogador.id ? jogador : oponente;
  }

  private calcularAtaqueStefamon(stefamon: Stefamon){
    const foiAtaqueCritico = this.calcularProbabilidade(stefamon.inteligencia);
    return foiAtaqueCritico ? this.calcularAtaqueCritico(stefamon) : stefamon.ataque;
  }

  private calcularDanoRecebido(stefamonAtacado: Stefamon, ataqueRecebido: number){
    const defendeuAtaque = this.calcularProbabilidade(this.PORCENT_PROBABILIDADE_DEFESA);
    
    if(defendeuAtaque){
      const qtdDanoReduzido = this.calcularDanoReduzido(stefamonAtacado.defesa, ataqueRecebido);
      stefamonAtacado.vida -= qtdDanoReduzido;
    }
    else{
      stefamonAtacado.vida -= ataqueRecebido;
    }
  }

  private atacarStefamon(stefamonAtacante: Stefamon, stefamonAtacado: Stefamon){
    const ataqueStefamonJogador = this.calcularAtaqueStefamon(stefamonAtacante);
    this.calcularDanoRecebido(stefamonAtacado, ataqueStefamonJogador);
  }

  private calcularProbabilidade(valor: number): boolean{
    return Math.random() <= (valor/100);
  }

  private calcularAtaqueCritico(stefamon: Stefamon){
    return stefamon.ataque + stefamon.ataque * (stefamon.poder / 100);
  }

  private calcularDanoReduzido(defesa: number, ataqueRecebido: number){
    return Math.max(0, ataqueRecebido - defesa);
  }

  private stefamonMorreu(stefamon: Stefamon): boolean{
    return stefamon.vida <= 0;
  }

  private possuiStefamonVivo(jogador: Jogador){
    return jogador.stefamons.length !== 0;
  }

  private novaRodada(){
    var temp = this.jogadorAtacado;
    this.jogadorAtacado = this.jogadorAtacante;
    this.jogadorAtacante = temp;
  }
}
