package com.stefanini.service;

import com.stefanini.dto.jogador.JogadorRetornoDTO;
import com.stefanini.entity.Jogador;
import com.stefanini.exceptions.auth.CredenciaisInvalidasException;
import com.stefanini.exceptions.jogador.JogadorNaoEncontradoException;
import com.stefanini.parser.JogadorParser;
import com.stefanini.repository.JogadorRepository;
import com.stefanini.utils.PasswordUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class AuthService {

    @Inject
    JogadorRepository jogadorRepository;

    public JogadorRetornoDTO autenticar(String nickname, String password){
        Jogador jogador = jogadorRepository.buscarJogadorPorNickName(nickname).orElseThrow(
                    () -> new JogadorNaoEncontradoException("Jogador de nickname " + nickname + " não foi encontrado.")
        );

        if(!PasswordUtils.passwordMatches(jogador.getPassword(), password))
            throw new CredenciaisInvalidasException();

        JogadorRetornoDTO jogadorDTO = JogadorParser.EntityToReturnDTO(jogador);

        if(jogador.getPrimeiroLogin()){
            jogador.setPrimeiroLogin(false);
            jogadorRepository.update(jogador);
        }

        return jogadorDTO;
    }
}
