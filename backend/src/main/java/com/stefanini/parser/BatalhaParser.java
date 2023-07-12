package com.stefanini.parser;

import com.stefanini.dto.batalha.BatalhaRetornoDTO;
import com.stefanini.entity.Batalha;

public class BatalhaParser {

    public static BatalhaRetornoDTO EntityToReturnDTO(Batalha batalha){
        return new BatalhaRetornoDTO(
                batalha.getId(),
                batalha.getJogador().getNickname(),
                batalha.getOponente().getNickname(),
                batalha.getJogadorVencedor(),
                batalha.getDataBatalha()
        );
    }

}
