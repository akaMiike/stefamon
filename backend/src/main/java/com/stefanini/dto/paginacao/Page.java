package com.stefanini.dto.paginacao;

import java.util.List;

public class Page<T>{

    private List<T> elementos;
    private int totalElementos;

    public Page(List<T> elementos, int totalElementos){
        this.elementos = elementos;
        this.totalElementos = totalElementos;
    }

    public List<T> getElementos() {
        return elementos;
    }

    public void setElementos(List<T> elementos) {
        this.elementos = elementos;
    }

    public int getTotalElementos() {
        return totalElementos;
    }

    public void setTotalElementos(int totalElementos) {
        this.totalElementos = totalElementos;
    }
}
