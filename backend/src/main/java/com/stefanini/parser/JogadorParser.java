package com.stefanini.parser;

import com.stefanini.dto.jogador.JogadorCriacaoDTO;
import com.stefanini.dto.jogador.JogadorRetornoDTO;
import com.stefanini.entity.Jogador;
import com.stefanini.utils.JogadorConstants;

import java.util.ArrayList;
import java.util.stream.Collectors;

public class JogadorParser {

    public static Jogador CreationDtoToEntity(JogadorCriacaoDTO dto){
        return new Jogador(
                dto.getNickname(),
                dto.getPassword(),
                JogadorConstants.SALDO_INICIAL,
                0, 0,
                new ArrayList<>()
        );

    }

    public static JogadorRetornoDTO EntityToReturnDTO(Jogador jogador){
        return new JogadorRetornoDTO(
                jogador.getId(),
                jogador.getNickname(),
                jogador.getSaldo(),
                jogador.getQtdVitorias(),
                jogador.getQtdDerrotas(),
                jogador.getStefamons().stream()
                        .map(StefamonParser::EntityToDto)
                        .collect(Collectors.toList())
        );
    }
}
