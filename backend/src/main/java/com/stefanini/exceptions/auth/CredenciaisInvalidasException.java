package com.stefanini.exceptions.auth;

import com.stefanini.exceptions.RegraDeNegocioException;

import javax.ws.rs.core.Response;

public class CredenciaisInvalidasException extends RegraDeNegocioException {
    public CredenciaisInvalidasException() {
        super("A senha está incorreta.", Response.Status.UNAUTHORIZED);
    }
}
