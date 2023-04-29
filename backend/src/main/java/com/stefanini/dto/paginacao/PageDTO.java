package com.stefanini.dto.paginacao;

import java.util.List;

public class PageDTO<T>{

    private List<T> elementos;
    private int totalPaginas;

    public PageDTO(List<T> elementos, int totalPaginas){
        this.elementos = elementos;
        this.totalPaginas = totalPaginas;
    }

    public List<T> getElementos() {
        return elementos;
    }

    public void setElementos(List<T> elementos) {
        this.elementos = elementos;
    }

    public int getTotalPaginas() {
        return totalPaginas;
    }

    public void setTotalPaginas(int totalPaginas) {
        this.totalPaginas = totalPaginas;
    }
}
