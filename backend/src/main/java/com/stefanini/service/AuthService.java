package com.stefanini.service;

import com.stefanini.entity.Jogador;
import com.stefanini.exceptions.auth.CredenciaisInvalidasException;
import com.stefanini.exceptions.jogador.JogadorNaoEncontradoException;
import com.stefanini.repository.JogadorRepository;
import com.stefanini.utils.PasswordUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class AuthService {

    @Inject
    JogadorRepository jogadorRepository;

    public void autenticar(String nickname, String password){
        Jogador jogador = jogadorRepository.buscarJogadorPorNickName(nickname).orElseThrow(
                    () -> new JogadorNaoEncontradoException("Jogador de nickname " + nickname + " não foi encontrado.")
        );

        if(!PasswordUtils.passwordMatches(jogador.getPassword(), password))
            throw new CredenciaisInvalidasException();
    }
}
