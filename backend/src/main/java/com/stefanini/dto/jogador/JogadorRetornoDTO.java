package com.stefanini.dto.jogador;

import com.stefanini.dto.stefamon.StefamonDTO;

import java.math.BigDecimal;
import java.util.List;

public class JogadorRetornoDTO {

    private Long id;
    private String nickname;
    private BigDecimal saldo;
    private List<StefamonDTO> stefamons;

    public JogadorRetornoDTO(Long id, String nickname, BigDecimal saldo, List<StefamonDTO> stefamons) {
        this.id = id;
        this.nickname = nickname;
        this.saldo = saldo;
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
}
