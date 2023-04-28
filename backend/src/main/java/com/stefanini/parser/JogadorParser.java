package com.stefanini.parser;

import com.stefanini.dto.jogador.JogadorCriacaoDTO;
import com.stefanini.dto.jogador.JogadorRetornoDTO;
import com.stefanini.entity.Jogador;
import java.util.stream.Collectors;

public class JogadorParser {

    public static Jogador CreationDtoToEntity(JogadorCriacaoDTO dto){
        return new Jogador(
                dto.getNickname(),
                dto.getPassword(),
                null,
                dto.getStefamons().stream()
                        .map(StefamonParser::DtoToEntity)
                        .collect(Collectors.toList())
        );

    }

    public static JogadorRetornoDTO EntityToReturnDTO(Jogador jogador){
        return new JogadorRetornoDTO(
                jogador.getId(),
                jogador.getNickname(),
                jogador.getSaldo(),
                jogador.getStefamons().stream()
                        .map(StefamonParser::EntityToDto)
                        .collect(Collectors.toList())
        );
    }
}
