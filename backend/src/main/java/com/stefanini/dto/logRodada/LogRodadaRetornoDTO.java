package com.stefanini.dto.logRodada;

public class LogRodadaRetornoDTO {

    private Long id;
    private Long numRodada;
    private String detalhesRodada;

    public LogRodadaRetornoDTO(Long id, Long numRodada, String detalhesRodada) {
        this.id = id;
        this.numRodada = numRodada;
        this.detalhesRodada = detalhesRodada;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
