import { Injectable } from '@angular/core';
import { Jogador } from 'src/app/models/Jogador.model';
import { Stefamon } from 'src/app/models/Stefamon.model';
import { LogRodadaService } from '../../log-rodada/log-rodada.service';

@Injectable({
  providedIn: 'root'
})
export class LogicaBatalhaService {

  private readonly PORCENT_PROBABILIDADE_DEFESA = 10;
  private jogadorAtacante: Jogador;
  private jogadorAtacado: Jogador;

  constructor(
    private logRodadaService: LogRodadaService
  ) { }

  iniciarBatalha(jogador: Jogador, oponente: Jogador): [Jogador, Jogador]{
    this.jogadorAtacante = {...jogador, stefamons: [...jogador.stefamons]};
    this.jogadorAtacado = {...oponente, stefamons: [...oponente.stefamons]};

    while(true){
      var stefamonAtacante = this.jogadorAtacante.stefamons[this.jogadorAtacante.stefamons.length -1];
      var stefamonAtacado = this.jogadorAtacado.stefamons[this.jogadorAtacado.stefamons.length -1];
      
      this.logRodadaService.adicionarJogadoresRodada(
        this.jogadorAtacante.nickname, stefamonAtacante.nome,
        this.jogadorAtacado.nickname, stefamonAtacado.nome
      );

      this.atacarStefamon(stefamonAtacante, stefamonAtacado);

      this.logRodadaService.registrarNovaRodada();
      
      if(this.stefamonMorreu(stefamonAtacado)){
        this.jogadorAtacado.stefamons.pop();
        
        this.logRodadaService.adicionarJogadoresRodada(
          this.jogadorAtacante.nickname, stefamonAtacante.nome,
          this.jogadorAtacado.nickname, stefamonAtacado.nome
        );
        
        this.logRodadaService.registrarNovaRodada(`O stefamon ${stefamonAtacado.nome} morreu.`);
      }

      if(!this.possuiStefamonVivo(this.jogadorAtacado)){
        break;
      }

      this.novaRodada();
    }

    this.logRodadaService.registrarNovaRodada(`O jogador ${this.jogadorAtacante.nickname} venceu a batalha.`)
    return [this.jogadorAtacante, this.jogadorAtacado];
  }

  private atacarStefamon(stefamonAtacante: Stefamon, stefamonAtacado: Stefamon){
    const foiAtaqueCritico = this.calcularProbabilidade(stefamonAtacante.inteligencia);
    const defendeuAtaque = this.calcularProbabilidade(this.PORCENT_PROBABILIDADE_DEFESA);
    const esquivouAtaque = this.calcularProbabilidade(stefamonAtacado.velocidade/10);
    
    let ataqueRecebido = foiAtaqueCritico ? this.calcularAtaqueCritico(stefamonAtacante) : stefamonAtacante.ataque;
    const vidaStefamonAntesAtaque = stefamonAtacado.vida
    
    if(defendeuAtaque){
      ataqueRecebido = this.calcularDanoReduzido(stefamonAtacado.defesa, ataqueRecebido);
      stefamonAtacado.vida = Math.max(0, stefamonAtacado.vida - ataqueRecebido);
    }
    else if(!esquivouAtaque){
      stefamonAtacado.vida = Math.max(0, stefamonAtacado.vida - ataqueRecebido);;
    }

    this.logRodadaService.adicionarDetalhesAtaqueRodada(
      ataqueRecebido, defendeuAtaque, foiAtaqueCritico, esquivouAtaque, vidaStefamonAntesAtaque, stefamonAtacado.vida
    );
  }

  private calcularProbabilidade(valor: number): boolean{
    return Math.random() <= (valor/100);
  }

  private calcularAtaqueCritico(stefamon: Stefamon){
    return Math.floor(stefamon.ataque + stefamon.ataque * (stefamon.poder / 100));
  }

  private calcularDanoReduzido(defesa: number, ataqueRecebido: number){
    return Math.floor(Math.max(0, ataqueRecebido - (defesa/100) * (ataqueRecebido)));
  }

  private stefamonMorreu(stefamon: Stefamon): boolean{
    return stefamon.vida === 0;
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
