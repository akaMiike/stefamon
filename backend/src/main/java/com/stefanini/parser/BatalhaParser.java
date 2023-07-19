package com.stefanini.parser;

import com.stefanini.dto.batalha.BatalhaRetornoDTO;
import com.stefanini.entity.Batalha;

import java.util.Objects;

public class BatalhaParser {

    public static BatalhaRetornoDTO EntityToReturnDTO(Batalha batalha){
        return new BatalhaRetornoDTO(
                batalha.getId(),
                batalha.getJogador().getNickname(),
                Objects.isNull(batalha.getOponente()) ? null : batalha.getOponente().getNickname(),
                batalha.getJogadorVenceu(),
                batalha.getDataBatalha(),
                batalha.getMoedasObtidasJogador()
        );
    }

}
