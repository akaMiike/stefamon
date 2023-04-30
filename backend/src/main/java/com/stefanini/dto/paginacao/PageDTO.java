package com.stefanini.dto.paginacao;

import java.util.List;

public class PageDTO<T>{

    private List<T> elementos;
    private Long totalElementos;

    public PageDTO(List<T> elementos, Long totalElementos){
        this.elementos = elementos;
        this.totalElementos = totalElementos;
    }

    public List<T> getElementos() {
        return elementos;
    }

    public void setElementos(List<T> elementos) {
        this.elementos = elementos;
    }

    public Long getTotalElementos() {
        return totalElementos;
    }

    public void setTotalElementos(Long totalElementos) {
        this.totalElementos = totalElementos;
    }
}
