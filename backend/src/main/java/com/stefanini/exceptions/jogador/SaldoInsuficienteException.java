package com.stefanini.exceptions.jogador;

import com.stefanini.exceptions.RegraDeNegocioException;

public class SaldoInsuficienteException extends RegraDeNegocioException {
    public SaldoInsuficienteException(){
        super("Saldo insuficiente para a compra dos stefamons selecionados.");
    }

    public SaldoInsuficienteException(String message) {
        super(message);
    }
}
