import { Jogador } from "src/app/models/Jogador.model";
import { LogRodada } from "src/app/models/LogRodada.model";

export interface ResultadoBatalha{
    vencedor: Jogador,
    perdedor: Jogador,
    idBatalha: number,
    moedasObtidas: number,
    logsBatalha: LogRodada[];
}