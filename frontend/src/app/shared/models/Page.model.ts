export class Page<T> {
    pagina: number = 0;
    tamanhoPagina: number = 12;
    valorOrdenacao: string = 'DESC';
    colunaOrdenacao: string = null;
    totalElementos: number = 0;
    elementos: T[] = [];
    filtros: any = {};
}