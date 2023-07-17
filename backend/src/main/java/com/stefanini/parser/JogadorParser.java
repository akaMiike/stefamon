package com.stefanini.parser;

import com.stefanini.dto.jogador.JogadorCriacaoDTO;
import com.stefanini.dto.jogador.JogadorRetornoDTO;
import com.stefanini.dto.stefamon.StefamonDTO;
import com.stefanini.entity.Jogador;
import com.stefanini.utils.JogadorConstants;
import org.hibernate.Hibernate;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class JogadorParser {

    public static Jogador CreationDtoToEntity(JogadorCriacaoDTO dto){
        return new Jogador(
                dto.getNickname(),
                dto.getPassword(),
                JogadorConstants.SALDO_INICIAL,
                dto.getNomeArquivoAvatar(),
                0, 0,
                new ArrayList<>()
        );

    }

    public static JogadorRetornoDTO EntityToReturnDTO(Jogador jogador){
        List<StefamonDTO> stefamonsDTO = Hibernate.isPropertyInitialized(jogador, "stefamons") ?
                jogador.getStefamons().stream()
                        .map(StefamonParser::EntityToDto)
                        .collect(Collectors.toList()) : new ArrayList<>();

        return new JogadorRetornoDTO(
                jogador.getId(),
                jogador.getNickname(),
                jogador.getSaldo(),
                jogador.getNomeArquivoAvatar(),
                jogador.getQtdVitorias(),
                jogador.getQtdDerrotas(),
                stefamonsDTO
        );
    }
}
