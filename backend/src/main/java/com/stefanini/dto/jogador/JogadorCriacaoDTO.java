package com.stefanini.dto.jogador;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class JogadorCriacaoDTO {

    @NotBlank(message = "Nickname não pode ser vazio.")
    @Size(min = 4, message="Nickname deve possuir ao menos 4 caracteres")
    @Pattern(regexp = "[a-zA-Z][a-zA-Z0-9]*", message = "Nickname deve começar com uma letra")
    private String nickname;

    @NotBlank(message = "Senha não pode estar vazia.")
    @Size(min = 4, max = 10, message = "A senha deve ter entre 4 e 10 caracteres.")
    private String password;

    @NotBlank(message="Avatar deve ser obrigatório")
    private String nomeArquivoAvatar;

    public JogadorCriacaoDTO(){}

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

    public String getNomeArquivoAvatar() {
        return nomeArquivoAvatar;
    }

    public void setNomeArquivoAvatar(String nomeArquivoAvatar) {
        this.nomeArquivoAvatar = nomeArquivoAvatar;
    }
}
