package com.stefanini.dto.batalha;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class BatalhaRetornoDTO {

    private Long id;
    private String nomeJogador;
    private String nomeOponente;
    private Boolean jogadorVenceu;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dataBatalha;

    public BatalhaRetornoDTO(){}

    public BatalhaRetornoDTO(Long id, String nomeJogador, String nomeOponente, Boolean jogadorVenceu, LocalDateTime dataBatalha) {
        this.id = id;
        this.nomeJogador = nomeJogador;
        this.nomeOponente = nomeOponente;
        this.jogadorVenceu = jogadorVenceu;
        this.dataBatalha = dataBatalha;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeJogador() {
        return nomeJogador;
    }

    public void setNomeJogador(String nomeJogador) {
        this.nomeJogador = nomeJogador;
    }

    public String getNomeOponente() {
        return nomeOponente;
    }

    public void setNomeOponente(String nomeOponente) {
        this.nomeOponente = nomeOponente;
    }

    public Boolean getJogadorVenceu() {
        return jogadorVenceu;
    }

    public void setJogadorVenceu(Boolean jogadorVenceu) {
        this.jogadorVenceu = jogadorVenceu;
    }

    public LocalDateTime getDataBatalha() {
        return dataBatalha;
    }

    public void setDataBatalha(LocalDateTime dataBatalha) {
        this.dataBatalha = dataBatalha;
    }
}
