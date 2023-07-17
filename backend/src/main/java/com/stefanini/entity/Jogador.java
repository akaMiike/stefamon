package com.stefanini.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_jogador")
public class Jogador {

    @Id
    @Column(name = "id_jogador")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String nickname;

    @Column
    private String password;
    
    @Column
    private Integer qtdVitorias;

    @Column
    private Integer qtdDerrotas;

    @Column
    private String nomeArquivoAvatar;

    @Column
    private BigDecimal saldo;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "Jogador_Stefamon",
            joinColumns = {@JoinColumn(name = "id_jogador")},
            inverseJoinColumns = {@JoinColumn(name = "id")})
    private List<Stefamon> stefamons = new ArrayList<>();

    public Jogador() {
    }

    public Jogador(String nickname, String password, BigDecimal saldo, String nomeArquivoAvatar,
                   Integer qtdVitorias, Integer qtdDerrotas, List<Stefamon> stefamons) {
        this.nickname = nickname;
        this.password = password;
        this.saldo = saldo;
        this.nomeArquivoAvatar = nomeArquivoAvatar;
        this.qtdDerrotas = qtdDerrotas;
        this.qtdVitorias = qtdVitorias;
        this.stefamons = stefamons;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNomeArquivoAvatar(){ return nomeArquivoAvatar; }

    public void setNomeArquivoAvatar(String nomeArquivoAvatar){ this.nomeArquivoAvatar = nomeArquivoAvatar; }

    public BigDecimal getSaldo() {
        return saldo;
    }

    public void setSaldo(BigDecimal saldo) {
        this.saldo = saldo;
    }

    public List<Stefamon> getStefamons() {
        return stefamons;
    }

    public void setStefamons(List<Stefamon> stefamons) {
        this.stefamons = stefamons;
    }

    public Integer getQtdVitorias() {
        return qtdVitorias;
    }

    public void setQtdVitorias(Integer qtdVitorias) {
        this.qtdVitorias = qtdVitorias;
    }

    public Integer getQtdDerrotas() {
        return qtdDerrotas;
    }

    public void setQtdDerrotas(Integer qtdDerrotas) {
        this.qtdDerrotas = qtdDerrotas;
    }
}
