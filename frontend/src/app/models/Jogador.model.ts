import { Stefamon } from "./Stefamon.model"

export interface Jogador{
    nickname: string
    password: string,
    saldo: number,
    stefamons: Stefamon[];
}