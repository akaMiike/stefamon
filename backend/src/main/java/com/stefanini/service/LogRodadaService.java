package com.stefanini.service;

import com.stefanini.dto.batalha.BatalhaRetornoDTO;
import com.stefanini.dto.logRodada.LogRodadaCreationDTO;
import com.stefanini.dto.logRodada.LogRodadaRetornoDTO;
import com.stefanini.entity.Batalha;
import com.stefanini.entity.LogRodada;
import com.stefanini.exceptions.batalha.BatalhaNaoEncontradaException;
import com.stefanini.parser.LogRodadaParser;
import com.stefanini.repository.BatalhaRepository;
import com.stefanini.repository.LogRodadaRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@ApplicationScoped
public class LogRodadaService {

    @Inject
    LogRodadaRepository logRodadaRepository;

    @Inject
    BatalhaService batalhaService;

    public List<LogRodadaRetornoDTO> buscarLogsPorBatalha(Long idBatalha){
        BatalhaRetornoDTO batalha = batalhaService.buscarPorId(idBatalha);
        return logRodadaRepository.buscarLogsPorBatalha(batalha.getId()).stream()
                .map(LogRodadaParser::EntityToReturnDTO)
                .collect(Collectors.toList());
    }
}
