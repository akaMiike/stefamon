package com.stefanini.exceptions.jogador;

import com.stefanini.exceptions.RegraDeNegocioException;

import javax.ws.rs.core.Response;

public class LimiteDeStefamonsAtingidoException extends RegraDeNegocioException {
    public LimiteDeStefamonsAtingidoException() {
        super("Um jogador só pode ter no máximo 6 stefamons.", Response.Status.BAD_REQUEST);
    }

    public LimiteDeStefamonsAtingidoException(String message) {
        super(message, Response.Status.BAD_REQUEST);
    }
}
