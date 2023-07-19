import { Stefamon } from "./Stefamon.model"

export interface Jogador {
    id?: number,
    nickname: string
    password: string,
    saldo: number,
    nomeArquivoAvatar: string,
    qtdVitorias: number,
    qtdDerrotas: number,
    primeiroLogin: boolean,
    stefamons: Stefamon[];
}
