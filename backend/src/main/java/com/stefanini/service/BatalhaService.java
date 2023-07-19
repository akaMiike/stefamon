package com.stefanini.service;

import com.stefanini.dto.batalha.BatalhaCriacaoDTO;
import com.stefanini.dto.batalha.BatalhaRetornoDTO;
import com.stefanini.dto.jogador.JogadorRetornoDTO;
import com.stefanini.dto.logRodada.LogRodadaCreationDTO;
import com.stefanini.dto.logRodada.LogRodadaRetornoDTO;
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
import com.stefanini.utils.EnumDificuldadeBot;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@ApplicationScoped
public class BatalhaService {

    @Inject
    BatalhaRepository batalhaRepository;

    @Inject
    JogadorRepository jogadorRepository;

    @Inject
    JogadorService jogadorService;

    public BatalhaRetornoDTO salvar(BatalhaCriacaoDTO batalhaCriacaoDTO, EnumDificuldadeBot dificuldadeBot){
        Jogador oponente = null;
        Jogador jogador = Optional.ofNullable(jogadorRepository.findById(batalhaCriacaoDTO.getIdJogador())).orElseThrow(
                () -> new JogadorNaoEncontradoException("Jogador de id " + batalhaCriacaoDTO.getIdJogador() + " não foi encontrado.")
        );
        BigDecimal moedasRecompensaJogador = gerarMoedasRecompensaBatalha(batalhaCriacaoDTO.getJogadorVenceu(), dificuldadeBot);

        if(dificuldadeBot == EnumDificuldadeBot.SEM_BOT) {
            oponente = Optional.ofNullable(jogadorRepository.findById(batalhaCriacaoDTO.getIdOponente())).orElseThrow(
                    () -> new JogadorNaoEncontradoException("Oponente de id " + batalhaCriacaoDTO.getIdOponente() + " não foi encontrado.")
            );
            BigDecimal moedasRecompensaOponente = gerarMoedasRecompensaBatalha(!batalhaCriacaoDTO.getJogadorVenceu(), dificuldadeBot);

            jogadorService.atualizarDadosJogadorAposBatalha(
                    oponente,
                    moedasRecompensaOponente,
                    !batalhaCriacaoDTO.getJogadorVenceu(),
                    dificuldadeBot
            );
        }

        jogadorService.atualizarDadosJogadorAposBatalha(
                jogador,
                moedasRecompensaJogador,
                batalhaCriacaoDTO.getJogadorVenceu(),
                dificuldadeBot
        );

        Batalha novaBatalha = new Batalha(
                batalhaCriacaoDTO.getJogadorVenceu(),
                LocalDateTime.now(),
                jogador, oponente,
                moedasRecompensaJogador
        );

        batalhaRepository.save(novaBatalha);
        return BatalhaParser.EntityToReturnDTO(novaBatalha);

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

    private BigDecimal gerarMoedasRecompensaBatalha(Boolean isVencedor, EnumDificuldadeBot dificuldadeBot){
        int min; int max;

        switch(dificuldadeBot){
            case FACIL:
                min = 1; max = 3;
                break;
            case MEDIO:
                min = 3; max = 5;
                break;
            case DIFICIL:
            default:
                min = 5; max = 10;
                break;
        }

        if(dificuldadeBot != EnumDificuldadeBot.SEM_BOT && !isVencedor){
            return BigDecimal.ZERO;
        } else {
            double valorMoeda = (Math.floor(Math.random() * (10*max - 10*min)) + 10*min) / 10;
            BigDecimal recompensa = BigDecimal.valueOf(valorMoeda).setScale(1, RoundingMode.UNNECESSARY);
            return isVencedor ? recompensa : recompensa.negate();
        }
    }
}
