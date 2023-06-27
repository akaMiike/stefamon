package com.stefanini.dto.paginacao;

import java.util.List;

public class Page<T>{

    private List<T> elementos;
    private long totalElementos;

    public Page(List<T> elementos, long totalElementos){
        this.elementos = elementos;
        this.totalElementos = totalElementos;
    }

    public List<T> getElementos() {
        return elementos;
    }

    public void setElementos(List<T> elementos) {
        this.elementos = elementos;
    }

    public long getTotalElementos() {
        return totalElementos;
    }

    public void setTotalElementos(int totalElementos) {
        this.totalElementos = totalElementos;
    }
}
