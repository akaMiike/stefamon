package com.stefanini.exceptions.stefamon;

import com.stefanini.exceptions.RegraDeNegocioException;

import javax.ws.rs.core.Response;

public class StefamonNaoEncontradoException extends RegraDeNegocioException {
    public StefamonNaoEncontradoException() {
        super("Stefamon não encontrado.", Response.Status.NOT_FOUND);
    }

    public StefamonNaoEncontradoException(String message) {
        super(message, Response.Status.NOT_FOUND);
    }
}
