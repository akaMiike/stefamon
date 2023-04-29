package com.stefanini.repository;


import com.stefanini.dao.GenericDAO;
import com.stefanini.entity.Stefamon;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

@ApplicationScoped
public class StefamonRepository extends GenericDAO<Stefamon, Long> {

    public List<Stefamon> buscarTodosPaginadoEOrdenado(int numPagina, int tamanhoPagina, String ordem, String coluna){
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<Stefamon> cq = cb.createQuery(Stefamon.class);
        Root<Stefamon> root = cq.from(Stefamon.class);

        if(ordem.equals("ASC"))
            cq.orderBy(cb.asc(root.get(coluna)));
        else
            cq.orderBy(cb.desc(root.get(coluna)));

        CriteriaQuery<Stefamon> select = cq.select(root);

        return getEntityManager()
                .createQuery(select)
                .setFirstResult((numPagina-1) * tamanhoPagina)
                .setMaxResults(tamanhoPagina)
                .getResultList();
    }
}
