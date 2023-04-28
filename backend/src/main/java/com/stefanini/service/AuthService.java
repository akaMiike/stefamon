package com.stefanini.service;

import com.stefanini.entity.Jogador;
import com.stefanini.exceptions.auth.CredenciaisInvalidasException;
import com.stefanini.utils.PasswordUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class AuthService {

    @Inject
    JogadorService jogadorService;

    public boolean autenticar(String nickname, String password){
        Jogador jogador = jogadorService.buscarPorNickname(nickname);
        if(PasswordUtils.passwordMatches(jogador.getPassword(), password))
            return true;
        else
            throw new CredenciaisInvalidasException();
    }
}
