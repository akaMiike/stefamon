package com.stefanini.service;

import com.stefanini.dto.jogador.JogadorCriacaoDTO;
import com.stefanini.dto.jogador.JogadorRetornoDTO;
import com.stefanini.dto.stefamon.StefamonDTO;
import com.stefanini.entity.Jogador;
import com.stefanini.entity.Stefamon;
import com.stefanini.exceptions.jogador.JogadorNaoEncontradoException;
import com.stefanini.exceptions.jogador.LimiteDeStefamonsAtingidoException;
import com.stefanini.exceptions.jogador.NicknameJaExistenteException;
import com.stefanini.exceptions.jogador.SaldoInsuficienteException;
import com.stefanini.parser.JogadorParser;
import com.stefanini.parser.StefamonParser;
import com.stefanini.repository.JogadorRepository;
import com.stefanini.utils.JogadorConstants;
import com.stefanini.utils.PasswordUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@ApplicationScoped
public class JogadorService {

    @Inject
    JogadorRepository jogadorRepository;

    @Inject
    StefamonService stefamonService;

    public void salvar(JogadorCriacaoDTO jogadorDto) {
        if(jogadorRepository.existeJogadorPorNickname(jogadorDto.getNickname()))
            throw new NicknameJaExistenteException();

        Jogador jogador = JogadorParser.CreationDtoToEntity(jogadorDto);

        jogador.setSaldo(JogadorConstants.SALDO_INICIAL);
        jogador.setPassword(PasswordUtils.encodeBase64(jogador.getPassword()));

        jogadorRepository.save(jogador);
    }

    public JogadorRetornoDTO buscarPorId(Long id) {
        var jogador = jogadorRepository.findById(id);
        if(Objects.isNull(jogador)) {
            throw new JogadorNaoEncontradoException("Jogador de id " + id + " não foi encontrado.");
        }
        return JogadorParser.EntityToReturnDTO(jogador);
    }

    public void atualizar(JogadorCriacaoDTO jogador, long id) {
        if(jogadorRepository.existeJogadorPorNickname(jogador.getNickname()))
            throw new NicknameJaExistenteException();

        Jogador dadosJogadorAntigo = jogadorRepository.findById(id);
        if(Objects.isNull(dadosJogadorAntigo)) {
            throw new JogadorNaoEncontradoException("Jogador de id " + id + " não foi encontrado.");
        }

        dadosJogadorAntigo.setNickname(jogador.getNickname());
        dadosJogadorAntigo.setPassword(PasswordUtils.encodeBase64(jogador.getPassword()));

        jogadorRepository.update(dadosJogadorAntigo);
    }

    public void deletar(Long id) {
        jogadorRepository.delete(id);
    }

    public List<JogadorRetornoDTO> listarTodos() {
        return jogadorRepository.listAll().stream()
                .map(JogadorParser::EntityToReturnDTO)
                .collect(Collectors.toList());
    }

    public JogadorRetornoDTO buscarPorNickname(String nickname){
        return jogadorRepository.buscarJogadorPorNickName(nickname)
                .map(JogadorParser::EntityToReturnDTO)
                .orElseThrow(
                    () -> new JogadorNaoEncontradoException("Jogador de nickname " + nickname + " não foi encontrado.")
        );
    }

    public void comprarStefamons(List<StefamonDTO> stefamons, Long id){
        var jogador = jogadorRepository.findById(id);

        if(Objects.isNull(jogador)) {
            throw new JogadorNaoEncontradoException("Jogador de id " + id + " não foi encontrado.");
        }

        int totalStefamons = jogador.getStefamons().size() + stefamons.size();
        if(totalStefamons > 6){
            throw new LimiteDeStefamonsAtingidoException();
        }

        BigDecimal valorTotal = stefamons.stream()
                .map(s -> stefamonService.buscarPorId(s.getId()))
                .map(StefamonDTO::getPreco)
                .reduce(BigDecimal.ZERO , BigDecimal::add);

        boolean possuiSaldoParaCompra = jogador.getSaldo().compareTo(valorTotal) >= 0;

        if(possuiSaldoParaCompra){
            jogador.setSaldo(jogador.getSaldo().subtract(valorTotal));
            jogador.getStefamons().addAll(
                    stefamons.stream()
                            .map(StefamonParser::DtoToEntity)
                            .collect(Collectors.toList())
            );

            jogadorRepository.update(jogador);

        } else{
            throw new SaldoInsuficienteException();
        }
    }
}
