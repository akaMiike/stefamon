package com.stefanini.dto.jogador;

import com.stefanini.dto.stefamon.StefamonDTO;

import java.math.BigDecimal;
import java.util.List;

public class JogadorRetornoDTO {

    private Long id;
    private String nickname;
    private BigDecimal saldo;
    private Integer qtdVitorias;
    private Integer qtdDerrotas;
    private String nomeArquivoAvatar;
    private Boolean primeiroLogin;
    private List<StefamonDTO> stefamons;

    public JogadorRetornoDTO(Long id, String nickname, BigDecimal saldo, String nomeArquivoAvatar,
                             Integer qtdVitorias, Integer qtdDerrotas, List<StefamonDTO> stefamons, Boolean primeiroLogin) {
        this.id = id;
        this.nickname = nickname;
        this.saldo = saldo;
        this.nomeArquivoAvatar = nomeArquivoAvatar;
        this.qtdVitorias = qtdVitorias;
        this.qtdDerrotas = qtdDerrotas;
        this.stefamons = stefamons;
        this.primeiroLogin = primeiroLogin;
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

    public BigDecimal getSaldo() {
        return saldo;
    }

    public void setSaldo(BigDecimal saldo) {
        this.saldo = saldo;
    }

    public List<StefamonDTO> getStefamons() {
        return stefamons;
    }

    public void setStefamons(List<StefamonDTO> stefamons) {
        this.stefamons = stefamons;
    }

    public Integer getQtdDerrotas() {
        return qtdDerrotas;
    }

    public void setQtdDerrotas(Integer qtdDerrotas) {
        this.qtdDerrotas = qtdDerrotas;
    }

    public Integer getQtdVitorias() {
        return qtdVitorias;
    }

    public void setQtdVitorias(Integer qtdVitorias) {
        this.qtdVitorias = qtdVitorias;
    }

    public String getNomeArquivoAvatar() {
        return nomeArquivoAvatar;
    }

    public void setNomeArquivoAvatar(String nomeArquivoAvatar) {
        this.nomeArquivoAvatar = nomeArquivoAvatar;
    }

    public Boolean getPrimeiroLogin() {
        return primeiroLogin;
    }

    public void setPrimeiroLogin(Boolean primeiroLogin) {
        this.primeiroLogin = primeiroLogin;
    }
}
