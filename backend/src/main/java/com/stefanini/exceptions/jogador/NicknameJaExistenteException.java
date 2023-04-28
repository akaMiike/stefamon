package com.stefanini.exceptions.jogador;

import com.stefanini.exceptions.RegraDeNegocioException;

public class NicknameJaExistenteException extends RegraDeNegocioException {
    public NicknameJaExistenteException(){
        super("Nickname já está em uso por outro jogador.");
    }

    public NicknameJaExistenteException(String message) {
        super(message);
    }
}
