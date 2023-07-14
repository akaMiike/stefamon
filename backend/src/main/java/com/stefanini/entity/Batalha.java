package com.stefanini.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Batalha {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Boolean jogadorVenceu;

    @Column
    private LocalDateTime dataBatalha;

    @Column
    private BigDecimal moedasObtidas;

    @ManyToOne
    private Jogador jogador;

    @ManyToOne
    private Jogador oponente;

    @OneToMany(mappedBy = "batalha", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<LogRodada> logBatalha;

    public Batalha(){}

    public Batalha(Boolean jogadorVenceu, LocalDateTime dataBatalha, Jogador jogador, Jogador oponente, BigDecimal moedasObtidas) {
        this.jogadorVenceu = jogadorVenceu;
        this.dataBatalha = dataBatalha;
        this.jogador = jogador;
        this.oponente = oponente;
        this.moedasObtidas = moedasObtidas;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getJogadorVenceu() {
        return jogadorVenceu;
    }

    public void setJogadorVenceu(Boolean jogadorVenceu) {
        jogadorVenceu = jogadorVenceu;
    }

    public LocalDateTime getDataBatalha() {
        return dataBatalha;
    }

    public void setDataBatalha(LocalDateTime dataBatalha) {
        this.dataBatalha = dataBatalha;
    }

    public Jogador getJogador() {
        return jogador;
    }

    public void setJogador(Jogador jogador) {
        this.jogador = jogador;
    }

    public Jogador getOponente() {
        return oponente;
    }

    public void setOponente(Jogador oponente) {
        this.oponente = oponente;
    }

    public List<LogRodada> getLogBatalha() {
        return logBatalha;
    }

    public void setLogBatalha(List<LogRodada> logBatalha) {
        this.logBatalha = logBatalha;
    }

    public BigDecimal getMoedasObtidas() {
        return moedasObtidas;
    }

    public void setMoedasObtidas(BigDecimal moedasObtidas) {
        this.moedasObtidas = moedasObtidas;
    }
}
