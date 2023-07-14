import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'qntdTempoAtras'
})
export class QntdTempoAtrasPipe implements PipeTransform {

  private readonly dataHoje = new Date(Date.now());


  transform(data: string): string {
    const dataQualquer = new Date(data);

    var diffSegundos = Math.abs(this.dataHoje.getTime() - dataQualquer.getTime()) / 1000;
    var diffMinutos = Math.abs(this.dataHoje.getTime() - dataQualquer.getTime()) / (1000 * 60);
    var diffHoras = Math.abs(this.dataHoje.getTime() - dataQualquer.getTime()) / (1000 * 60 * 60);
    var diffDias = Math.abs(this.dataHoje.getTime() - dataQualquer.getTime()) / (1000 * 60 * 60 * 24);

    if(diffSegundos < 60){
      return `há ${Math.floor(diffSegundos)} segundo(s) atrás`
    }
    else if(diffMinutos < 60){
      return `há ${Math.floor(diffMinutos)} minuto(s) atrás`
    }
    else if(diffHoras < 60){
      return `há ${Math.floor(diffHoras)} hora(s) atrás`
    }
    else{
      return `há ${Math.floor(diffDias)} dia(s) atrás`
    }
  }

}
