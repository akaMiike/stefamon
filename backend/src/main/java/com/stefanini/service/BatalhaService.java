package com.stefanini.service;

import com.stefanini.dto.batalha.BatalhaCriacaoDTO;
import com.stefanini.dto.batalha.BatalhaRetornoDTO;
import com.stefanini.dto.jogador.JogadorRetornoDTO;
import com.stefanini.dto.logRodada.LogRodadaCreationDTO;
import com.stefanini.dto.paginacao.Page;
import com.stefanini.entity.Batalha;
import com.stefanini.entity.Jogador;
import com.stefanini.entity.LogRodada;
import com.stefanini.exceptions.batalha.BatalhaNaoEncontradaException;
import com.stefanini.exceptions.jogador.JogadorNaoEncontradoException;
import com.stefanini.parser.BatalhaParser;
import com.stefanini.parser.LogRodadaParser;
import com.stefanini.repository.BatalhaRepository;
import com.stefanini.repository.JogadorRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@ApplicationScoped
public class BatalhaService {

    @Inject
    BatalhaRepository batalhaRepository;

    @Inject
    JogadorRepository jogadorRepository;

    @Inject
    JogadorService jogadorService;

    public void salvar(BatalhaCriacaoDTO batalhaCriacaoDTO){
        Jogador jogador = this.jogadorRepository.findById(batalhaCriacaoDTO.getIdJogador());
        Jogador oponente = this.jogadorRepository.findById(batalhaCriacaoDTO.getIdOponente());

        if(Objects.isNull(jogador)) {
            throw new JogadorNaoEncontradoException("Jogador de id " + batalhaCriacaoDTO.getIdJogador() + " não foi encontrado.");
        }
        else if(Objects.isNull(oponente)) {
            throw new JogadorNaoEncontradoException("Oponente de id " + batalhaCriacaoDTO.getIdOponente() + " não foi encontrado.");
        }

        Batalha novaBatalha = new Batalha(batalhaCriacaoDTO.getJogadorVenceu(), LocalDateTime.now(), jogador, oponente);
        batalhaRepository.save(novaBatalha);

    }

    public BatalhaRetornoDTO buscarPorId(Long id){
        Batalha batalha = batalhaRepository.findById(id);
        if(Objects.isNull(batalha)){
            throw new BatalhaNaoEncontradaException();
        }

        return BatalhaParser.EntityToReturnDTO(batalha);
    }

    public Page<BatalhaRetornoDTO> buscarBatalhasPorJogadorPaginado(Long idJogador, Integer pagina, Integer tamanhoPagina){
        JogadorRetornoDTO jogador = jogadorService.buscarPorId(idJogador);
        Page<Batalha> batalhasPaginada = batalhaRepository.buscarTodasBatalhasPorJogador(jogador.getId(), pagina, tamanhoPagina);

        return new Page<>(
                batalhasPaginada.getElementos().stream().map(BatalhaParser::EntityToReturnDTO).collect(Collectors.toList()),
                batalhasPaginada.getTotalElementos()
        );
    }

    public void criarLogsBatalha(List<LogRodadaCreationDTO> logBatalha, Long idBatalha){
        Batalha batalha = batalhaRepository.findById(idBatalha);
        if(Objects.isNull(batalha)){
            throw new BatalhaNaoEncontradaException();
        }

        List<LogRodada> novosLogBatalha = logBatalha.stream()
                .map(log -> LogRodadaParser.CreationDTOToEntity(log, batalha))
                .collect(Collectors.toList());

        batalha.setLogBatalha(novosLogBatalha);
        batalhaRepository.update(batalha);
    }
}