package com.stefanini.dto.logRodada;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class LogRodadaCreationDTO {

    @NotNull(message="Log da rodada deve conter o número da rodada")
    private Long numRodada;

    @NotBlank(message = "Detalhes da rodada é obrigatório.")
    private String detalhesRodada;

    private String nomeJogadorAtacante;
    private String nomeJogadorAtacado;
    private String nomeStefamonAtacante;
    private String nomeStefamonAtacado;
    private String vidaStefamonAntesAtaque;
    private String vidaStefamonAposAtaque;

    public LogRodadaCreationDTO() {}

    public Long getNumRodada() {
        return numRodada;
    }

    public void setNumRodada(Long numRodada) {
        this.numRodada = numRodada;
    }

    public String getNomeJogadorAtacante() {
        return nomeJogadorAtacante;
    }

    public void setNomeJogadorAtacante(String nomeJogadorAtacante) {
        this.nomeJogadorAtacante = nomeJogadorAtacante;
    }

    public String getNomeJogadorAtacado() {
        return nomeJogadorAtacado;
    }

    public void setNomeJogadorAtacado(String nomeJogadorAtacado) {
        this.nomeJogadorAtacado = nomeJogadorAtacado;
    }

    public String getNomeStefamonAtacante() {
        return nomeStefamonAtacante;
    }

    public void setNomeStefamonAtacante(String nomeStefamonAtacante) {
        this.nomeStefamonAtacante = nomeStefamonAtacante;
    }

    public String getNomeStefamonAtacado() {
        return nomeStefamonAtacado;
    }

    public void setNomeStefamonAtacado(String nomeStefamonAtacado) {
        this.nomeStefamonAtacado = nomeStefamonAtacado;
    }

    public String getVidaStefamonAposAtaque() {
        return vidaStefamonAposAtaque;
    }

    public void setVidaStefamonAposAtaque(String vidaStefamonAposAtaque) {
        this.vidaStefamonAposAtaque = vidaStefamonAposAtaque;
    }

    public String getDetalhesRodada() {
        return detalhesRodada;
    }

    public void setDetalhesRodada(String detalhesRodada) {
        this.detalhesRodada = detalhesRodada;
    }

    public String getVidaStefamonAntesAtaque() {
        return vidaStefamonAntesAtaque;
    }

    public void setVidaStefamonAntesAtaque(String vidaStefamonAntesAtaque) {
        this.vidaStefamonAntesAtaque = vidaStefamonAntesAtaque;
    }
}
