package com.stefanini.dto.logRodada;

public class LogRodadaRetornoDTO {

    private Long id;
    private Long numRodada;
    private String nomeJogadorAtacante;
    private String nomeJogadorAtacado;
    private String nomeStefamonAtacante;
    private String nomeStefamonAtacado;
    private String vidaStefamonAntesAtaque;
    private String vidaStefamonAposAtaque;
    private String detalhesRodada;

    public LogRodadaRetornoDTO(Long id, Long numRodada, String nomeJogadorAtacante, String nomeJogadorAtacado, String nomeStefamonAtacante,
                               String nomeStefamonAtacado, String vidaStefamonAntesAtaque ,String vidaStefamonAposAtaque, String detalhesRodada) {
        this.id = id;
        this.numRodada = numRodada;
        this.nomeJogadorAtacante = nomeJogadorAtacante;
        this.nomeJogadorAtacado = nomeJogadorAtacado;
        this.nomeStefamonAtacante = nomeStefamonAtacante;
        this.nomeStefamonAtacado = nomeStefamonAtacado;
        this.vidaStefamonAntesAtaque = vidaStefamonAntesAtaque;
        this.vidaStefamonAposAtaque = vidaStefamonAposAtaque;
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

    public String getVidaStefamonAntesAtaque() {
        return vidaStefamonAntesAtaque;
    }

    public void setVidaStefamonAntesAtaque(String vidaStefamonAntesAtaque) {
        this.vidaStefamonAntesAtaque = vidaStefamonAntesAtaque;
    }
}
