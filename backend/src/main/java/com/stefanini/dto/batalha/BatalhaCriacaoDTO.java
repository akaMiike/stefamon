package com.stefanini.dto.batalha;

import javax.validation.constraints.NotNull;

public class BatalhaCriacaoDTO {

    @NotNull(message= "Id do jogador é obrigatório")
    private Long idJogador;
    @NotNull(message= "Id do oponente é obrigatório")
    private Long idOponente;
    @NotNull(message= "Resultado da batalha é obrigatório")
    private Boolean isJogadorVencedor;

    public BatalhaCriacaoDTO(Long idJogador, Long idOponente, Boolean isJogadorVencedor) {
        this.idJogador = idJogador;
        this.idOponente = idOponente;
        this.isJogadorVencedor = isJogadorVencedor;
    }

    public Long getIdJogador() {
        return idJogador;
    }

    public void setIdJogador(Long idJogador) {
        this.idJogador = idJogador;
    }

    public Long getIdOponente() {
        return idOponente;
    }

    public void setIdOponente(Long idOponente) {
        this.idOponente = idOponente;
    }

    public Boolean getJogadorVencedor() {
        return isJogadorVencedor;
    }

    public void setJogadorVencedor(Boolean jogadorVencedor) {
        isJogadorVencedor = jogadorVencedor;
    }
}
