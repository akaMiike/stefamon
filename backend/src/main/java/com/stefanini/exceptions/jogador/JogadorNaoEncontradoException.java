package com.stefanini.exceptions.jogador;

import com.stefanini.exceptions.RegraDeNegocioException;

import javax.ws.rs.core.Response;

public class JogadorNaoEncontradoException extends RegraDeNegocioException {
    public JogadorNaoEncontradoException() {
        super("Jogador não encontrado.", Response.Status.NOT_FOUND);
    }

    public JogadorNaoEncontradoException(String message) {
        super(message, Response.Status.NOT_FOUND);
    }
}
