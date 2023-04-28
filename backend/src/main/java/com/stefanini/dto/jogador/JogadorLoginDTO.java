package com.stefanini.dto.jogador;

import javax.validation.constraints.NotBlank;

public class JogadorLoginDTO {

    @NotBlank(message = "Nickname não pode ser vazio.")
    private String nickname;

    @NotBlank(message = "Senha não pode estar vazia.")
    private String password;

    public JogadorLoginDTO(String nickname, String password) {
        this.nickname = nickname;
        this.password = password;
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
}
