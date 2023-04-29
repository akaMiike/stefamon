export class Page<T> {
    pagina: number = 1;
    tamanhoPagina: number = 10;
    valorOrdenacao: string = 'DESC';
    colunaOrdenacao: string = 'vida';
    totalPaginas: number = 0;
    elementos: T[] = [];
}