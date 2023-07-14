package com.stefanini.entity;


import javax.persistence.*;

@Entity
public class LogRodada {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Batalha batalha;

    @Column
    private Long numRodada;

    @Column
    private String nomeJogadorAtacante;

    @Column
    private String nomeJogadorAtacado;

    @Column
    private String nomeStefamonAtacante;

    @Column
    private String nomeStefamonAtacado;

    @Column
    private String vidaStefamonAntesAtaque;

    @Column
    private String vidaStefamonAposAtaque;

    @Column
    private String detalhesRodada;

    public LogRodada(){}

    public LogRodada(Batalha batalha, Long numRodada, String nomeJogadorAtacante, String nomeJogadorAtacado, String nomeStefamonAtacante,
                     String nomeStefamonAtacado, String vidaStefamonAntesAtaque, String vidaStefamonAposAtaque, String detalhesRodada) {
        this.batalha = batalha;
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

    public Batalha getBatalha() {
        return batalha;
    }

    public void setBatalha(Batalha batalha) {
        this.batalha = batalha;
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
