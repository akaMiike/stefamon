package com.stefanini.exceptions.batalha;

import com.stefanini.exceptions.RegraDeNegocioException;

import javax.ws.rs.core.Response.Status;

public class BatalhaNaoEncontradaException extends RegraDeNegocioException {
    public BatalhaNaoEncontradaException() {
        super("Batalha não encontrada.", Status.NOT_FOUND);
    }

}
