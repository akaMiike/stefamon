package com.stefanini.repository;


import com.stefanini.dao.GenericDAO;
import com.stefanini.entity.Stefamon;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.Query;
import java.util.List;

@ApplicationScoped
public class StefamonRepository extends GenericDAO<Stefamon, Long> {

    public List<Stefamon> buscarTodosPaginado(int numPagina, int tamanhoPagina){
        return getEntityManager()
                .createQuery("SELECT s FROM Stefamon s", Stefamon.class)
                .setFirstResult((numPagina-1) * tamanhoPagina)
                .setMaxResults(tamanhoPagina)
                .getResultList();
    }
}
