package com.stefanini.dto.logRodada;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class LogRodadaCreationDTO {

    @NotNull
    private Long numRodada;
    @NotBlank(message = "Detalhes da rodada é obrigatório.")
    private String detalhesRodada;

    public LogRodadaCreationDTO() {
    }

    public LogRodadaCreationDTO(Long numRodada, String detalhesRodada) {
        this.numRodada = numRodada;
        this.detalhesRodada = detalhesRodada;
    }

    public String getDetalhesRodada() {
        return detalhesRodada;
    }

    public void setDetalhesRodada(String detalhesRodada) {
        this.detalhesRodada = detalhesRodada;
    }

    public Long getNumRodada() {
        return numRodada;
    }

    public void setNumRodada(Long numRodada) {
        this.numRodada = numRodada;
    }
}
