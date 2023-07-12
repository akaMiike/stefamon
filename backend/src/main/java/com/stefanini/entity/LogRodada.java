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
    private String detalhesRodada;

    public LogRodada(){}

    public LogRodada(Long id, Batalha batalha, String detalhesRodada) {
        this.id = id;
        this.batalha = batalha;
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

    public String getDetalhesRodada() {
        return detalhesRodada;
    }

    public void setDetalhesRodada(String detalhesRodada) {
        this.detalhesRodada = detalhesRodada;
    }
}
