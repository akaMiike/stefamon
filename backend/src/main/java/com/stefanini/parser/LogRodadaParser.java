package com.stefanini.parser;

import com.stefanini.dto.logRodada.LogRodadaCreationDTO;
import com.stefanini.dto.logRodada.LogRodadaRetornoDTO;
import com.stefanini.entity.Batalha;
import com.stefanini.entity.LogRodada;

public class LogRodadaParser {

    public static LogRodadaRetornoDTO EntityToReturnDTO(LogRodada logRodada){
        return new LogRodadaRetornoDTO(
                logRodada.getId(),
                logRodada.getNumRodada(),
                logRodada.getNomeJogadorAtacante(),
                logRodada.getNomeJogadorAtacado(),
                logRodada.getNomeStefamonAtacante(),
                logRodada.getNomeStefamonAtacado(),
                logRodada.getVidaStefamonAntesAtaque(),
                logRodada.getVidaStefamonAposAtaque(),
                logRodada.getDetalhesRodada()
        );
    }

    public static LogRodada CreationDTOToEntity(LogRodadaCreationDTO logRodada, Batalha batalha){
        return new LogRodada(
                batalha,
                logRodada.getNumRodada(),
                logRodada.getNomeJogadorAtacante(),
                logRodada.getNomeJogadorAtacado(),
                logRodada.getNomeStefamonAtacante(),
                logRodada.getNomeStefamonAtacado(),
                logRodada.getVidaStefamonAntesAtaque(),
                logRodada.getVidaStefamonAposAtaque(),
                logRodada.getDetalhesRodada()
        );
    }
}
