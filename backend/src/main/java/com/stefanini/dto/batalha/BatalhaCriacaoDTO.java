package com.stefanini.dto.batalha;

import javax.validation.constraints.NotNull;

public class BatalhaCriacaoDTO {

    @NotNull(message= "Id do jogador é obrigatório")
    private Long idJogador;
    private Long idOponente;
    @NotNull(message= "Resultado da batalha é obrigatório")
    private Boolean jogadorVenceu;

    public BatalhaCriacaoDTO(Long idJogador, Long idOponente, Boolean jogadorVenceu) {
        this.idJogador = idJogador;
        this.idOponente = idOponente;
        this.jogadorVenceu = jogadorVenceu;
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

    public Boolean getJogadorVenceu() {
        return jogadorVenceu;
    }

    public void setJogadorVenceu(Boolean jogadorVenceu) {
        this.jogadorVenceu = jogadorVenceu;
    }
}
