import { Stefamon } from "./Stefamon.model"

export interface Jogador {
    id: number,
    nickname: string
    password: string,
    saldo: number,
    qtdVitorias: number,
    qtdDerrotas: number,
    stefamons: Stefamon[];
}