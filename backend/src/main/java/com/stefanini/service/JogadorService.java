package com.stefanini.service;

import com.stefanini.dto.jogador.JogadorCriacaoDTO;
import com.stefanini.dto.jogador.JogadorRetornoDTO;
import com.stefanini.dto.paginacao.Page;
import com.stefanini.dto.stefamon.StefamonDTO;
import com.stefanini.entity.Jogador;
import com.stefanini.exceptions.jogador.JogadorNaoEncontradoException;
import com.stefanini.exceptions.jogador.LimiteDeStefamonsAtingidoException;
import com.stefanini.exceptions.jogador.NicknameJaExistenteException;
import com.stefanini.exceptions.jogador.SaldoInsuficienteException;
import com.stefanini.exceptions.stefamon.StefamonNaoEncontradoException;
import com.stefanini.parser.JogadorParser;
import com.stefanini.parser.StefamonParser;
import com.stefanini.repository.JogadorRepository;
import com.stefanini.utils.PasswordUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.math.BigDecimal;
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

    public Page<JogadorRetornoDTO> listarTodosOponentes(Integer pagina, Integer tamanhoPagina) {
        Page<Jogador> jogadorPage = jogadorRepository.buscarOponentesPaginado(pagina, tamanhoPagina);

        return new Page<>(
                jogadorPage.getElementos().stream().map(JogadorParser::EntityToReturnDTO).collect(Collectors.toList()),
                jogadorPage.getTotalElementos()
        );
    }

    public JogadorRetornoDTO buscarPorNickname(String nickname){
        return jogadorRepository.buscarJogadorPorNickName(nickname)
                .map(JogadorParser::EntityToReturnDTO)
                .orElseThrow(
                    () -> new JogadorNaoEncontradoException("Jogador de nickname " + nickname + " não foi encontrado.")
        );
    }

    public JogadorRetornoDTO comprarStefamon(Long idStefamon, Long id){
        var jogador = jogadorRepository.findById(id);

        if(Objects.isNull(jogador)) {
            throw new JogadorNaoEncontradoException("Jogador de id " + id + " não foi encontrado.");
        }
        if(jogador.getStefamons().size() == 6){
            throw new LimiteDeStefamonsAtingidoException();
        }

        StefamonDTO stefamon = stefamonService.buscarPorId(idStefamon);
        boolean possuiSaldoParaCompra = jogador.getSaldo().compareTo(stefamon.getPreco()) >= 0;

        if(possuiSaldoParaCompra){
            jogador.setSaldo(jogador.getSaldo().subtract(stefamon.getPreco()));
            jogador.getStefamons().add(StefamonParser.DtoToEntity(stefamon));

            return JogadorParser.EntityToReturnDTO(jogadorRepository.update(jogador));

        } else{
            throw new SaldoInsuficienteException();
        }
    }

    public JogadorRetornoDTO venderStefamon(Long idStefamon, Long id){
        var jogador = jogadorRepository.findById(id);

        if(Objects.isNull(jogador)) {
            throw new JogadorNaoEncontradoException("Jogador de id " + id + " não foi encontrado.");
        }

        var stefamonARemover = jogador.getStefamons().stream()
                .filter(s -> s.getId().equals(idStefamon))
                .findFirst()
                .orElseThrow(() -> new StefamonNaoEncontradoException("Jogador não possui o stefamon informado"));

        var stefamonARemoverDTO = StefamonParser.EntityToDto(stefamonARemover);
        BigDecimal novoSaldo = jogador.getSaldo().add(stefamonARemoverDTO.getPreco());

        jogador.setSaldo(novoSaldo);
        jogador.getStefamons().remove(stefamonARemover);

        return JogadorParser.EntityToReturnDTO(jogadorRepository.update(jogador));
    }

    public void atualizarDadosJogadoresAposBatalha(Jogador vencedor, Jogador perdedor, BigDecimal moedasObtidas){
        vencedor.setSaldo(vencedor.getSaldo().add(moedasObtidas));
        perdedor.setSaldo(BigDecimal.ZERO.max(perdedor.getSaldo().add(moedasObtidas.negate())));

        vencedor.setQtdVitorias(vencedor.getQtdVitorias() + 1);
        perdedor.setQtdDerrotas(vencedor.getQtdDerrotas() + 1);

        jogadorRepository.update(vencedor);
        jogadorRepository.update(perdedor);
    }
}
